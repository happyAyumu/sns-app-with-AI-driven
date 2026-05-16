import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchFollowingListByUsername } from "@/lib/dal/social";
import { UserAvatar } from "@/components/user/user-avatar";
import { ProfileTopBar } from "./profile-top-bar";

interface FollowingListViewProps {
  username: string;
}

export async function FollowingListView({ username }: FollowingListViewProps) {
  const data = await fetchFollowingListByUsername(username);
  if (!data) notFound();

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden lg:min-h-0 lg:flex-none lg:overflow-visible">
      <ProfileTopBar
        displayName={data.ownerDisplayName}
        postCountLabel="Following"
        backHref={`/users/${data.ownerUsername}`}
      />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:pb-0 lg:flex-none lg:overflow-visible lg:pb-0">
        {data.following.length === 0 ? (
          <p className="px-4 py-8 text-center text-[15px] text-[#536471]">まだ誰もフォローしていません。</p>
        ) : (
          <ul>
            {data.following.map((user) => (
              <li key={user.username} className="border-b border-[#eff3f4]">
                <Link
                  href={`/users/${user.username}`}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-black/[0.02]"
                >
                  <UserAvatar
                    src={user.avatarUrl}
                    name={user.displayName}
                    className="h-12 w-12"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-bold text-neutral-900">{user.displayName}</p>
                    <p className="truncate text-[15px] text-[#536471]">@{user.username}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
