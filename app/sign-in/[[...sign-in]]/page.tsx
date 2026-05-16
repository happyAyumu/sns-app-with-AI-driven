import type { Metadata } from "next";
import { SignInPageContent } from "@/components/auth/sign-in-page-content";

export const metadata: Metadata = {
  title: "ログイン | X Clone",
  description: "アカウントにログイン",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto bg-neutral-50 px-4 py-8">
      <SignInPageContent />
    </div>
  );
}
