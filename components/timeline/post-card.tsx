import Link from "next/link";
import type { Post } from "../../lib/supabase";
import {
  IoBarChartOutline,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoRepeat,
  IoShareOutline,
} from "react-icons/io5";

interface PostCardProps {
  post: Post;
  formatDate: (value: string) => string;
  formatViews: (views: number) => string;
}

export function PostCard({ post, formatDate, formatViews }: PostCardProps) {
  return (
    <article className="border-b border-[#eff3f4] px-3 py-2.5 transition-colors hover:bg-black/[0.02] sm:px-4 sm:py-3">
      <div className="flex gap-2.5 sm:gap-3">
        <Link
          href={`/users/${post.author_handle}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-center text-lg leading-[2.75rem] transition-opacity hover:opacity-80 sm:h-10 sm:w-10 sm:leading-10"
          aria-label={`${post.author_name}のプロフィール`}
        >
          {post.author_handle.slice(0, 1).toUpperCase()}
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={`/posts/${post.id}`} className="block">
            <div className="flex min-w-0 flex-nowrap items-baseline gap-x-1 overflow-hidden text-[15px]">
              <span className="min-w-0 truncate font-bold text-neutral-900">{post.author_name}</span>
              <span className="shrink-0 text-[#536471]">@{post.author_handle}</span>
              <span className="shrink-0 text-[#536471]">·</span>
              <time className="shrink-0 text-[#536471]" dateTime={post.created_at}>
                {formatDate(post.created_at)}
              </time>
            </div>
            <p className="mt-1 whitespace-pre-line text-[15px] leading-5 text-neutral-900">{post.body}</p>

            {post.poll ? (
              <div className="mt-3 space-y-2">
                {post.poll.options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    className="w-full rounded-full border border-[#cfd9de] px-4 py-2.5 text-left text-[15px] font-medium text-[#1d9bf0] transition-colors hover:bg-[#1d9bf0]/10"
                  >
                    {i + 1} {opt}
                  </button>
                ))}
                <p className="text-[13px] text-[#536471]">
                  {post.poll.totalVotes.toLocaleString()} votes · {post.poll.endsIn}
                </p>
              </div>
            ) : null}
          </Link>

          <div className="mt-3 flex max-w-md items-center justify-between text-[#536471]">
            <button
              type="button"
              className="group flex items-center gap-1 text-[13px] transition-colors hover:text-[#1d9bf0]"
            >
              <span className="rounded-full p-2 group-hover:bg-[#1d9bf0]/10">
                <IoChatbubbleOutline className="h-[18px] w-[18px]" />
              </span>
              {post.replies_count}
            </button>
            <button
              type="button"
              className="group flex items-center gap-1 text-[13px] transition-colors hover:text-emerald-600"
            >
              <span className="rounded-full p-2 group-hover:bg-emerald-500/10">
                <IoRepeat className="h-[18px] w-[18px]" />
              </span>
              {post.reposts_count}
            </button>
            <button
              type="button"
              className="group flex items-center gap-1 text-[13px] transition-colors hover:text-pink-600"
            >
              <span className="rounded-full p-2 group-hover:bg-pink-500/10">
                <IoHeartOutline className="h-[18px] w-[18px]" />
              </span>
              {post.likes_count}
            </button>
            <button
              type="button"
              className="group flex items-center gap-1 text-[13px] transition-colors hover:text-[#1d9bf0]"
            >
              <span className="rounded-full p-2 group-hover:bg-[#1d9bf0]/10">
                <IoBarChartOutline className="h-[18px] w-[18px]" />
              </span>
              {formatViews(post.views_count)}
            </button>
            <button
              type="button"
              className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]"
              aria-label="Share"
            >
              <IoShareOutline className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
