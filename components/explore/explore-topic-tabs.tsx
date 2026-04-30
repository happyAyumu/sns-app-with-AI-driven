const tabs = ["For You", "Trending", "News", "Sports", "Entertainment"];

export function ExploreTopicTabs() {
  return (
    <nav className="border-b border-[#eff3f4]" aria-label="Explore tabs">
      <div className="flex overflow-x-auto">
        {tabs.map((tab, index) => (
          <a
            key={tab}
            href="#"
            className={`relative shrink-0 px-5 py-3 text-[14px] transition-colors hover:bg-black/[0.04] ${
              index === 0 ? "font-bold text-neutral-900" : "font-medium text-[#536471]"
            }`}
          >
            {tab}
            {index === 0 ? (
              <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1d9bf0]" />
            ) : null}
          </a>
        ))}
      </div>
    </nav>
  );
}
