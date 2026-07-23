"use client";

import { ArrowUpIcon, SquareIcon } from "lucide-react";
import {
  type FormEvent,
  type KeyboardEvent,
  useLayoutEffect,
  useRef,
} from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatComposerProps = {
  disabled?: boolean;
  isGenerating?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  onStop?: () => void;
};

export function ChatComposer({
  disabled = false,
  isGenerating = false,
  value = "",
  onChange,
  onSubmit,
  onStop,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSubmit = !disabled && !isGenerating && value.trim().length > 0;

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [value]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (canSubmit) {
      onSubmit?.();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (canSubmit) {
        onSubmit?.();
      }
    }
  }

  return (
    <div className="bg-background/95 shrink-0 px-3 pt-2 pb-3 backdrop-blur sm:px-6 sm:pb-5">
      <div className="mx-auto w-full max-w-[52rem]">
        <form
          onSubmit={handleSubmit}
          className={cn(
            "border-border bg-card focus-within:border-foreground/20 focus-within:ring-ring/30 rounded-2xl border p-2 shadow-[0_8px_30px_rgb(0_0_0/0.06)] transition focus-within:ring-2",
            disabled && "bg-muted/50 opacity-70",
          )}
        >
          <Textarea
            ref={textareaRef}
            aria-label="พิมพ์ข้อความถึงผู้ช่วยเลือกรองเท้าบาส / Message basketball shoe assistant"
            aria-describedby="composer-hint"
            placeholder={
              disabled
                ? "ช่องข้อความปิดใช้งาน / Composer disabled"
                : "ถามเรื่องรองเท้าบาส ไซซ์ สไตล์การเล่น หรืองบประมาณ"
            }
            className="max-h-40 min-h-[3.25rem] border-0 px-2.5 py-2 shadow-none focus-visible:ring-0"
            disabled={disabled}
            maxLength={4000}
            onChange={(event) => onChange?.(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            value={value}
          />
          <div className="flex items-center justify-between gap-3 px-1 pb-1">
            <span
              id="composer-hint"
              className="text-muted-foreground hidden truncate px-1 text-xs sm:block"
            >
              Enter เพื่อส่ง · Shift + Enter เพื่อขึ้นบรรทัดใหม่
            </span>
            {isGenerating ? (
              <Button
                type="button"
                size="icon"
                aria-label="หยุดการตอบ / Stop generating"
                onClick={onStop}
              >
                <SquareIcon
                  className="size-3.5 fill-current"
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                aria-label="ส่งข้อความ / Send message"
                disabled={!canSubmit}
              >
                <ArrowUpIcon className="size-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </form>
        <p className="text-muted-foreground mt-2 text-center text-[0.6875rem] leading-4">
          คำแนะนำจากระบบจำลอง · ไม่มีข้อมูลราคาและสต็อกแบบเรียลไทม์
        </p>
      </div>
    </div>
  );
}
