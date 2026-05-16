import Link from "next/link";
import { IoArrowBack, IoBanOutline, IoSearchOutline } from "react-icons/io5";

interface ProfileTopBarProps {
  displayName: string;
  postCountLabel: string;
  backHref?: string;
}

export function ProfileTopBar({ displayName, postCountLabel, backHref = "/" }: ProfileTopBarProps) {
  return (
    <header className="z-30 flex shrink-0 items-center justify-between gap-3 border-b border-[#eff3f4] bg-white/95 px-3 py-2 backdrop-blur-md">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Link
          href={backHref}
          className="-ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/[0.08]"
          aria-label="戻る"
        >
          <IoArrowBack className="h-5 w-5 text-neutral-900" />
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-[20px] font-bold leading-6 text-neutral-900">{displayName}</h1>
          <p className="text-[13px] text-[#536471]">{postCountLabel}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/[0.06]"
          aria-label="通知オフ"
        >
          <IoBanOutline className="h-5 w-5 text-neutral-900" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/[0.06]"
          aria-label="検索"
        >
          <IoSearchOutline className="h-5 w-5 text-neutral-900" />
        </button>
      </div>
    </header>
  );
}
