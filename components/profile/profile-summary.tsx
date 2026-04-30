import Link from "next/link";
import { IoCalendarOutline, IoChevronForward, IoGlobeOutline, IoLinkOutline } from "react-icons/io5";

interface ProfileSummaryProps {
  displayName: string;
  handle: string;
  bio: string;
  websiteLabel: string;
  websiteHref: string;
  joinedLabel: string;
  followingCount: number;
  followersCount: number;
}

export function ProfileSummary({
  displayName,
  handle,
  bio,
  websiteLabel,
  websiteHref,
  joinedLabel,
  followingCount,
  followersCount,
}: ProfileSummaryProps) {
  return (
    <div className="relative border-b border-[#eff3f4] px-4 pb-4">
      <div className="absolute -top-[68px] left-4">
        <div className="flex h-[134px] w-[134px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-neutral-200 shadow-sm">
          <span className="text-5xl" aria-hidden>
            🙂
          </span>
        </div>
      </div>
      <div className="flex justify-end pt-3">
        <button
          type="button"
          className="rounded-full border border-neutral-900 bg-white px-4 py-1.5 text-[15px] font-bold text-neutral-900 transition-colors hover:bg-black/[0.04]"
        >
          Edit profile
        </button>
      </div>
      <div className="mt-7 space-y-3">
        <div>
          <p className="text-[20px] font-bold leading-7 text-neutral-900">{displayName}</p>
          <p className="text-[15px] text-[#536471]">{handle}</p>
        </div>
        <button type="button" className="flex items-center gap-1 text-[15px] text-[#1d9bf0] hover:underline">
          <IoGlobeOutline className="h-4 w-4" aria-hidden />
          Show translation
        </button>
        <p className="whitespace-pre-line text-[15px] leading-6 text-neutral-900">{bio}</p>
        <div className="flex flex-col gap-2 text-[15px]">
          <Link href={websiteHref} className="inline-flex items-center gap-1 text-[#1d9bf0] hover:underline">
            <IoLinkOutline className="h-[18px] w-[18px] shrink-0" aria-hidden />
            {websiteLabel}
          </Link>
          <button
            type="button"
            className="inline-flex w-fit items-center gap-1 text-[#536471] transition-colors hover:text-neutral-900"
          >
            <IoCalendarOutline className="h-[18px] w-[18px] shrink-0" aria-hidden />
            <span>{joinedLabel}</span>
            <IoChevronForward className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <p className="text-[15px]">
          <span className="font-bold text-neutral-900">{followingCount}</span>
          <span className="text-[#536471]"> Following</span>
          <span className="mx-3" />
          <span className="font-bold text-neutral-900">{followersCount.toLocaleString("en-US")}</span>
          <span className="text-[#536471]"> Followers</span>
        </p>
      </div>
    </div>
  );
}
