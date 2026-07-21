import { z } from "zod";

const MAX_API_KEY_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4_000;
const MAX_MESSAGE_COUNT = 50;
const MAX_CONVERSATION_LENGTH = 50_000;

export const chatRequestSchema = z
  .strictObject({
    provider: z.enum(["openai", "gemini"], {
      error: "A supported AI provider is required.",
    }),
    apiKey: z
      .string({ error: "An API key is required." })
      .trim()
      .min(1, "An API key is required.")
      .max(MAX_API_KEY_LENGTH, "The API key is too long."),
    messages: z
      .array(
        z.strictObject({
          role: z.enum(["user", "assistant"]),
          content: z
            .string()
            .trim()
            .min(1, "Messages cannot be empty.")
            .max(MAX_MESSAGE_LENGTH, "A message is too long."),
        }),
      )
      .min(1, "At least one message is required.")
      .max(MAX_MESSAGE_COUNT, "Too many messages were provided."),
  })
  .superRefine(({ messages }, context) => {
    const totalLength = messages.reduce(
      (length, message) => length + message.content.length,
      0,
    );

    if (totalLength > MAX_CONVERSATION_LENGTH) {
      context.addIssue({
        code: "custom",
        path: ["messages"],
        message: "The conversation is too large.",
      });
    }
  });

export type ValidatedChatRequest = z.infer<typeof chatRequestSchema>;
