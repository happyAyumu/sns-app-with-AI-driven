import { MobileHomeHeader } from "../layout/mobile-home-header";
import type { Post } from "../../lib/supabase";
import type { ViewerProfile } from "@/lib/dal/social";
import { ComposeAvatar } from "@/components/user/compose-avatar";
import { PostCard } from "./post-card";
import { formatPostDate, formatPostViews } from "../../lib/formatters/post";
import { TimelineComposeForm } from "./timeline-compose-form";

interface TimelineFeedProps {
  initialPosts: Post[];
  viewer: ViewerProfile | null;
}

export default function TimelineFeed({ initialPosts, viewer }: TimelineFeedProps) {
  const newPostsCount = Math.min(35, initialPosts.length + 12);

  return (
    <section className="flex min-h-0 flex-col">
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

      <div>
        <div className="border-b border-[#eff3f4] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex gap-2.5 sm:gap-3">
            <ComposeAvatar viewer={viewer} className="h-11 w-11 sm:h-10 sm:w-10" />
            <TimelineComposeForm />
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
