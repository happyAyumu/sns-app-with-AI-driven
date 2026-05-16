import type { ReactNode } from "react";
import LeftSidebar from "./left-sidebar";
import { MobileBottomNav } from "./mobile-bottom-nav";

interface AppThreeColumnLayoutProps {
  /** 中央カラムのコンテンツ（スクロールは親ラッパーが担当） */
  mainChildren: ReactNode;
  /** 右カラム（`RightSidebar` / `ExploreRightSidebar` など） */
  rightSidebar: ReactNode;
}

/**
 * 左サイドバー固定 +「中央 + 右」をひとつの縦スクロール領域にまとめる。
 * スクロールバーは右カラム寄りに出し、中央・右が同時に上下する（Explore / ホーム共通）。
 */
export function AppThreeColumnLayout({ mainChildren, rightSidebar }: AppThreeColumnLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white text-neutral-900">
      <div className="mx-auto flex min-h-0 w-full max-w-[1265px] flex-1 justify-center">
        <LeftSidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-row items-start overflow-y-auto overscroll-y-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
          <main className="relative flex min-h-0 w-full min-w-0 max-w-[600px] flex-1 flex-col border-x border-[#eff3f4] max-sm:border-x-0 lg:w-[600px] lg:max-w-[600px] lg:shrink-0 lg:flex-none">
            {mainChildren}
          </main>
          {rightSidebar}
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
