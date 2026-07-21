import { MessageItem } from "@/features/chat/components/message-item";
import type { ChatMessage } from "@/features/chat/types/chat";

type MessageListProps = {
  messages: ChatMessage[];
  onRetry?: (messageId: string) => void;
  onChangeKey?: () => void;
  onChangeProvider?: () => void;
};

export function MessageList({
  messages,
  onRetry,
  onChangeKey,
  onChangeProvider,
}: MessageListProps) {
  return (
    <section
      className="mx-auto w-full max-w-[52rem] space-y-8 px-4 py-8 sm:px-6 sm:py-10"
      aria-label="Conversation"
      aria-live="polite"
    >
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onRetry={onRetry}
          onChangeKey={onChangeKey}
          onChangeProvider={onChangeProvider}
        />
      ))}
    </section>
  );
}
