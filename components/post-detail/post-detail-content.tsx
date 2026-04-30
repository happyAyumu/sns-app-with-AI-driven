import Link from "next/link";
import {
  IoBarChartOutline,
  IoChatbubbleOutline,
  IoEllipsisHorizontal,
  IoHeartOutline,
  IoRepeat,
  IoShareOutline,
} from "react-icons/io5";
import type { Post } from "@/lib/supabase";

interface PostDetailContentProps {
  post: Post;
  replies: Post[];
  formatDate: (value: string) => string;
  formatDetailTimestamp: (value: string) => string;
  formatViews: (views: number) => string;
}

export function PostDetailContent({
  post,
  replies,
  formatDate,
  formatDetailTimestamp,
  formatViews,
}: PostDetailContentProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
      <article className="border-b border-[#eff3f4] px-4 py-3">
        <div className="flex gap-3">
          <Link
            href={`/users/${post.author_handle}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold"
          >
            {post.author_handle.slice(0, 1).toUpperCase()}
          </Link>
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
            <p className="mt-3 whitespace-pre-line text-[15px] leading-6 text-neutral-900">{post.body}</p>
            <p className="mt-4 text-[13px] text-[#536471]">
              {formatDetailTimestamp(post.created_at)} ·{" "}
              <span className="font-semibold text-neutral-900">{formatViews(post.views_count)}</span> Views
            </p>
            <div className="mt-3 flex items-center justify-between border-y border-[#eff3f4] py-2 text-[#536471]">
              <button type="button" className="group flex items-center gap-1.5 text-[14px] hover:text-[#1d9bf0]">
                <span className="rounded-full p-2 group-hover:bg-[#1d9bf0]/10">
                  <IoChatbubbleOutline className="h-[20px] w-[20px]" />
                </span>
                {post.replies_count}
              </button>
              <button type="button" className="group flex items-center gap-1.5 text-[14px] hover:text-emerald-600">
                <span className="rounded-full p-2 group-hover:bg-emerald-500/10">
                  <IoRepeat className="h-[20px] w-[20px]" />
                </span>
                {post.reposts_count}
              </button>
              <button type="button" className="group flex items-center gap-1.5 text-[14px] hover:text-pink-600">
                <span className="rounded-full p-2 group-hover:bg-pink-500/10">
                  <IoHeartOutline className="h-[20px] w-[20px]" />
                </span>
                {post.likes_count}
              </button>
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
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold">
            You
          </div>
          <div className="min-w-0 flex-1">
            <p className="mt-1 text-[20px] text-[#536471]">Post your reply</p>
          </div>
          <button
            type="button"
            disabled
            className="rounded-full bg-neutral-300 px-5 py-2 text-[15px] font-bold text-white"
          >
            Reply
          </button>
        </div>
      </div>

      <div className="border-b border-[#eff3f4] px-4 py-2 text-[14px] font-semibold text-[#536471]">Replies</div>

      {replies.map((reply) => (
        <article key={reply.id} className="border-b border-[#eff3f4] px-4 py-3 transition-colors hover:bg-black/[0.02]">
          <div className="flex gap-3">
            <Link
              href={`/users/${reply.author_handle}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold"
            >
              {reply.author_handle.slice(0, 1).toUpperCase()}
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 flex-nowrap items-baseline gap-x-1 overflow-hidden text-[15px]">
                <span className="min-w-0 truncate font-bold text-neutral-900">{reply.author_name}</span>
                <span className="shrink-0 text-[#536471]">@{reply.author_handle}</span>
                <span className="shrink-0 text-[#536471]">·</span>
                <time className="shrink-0 text-[#536471]" dateTime={reply.created_at}>
                  {formatDate(reply.created_at)}
                </time>
              </div>
              <p className="mt-1 whitespace-pre-line text-[15px] leading-6 text-neutral-900">{reply.body}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
