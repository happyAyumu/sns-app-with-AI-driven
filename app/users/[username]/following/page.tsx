import type { Metadata } from "next";
import LeftSidebar from "@/components/layout/left-sidebar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { MainWithRightSidebar } from "@/components/layout/main-with-right-sidebar";
import { FollowingListView } from "@/components/profile/following-list-view";

interface FollowingPageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: FollowingPageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} がフォロー中 | X Clone`,
    description: `${username} のフォロー一覧`,
  };
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const { username } = await params;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white text-neutral-900">
      <div className="mx-auto flex min-h-0 w-full max-w-[1265px] flex-1 justify-center">
        <LeftSidebar />
        <MainWithRightSidebar>
          <FollowingListView username={username} />
        </MainWithRightSidebar>
      </div>
      <MobileBottomNav />
    </div>
  );
}
