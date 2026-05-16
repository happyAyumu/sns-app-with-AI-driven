"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiX } from "react-icons/si";
import { AppHeaderAuth } from "./app-header-auth";
import { isInternalSidebarPath, sidebarNavItems } from "./sidebar-nav-items";
import { LeftSidebarProfileEntry } from "./left-sidebar-profile-entry";

export default function LeftSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const currentUsername = user?.username?.trim() || null;

  return (
    <aside className="sticky top-0 hidden h-full min-h-0 w-[260px] shrink-0 flex-col border-r border-[#eff3f4] py-1 pl-2 pr-2 sm:flex">
      <div className="flex h-full flex-col items-stretch">
        <Link
          href="/"
          className="mb-1 flex h-[52px] w-[52px] items-center justify-center rounded-full transition-colors hover:bg-black/[0.08]"
          aria-label="X"
        >
          <SiX className="h-[26px] w-[26px] text-neutral-900" />
        </Link>

        <nav className="flex flex-1 flex-col items-stretch gap-0.5">
          {sidebarNavItems.map((item) => {
            const profileHref = item.id === "profile" && currentUsername ? `/users/${currentUsername}` : item.href;
            const profileAriaLabel =
              item.id === "profile" && currentUsername ? `Profile (${currentUsername})` : item.ariaLabel;

            const isActive =
              item.id === "home"
                ? pathname === "/"
                : item.id === "explore"
                  ? pathname === "/explore" || pathname.startsWith("/explore/")
                  : item.id === "profile"
                    ? pathname.startsWith("/users/")
                    : false;

            const iconShell = (
              <span
                className={
                  item.profileMutedCircle
                    ? `relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7e9ea] ${
                        isActive ? "ring-2 ring-[#1d9bf0] ring-offset-2 ring-offset-white" : ""
                      }`
                    : "relative flex h-8 w-8 shrink-0 items-center justify-center"
                }
              >
                {item.icon}
                {isActive && (item.id === "home" || item.id === "explore") ? (
                  <span
                    className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#1d9bf0] ring-2 ring-white"
                    aria-hidden
                  />
                ) : null}
              </span>
            );

            const className =
              "flex w-full items-center gap-4 rounded-full px-3 py-2 text-neutral-900 transition-colors hover:bg-black/[0.08]";
            const labelClass = `min-w-0 truncate text-[20px] leading-6 ${isActive ? "font-bold" : "font-normal"}`;
            const content = (
              <>
                {iconShell}
                <span className={labelClass}>{item.drawerLabel}</span>
              </>
            );

            if (item.id === "profile") {
              return (
                <LeftSidebarProfileEntry
                  key={item.id}
                  href={profileHref}
                  ariaLabel={profileAriaLabel}
                  className={className}
                  iconShell={content}
                />
              );
            }

            if (isInternalSidebarPath(item.href)) {
              return (
                <Link key={item.id} href={item.href} aria-label={item.ariaLabel} className={className}>
                  {content}
                </Link>
              );
            }

            return (
              <a key={item.id} href={item.href} aria-label={item.ariaLabel} className={className}>
                {content}
              </a>
            );
          })}
        </nav>
        <div className="mt-3 flex items-center gap-2 border-t border-[#eff3f4] px-3 pb-2 pt-3">
          <AppHeaderAuth />
        </div>
      </div>
    </aside>
  );
}
