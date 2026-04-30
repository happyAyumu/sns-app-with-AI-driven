import type { Metadata } from "next";
import LeftSidebar from "../../components/layout/left-sidebar";
import { MobileBottomNav } from "../../components/layout/mobile-bottom-nav";
import { ExploreMain } from "../../components/explore/explore-main";
import { ExploreRightSidebar } from "../../components/explore/explore-right-sidebar";

export const metadata: Metadata = {
  title: "Explore | X Clone",
  description: "Explore timeline mock page",
};

export default function ExplorePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-white text-neutral-900">
      <div className="mx-auto flex min-h-0 w-full max-w-[1265px] flex-1 justify-center">
        <LeftSidebar />
        <main className="w-full max-w-[600px] flex-1 border-x border-[#eff3f4] max-sm:border-x-0">
          <div className="pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
            <ExploreMain />
          </div>
        </main>
        <ExploreRightSidebar />
      </div>
      <MobileBottomNav />
    </div>
  );
}
