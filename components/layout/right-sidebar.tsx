import { IoSearchOutline } from "react-icons/io5";

export default function RightSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[350px] shrink-0 overflow-y-auto py-2 pl-4 pr-6 lg:block">
      <div className="flex w-full max-w-[350px] flex-col gap-3">
        <div className="relative">
          <IoSearchOutline
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#536471]"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border-0 bg-[#eff3f4] py-3 pl-12 pr-4 text-[15px] text-neutral-900 outline-none placeholder:text-[#536471] focus:bg-white focus:ring-2 focus:ring-[#1d9bf0]"
          />
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#eff3f4]">
          <div className="flex items-start gap-2 px-4 pb-1 pt-3">
            <h2 className="text-[20px] font-extrabold leading-6 text-neutral-900">Subscribe to Premium</h2>
            <span className="shrink-0 rounded bg-emerald-500/15 px-2 py-0.5 text-[13px] font-bold text-emerald-700">
              50% off
            </span>
          </div>
          <p className="px-4 pb-3 text-[15px] leading-5 text-[#536471]">
            Subscribe to unlock new features and if eligible, receive a share of revenue.
          </p>
          <div className="px-4 pb-4">
            <button
              type="button"
              className="rounded-full bg-[#1d9bf0] px-5 py-2 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#eff3f4]">
          <h2 className="px-4 pb-1 pt-3 text-[20px] font-extrabold leading-6 text-neutral-900">Today&apos;s News</h2>
          <ul>
            {[
              {
                meta: "1 day ago · News",
                title: "Global markets react to latest policy updates",
                posts: "758.6K posts",
                hasThumb: true,
              },
              {
                meta: "2 days ago · Technology",
                title: "Developers share tips for faster UI iteration",
                posts: "124K posts",
                hasThumb: false,
              },
              {
                meta: "Trending in United States",
                title: "Weekend highlights across major cities",
                posts: "89.2K posts",
                hasThumb: true,
              },
            ].map((item) => (
              <li key={item.title}>
                <a
                  href="#"
                  className="flex gap-3 px-4 py-3 transition-colors hover:bg-black/[0.03]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-[#536471]">{item.meta}</p>
                    <p className="mt-0.5 text-[15px] font-bold leading-5 text-neutral-900">{item.title}</p>
                    <p className="mt-0.5 text-[13px] text-[#536471]">{item.posts}</p>
                  </div>
                  {item.hasThumb ? (
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-slate-200 to-slate-400" />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="block px-4 py-3 text-[15px] font-normal text-[#1d9bf0] hover:bg-black/[0.03]"
          >
            Show more
          </a>
        </section>

        <footer className="flex flex-wrap gap-x-3 gap-y-1 px-2 text-[13px] text-[#536471]">
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Cookie Policy
          </a>
          <span>© 2026 X Corp.</span>
        </footer>
      </div>
    </aside>
  );
}
