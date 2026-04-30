import type { ReactNode } from "react";
import {
  IoEllipsisVertical,
  IoHome,
  IoMailOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { TbSparkles } from "react-icons/tb";

export interface SidebarNavItem {
  id: string;
  icon: ReactNode;
  href: string;
  ariaLabel: string;
  /** モバイルドロワー用の表示ラベル */
  drawerLabel: string;
  profileMutedCircle?: boolean;
}

export const sidebarNavItems: SidebarNavItem[] = [
  {
    id: "home",
    href: "/",
    ariaLabel: "Home",
    drawerLabel: "Home",
    icon: <IoHome className="h-7 w-7 text-neutral-900" />,
  },
  {
    id: "explore",
    href: "/explore",
    ariaLabel: "Search and explore",
    drawerLabel: "Explore",
    icon: <IoSearchOutline className="h-7 w-7" />,
  },
  {
    id: "notifications",
    href: "#",
    ariaLabel: "Notifications",
    drawerLabel: "Notifications",
    icon: <IoNotificationsOutline className="h-7 w-7" />,
  },
  {
    id: "messages",
    href: "#",
    ariaLabel: "Messages",
    drawerLabel: "Messages",
    icon: <IoMailOutline className="h-7 w-7" />,
  },
  {
    id: "grok",
    href: "#",
    ariaLabel: "Grok",
    drawerLabel: "Grok",
    icon: <TbSparkles className="h-7 w-7" />,
  },
  {
    id: "more",
    href: "#",
    ariaLabel: "Meatball menu",
    drawerLabel: "More",
    icon: <IoEllipsisVertical className="h-7 w-7" />,
  },
  {
    id: "profile",
    href: "/profile",
    ariaLabel: "Profile",
    drawerLabel: "Profile",
    profileMutedCircle: true,
    icon: <IoPersonOutline className="h-[22px] w-[22px] text-neutral-900" />,
  },
];

export function isInternalSidebarPath(href: string): boolean {
  return href.startsWith("/");
}

/** モバイルドロワーに表示する項目（上からこの順・5件のみ・スクロールなし） */
export const mobileDrawerNavIds = ["profile", "home", "explore", "notifications", "messages"] as const;
