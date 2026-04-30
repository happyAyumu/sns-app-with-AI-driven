import type { Metadata } from "next";
import LeftSidebar from "../../components/layout/left-sidebar";
import { MobileBottomNav } from "../../components/layout/mobile-bottom-nav";
import RightSidebar from "../../components/layout/right-sidebar";
import { ProfileView } from "../../components/profile/profile-view";

export const metadata: Metadata = {
  title: "プロフィール | X Clone",
  description: "ユーザープロフィール",
};

export default function ProfilePage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white text-neutral-900">
      <div className="mx-auto flex min-h-0 w-full max-w-[1265px] flex-1 justify-center">
        <LeftSidebar />
        <main className="flex min-h-0 w-full max-w-[600px] flex-1 flex-col overflow-hidden border-x border-[#eff3f4] max-sm:border-x-0">
          <ProfileView />
        </main>
        <RightSidebar />
      </div>
      <MobileBottomNav />
    </div>
  );
}
