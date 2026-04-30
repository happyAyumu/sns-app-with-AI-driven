import { notFound } from "next/navigation";
import { fetchUserProfileByUsername } from "../../lib/dal/social";
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

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ProfileTopBar displayName={user.displayName} postCountLabel={`${user.postCount} posts`} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
        <ProfileHeroBanner />
        <ProfileSummary
          displayName={user.displayName}
          handle={`@${user.handle}`}
          bio={user.bio}
          websiteLabel="プロフィールリンク"
          websiteHref="#"
          joinedLabel={user.joinedLabel}
          followingCount={user.followingCount}
          followersCount={user.followersCount}
        />
        <ProfileTabs />
        {user.timelineItems.map((item) => (
          <ProfilePostCard
            key={item.id}
            item={item}
            formatDate={formatDate}
            displayName={user.displayName}
            handle={user.handle}
          />
        ))}
      </div>
    </section>
  );
}
