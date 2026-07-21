import { KeyRoundIcon, RefreshCwIcon, RotateCcwIcon } from "lucide-react";

import { ErrorMessage } from "@/components/shared/error-message";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { MessageContent } from "@/features/chat/components/message-content";
import { StreamingIndicator } from "@/features/chat/components/streaming-indicator";
import type { ChatMessage } from "@/features/chat/types/chat";
import { cn } from "@/lib/utils";

type MessageItemProps = {
  message: ChatMessage;
  onRetry?: (messageId: string) => void;
  onChangeKey?: () => void;
  onChangeProvider?: () => void;
};

export function MessageItem({
  message,
  onRetry,
  onChangeKey,
  onChangeProvider,
}: MessageItemProps) {
  const isUser = message.role === "user";
  const isPending = message.status === "pending";
  const isStreaming = message.status === "streaming";
  const isStopped = message.status === "stopped";
  const isThai = message.language === "th";

  return (
    <article
      className={cn("flex gap-3 sm:gap-4", isUser && "justify-end")}
      aria-label={
        isThai
          ? isUser
            ? "ข้อความของคุณ"
            : "ข้อความจากผู้ช่วยเลือกรองเท้าบาส"
          : `${isUser ? "You" : "Assistant"} message`
      }
      data-message-id={message.id}
      data-message-role={message.role}
      data-message-status={message.status}
    >
      {!isUser && <Logo compact className="mt-0.5" />}

      <div
        className={cn(
          "min-w-0",
          isUser
            ? "bg-user-message text-user-message-foreground max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 sm:max-w-[75%]"
            : "max-w-[calc(100%-3rem)] flex-1 pt-1",
        )}
      >
        {!isUser && (
          <p className="text-muted-foreground mb-2 text-xs font-medium">
            {isThai ? "ผู้ช่วยเลือกรองเท้าบาส" : "Basketball Shoe Assistant"}
          </p>
        )}

        {message.status === "error" ? (
          <ErrorMessage>
            {message.errorCode && (
              <p className="font-semibold">
                {message.errorCode === "AI_PROVIDER_QUOTA_EXCEEDED"
                  ? "ใช้งาน Gemini เกินโควตาแล้ว"
                  : message.errorCode === "PROVIDER_KEY_MISMATCH"
                    ? "API Key ไม่ตรงกับผู้ให้บริการ"
                    : message.errorCode === "AI_AUTHENTICATION_FAILED"
                      ? "API Key ไม่ถูกต้อง"
                      : message.errorCode === "AI_PROVIDER_TIMEOUT"
                        ? "ผู้ให้บริการตอบช้าเกินไป"
                        : message.errorCode === "AI_PROVIDER_UNAVAILABLE"
                          ? "ผู้ให้บริการยังไม่พร้อมใช้งาน"
                          : "เกิดข้อผิดพลาด"}
              </p>
            )}
            <p className="font-medium">
              {isThai
                ? "ไม่สามารถตอบข้อความนี้ได้"
                : "The response could not be completed."}
            </p>
            <p className="text-destructive/80 mt-1">
              {message.error ??
                (isThai ? "กรุณาลองอีกครั้งครับ" : "Please try again.")}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-destructive/20 bg-background text-destructive mt-3"
              onClick={() => onRetry?.(message.id)}
              disabled={!onRetry}
            >
              <RotateCcwIcon className="size-3.5" aria-hidden="true" />
              {isThai ? "ลองอีกครั้ง" : "Retry"}
            </Button>
            {(message.errorCode === "AI_PROVIDER_QUOTA_EXCEEDED" ||
              message.errorCode === "AI_AUTHENTICATION_FAILED" ||
              message.errorCode === "PROVIDER_KEY_MISMATCH") && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onChangeKey}
                >
                  <KeyRoundIcon className="size-3.5" />
                  เปลี่ยน API Key
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onChangeProvider}
                >
                  <RefreshCwIcon className="size-3.5" />
                  เปลี่ยนผู้ให้บริการ
                </Button>
              </div>
            )}
          </ErrorMessage>
        ) : (
          <>
            {message.content ? (
              <MessageContent content={message.content} />
            ) : isStopped ? (
              <p className="text-muted-foreground text-sm">
                {isThai
                  ? "หยุดการตอบก่อนที่จะได้รับข้อความ"
                  : "Response stopped before any text was received."}
              </p>
            ) : null}

            {(isPending || isStreaming) && (
              <div className={cn(message.content && "mt-3")}>
                <StreamingIndicator
                  label={
                    isThai
                      ? isPending
                        ? "กำลังคิด"
                        : "กำลังตอบ"
                      : isPending
                        ? "Thinking"
                        : "Responding"
                  }
                />
              </div>
            )}

            {isStopped && message.content && (
              <p className="text-muted-foreground mt-3 text-xs">
                {isThai ? "หยุดการตอบแล้ว" : "Stopped"}
              </p>
            )}
          </>
        )}
      </div>
    </article>
  );
}
