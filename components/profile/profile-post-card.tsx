import Link from "next/link";
import type { ProfileTimelineItem } from "../../lib/profile-timeline-mock";

interface ProfilePostCardProps {
  item: ProfileTimelineItem;
  formatDate: (iso: string) => string;
  displayName?: string;
  handle?: string;
}

export function ProfilePostCard({
  item,
  formatDate,
  displayName = "ハッピー|0円ワーホリ実現",
  handle = "hapihapiEnglish",
}: ProfilePostCardProps) {
  return (
    <article className="border-b border-[#eff3f4] px-4 py-3 transition-colors hover:bg-black/[0.02]">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-100 text-lg">
          🙂
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/posts/${item.id}`} className="block">
            <div className="flex flex-wrap items-baseline gap-x-1 text-[15px]">
              <span className="font-bold text-neutral-900">{displayName}</span>
              <span className="text-[#536471]">@{handle}</span>
              <span className="text-[#536471]">·</span>
              <time className="text-[#536471]" dateTime={item.created_at}>
                {formatDate(item.created_at)}
              </time>
            </div>
            <p className="mt-1 whitespace-pre-line text-[15px] leading-5 text-neutral-900">{item.body}</p>
          </Link>

          {item.quote ? (
            <div className="mt-3 overflow-hidden rounded-2xl border border-[#eff3f4] bg-[#f7f9f9] p-3">
              <div className="flex flex-wrap items-baseline gap-x-1 text-[14px]">
                <span className="font-bold text-neutral-900">{item.quote.author}</span>
                <span className="text-[#536471]">@{item.quote.handle}</span>
              </div>
              <p className="mt-1 text-[15px] leading-5 text-neutral-900">{item.quote.text}</p>
            </div>
          ) : null}

          {item.hasImage ? (
            <div className="mt-3 overflow-hidden rounded-2xl border border-black/5">
              <div className="aspect-[16/10] w-full bg-gradient-to-br from-sky-200 via-sky-400 to-indigo-600" />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
