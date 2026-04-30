"use client";

import Link from "next/link";
import { useState } from "react";
import { SiX } from "react-icons/si";
import { MobileNavDrawer } from "./mobile-nav-drawer";

export function MobileHomeHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="grid h-[53px] shrink-0 grid-cols-3 items-center gap-2 px-3 sm:hidden">
        <div className="flex justify-start">
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-base leading-none transition-opacity hover:opacity-80"
            aria-label="メニューを開く"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            🐕
          </button>
        </div>
        <div className="flex justify-center">
          <Link href="/" className="flex shrink-0 items-center justify-center p-2" aria-label="X">
            <SiX className="h-[22px] w-[22px] text-neutral-900" />
          </Link>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="shrink-0 rounded-full border border-neutral-900 bg-white px-3 py-1.5 text-[15px] font-bold text-neutral-900 transition-colors hover:bg-black/[0.04]"
          >
            Subscribe
          </button>
        </div>
      </header>
      <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
