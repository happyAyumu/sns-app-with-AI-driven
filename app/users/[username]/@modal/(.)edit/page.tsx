import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { EditProfileModal } from "@/components/profile/edit-profile-modal";
import { fetchUserProfileByUsername } from "@/lib/dal/social";

interface EditProfileModalPageProps {
  params: Promise<{ username: string }>;
}

export default async function EditProfileModalPage({ params }: EditProfileModalPageProps) {
  const { username } = await params;
  const profile = await fetchUserProfileByUsername(username);
  if (!profile) notFound();

  const viewer = await currentUser();
  if (!viewer || viewer.username !== username) notFound();

  return (
    <EditProfileModal>
      <EditProfileForm
        username={username}
        initialDisplayName={profile.displayName}
        initialBio={profile.editBio}
        initialAvatarUrl={profile.avatarUrl}
        initialHeaderUrl={profile.headerUrl}
      />
    </EditProfileModal>
  );
}
