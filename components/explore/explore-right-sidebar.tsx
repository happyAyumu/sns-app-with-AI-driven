import { Suspense } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { WhoToFollowSection } from "../sidebar/who-to-follow-section";

interface RightNewsItem {
  title: string;
  meta: string;
  posts: string;
}

const rightNews: RightNewsItem[] = [
  {
    title: "Body Found in Search for Missing Boy Yuki Adachi",
    meta: "1 day ago · News",
    posts: "42.9K posts",
  },
  {
    title: "Trump Orders Naval Blockade of Iranian Ports After Failed Talks",
    meta: "2 days ago · News",
    posts: "447.8K posts",
  },
  {
    title: "Péter Magyar's Tisza Party Wins Supermajority",
    meta: "2 days ago · News",
    posts: "1.4M posts",
  },
];

export function ExploreRightSidebar() {
  return (
    <aside className="hidden min-h-0 w-[350px] shrink-0 overflow-hidden py-2 pl-4 pr-6 lg:block lg:self-start">
      <div className="flex w-full max-w-[350px] flex-col gap-3">
        <section className="overflow-hidden rounded-2xl border border-[#eff3f4]">
          <div className="flex items-center justify-between px-4 pb-1 pt-3">
            <h2 className="text-[22px] font-black leading-none text-neutral-900">Today&apos;s News</h2>
            <button type="button" className="rounded-full p-1 hover:bg-black/[0.05]" aria-label="Close">
              <IoCloseOutline className="h-5 w-5 text-neutral-900" />
            </button>
          </div>
          <ul>
            {rightNews.map((item) => (
              <li key={item.title} className="px-4 py-3 hover:bg-black/[0.03]">
                <p className="text-[18px] font-black leading-tight text-neutral-900">{item.title}</p>
                <p className="mt-1 text-[13px] text-[#536471]">
                  {item.meta} · {item.posts}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <Suspense fallback={null}>
          <WhoToFollowSection />
        </Suspense>
      </div>
    </aside>
  );
}
