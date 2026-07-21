import "server-only";

import { GoogleGenAI } from "@google/genai";

import { getProviderModel } from "@/lib/ai/config";
import { normalizeProviderError } from "@/lib/ai/errors";
import { GEMINI_BASKETBALL_SHOE_ASSISTANT_INSTRUCTIONS } from "@/lib/ai/instructions";
import type { ProviderAdapter, ProviderFinishReason } from "@/lib/ai/types";

const GEMINI_RECOMMENDATION_TEMPERATURE = 0.3;
const GEMINI_MAX_OUTPUT_TOKENS = 2_048;
const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/";

export const streamGeminiResponse: ProviderAdapter = async function* ({
  apiKey,
  messages,
  signal,
}) {
  try {
    const client = new GoogleGenAI({
      apiKey,
      vertexai: false,
      httpOptions: { baseUrl: GEMINI_API_BASE_URL },
    });
    const stream = await client.models.generateContentStream({
      model: getProviderModel("gemini"),
      contents: messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
      config: {
        systemInstruction: GEMINI_BASKETBALL_SHOE_ASSISTANT_INSTRUCTIONS,
        temperature: GEMINI_RECOMMENDATION_TEMPERATURE,
        maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
        abortSignal: signal,
      },
    });

    let finishReason: ProviderFinishReason = "OTHER";

    for await (const chunk of stream) {
      for (const candidate of chunk.candidates ?? []) {
        const text = candidate.content?.parts
          ?.map((part) => (typeof part.text === "string" ? part.text : ""))
          .join("");

        if (text) {
          yield { type: "text_delta", delta: text };
        }
        if (candidate.finishReason) {
          finishReason = toProviderFinishReason(candidate.finishReason);
        }
      }
    }

    yield { type: "completed", finishReason };
  } catch (error) {
    throw normalizeProviderError(error, "gemini");
  }
};

function toProviderFinishReason(reason: string): ProviderFinishReason {
  switch (reason) {
    case "STOP":
    case "MAX_TOKENS":
    case "SAFETY":
    case "RECITATION":
      return reason;
    default:
      return "OTHER";
  }
}
