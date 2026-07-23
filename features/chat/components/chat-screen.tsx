"use client";

import { ArrowDownIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { ChatComposer } from "@/features/chat/components/chat-composer";
import { ChatHeader } from "@/features/chat/components/chat-header";
import { AiConnectionSetup } from "@/features/chat/components/ai-connection-setup";
import { EmptyChat } from "@/features/chat/components/empty-chat";
import { MessageList } from "@/features/chat/components/message-list";
import { useAutoScroll } from "@/features/chat/hooks/use-auto-scroll";
import { useChat } from "@/features/chat/hooks/use-chat";
import { previewMessages } from "@/features/chat/lib/preview-messages";
import type { AiConnection } from "@/features/chat/types/ai";
import type { AiProvider } from "@/features/chat/types/ai";

type ChatScreenProps = {
  preview?: string;
  initialDraft?: string;
  showStorefrontBar?: boolean;
};

export function ChatScreen({
  preview,
  initialDraft,
  showStorefrontBar,
}: ChatScreenProps) {
  if (preview) {
    return (
      <StaticPreviewScreen
        preview={preview}
        showStorefrontBar={showStorefrontBar}
      />
    );
  }

  return (
    <InteractiveChatScreen
      initialDraft={initialDraft}
      showStorefrontBar={showStorefrontBar}
    />
  );
}

function StorefrontBar() {
  return (
    <div className="border-border/60 bg-background flex shrink-0 items-center border-b px-3 py-1.5">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
      >
        <ArrowLeftIcon className="size-3" aria-hidden="true" />
        กลับไปหน้าร้านค้า
      </Link>
    </div>
  );
}

function InteractiveChatScreen({
  initialDraft,
  showStorefrontBar,
}: {
  initialDraft?: string;
  showStorefrontBar?: boolean;
}) {
  const [draft, setDraft] = useState(initialDraft ?? "");
  const [connection, setConnection] = useState<AiConnection | null>(null);
  const [setupProvider, setSetupProvider] = useState<AiProvider | null>(null);
  const {
    messages,
    isGenerating,
    submitMessage,
    stopGenerating,
    retryMessage,
    clearConversation,
  } = useChat(connection);
  const contentKey = useMemo(() => {
    const latestMessage = messages.at(-1);

    return latestMessage
      ? `${messages.length}:${latestMessage.status}:${latestMessage.content.length}`
      : "empty";
  }, [messages]);
  const {
    scrollContainerRef,
    scrollAnchorRef,
    showScrollToBottom,
    handleScroll,
    scrollToBottom,
  } = useAutoScroll(contentKey);

  function handleSubmit() {
    if (submitMessage(draft)) {
      setDraft("");
    }
  }

  function changeKey() {
    clearConversation();
    setDraft("");
    setSetupProvider(connection?.provider ?? null);
    setConnection(null);
  }
  function changeProvider() {
    clearConversation();
    setDraft("");
    setSetupProvider(null);
    setConnection(null);
  }

  return (
    <AppShell
      provider={connection?.provider}
      onNewChat={clearConversation}
      onChangeKey={changeKey}
      onChangeProvider={changeProvider}
    >
      <main className="bg-background relative flex h-dvh min-w-0 flex-col">
        {showStorefrontBar && <StorefrontBar />}
        <ChatHeader
          provider={connection?.provider}
          onClearConnection={connection ? changeKey : undefined}
        />
        <div
          ref={scrollContainerRef}
          className="min-h-0 flex-1 overflow-y-auto"
          onScroll={handleScroll}
          data-testid="chat-scroll-container"
        >
          {!connection ? (
            <AiConnectionSetup
              initialProvider={setupProvider}
              onConnect={(nextConnection) => {
                setSetupProvider(null);
                setConnection(nextConnection);
              }}
            />
          ) : messages.length > 0 ? (
            <MessageList
              messages={messages}
              onRetry={retryMessage}
              onChangeKey={changeKey}
              onChangeProvider={changeProvider}
            />
          ) : (
            <EmptyChat
              onPromptSelect={(prompt) => setDraft(prompt)}
              onDraftChange={setDraft}
            />
          )}
          <div ref={scrollAnchorRef} aria-hidden="true" />
        </div>

        {showScrollToBottom && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="bg-background absolute bottom-36 left-1/2 z-10 -translate-x-1/2 rounded-full shadow-md"
            aria-label="เลื่อนไปข้อความล่าสุด / Scroll to latest message"
            onClick={() => scrollToBottom()}
          >
            <ArrowDownIcon className="size-4" aria-hidden="true" />
          </Button>
        )}

        <ChatComposer
          disabled={!connection}
          value={draft}
          isGenerating={isGenerating}
          onChange={setDraft}
          onSubmit={handleSubmit}
          onStop={stopGenerating}
        />
      </main>
    </AppShell>
  );
}

function StaticPreviewScreen({
  preview,
  showStorefrontBar,
}: {
  preview: string;
  showStorefrontBar?: boolean;
}) {
  const showConversation = preview === "conversation" || preview === "disabled";

  return (
    <AppShell>
      <main className="bg-background flex h-dvh min-w-0 flex-col">
        {showStorefrontBar && <StorefrontBar />}
        <ChatHeader navigationOpen={preview === "drawer"} />
        <div className="min-h-0 flex-1 overflow-y-auto">
          {showConversation ? (
            <MessageList messages={previewMessages} />
          ) : (
            <EmptyChat />
          )}
        </div>
        <ChatComposer
          disabled={preview === "disabled"}
          isGenerating={preview === "conversation"}
        />
      </main>
    </AppShell>
  );
}
