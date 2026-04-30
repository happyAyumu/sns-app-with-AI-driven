import Link from "next/link";

const tabs = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

export function ProfileTabs() {
  return (
    <nav className="flex shrink-0 border-b border-[#eff3f4]" aria-label="Profile tabs">
      {tabs.map((tab, i) => (
        <Link
          key={tab}
          href="#"
          className={`relative min-w-0 flex-1 py-3 text-center text-[14px] transition-colors hover:bg-black/[0.04] ${
            i === 0 ? "font-bold text-neutral-900" : "font-medium text-[#536471]"
          }`}
        >
          {tab}
          {i === 0 ? (
            <span className="absolute bottom-0 left-1/2 h-1 w-12 max-w-[70%] -translate-x-1/2 rounded-full bg-[#1d9bf0]" />
          ) : null}
        </Link>
      ))}
    </nav>
  );
}
