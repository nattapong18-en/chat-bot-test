import type { ChatLanguage } from "@/features/chat/types/chat";

const THAI_CHARACTER_PATTERN = /[\u0E00-\u0E7F]/u;

export function detectChatLanguage(text: string): ChatLanguage {
  return THAI_CHARACTER_PATTERN.test(text) ? "th" : "en";
}
