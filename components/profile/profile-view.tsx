import { profileTimelineMock } from "../../lib/profile-timeline-mock";
import { ProfileHeroBanner } from "./profile-hero-banner";
import { ProfilePostCard } from "./profile-post-card";
import { ProfileSummary } from "./profile-summary";
import { ProfileTabs } from "./profile-tabs";
import { ProfileTopBar } from "./profile-top-bar";

const displayName = "ハッピー|0円ワーホリ実現";
const handle = "@hapihapiEnglish";
const bio =
  "ワーホリ・英語学習のことについて呟きます。高校時代は英語が苦手→何もない自分を変えたくて英語を始める→約1年でTOEIC800点を獲得→ワーホリを決意するがお金がなく諦めかける→情報を集め再現性のある0円ワーホリを達成。0円ワーホリしたい方はDMください";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export function ProfileView() {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ProfileTopBar displayName={displayName} postCountLabel="161 posts" />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0">
        <ProfileHeroBanner />
        <ProfileSummary
          displayName={displayName}
          handle={handle}
          bio={bio}
          websiteLabel="hapihapi-blog.com"
          websiteHref="https://hapihapi-blog.com"
          joinedLabel="Joined August 2021"
          followingCount={120}
          followersCount={15400}
        />
        <ProfileTabs />
        {profileTimelineMock.map((item) => (
          <ProfilePostCard key={item.id} item={item} formatDate={formatDate} />
        ))}
      </div>
    </section>
  );
}
