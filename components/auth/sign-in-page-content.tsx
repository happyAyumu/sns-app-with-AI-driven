"use client";

import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { SignedIn, SignedOut } from "@/components/auth/clerk-auth-gates";

export function SignInPageContent() {
  return (
    <>
      <ClerkLoading>
        <div className="flex min-h-[min(60vh,480px)] items-center justify-center text-[15px] text-[#536471]">
          読み込み中…
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" fallbackRedirectUrl="/" />
        </SignedOut>
        <SignedIn>
          <div className="rounded-2xl border border-[#eff3f4] bg-white p-6 text-center">
            <p className="text-[15px] text-neutral-700">すでにログインしています。</p>
            <Link
              href="/"
              className="mt-4 inline-flex rounded-full bg-[#1d9bf0] px-5 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#1a8cd8]"
            >
              ホームへ戻る
            </Link>
          </div>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
}
