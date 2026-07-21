import type { AiProvider } from "@/features/chat/types/ai";

export type ChatRequestMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  provider: AiProvider;
  apiKey: string;
  messages: ChatRequestMessage[];
};

export type AiErrorCode =
  | "AI_PROVIDER_REQUIRED"
  | "UNSUPPORTED_AI_PROVIDER"
  | "API_KEY_REQUIRED"
  | "INVALID_API_KEY"
  | "AI_AUTHENTICATION_FAILED"
  | "PROVIDER_KEY_MISMATCH"
  | "AI_PROVIDER_QUOTA_EXCEEDED"
  | "INVALID_REQUEST"
  | "MESSAGE_TOO_LONG"
  | "RATE_LIMITED"
  | "AI_PROVIDER_UNAVAILABLE"
  | "AI_PROVIDER_TIMEOUT"
  | "INVALID_AI_RESPONSE"
  | "INTERNAL_ERROR";

export type ResponseDiagnostic = {
  requestId: string;
  provider: AiProvider;
  providerTextLength: number;
  normalizedTextLength: number;
  streamedTextLength: number;
  clientFinalTextLength: number | null;
  chunkCount: number;
  providerFinishReason: string;
  wasCancelled: boolean;
  durationMs: number;
};

export type ChatStreamEvent =
  | { type: "text_delta"; delta: string }
  | { type: "done" }
  | { type: "diagnostic"; diagnostic: ResponseDiagnostic }
  | {
      type: "error";
      error: {
        code: AiErrorCode;
        message: string;
        retryable: boolean;
        provider?: AiProvider;
      };
    };

export type ChatErrorResponse = Extract<ChatStreamEvent, { type: "error" }>;
