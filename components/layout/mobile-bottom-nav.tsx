"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHome, IoMailOutline, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { TbSparkles } from "react-icons/tb";

interface NavItem {
  id: string;
  href: string;
  ariaLabel: string;
  match: (path: string) => boolean;
  icon: (active: boolean) => ReactNode;
}

const items: NavItem[] = [
  {
    id: "home",
    href: "/",
    ariaLabel: "Home",
    match: (p) => p === "/",
    icon: (active) => (
      <IoHome className={`h-[26px] w-[26px] ${active ? "text-neutral-900" : "text-neutral-500"}`} aria-hidden />
    ),
  },
  {
    id: "explore",
    href: "/explore",
    ariaLabel: "Explore",
    match: (p) => p === "/explore" || p.startsWith("/explore/"),
    icon: (active) => (
      <IoSearchOutline className={`h-[26px] w-[26px] ${active ? "text-neutral-900" : "text-neutral-500"}`} aria-hidden />
    ),
  },
  {
    id: "grok",
    href: "#",
    ariaLabel: "Grok",
    match: () => false,
    icon: () => <TbSparkles className="h-[26px] w-[26px] text-neutral-500" aria-hidden />,
  },
  {
    id: "notifications",
    href: "#",
    ariaLabel: "Notifications",
    match: () => false,
    icon: () => <IoNotificationsOutline className="h-[26px] w-[26px] text-neutral-500" aria-hidden />,
  },
  {
    id: "messages",
    href: "#",
    ariaLabel: "Messages",
    match: () => false,
    icon: () => <IoMailOutline className="h-[26px] w-[26px] text-neutral-500" aria-hidden />,
  },
];

function isInternal(href: string): boolean {
  return href.startsWith("/");
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex justify-around border-t border-[#eff3f4] bg-white/95 pb-[max(10px,env(safe-area-inset-bottom,0px))] pt-2 backdrop-blur-md sm:hidden"
      aria-label="メイン"
    >
      {items.map((item) => {
        const active = item.match(pathname);
        const className = `flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center rounded-full transition-colors hover:bg-black/[0.06] ${
          active ? "text-neutral-900" : "text-neutral-500"
        }`;

        if (isInternal(item.href)) {
          return (
            <Link key={item.id} href={item.href} aria-label={item.ariaLabel} className={className}>
              {item.icon(active)}
            </Link>
          );
        }

        return (
          <a key={item.id} href={item.href} aria-label={item.ariaLabel} className={className}>
            {item.icon(active)}
          </a>
        );
      })}
    </nav>
  );
}
