import "server-only";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import type { ProfileTimelineItem } from "../profile-timeline-mock";
import type { Post } from "../supabase";

export interface UserProfileData {
  displayName: string;
  handle: string;
  bio: string;
  /** 編集フォーム用（DB の生値） */
  editBio: string;
  avatarUrl: string | null;
  headerUrl: string | null;
  joinedLabel: string;
  followingCount: number;
  followersCount: number;
  followedByMe: boolean;
  postCount: number;
  timelineItems: ProfileTimelineItem[];
}

export interface WhoToFollowUser {
  username: string;
  displayName: string;
  followedByMe: boolean;
}

export interface FollowingListEntry {
  username: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface FollowingListData {
  ownerUsername: string;
  ownerDisplayName: string;
  following: FollowingListEntry[];
}

async function getViewerDbId(): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;
  const viewer = await prisma.user.findUnique({
    where: { clerk_id: userId },
    select: { id: true },
  });
  return viewer?.id ?? null;
}

export interface ViewerProfile {
  username: string;
  display_name: string;
  avatar_url: string | null;
}

export interface PostDetailData {
  post: Post;
  replies: Post[];
  /** この投稿が返信のとき、返信先（親）の概要 */
  parentPost?: {
    id: string;
    author_name: string;
    author_handle: string;
  };
}

const postAuthorSelect = {
  username: true,
  display_name: true,
  avatar_url: true,
} as const;

export async function fetchViewerProfile(): Promise<ViewerProfile | null> {
  const { userId } = await auth();
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { clerk_id: userId },
    select: postAuthorSelect,
  });
}

async function getCurrentUserDbIdForLikes(): Promise<string | null> {
  return getViewerDbId();
}

function mapPostToViewModel(post: {
  id: string;
  content: string;
  created_at: Date;
  user: { username: string; display_name: string; avatar_url: string | null };
  _count: { replies: number; likes: number };
  likes?: { id: string }[];
}): Post {
  return {
    id: post.id,
    author_name: post.user.display_name,
    author_handle: post.user.username,
    author_avatar_url: post.user.avatar_url,
    body: post.content,
    created_at: post.created_at.toISOString(),
    is_published: true,
    replies_count: post._count.replies,
    reposts_count: 0,
    likes_count: post._count.likes,
    liked_by_me: (post.likes?.length ?? 0) > 0,
    views_count: 0,
  };
}

export async function fetchHomeTimelinePosts(): Promise<Post[]> {
  const dbUserId = await getCurrentUserDbIdForLikes();
  const likeInclude = dbUserId
    ? {
        likes: {
          where: { user_id: dbUserId },
          select: { id: true },
          take: 1,
        },
      }
    : {};

  const timelinePosts = await prisma.post.findMany({
    where: { reply_to_id: null },
    orderBy: { created_at: "desc" },
    take: 50,
    include: {
      user: {
        select: postAuthorSelect,
      },
      _count: {
        select: {
          replies: true,
          likes: true,
        },
      },
      ...likeInclude,
    },
  });

  return timelinePosts.map(mapPostToViewModel);
}

export async function fetchWhoToFollowSuggestions(limit = 3): Promise<WhoToFollowUser[]> {
  const viewerDbId = await getViewerDbId();

  const candidates = await prisma.user.findMany({
    where: {
      ...(viewerDbId
        ? {
            id: { not: viewerDbId },
            NOT: {
              followers: {
                some: { follower_id: viewerDbId },
              },
            },
          }
        : {}),
    },
    orderBy: { created_at: "desc" },
    take: limit,
    select: {
      username: true,
      display_name: true,
    },
  });

  return candidates.map((u) => ({
    username: u.username,
    displayName: u.display_name,
    followedByMe: false,
  }));
}

/** 指定ユーザーのフォロー一覧（follows ⋈ users） */
export async function fetchFollowingListByUsername(username: string): Promise<FollowingListData | null> {
  const owner = await prisma.user.findUnique({
    where: { username },
    select: { id: true, username: true, display_name: true },
  });
  if (!owner) return null;

  const rows = await prisma.follow.findMany({
    where: { follower_id: owner.id },
    orderBy: { created_at: "desc" },
    select: {
      following: {
        select: postAuthorSelect,
      },
    },
  });

  return {
    ownerUsername: owner.username,
    ownerDisplayName: owner.display_name,
    following: rows.map((row) => ({
      username: row.following.username,
      displayName: row.following.display_name,
      avatarUrl: row.following.avatar_url,
    })),
  };
}

export async function fetchUserProfileByUsername(username: string): Promise<UserProfileData | null> {
  const viewerDbId = await getViewerDbId();

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      posts: {
        where: { reply_to_id: null },
        orderBy: { created_at: "desc" },
        take: 50,
      },
      _count: {
        select: {
          following: true,
          followers: true,
        },
      },
    },
  });

  if (!user) return null;

  const rootPostCount = await prisma.post.count({
    where: { user_id: user.id, reply_to_id: null },
  });

  let followedByMe = false;
  if (viewerDbId && viewerDbId !== user.id) {
    const row = await prisma.follow.findUnique({
      where: {
        follower_id_following_id: {
          follower_id: viewerDbId,
          following_id: user.id,
        },
      },
      select: { id: true },
    });
    followedByMe = Boolean(row);
  }

  return {
    displayName: user.display_name,
    handle: user.username,
    bio: user.bio ?? "自己紹介はまだありません。",
    editBio: user.bio ?? "",
    avatarUrl: user.avatar_url,
    headerUrl: user.header_url,
    joinedLabel: `Joined ${new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(user.created_at)}`,
    followingCount: user._count.following,
    followersCount: user._count.followers,
    followedByMe,
    postCount: rootPostCount,
    timelineItems: user.posts.map((post) => ({
      id: post.id,
      created_at: post.created_at.toISOString(),
      body: post.content,
    })),
  };
}

export async function fetchPostDetailById(postId: string): Promise<PostDetailData | null> {
  const dbUserId = await getCurrentUserDbIdForLikes();
  const likeInclude = dbUserId
    ? {
        likes: {
          where: { user_id: dbUserId },
          select: { id: true },
          take: 1,
        },
      }
    : {};

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: postAuthorSelect,
      },
      reply_to: {
        select: {
          id: true,
          user: {
            select: postAuthorSelect,
          },
        },
      },
      _count: {
        select: {
          replies: true,
          likes: true,
        },
      },
      ...likeInclude,
      replies: {
        orderBy: { created_at: "asc" },
        include: {
          user: {
            select: postAuthorSelect,
          },
          _count: {
            select: {
              replies: true,
              likes: true,
            },
          },
          ...likeInclude,
        },
      },
    },
  });

  if (!post) return null;

  return {
    post: mapPostToViewModel(post),
    replies: post.replies.map(mapPostToViewModel),
    parentPost: post.reply_to
      ? {
          id: post.reply_to.id,
          author_name: post.reply_to.user.display_name,
          author_handle: post.reply_to.user.username,
        }
      : undefined,
  };
}
