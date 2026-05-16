"use client";

import { useAuth } from "@clerk/nextjs";
import type { ReactNode } from "react";

/**
 * Clerk v7 の `@clerk/nextjs` からは `SignedIn` / `SignedOut` が直接 export されないため、
 * `useAuth` 相当のゲートをプロジェクト内で提供する。
 */
interface AuthGateProps {
  children: ReactNode;
}

export function SignedOut({ children }: AuthGateProps) {
  const { isLoaded, isSignedIn } = useAuth();
  // Do not hide while Clerk is still loading — both gates used to return null and wiped the UI.
  if (isLoaded && isSignedIn) return null;
  return <>{children}</>;
}

export function SignedIn({ children }: AuthGateProps) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return null;
  if (!isSignedIn) return null;
  return <>{children}</>;
}
