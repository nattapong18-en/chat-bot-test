export type ChatRole = "user" | "assistant";

export type ChatLanguage = "th" | "en";

export type ChatMessageStatus =
  "pending" | "streaming" | "completed" | "stopped" | "error";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  status: ChatMessageStatus;
  createdAt: string;
  error?: string;
  errorCode?: import("@/features/chat/types/api").AiErrorCode;
  language?: ChatLanguage;
  relatedUserMessageId?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}
