import type { AiConnection } from "@/features/chat/types/ai";
import type {
  AiErrorCode,
  ChatErrorResponse,
  ChatRequestMessage,
  ChatStreamEvent,
} from "@/features/chat/types/api";

type StreamChatOptions = {
  connection: AiConnection;
  messages: ChatRequestMessage[];
  signal: AbortSignal;
  onChunk: (chunk: string) => void;
};

export class ChatClientError extends Error {
  constructor(
    message: string,
    readonly code: AiErrorCode,
    readonly retryable: boolean,
  ) {
    super(message);
    this.name = "ChatClientError";
  }
}

export async function streamChatResponse({
  connection,
  messages,
  signal,
  onChunk,
}: StreamChatOptions): Promise<void> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    signal,
    body: JSON.stringify({
      provider: connection.provider,
      apiKey: connection.apiKey,
      messages,
    }),
  });

  if (!response.ok) {
    throw await readHttpError(response);
  }
  if (!response.body) {
    throw new ChatClientError(
      "The AI provider returned an unreadable response.",
      "INVALID_AI_RESPONSE",
      true,
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (value) {
      buffer += decoder.decode(value, { stream: true });
    }

    if (done) {
      buffer += decoder.decode();
    }

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      handleStreamEvent(parseStreamEvent(line), onChunk);
    }

    if (done) break;
  }

  if (buffer.trim()) {
    handleStreamEvent(parseStreamEvent(buffer), onChunk);
  }
}

function parseStreamEvent(line: string): ChatStreamEvent {
  try {
    return JSON.parse(line) as ChatStreamEvent;
  } catch {
    throw new ChatClientError(
      "The AI provider returned an unreadable response.",
      "INVALID_AI_RESPONSE",
      true,
    );
  }
}

function handleStreamEvent(
  event: ChatStreamEvent,
  onChunk: (chunk: string) => void,
) {
  if (event.type === "text_delta") {
    onChunk(event.delta);
  } else if (event.type === "error") {
    throw new ChatClientError(
      event.error.message,
      event.error.code,
      event.error.retryable,
    );
  }
}

async function readHttpError(response: Response): Promise<ChatClientError> {
  try {
    const body = (await response.json()) as ChatErrorResponse;
    if (body.type === "error") {
      return new ChatClientError(
        body.error.message,
        body.error.code,
        body.error.retryable,
      );
    }
  } catch {
    // Return a safe generic error without provider response details.
  }

  return new ChatClientError(
    "The response could not be completed. Please try again.",
    "INTERNAL_ERROR",
    true,
  );
}
