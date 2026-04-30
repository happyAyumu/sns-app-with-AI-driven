import { IoSearchOutline, IoSettingsOutline } from "react-icons/io5";

export function ExploreSearchHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#eff3f4] bg-white/90 px-3 py-2 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <IoSearchOutline
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#536471]"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border-0 bg-[#eff3f4] py-2.5 pl-11 pr-4 text-[14px] text-neutral-900 outline-none placeholder:text-[#536471] focus:bg-white focus:ring-2 focus:ring-[#1d9bf0]"
          />
        </div>
        <button
          type="button"
          aria-label="Settings"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#eff3f4] text-neutral-900 transition-colors hover:bg-black/[0.05]"
        >
          <IoSettingsOutline className="h-[18px] w-[18px]" />
        </button>
      </div>
    </header>
  );
}
