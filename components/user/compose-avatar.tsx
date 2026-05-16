"use client";

import { useUser } from "@clerk/nextjs";
import { UserAvatar } from "@/components/user/user-avatar";
import type { ViewerProfile } from "@/lib/dal/social";

interface ComposeAvatarProps {
  viewer: ViewerProfile | null;
  className?: string;
  /** `null` のときリンクなし（ボタン内など） */
  href?: string | null;
}

export function ComposeAvatar({ viewer, className = "h-10 w-10", href }: ComposeAvatarProps) {
  const { user } = useUser();

  const src = viewer?.avatar_url ?? user?.imageUrl ?? null;
  const name = viewer?.display_name ?? user?.fullName ?? user?.username ?? "You";
  const profileHref =
    href === null
      ? undefined
      : (href ??
        (viewer?.username
          ? `/users/${viewer.username}`
          : user?.username
            ? `/users/${user.username}`
            : "/profile"));

  return <UserAvatar src={src} name={name} href={profileHref} className={className} />;
}
