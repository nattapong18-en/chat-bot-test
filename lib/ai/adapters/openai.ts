import "server-only";

import OpenAI from "openai";

import { getProviderModel } from "@/lib/ai/config";
import { normalizeProviderError } from "@/lib/ai/errors";
import { BASKETBALL_SHOE_ASSISTANT_INSTRUCTIONS } from "@/lib/ai/instructions";
import type { ProviderAdapter } from "@/lib/ai/types";

const OPENAI_API_BASE_URL = "https://api.openai.com/v1";

export const streamOpenAiResponse: ProviderAdapter = async function* ({
  apiKey,
  messages,
  signal,
}) {
  try {
    const client = new OpenAI({ apiKey, baseURL: OPENAI_API_BASE_URL });
    const stream = await client.responses.create(
      {
        model: getProviderModel("openai"),
        instructions: BASKETBALL_SHOE_ASSISTANT_INSTRUCTIONS,
        input: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        stream: true,
      },
      { signal, maxRetries: 0 },
    );

    for await (const event of stream) {
      if (event.type === "response.output_text.delta" && event.delta) {
        yield event.delta;
      }
    }
  } catch (error) {
    throw normalizeProviderError(error, "openai");
  }
};
