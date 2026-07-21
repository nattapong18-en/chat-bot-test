import "server-only";

import type { AiProvider } from "@/features/chat/types/ai";
import { streamGeminiResponse } from "@/lib/ai/adapters/gemini";
import { streamOpenAiResponse } from "@/lib/ai/adapters/openai";
import { NormalizedAiError } from "@/lib/ai/errors";
import type { ProviderAdapter } from "@/lib/ai/types";

export function getProviderAdapter(provider: AiProvider): ProviderAdapter {
  switch (provider) {
    case "openai":
      return streamOpenAiResponse;
    case "gemini":
      return streamGeminiResponse;
    default:
      throw new NormalizedAiError("UNSUPPORTED_AI_PROVIDER", 400, false);
  }
}
