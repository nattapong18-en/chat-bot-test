type ChatLanguage = "th" | "en";

type ChatRequestMessage = {
  role: "user" | "assistant";
  content: string;
};

type NormalizeAssistantResponseOptions = {
  language: ChatLanguage;
  messages: ChatRequestMessage[];
};

export function normalizeAssistantResponse(
  response: string,
  options: NormalizeAssistantResponseOptions,
): string {
  const original = response.trim();
  return original || fallbackResponse(options.language);
}

function fallbackResponse(language: ChatLanguage): string {
  return language === "th"
    ? "ขออภัย ระบบได้รับคำตอบไม่ครบถ้วน กรุณาลองอีกครั้งครับ"
    : "The response was incomplete. Please try again.";
}
