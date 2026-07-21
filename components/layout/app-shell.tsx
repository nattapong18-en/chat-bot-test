import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import type { AiProvider } from "@/features/chat/types/ai";

type AppShellProps = {
  children: ReactNode;
  provider?: AiProvider;
  onNewChat?: () => void;
  onChangeKey?: () => void;
  onChangeProvider?: () => void;
};

export function AppShell({ children, ...sidebarProps }: AppShellProps) {
  return (
    <div className="bg-background grid h-dvh overflow-hidden lg:grid-cols-[17.5rem_minmax(0,1fr)]">
      <div className="border-sidebar-border hidden border-r lg:block">
        <AppSidebar {...sidebarProps} />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
