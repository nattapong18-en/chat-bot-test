import "server-only";

import type { AiProvider } from "@/features/chat/types/ai";
import { env } from "@/lib/env";

export const GEMINI_MODEL = "gemini-flash-latest";

const providerModels: Record<AiProvider, string> = {
  openai: env.OPENAI_MODEL ?? "gpt-4.1-mini",
  gemini: GEMINI_MODEL,
};

export function getProviderModel(provider: AiProvider): string {
  return providerModels[provider];
}
