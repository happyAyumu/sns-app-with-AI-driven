import RightSidebar from "./right-sidebar";

interface MainWithRightSidebarProps {
  children: React.ReactNode;
}

/**
 * lg 以上: main と右サイドバーをひとつの縦スクロール領域にし、スクロールバーは右端（サイドバー側）に寄せる。
 * 未満: main のみが flex-1 になり、子（タイムライン等）の内部スクロールを使う。
 */
export function MainWithRightSidebar({ children }: MainWithRightSidebarProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:flex-row lg:items-start lg:overflow-y-auto lg:overscroll-y-contain">
      <main className="relative flex min-h-0 w-full min-w-0 max-w-[600px] flex-1 flex-col overflow-hidden border-x border-[#eff3f4] max-sm:border-x-0 lg:w-[600px] lg:max-w-[600px] lg:shrink-0 lg:flex-none lg:overflow-visible">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
}
