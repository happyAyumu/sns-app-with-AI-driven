import Link from "next/link";

interface UserAvatarProps {
  src?: string | null;
  name: string;
  href?: string;
  className?: string;
  fallbackClassName?: string;
}

function AvatarVisual({
  src,
  name,
  className,
  fallbackClassName = "text-sm font-bold",
}: {
  src?: string | null;
  name: string;
  className: string;
  fallbackClassName?: string;
}) {
  const initial = name.trim().slice(0, 1).toUpperCase() || "?";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- 外部アバターURL（pravatar / Clerk 等）
      <img src={src} alt="" className={`${className} rounded-full object-cover`} />
    );
  }

  return (
    <span
      className={`${className} flex items-center justify-center rounded-full bg-sky-100 text-neutral-800 ${fallbackClassName}`}
      aria-hidden
    >
      {initial}
    </span>
  );
}

export function UserAvatar({
  src,
  name,
  href,
  className = "h-10 w-10",
  fallbackClassName,
}: UserAvatarProps) {
  const visual = (
    <AvatarVisual src={src} name={name} className={className} fallbackClassName={fallbackClassName} />
  );

  if (href) {
    return (
      <Link href={href} className="shrink-0 transition-opacity hover:opacity-80" aria-label={`${name}のプロフィール`}>
        {visual}
      </Link>
    );
  }

  return <div className="shrink-0">{visual}</div>;
}
