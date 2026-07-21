import type { ChatRequestMessage } from "@/features/chat/types/api";

export type ProviderStreamRequest = {
  apiKey: string;
  messages: ChatRequestMessage[];
  signal: AbortSignal;
};

export type ProviderFinishReason =
  "STOP" | "MAX_TOKENS" | "SAFETY" | "RECITATION" | "OTHER";

export type ProviderStreamEvent =
  | { type: "text_delta"; delta: string }
  | { type: "completed"; finishReason: ProviderFinishReason };

export type ProviderTextStream = AsyncGenerator<
  ProviderStreamEvent,
  void,
  undefined
>;

export type ProviderAdapter = (
  request: ProviderStreamRequest,
) => ProviderTextStream;
