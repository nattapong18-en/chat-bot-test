import type { ChatLanguage } from "@/features/chat/types/chat";
import type { AiProvider } from "@/features/chat/types/ai";
import type { AiErrorCode } from "@/features/chat/types/api";

type PublicAiError = {
  code: AiErrorCode;
  message: string;
  retryable: boolean;
  provider?: AiProvider;
};

export class NormalizedAiError extends Error {
  constructor(
    readonly code: AiErrorCode,
    readonly status: number,
    readonly retryable: boolean,
  ) {
    super(code);
    this.name = "NormalizedAiError";
  }
}

const ERROR_MESSAGES: Record<ChatLanguage, Record<AiErrorCode, string>> = {
  en: {
    AI_PROVIDER_REQUIRED: "Select an AI provider before sending a message.",
    UNSUPPORTED_AI_PROVIDER: "The selected AI provider is not supported.",
    API_KEY_REQUIRED: "Enter an API key for the selected provider.",
    INVALID_API_KEY:
      "The API key was not accepted. Replace or clear the key and try again.",
    AI_AUTHENTICATION_FAILED:
      "The AI provider could not authenticate this key.",
    PROVIDER_KEY_MISMATCH:
      "This API key does not match the selected AI provider.",
    AI_PROVIDER_QUOTA_EXCEEDED:
      "This API key has reached its provider quota or billing limit.",
    INVALID_REQUEST: "The chat request is invalid.",
    MESSAGE_TOO_LONG: "The message or conversation is too long.",
    RATE_LIMITED:
      "The AI provider rate limit was reached. Please try again later.",
    AI_PROVIDER_UNAVAILABLE: "The AI provider is currently unavailable.",
    AI_PROVIDER_TIMEOUT: "The AI provider took too long to respond.",
    INVALID_AI_RESPONSE: "The AI provider returned an unreadable response.",
    INTERNAL_ERROR: "The response could not be completed. Please try again.",
  },
  th: {
    PROVIDER_KEY_MISMATCH: "API Key does not match the selected provider.",
    AI_PROVIDER_QUOTA_EXCEEDED:
      "This API Key has reached its quota or billing limit.",
    AI_PROVIDER_REQUIRED: "กรุณาเลือกผู้ให้บริการ AI ก่อนส่งข้อความครับ",
    UNSUPPORTED_AI_PROVIDER: "ยังไม่รองรับผู้ให้บริการ AI ที่เลือกครับ",
    API_KEY_REQUIRED: "กรุณากรอก API Key ของผู้ให้บริการที่เลือกครับ",
    INVALID_API_KEY:
      "API Key ไม่ถูกต้อง กรุณาเปลี่ยนหรือล้างคีย์แล้วลองอีกครั้งครับ",
    AI_AUTHENTICATION_FAILED:
      "ผู้ให้บริการ AI ไม่สามารถยืนยัน API Key นี้ได้ครับ",
    INVALID_REQUEST: "คำขอแชตไม่ถูกต้อง กรุณาตรวจสอบแล้วลองใหม่ครับ",
    MESSAGE_TOO_LONG: "ข้อความหรือบทสนทนายาวเกินกำหนดครับ",
    RATE_LIMITED:
      "มีการใช้งานผู้ให้บริการ AI มากเกินไป กรุณาลองใหม่ภายหลังครับ",
    AI_PROVIDER_UNAVAILABLE: "ผู้ให้บริการ AI ยังไม่พร้อมใช้งานในขณะนี้ครับ",
    AI_PROVIDER_TIMEOUT: "ผู้ให้บริการ AI ใช้เวลาตอบนานเกินไปครับ",
    INVALID_AI_RESPONSE:
      "ไม่สามารถอ่านข้อความตอบกลับจากผู้ให้บริการ AI ได้ครับ",
    INTERNAL_ERROR: "ไม่สามารถตอบข้อความนี้ได้ กรุณาลองอีกครั้งครับ",
  },
};

export function toPublicAiError(
  error: unknown,
  language: ChatLanguage,
  provider?: AiProvider,
): PublicAiError {
  const normalized =
    error instanceof NormalizedAiError
      ? error
      : new NormalizedAiError("INTERNAL_ERROR", 500, true);

  return {
    code: normalized.code,
    message: providerAuthenticationMessage(normalized.code, language, provider),
    retryable: normalized.retryable,
    ...(provider ? { provider } : {}),
  };
}

function providerAuthenticationMessage(
  code: AiErrorCode,
  language: ChatLanguage,
  provider?: AiProvider,
): string {
  if (
    !provider ||
    (code !== "INVALID_API_KEY" && code !== "AI_AUTHENTICATION_FAILED")
  ) {
    return ERROR_MESSAGES[language][code];
  }

  const providerName = provider === "openai" ? "OpenAI" : "Google Gemini";
  return language === "th"
    ? `${providerName} ไม่ยอมรับ API Key นี้ กรุณาเปลี่ยนหรือล้างคีย์แล้วลองอีกครั้งครับ`
    : `${providerName} did not accept this API key. Replace or clear it and try again.`;
}

export function normalizeProviderError(
  error: unknown,
  provider: AiProvider,
): NormalizedAiError {
  if (isAbortError(error)) {
    return new NormalizedAiError("INTERNAL_ERROR", 499, false);
  }

  const status = readNumericProperty(error, "status");
  const name = readStringProperty(error, "name");
  const message = readStringProperty(error, "message").toLowerCase();

  if (
    provider === "gemini" &&
    /(reached a rate limit|quota exceeded|resource exhausted|set up billing|billing required|free-tier limit reached)/u.test(
      message,
    )
  ) {
    return new NormalizedAiError("AI_PROVIDER_QUOTA_EXCEEDED", 429, false);
  }
  if (
    /(not valid for (the )?selected provider|wrong provider)/u.test(message)
  ) {
    return new NormalizedAiError("PROVIDER_KEY_MISMATCH", 401, false);
  }

  if (
    status === 401 ||
    status === 403 ||
    (provider === "gemini" && status === 400)
  ) {
    return new NormalizedAiError("AI_AUTHENTICATION_FAILED", 403, false);
  }
  if (status === 408 || name.includes("Timeout")) {
    return new NormalizedAiError("AI_PROVIDER_TIMEOUT", 504, true);
  }
  if (status === 429) {
    return new NormalizedAiError("RATE_LIMITED", 429, true);
  }
  if (status !== undefined && status >= 500) {
    return new NormalizedAiError("AI_PROVIDER_UNAVAILABLE", 503, true);
  }

  return new NormalizedAiError("AI_PROVIDER_UNAVAILABLE", 503, true);
}

export function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    readStringProperty(error, "name") === "AbortError"
  );
}

function readNumericProperty(value: unknown, property: string) {
  if (typeof value !== "object" || value === null || !(property in value)) {
    return undefined;
  }
  const candidate = Reflect.get(value, property);
  return typeof candidate === "number" ? candidate : undefined;
}

function readStringProperty(value: unknown, property: string) {
  if (typeof value !== "object" || value === null || !(property in value)) {
    return "";
  }
  const candidate = Reflect.get(value, property);
  return typeof candidate === "string" ? candidate : "";
}
