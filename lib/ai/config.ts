import "server-only";

import type { AiProvider } from "@/features/chat/types/ai";
import { env } from "@/lib/env";

const providerModels: Record<AiProvider, string> = {
  openai: env.OPENAI_MODEL ?? "gpt-4.1-mini",
  gemini: env.GEMINI_MODEL ?? "gemini-2.5-flash",
};

export function getProviderModel(provider: AiProvider): string {
  return providerModels[provider];
}
