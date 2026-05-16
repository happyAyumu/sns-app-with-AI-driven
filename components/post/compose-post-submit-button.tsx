"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { useFormStatus } from "react-dom";

const postButtonClass =
  "rounded-full px-4 py-1.5 text-[15px] font-bold text-white transition-colors";

function AuthenticatedSubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${postButtonClass} ${pending ? "cursor-wait bg-[#1d9bf0]/70" : "bg-[#1d9bf0] hover:bg-[#1a8cd8]"}`}
    >
      {label}
    </button>
  );
}

interface ComposePostSubmitButtonProps {
  /** 例: "Post" / "Reply" */
  submitLabel: string;
}

export function ComposePostSubmitButton({ submitLabel }: ComposePostSubmitButtonProps) {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return (
      <button
        type="button"
        disabled
        className={`${postButtonClass} cursor-wait bg-[#1d9bf0]/60 opacity-80`}
        aria-busy="true"
      >
        {submitLabel}
      </button>
    );
  }

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <button type="button" className={`${postButtonClass} bg-[#1d9bf0] hover:bg-[#1a8cd8]`}>
          {submitLabel}
        </button>
      </SignInButton>
    );
  }

  return <AuthenticatedSubmitButton label={submitLabel} />;
}
