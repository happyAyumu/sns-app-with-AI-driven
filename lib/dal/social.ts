import "server-only";

import { prisma } from "../prisma";
import type { ProfileTimelineItem } from "../profile-timeline-mock";
import type { Post } from "../supabase";

export interface UserProfileData {
  displayName: string;
  handle: string;
  bio: string;
  joinedLabel: string;
  followingCount: number;
  followersCount: number;
  postCount: number;
  timelineItems: ProfileTimelineItem[];
}

export interface PostDetailData {
  post: Post;
  replies: Post[];
}

function mapPostToViewModel(post: {
  id: string;
  content: string;
  created_at: Date;
  user: { username: string; display_name: string };
  _count: { replies: number; likes: number };
}): Post {
  return {
    id: post.id,
    author_name: post.user.display_name,
    author_handle: post.user.username,
    body: post.content,
    created_at: post.created_at.toISOString(),
    is_published: true,
    replies_count: post._count.replies,
    reposts_count: 0,
    likes_count: post._count.likes,
    views_count: 0,
  };
}

export async function fetchHomeTimelinePosts(): Promise<Post[]> {
  const timelinePosts = await prisma.post.findMany({
    orderBy: { created_at: "desc" },
    take: 50,
    include: {
      user: {
        select: {
          username: true,
          display_name: true,
        },
      },
      _count: {
        select: {
          replies: true,
          likes: true,
        },
      },
    },
  });

  return timelinePosts.map(mapPostToViewModel);
}

export async function fetchUserProfileByUsername(username: string): Promise<UserProfileData | null> {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      posts: {
        orderBy: { created_at: "desc" },
        take: 50,
      },
      _count: {
        select: {
          posts: true,
          following: true,
          followers: true,
        },
      },
    },
  });

  if (!user) return null;

  return {
    displayName: user.display_name,
    handle: user.username,
    bio: user.bio ?? "自己紹介はまだありません。",
    joinedLabel: `Joined ${new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(user.created_at)}`,
    followingCount: user._count.following,
    followersCount: user._count.followers,
    postCount: user._count.posts,
    timelineItems: user.posts.map((post) => ({
      id: post.id,
      created_at: post.created_at.toISOString(),
      body: post.content,
    })),
  };
}

export async function fetchPostDetailById(postId: string): Promise<PostDetailData | null> {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          username: true,
          display_name: true,
        },
      },
      _count: {
        select: {
          replies: true,
          likes: true,
        },
      },
      replies: {
        orderBy: { created_at: "asc" },
        include: {
          user: {
            select: {
              username: true,
              display_name: true,
            },
          },
          _count: {
            select: {
              replies: true,
              likes: true,
            },
          },
        },
      },
    },
  });

  if (!post) return null;

  return {
    post: mapPostToViewModel(post),
    replies: post.replies.map(mapPostToViewModel),
  };
}
