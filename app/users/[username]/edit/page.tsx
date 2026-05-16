import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { fetchUserProfileByUsername } from "@/lib/dal/social";

interface EditProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: EditProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username}を編集 | X Clone`,
    description: "プロフィール編集",
  };
}

export default async function EditProfilePage({ params }: EditProfilePageProps) {
  const { username } = await params;
  const profile = await fetchUserProfileByUsername(username);
  if (!profile) notFound();

  const viewer = await currentUser();
  if (!viewer || viewer.username !== username) notFound();

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold text-neutral-900">プロフィール編集</h1>
      <div className="rounded-2xl border border-[#eff3f4] bg-white p-4">
        <EditProfileForm
          username={username}
          initialDisplayName={profile.displayName}
          initialBio={profile.editBio}
          initialAvatarUrl={profile.avatarUrl}
          initialHeaderUrl={profile.headerUrl}
        />
      </div>
    </main>
  );
}
