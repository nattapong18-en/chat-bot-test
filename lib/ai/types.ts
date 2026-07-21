import type { ChatRequestMessage } from "@/features/chat/types/api";

export type ProviderStreamRequest = {
  apiKey: string;
  messages: ChatRequestMessage[];
  signal: AbortSignal;
};

export type ProviderTextStream = AsyncGenerator<string, void, undefined>;

export type ProviderAdapter = (
  request: ProviderStreamRequest,
) => ProviderTextStream;
