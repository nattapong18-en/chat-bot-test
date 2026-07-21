"use client";

import {
  KeyRoundIcon,
  PlusIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AiProvider } from "@/features/chat/types/ai";
import { ThemeToggle } from "@/components/shared/theme-toggle";

type AppSidebarProps = {
  className?: string;
  provider?: AiProvider;
  onNewChat?: () => void;
  onChangeKey?: () => void;
  onChangeProvider?: () => void;
};

export function AppSidebar({
  className,
  provider,
  onNewChat,
  onChangeKey,
  onChangeProvider,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground flex h-full w-full flex-col",
        className,
      )}
      aria-label="Conversation navigation"
    >
      <div className="flex h-16 items-center px-4">
        <Logo />
      </div>

      <div className="px-3">
        <Button
          type="button"
          onClick={onNewChat}
          className="w-full justify-start bg-orange-600 text-white hover:bg-orange-700"
        >
          <PlusIcon className="size-4" aria-hidden="true" />
          เริ่มแชตใหม่
        </Button>
      </div>

      <div className="mt-6 flex-1 px-3">
        <div className="border-sidebar-border rounded-xl border p-3 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheckIcon className="size-4 text-orange-600" />
            {provider
              ? `เชื่อมต่อ ${provider === "openai" ? "OpenAI" : "Google Gemini"} แล้ว`
              : "ยังไม่ได้เชื่อมต่อ"}
          </div>
          <p className="text-muted-foreground mt-3 text-xs leading-5">
            ผู้ช่วยเลือกรองเท้าบาสให้เข้ากับเกมของคุณ
          </p>
        </div>
        {provider && (
          <div className="mt-3 grid gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onChangeKey}
              className="justify-start"
            >
              <KeyRoundIcon className="size-4" />
              เปลี่ยน API Key
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onChangeProvider}
              className="justify-start"
            >
              <RefreshCwIcon className="size-4" />
              เปลี่ยนผู้ให้บริการ
            </Button>
          </div>
        )}
      </div>

      <div className="border-sidebar-border border-t p-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
