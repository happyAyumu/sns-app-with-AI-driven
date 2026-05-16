"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/update-profile";
import { updateProfileInitialState, type UpdateProfileState } from "@/lib/actions/update-profile-state";
import { ProfileImageField } from "./profile-image-field";

interface EditProfileFormProps {
  username: string;
  initialDisplayName: string;
  initialBio: string;
  initialAvatarUrl?: string | null;
  initialHeaderUrl?: string | null;
}

function getErrorMessage(state: UpdateProfileState): string | null {
  if (state.status !== "error") return null;
  return state.message;
}

export function EditProfileForm({
  username,
  initialDisplayName,
  initialBio,
  initialAvatarUrl,
  initialHeaderUrl,
}: EditProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, updateProfileInitialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status !== "success") return;
    router.refresh();
  }, [router, state.status]);

  const errorMessage = getErrorMessage(state);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="username" value={username} />

      <ProfileImageField
        name="header"
        label="カバー画像"
        currentUrl={initialHeaderUrl}
        previewVariant="header"
      />

      <ProfileImageField
        name="avatar"
        label="プロフィール画像"
        currentUrl={initialAvatarUrl}
        previewVariant="avatar"
      />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-neutral-700">表示名</span>
        <input
          name="display_name"
          required
          maxLength={50}
          defaultValue={initialDisplayName}
          className="rounded-xl border border-[#cfd9de] px-3 py-2 text-[15px] outline-none transition focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-neutral-700">自己紹介</span>
        <textarea
          name="bio"
          rows={5}
          maxLength={160}
          defaultValue={initialBio}
          className="resize-none rounded-xl border border-[#cfd9de] px-3 py-2 text-[15px] outline-none transition focus:border-[#1d9bf0] focus:ring-2 focus:ring-[#1d9bf0]/20"
        />
      </label>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

      {state.status === "success" ? <p className="text-sm text-emerald-600">プロフィールを更新しました</p> : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[#1d9bf0] px-5 py-2 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "保存中..." : "保存"}
        </button>
      </div>
    </form>
  );
}
