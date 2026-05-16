"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface EditProfileModalProps {
  title?: string;
  children: ReactNode;
}

export function EditProfileModal({ title = "プロフィールを編集", children }: EditProfileModalProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-black/50 p-4">
      <button
        type="button"
        aria-label="モーダルを閉じる"
        className="fixed inset-0"
        onClick={() => router.back()}
      />
      <div className="relative z-[1] mx-auto flex min-h-full w-full max-w-[600px] items-center justify-center py-2">
        <div className="max-h-[min(90dvh,calc(100dvh-2rem))] w-full overflow-y-auto overscroll-y-contain rounded-2xl bg-white shadow-xl">
          <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-[#eff3f4] bg-white px-5 py-4">
            <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-neutral-700 transition hover:bg-black/[0.06]"
            >
              閉じる
            </button>
          </div>
          <div className="px-5 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
