import Link from "next/link";
import {
  IoBarChartOutline,
  IoChatbubbleOutline,
  IoEllipsisHorizontal,
  IoRepeat,
  IoShareOutline,
} from "react-icons/io5";
import type { Post } from "@/lib/supabase";
import type { ViewerProfile } from "@/lib/dal/social";
import { PostLikeButton } from "@/components/post/post-like-button";
import { UserAvatar } from "@/components/user/user-avatar";
import { PostReplyComposeForm } from "./post-reply-compose-form";
import { ReplyComposeAvatar } from "./reply-compose-avatar";

interface PostDetailContentProps {
  post: Post;
  replies: Post[];
  viewer: ViewerProfile | null;
  parentPost?: {
    id: string;
    author_name: string;
    author_handle: string;
  };
  formatDate: (value: string) => string;
  formatDetailTimestamp: (value: string) => string;
  formatViews: (views: number) => string;
}

export function PostDetailContent({
  post,
  replies,
  viewer,
  parentPost,
  formatDate,
  formatDetailTimestamp,
  formatViews,
}: PostDetailContentProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0 lg:flex-none lg:overflow-visible lg:pb-0">
      <article className="border-b border-[#eff3f4] px-4 py-3">
        <div className="flex gap-3">
          <UserAvatar
            src={post.author_avatar_url}
            name={post.author_name}
            href={`/users/${post.author_handle}`}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[20px] font-bold leading-6">{post.author_name}</p>
                <p className="truncate text-[15px] text-[#536471]">@{post.author_handle}</p>
              </div>
              <button
                type="button"
                className="rounded-full p-2 text-[#536471] transition-colors hover:bg-black/[0.06]"
                aria-label="メニュー"
              >
                <IoEllipsisHorizontal className="h-5 w-5" />
              </button>
            </div>
            {parentPost ? (
              <p className="mt-2 text-[15px] text-[#536471]">
                返信先:{" "}
                <Link href={`/posts/${parentPost.id}`} className="text-[#1d9bf0] hover:underline">
                  @{parentPost.author_handle}
                </Link>
                <span className="sr-only">（{parentPost.author_name}）</span>
              </p>
            ) : null}
            <p className="mt-3 whitespace-pre-line text-[15px] leading-6 text-neutral-900">{post.body}</p>
            <p className="mt-4 text-[13px] text-[#536471]">
              {formatDetailTimestamp(post.created_at)} ·{" "}
              <span className="font-semibold text-neutral-900">{formatViews(post.views_count)}</span> Views
            </p>
            <div className="mt-3 flex items-center justify-between border-y border-[#eff3f4] py-2 text-[#536471]">
              <Link
                href="#reply-compose"
                className="group flex items-center gap-1.5 text-[14px] hover:text-[#1d9bf0]"
                aria-label="返信する"
              >
                <span className="rounded-full p-2 group-hover:bg-[#1d9bf0]/10">
                  <IoChatbubbleOutline className="h-[20px] w-[20px]" />
                </span>
                {post.replies_count}
              </Link>
              <button type="button" className="group flex items-center gap-1.5 text-[14px] hover:text-emerald-600">
                <span className="rounded-full p-2 group-hover:bg-emerald-500/10">
                  <IoRepeat className="h-[20px] w-[20px]" />
                </span>
                {post.reposts_count}
              </button>
              <PostLikeButton
                postId={post.id}
                likesCount={post.likes_count}
                likedByMe={post.liked_by_me ?? false}
                detailPostId={post.id}
                variant="detail"
              />
              <button type="button" className="group flex items-center gap-1.5 text-[14px] hover:text-[#1d9bf0]">
                <span className="rounded-full p-2 group-hover:bg-[#1d9bf0]/10">
                  <IoBarChartOutline className="h-[20px] w-[20px]" />
                </span>
              </button>
              <button
                type="button"
                className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]"
                aria-label="Share"
              >
                <IoShareOutline className="h-[20px] w-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </article>

      <div className="border-b border-[#eff3f4] px-4 py-3">
        <div className="flex items-start gap-3">
          <ReplyComposeAvatar viewer={viewer} />
          <PostReplyComposeForm parentPostId={post.id} replyToHandle={post.author_handle} />
        </div>
      </div>

      <div className="border-b border-[#eff3f4] px-4 py-2 text-[14px] font-semibold text-[#536471]">Replies</div>

      {replies.length === 0 ? (
        <p className="border-b border-[#eff3f4] px-4 py-6 text-center text-[15px] text-[#536471]">
          まだ返信はありません。最初の返信を投稿しましょう。
        </p>
      ) : null}

      {replies.map((reply) => (
        <article key={reply.id} className="border-b border-[#eff3f4] px-4 py-3 transition-colors hover:bg-black/[0.02]">
          <div className="flex gap-3">
            <UserAvatar
              src={reply.author_avatar_url}
              name={reply.author_name}
              href={`/users/${reply.author_handle}`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 flex-nowrap items-baseline gap-x-1 overflow-hidden text-[15px]">
                <span className="min-w-0 truncate font-bold text-neutral-900">{reply.author_name}</span>
                <span className="shrink-0 text-[#536471]">@{reply.author_handle}</span>
                <span className="shrink-0 text-[#536471]">·</span>
                <time className="shrink-0 text-[#536471]" dateTime={reply.created_at}>
                  {formatDate(reply.created_at)}
                </time>
              </div>
              <Link href={`/posts/${reply.id}`} className="block">
                <p className="mt-1 whitespace-pre-line text-[15px] leading-6 text-neutral-900">{reply.body}</p>
              </Link>
              <div className="mt-2 flex max-w-md items-center gap-2 text-[#536471]">
                <Link
                  href={`/posts/${post.id}#reply-compose`}
                  className="group flex items-center gap-1 text-[13px] transition-colors hover:text-[#1d9bf0]"
                  aria-label="返信する"
                >
                  <span className="rounded-full p-2 group-hover:bg-[#1d9bf0]/10">
                    <IoChatbubbleOutline className="h-[18px] w-[18px]" />
                  </span>
                  {reply.replies_count > 0 ? reply.replies_count : null}
                </Link>
                <PostLikeButton
                  postId={reply.id}
                  likesCount={reply.likes_count}
                  likedByMe={reply.liked_by_me ?? false}
                  detailPostId={post.id}
                  variant="timeline"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
