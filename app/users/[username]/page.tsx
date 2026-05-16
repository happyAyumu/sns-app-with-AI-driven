import type { Metadata } from "next";
import LeftSidebar from "../../../components/layout/left-sidebar";
import { MobileBottomNav } from "../../../components/layout/mobile-bottom-nav";
import { MainWithRightSidebar } from "../../../components/layout/main-with-right-sidebar";
import { UserProfileView } from "../../../components/profile/user-profile-view";

interface UserPageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} | X Clone`,
    description: `${username}のプロフィール`,
  };
}

export default async function UserProfilePage({ params }: UserPageProps) {
  const { username } = await params;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white text-neutral-900">
      <div className="mx-auto flex min-h-0 w-full max-w-[1265px] flex-1 justify-center">
        <LeftSidebar />
        <MainWithRightSidebar>
          <UserProfileView username={username} />
        </MainWithRightSidebar>
      </div>
      <MobileBottomNav />
    </div>
  );
}
