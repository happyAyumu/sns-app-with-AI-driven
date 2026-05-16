import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { fetchUserProfileByUsername } from "../../lib/dal/social";
import { prisma } from "../../lib/prisma";
import { ProfileHeroBanner } from "./profile-hero-banner";
import { ProfilePostCard } from "./profile-post-card";
import { ProfileSummary } from "./profile-summary";
import { ProfileTabs } from "./profile-tabs";
import { ProfileTopBar } from "./profile-top-bar";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

interface UserProfileViewProps {
  username: string;
}

export async function UserProfileView({ username }: UserProfileViewProps) {
  const user = await fetchUserProfileByUsername(username);

  if (!user) notFound();

  const { userId } = await auth();
  let isOwner = false;
  if (userId) {
    const viewer = await prisma.user.findUnique({
      where: { clerk_id: userId },
      select: { username: true },
    });
    isOwner = viewer?.username === user.handle;
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden lg:min-h-0 lg:flex-none lg:overflow-visible">
      <ProfileTopBar displayName={user.displayName} postCountLabel={`${user.postCount} posts`} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0 lg:flex-none lg:overflow-visible lg:pb-0">
        <ProfileHeroBanner headerUrl={user.headerUrl} />
        <ProfileSummary
          displayName={user.displayName}
          handle={`@${user.handle}`}
          avatarUrl={user.avatarUrl}
          bio={user.bio}
          websiteLabel="プロフィールリンク"
          websiteHref="#"
          joinedLabel={user.joinedLabel}
          followingCount={user.followingCount}
          followersCount={user.followersCount}
          editProfileHref={isOwner ? `/users/${user.handle}/edit` : undefined}
          followTargetUsername={!isOwner ? user.handle : undefined}
          followedByMe={user.followedByMe}
          profileUsername={user.handle}
        />
        <ProfileTabs />
        {user.timelineItems.map((item) => (
          <ProfilePostCard
            key={item.id}
            item={item}
            formatDate={formatDate}
            displayName={user.displayName}
            handle={user.handle}
            avatarUrl={user.avatarUrl}
          />
        ))}
      </div>
    </section>
  );
}
