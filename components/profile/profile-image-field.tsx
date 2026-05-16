"use client";

import { useEffect, useId, useState } from "react";

interface ProfileImageFieldProps {
  name: string;
  label: string;
  currentUrl?: string | null;
  accept?: string;
  previewVariant: "header" | "avatar";
}

export function ProfileImageField({
  name,
  label,
  currentUrl,
  accept = "image/jpeg,image/png,image/webp,image/gif",
  previewVariant,
}: ProfileImageFieldProps) {
  const inputId = useId();
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl ?? null);

  useEffect(() => {
    setPreviewUrl(currentUrl ?? null);
  }, [currentUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setPreviewUrl(currentUrl ?? null);
      return;
    }
    setPreviewUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  const isHeader = previewVariant === "header";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-neutral-700">{label}</span>
      <div
        className={
          isHeader
            ? "relative h-[120px] w-full overflow-hidden rounded-xl border border-[#cfd9de] bg-gradient-to-b from-sky-400 via-sky-500 to-sky-700"
            : "relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-[#cfd9de] bg-neutral-200"
        }
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- ローカル blob / 外部 Storage URL
          <img
            src={previewUrl}
            alt=""
            className={isHeader ? "h-full w-full object-cover" : "h-full w-full rounded-full object-cover"}
          />
        ) : isHeader ? (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-500 to-sky-700" aria-hidden />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm text-neutral-500">未設定</span>
        )}
      </div>
      <input id={inputId} name={name} type="file" accept={accept} className="sr-only" onChange={handleChange} />
      <label
        htmlFor={inputId}
        className="inline-flex w-fit cursor-pointer rounded-full border border-[#cfd9de] px-4 py-1.5 text-sm font-semibold text-neutral-800 transition hover:bg-black/[0.04]"
      >
        画像を選ぶ
      </label>
    </div>
  );
}
