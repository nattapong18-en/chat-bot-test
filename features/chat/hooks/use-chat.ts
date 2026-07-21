"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { detectChatLanguage } from "@/features/chat/lib/chat-language";
import {
  ChatClientError,
  streamChatResponse,
} from "@/features/chat/lib/chat-client";
import type { AiConnection } from "@/features/chat/types/ai";
import type { ChatRequestMessage } from "@/features/chat/types/api";
import type { ChatMessage } from "@/features/chat/types/chat";

export function useChat(connection: AiConnection | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const activeRequestRef = useRef<AbortController | null>(null);

  const runAssistantResponse = useCallback(
    async (
      assistantMessageId: string,
      requestMessages: ChatRequestMessage[],
    ) => {
      if (!connection) return;

      const controller = new AbortController();
      activeRequestRef.current = controller;
      setIsGenerating(true);

      try {
        await streamChatResponse({
          connection,
          messages: requestMessages,
          signal: controller.signal,
          onChunk: (chunk) => {
            setMessages((currentMessages) =>
              currentMessages.map((message) =>
                message.id === assistantMessageId
                  ? {
                      ...message,
                      content: message.content + chunk,
                      status: "streaming",
                    }
                  : message,
              ),
            );
          },
        });

        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageId
              ? { ...message, status: "completed" }
              : message,
          ),
        );
      } catch (error) {
        const wasStopped =
          controller.signal.aborted ||
          (error instanceof DOMException && error.name === "AbortError");

        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  status: wasStopped ? "stopped" : "error",
                  errorCode:
                    !wasStopped && error instanceof ChatClientError
                      ? error.code
                      : "INTERNAL_ERROR",
                  error: wasStopped
                    ? undefined
                    : error instanceof ChatClientError
                      ? error.message
                      : safeFallbackMessage(message.language),
                }
              : message,
          ),
        );
      } finally {
        if (activeRequestRef.current === controller) {
          activeRequestRef.current = null;
          setIsGenerating(false);
        }
      }
    },
    [connection],
  );

  const submitMessage = useCallback(
    (content: string) => {
      const trimmedContent = content.trim();

      if (!connection || !trimmedContent || activeRequestRef.current) {
        return false;
      }

      const userMessageId = crypto.randomUUID();
      const assistantMessageId = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      const language = detectChatLanguage(trimmedContent);
      const userMessage: ChatMessage = {
        id: userMessageId,
        role: "user",
        content: trimmedContent,
        status: "completed",
        createdAt,
        language,
      };
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        status: "pending",
        createdAt,
        language,
        relatedUserMessageId: userMessageId,
      };
      const requestMessages = toRequestMessages([...messages, userMessage]);

      setMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
        assistantMessage,
      ]);
      void runAssistantResponse(assistantMessageId, requestMessages);
      return true;
    },
    [connection, messages, runAssistantResponse],
  );

  const stopGenerating = useCallback(() => {
    activeRequestRef.current?.abort();
  }, []);

  const clearConversation = useCallback(() => {
    activeRequestRef.current?.abort();
    setMessages([]);
  }, []);

  useEffect(() => () => activeRequestRef.current?.abort(), []);

  const retryMessage = useCallback(
    (assistantMessageId: string) => {
      if (!connection || activeRequestRef.current) return false;

      const assistantIndex = messages.findIndex(
        (message) => message.id === assistantMessageId,
      );
      const assistantMessage = messages[assistantIndex];
      if (!assistantMessage?.relatedUserMessageId) return false;

      const userMessage = messages.find(
        (message) => message.id === assistantMessage.relatedUserMessageId,
      );
      if (!userMessage) return false;

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessageId
            ? { ...message, content: "", status: "pending", error: undefined }
            : message,
        ),
      );

      void runAssistantResponse(
        assistantMessageId,
        toRequestMessages(messages.slice(0, assistantIndex)),
      );
      return true;
    },
    [connection, messages, runAssistantResponse],
  );

  return {
    messages,
    isGenerating,
    submitMessage,
    stopGenerating,
    retryMessage,
    clearConversation,
  };
}

function toRequestMessages(messages: ChatMessage[]): ChatRequestMessage[] {
  return messages
    .filter((message) => message.content.trim().length > 0)
    .map(({ role, content }) => ({ role, content }));
}

function safeFallbackMessage(language: ChatMessage["language"]): string {
  return language === "th"
    ? "ไม่สามารถตอบข้อความนี้ได้ กรุณาลองอีกครั้งครับ"
    : "The response could not be completed. Please try again.";
}
