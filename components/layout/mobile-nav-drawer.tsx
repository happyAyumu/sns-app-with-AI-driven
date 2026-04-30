"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { SiX } from "react-icons/si";
import { isInternalSidebarPath, mobileDrawerNavIds, sidebarNavItems } from "./sidebar-nav-items";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onKeyDown]);

  return (
    <div
      className={`fixed inset-0 z-[100] sm:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="メニュー"
    >
      {/* 親に opacity を付けない（子の白パネルまで透過するのを防ぐ）。フェードはこのレイヤーのみ。 */}
      <button
        type="button"
        className={`absolute inset-0 z-0 bg-black/50 transition-opacity duration-200 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="閉じる"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <nav
        className={`absolute left-0 top-0 z-[1] flex h-full w-[280px] max-w-[min(280px,calc(100vw-12px))] flex-col border-r border-[#cfd9de] bg-white shadow-[4px_0_24px_rgba(15,20,25,0.15)] transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[53px] shrink-0 items-center justify-between border-b border-[#eff3f4] bg-white px-2">
          <Link
            href="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/[0.08]"
            aria-label="X"
            onClick={onClose}
          >
            <SiX className="h-[22px] w-[22px] text-neutral-900" />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-black/[0.08]"
            aria-label="メニューを閉じる"
            onClick={onClose}
          >
            <IoClose className="h-7 w-7" />
          </button>
        </div>
        <div className="flex shrink-0 flex-col bg-white py-1">
          {mobileDrawerNavIds.map((navId) => {
            const item = sidebarNavItems.find((i) => i.id === navId);
            if (!item) return null;
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
                    : "relative flex h-9 w-9 shrink-0 items-center justify-center text-neutral-900"
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

            const rowClass =
              "flex w-full min-w-0 items-center gap-4 px-4 py-2.5 text-left text-[17px] font-bold leading-snug text-neutral-900 transition-colors hover:bg-black/[0.04]";

            if (isInternalSidebarPath(item.href)) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className={rowClass}
                  onClick={onClose}
                >
                  {iconShell}
                  <span className={`min-w-0 flex-1 truncate ${isActive ? "font-bold" : ""}`}>{item.drawerLabel}</span>
                </Link>
              );
            }

            return (
              <a key={item.id} href={item.href} aria-label={item.ariaLabel} className={rowClass}>
                {iconShell}
                <span className="min-w-0 flex-1 truncate">{item.drawerLabel}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
