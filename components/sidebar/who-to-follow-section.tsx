import Link from "next/link";
import { ProfileFollowButton } from "@/components/profile/profile-follow-button";
import { fetchWhoToFollowSuggestions } from "@/lib/dal/social";

export async function WhoToFollowSection() {
  const users = await fetchWhoToFollowSuggestions(3);
  if (users.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-[#eff3f4]">
      <h2 className="px-4 pb-1 pt-3 text-[20px] font-extrabold leading-6 text-neutral-900">Who to follow</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username} className="flex items-center gap-3 px-4 py-3 hover:bg-black/[0.03]">
            <Link
              href={`/users/${user.username}`}
              className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-amber-300"
              aria-label={`${user.displayName}のプロフィール`}
            />
            <div className="min-w-0 flex-1">
              <Link href={`/users/${user.username}`} className="block min-w-0">
                <p className="truncate text-[15px] font-bold text-neutral-900">{user.displayName}</p>
                <p className="truncate text-[13px] text-[#536471]">@{user.username}</p>
              </Link>
            </div>
            <ProfileFollowButton
              key={`${user.username}-${user.followedByMe}`}
              targetUsername={user.username}
              initialFollowed={user.followedByMe}
              size="compact"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
