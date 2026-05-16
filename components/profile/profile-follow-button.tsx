"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toggleFollow } from "@/lib/actions/toggle-follow";

interface ProfileFollowButtonProps {
  targetUsername: string;
  initialFollowed: boolean;
  size?: "default" | "compact";
}

type FollowState = { followed: boolean };

export function ProfileFollowButton({
  targetUsername,
  initialFollowed,
  size = "default",
}: ProfileFollowButtonProps) {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [optimistic, addOptimistic] = useOptimistic<FollowState, void>(
    { followed: initialFollowed },
    (current) => ({ followed: !current.followed }),
  );

  const isCompact = size === "compact";
  const padding = isCompact ? "px-3 py-1" : "px-4 py-1.5";
  const textSize = isCompact ? "text-[13px]" : "text-[15px]";

  if (!isLoaded) {
    return (
      <span className={`rounded-full border border-[#cfd9de] ${padding} ${textSize} font-bold opacity-60`}>
        ...
      </span>
    );
  }

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <button
          type="button"
          className={`rounded-full border border-neutral-900 bg-white ${padding} ${textSize} font-bold text-neutral-900 transition-colors hover:bg-black/[0.04]`}
        >
          Follow
        </button>
      </SignInButton>
    );
  }

  const handleToggle = () => {
    startTransition(async () => {
      addOptimistic();
      const fd = new FormData();
      fd.set("target_username", targetUsername);
      await toggleFollow(fd);
      router.refresh();
    });
  };

  const label = optimistic.followed ? "Following" : "Follow";
  const className = optimistic.followed
    ? `rounded-full border border-[#cfd9de] bg-white ${padding} ${textSize} font-bold text-neutral-900 transition-colors hover:bg-black/[0.04]`
    : `rounded-full bg-neutral-900 ${padding} ${textSize} font-bold text-white transition-colors hover:opacity-90`;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`${className} shrink-0 disabled:opacity-70`}
    >
      {label}
    </button>
  );
}
