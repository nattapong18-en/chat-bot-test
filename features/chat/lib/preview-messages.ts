import type { ChatMessage } from "@/features/chat/types/chat";

const previewCreatedAt = "2026-01-01T00:00:00.000Z";

export const previewMessages: ChatMessage[] = [
  {
    id: "preview-user-one",
    role: "user",
    content:
      "I play point guard on outdoor courts and prefer a responsive feel.",
    status: "completed",
    createdAt: previewCreatedAt,
  },
  {
    id: "preview-assistant-one",
    role: "assistant",
    content:
      "Mock general guidance: Look for durable outsole rubber, reliable lateral support, and cushioning that still feels responsive during quick changes of direction.",
    status: "completed",
    createdAt: previewCreatedAt,
    relatedUserMessageId: "preview-user-one",
  },
  {
    id: "preview-user-two",
    role: "user",
    content: "What else should I consider for wide feet?",
    status: "completed",
    createdAt: previewCreatedAt,
  },
  {
    id: "preview-assistant-two",
    role: "assistant",
    content:
      "Check for a roomy toe box and avoid sizing advice without trying the shoe.",
    status: "streaming",
    createdAt: previewCreatedAt,
    relatedUserMessageId: "preview-user-two",
  },
  {
    id: "preview-assistant-error",
    role: "assistant",
    content: "",
    status: "error",
    createdAt: previewCreatedAt,
    error: "This is a static error-state preview.",
    relatedUserMessageId: "preview-user-two",
  },
];
