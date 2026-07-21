import { CircleAlertIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  children: ReactNode;
  className?: string;
};

export function ErrorMessage({ children, className }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "border-destructive/25 bg-destructive/5 text-destructive flex gap-3 rounded-xl border px-4 py-3 text-sm",
        className,
      )}
      role="alert"
    >
      <CircleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
