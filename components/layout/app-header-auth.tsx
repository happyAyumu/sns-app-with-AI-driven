"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function AppHeaderAuth() {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return <div className="h-10 w-[200px] shrink-0" aria-hidden />;
  }

  if (userId) {
    return <UserButton />;
  }

  return (
    <>
      <Link
        href="/sign-in"
        className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-black/[0.06] sm:text-base"
      >
        ログイン
      </Link>
      <Link
        href="/sign-up"
        className="flex h-10 cursor-pointer items-center rounded-full bg-[#1d9bf0] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1a8cd8] sm:h-11 sm:text-base"
      >
        新規登録
      </Link>
    </>
  );
}
