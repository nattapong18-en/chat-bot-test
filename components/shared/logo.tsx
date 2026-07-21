import { CircleDotDashedIcon } from "lucide-react";

import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-xl shadow-sm">
        <CircleDotDashedIcon className="size-4" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="text-sm font-semibold tracking-tight">
          {BRAND.name}
        </span>
      )}
    </div>
  );
}
