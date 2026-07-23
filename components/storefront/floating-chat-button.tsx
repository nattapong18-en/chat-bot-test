"use client";

import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";

export function FloatingChatButton() {
  return (
    <div className="group fixed right-5 bottom-5 z-50">
      <div
        className="pointer-events-none absolute top-1/2 right-full mr-3 max-w-[calc(100vw-6rem)] -translate-y-1/2 opacity-0 transition-opacity delay-200 duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
        aria-hidden="true"
      >
        <div className="bg-foreground text-background rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shadow-sm">
          แชตกับผู้ช่วยร้าน CourtFit
        </div>
      </div>
      <Link
        href="/chat"
        className="bg-accent hover:bg-accent-muted focus-visible:ring-ring focus-visible:ring-offset-background flex size-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-safe:group-hover:scale-105 motion-safe:group-hover:shadow-xl"
        aria-label="แชตกับผู้ช่วยร้าน CourtFit"
      >
        <MessageCircleIcon className="size-6" aria-hidden="true" />
      </Link>
    </div>
  );
}
