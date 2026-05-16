"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import type { ReactNode } from "react";

interface LeftSidebarProfileEntryProps {
  href: string;
  ariaLabel: string;
  className: string;
  iconShell: ReactNode;
}

export function LeftSidebarProfileEntry({ href, ariaLabel, className, iconShell }: LeftSidebarProfileEntryProps) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className={`${className} cursor-default opacity-40`} aria-hidden>
        {iconShell}
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <Link href={href} aria-label={ariaLabel} className={className}>
        {iconShell}
      </Link>
    );
  }

  return (
    <SignInButton mode="modal">
      <button type="button" aria-label={`${ariaLabel}（ログインが必要です）`} className={className}>
        {iconShell}
      </button>
    </SignInButton>
  );
}
