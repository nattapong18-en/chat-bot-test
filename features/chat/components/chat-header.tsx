import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import type { AiProvider } from "@/features/chat/types/ai";
import { BRAND } from "@/lib/brand";

type ChatHeaderProps = {
  navigationOpen?: boolean;
  provider?: AiProvider;
  onClearConnection?: () => void;
};

export function ChatHeader({
  navigationOpen = false,
  provider,
  onClearConnection,
}: ChatHeaderProps) {
  return (
    <header className="border-border/70 flex h-16 shrink-0 items-center justify-between border-b px-3 sm:px-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-1 sm:gap-2">
        <MobileSidebar defaultOpen={navigationOpen} />
        <div className="min-w-0 px-2 sm:px-3">
          <p className="truncate text-sm font-semibold">{BRAND.name}</p>
          <p className="text-muted-foreground truncate text-xs">
            {provider
              ? `${provider === "openai" ? "OpenAI" : "Google Gemini"} · Basketball shoe assistant`
              : "Basketball shoe assistant"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {provider && onClearConnection && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearConnection}
            aria-label="ล้าง API Key และยกเลิกการเชื่อมต่อ / Clear API key and disconnect"
          >
            <span className="hidden sm:inline">ล้างคีย์ / Clear key</span>
            <span className="sm:hidden">Clear</span>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
