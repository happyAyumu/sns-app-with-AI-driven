import Link from "next/link";
import { MobileHomeHeader } from "../layout/mobile-home-header";
import type { Post } from "../../lib/supabase";
import { PostCard } from "./post-card";
import { formatPostDate, formatPostViews } from "../../lib/formatters/post";
import {
  IoImageOutline,
  IoLocationOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { TbMoodSmile, TbCalendarTime } from "react-icons/tb";

interface TimelineFeedProps {
  initialPosts: Post[];
}

export default function TimelineFeed({ initialPosts }: TimelineFeedProps) {
  const newPostsCount = Math.min(35, initialPosts.length + 12);

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="sticky top-0 z-20 shrink-0 border-b border-[#eff3f4] bg-white/95 backdrop-blur-md sm:bg-white/85">
        <MobileHomeHeader />
        <header>
          <div className="flex h-[53px]">
            <a
              href="#"
              className="relative flex flex-1 items-center justify-center text-[15px] font-bold text-neutral-900"
            >
              For you
              <span className="absolute bottom-0 h-1 w-14 rounded-full bg-[#1d9bf0]" />
            </a>
            <a
              href="#"
              className="flex flex-1 items-center justify-center text-[15px] font-medium text-[#536471] transition-colors hover:bg-black/[0.04]"
            >
              Following
            </a>
          </div>
        </header>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
        <div className="border-b border-[#eff3f4] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex gap-2.5 sm:gap-3">
            <Link
              href="/profile"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-lg leading-none transition-opacity hover:opacity-80 sm:h-10 sm:w-10"
              aria-label="プロフィールページへ"
            >
              🐕
            </Link>
            <div className="min-w-0 flex-1">
              <label htmlFor="home-compose" className="sr-only">
                What&apos;s happening?
              </label>
              <textarea
                id="home-compose"
                rows={2}
                placeholder="What's happening?"
                className="w-full resize-none border-0 bg-transparent text-[18px] text-neutral-900 placeholder:text-[#536471] focus:outline-none focus:ring-0 sm:text-[20px]"
              />
              <div className="mt-3 flex items-center justify-between border-t border-[#eff3f4] pt-3">
                <div className="flex items-center gap-0.5 text-[#1d9bf0]">
                  <button
                    type="button"
                    className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
                    aria-label="Add image"
                  >
                    <IoImageOutline className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
                    aria-label="GIF"
                  >
                    <MdOutlineGifBox className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
                    aria-label="Poll"
                  >
                    <IoStatsChartOutline className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
                    aria-label="Emoji"
                  >
                    <TbMoodSmile className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
                    aria-label="Schedule"
                  >
                    <TbCalendarTime className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full p-2 transition-colors hover:bg-[#1d9bf0]/10"
                    aria-label="Location"
                  >
                    <IoLocationOutline className="h-5 w-5" />
                  </button>
                </div>
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-neutral-500 px-4 py-1.5 text-[15px] font-bold text-white opacity-60"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[#eff3f4] py-3 text-center">
          <a href="#" className="text-[15px] text-[#1d9bf0] hover:underline">
            Show {newPostsCount} posts
          </a>
        </div>

        {initialPosts.map((post) => (
          <PostCard key={post.id} post={post} formatDate={formatPostDate} formatViews={formatPostViews} />
        ))}
      </div>
    </section>
  );
}
