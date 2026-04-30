"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoAdd } from "react-icons/io5";
import { SiX } from "react-icons/si";
import { FaFeatherPointed } from "react-icons/fa6";
import { isInternalSidebarPath, sidebarNavItems } from "./sidebar-nav-items";

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[72px] shrink-0 flex-col border-r border-[#eff3f4] py-1 pl-1 pr-1 sm:flex">
      <div className="flex h-full flex-col items-center">
        <Link
          href="/"
          className="mb-1 flex h-[52px] w-[52px] items-center justify-center rounded-full transition-colors hover:bg-black/[0.08]"
          aria-label="X"
        >
          <SiX className="h-[26px] w-[26px] text-neutral-900" />
        </Link>

        <nav className="flex flex-1 flex-col items-center gap-0.5">
          {sidebarNavItems.map((item) => {
            const isActive =
              item.id === "home"
                ? pathname === "/"
                : item.id === "explore"
                  ? pathname === "/explore" || pathname.startsWith("/explore/")
                  : item.id === "profile"
                    ? pathname === "/profile" || pathname.startsWith("/profile/")
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
              "flex items-center justify-center rounded-full p-3 text-neutral-900 transition-colors hover:bg-black/[0.08]";

            if (isInternalSidebarPath(item.href)) {
              return (
                <Link key={item.id} href={item.href} aria-label={item.ariaLabel} className={className}>
                  {iconShell}
                </Link>
              );
            }

            return (
              <a key={item.id} href={item.href} aria-label={item.ariaLabel} className={className}>
                {iconShell}
              </a>
            );
          })}
          <div className="mb-4 mt-auto flex justify-center">
            <button
              type="button"
              className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-neutral-900 text-white shadow-sm transition-opacity hover:opacity-90"
              aria-label="Post"
            >
              <IoAdd className="absolute left-3 top-3 h-3.5 w-3.5 stroke-[3]" aria-hidden />
              <FaFeatherPointed className="relative h-[22px] w-[22px] translate-x-1 translate-y-1" aria-hidden />
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
