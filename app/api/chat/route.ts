import { NextResponse } from "next/server";

import { chatRequestSchema } from "@/features/chat/schemas/chat-schema";
import { detectChatLanguage } from "@/features/chat/lib/chat-language";
import type {
  AiErrorCode,
  ChatErrorResponse,
  ChatStreamEvent,
} from "@/features/chat/types/api";
import type { ChatLanguage } from "@/features/chat/types/chat";
import {
  isAbortError,
  NormalizedAiError,
  toPublicAiError,
} from "@/lib/ai/errors";
import { getProviderModel } from "@/lib/ai/config";
import { ASSISTANT_INSTRUCTIONS_VERSION } from "@/lib/ai/instructions";
import {
  normalizeAssistantResponse,
  splitNormalizedResponse,
} from "@/lib/ai/response-normalizer";
import { getProviderAdapter } from "@/lib/ai/router";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
};

export async function POST(request: Request) {
  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return errorResponse("INVALID_REQUEST", "en", 400, false);
  }

  const language = detectRequestLanguage(rawBody);
  const result = chatRequestSchema.safeParse(rawBody);

  if (!result.success) {
    const code = classifyValidationError(rawBody, result.error.issues);
    return errorResponse(code, language, 400, false);
  }

  const { provider, apiKey, messages } = result.data;
  const adapter = getProviderAdapter(provider);
  const requestId = crypto.randomUUID();
  const startedAt = performance.now();
  const encoder = new TextEncoder();

  logDevelopmentDiagnostic({
    requestId,
    provider,
    adapter: provider,
    authenticationFailed: false,
    event: "adapter_selected",
    model: getProviderModel(provider),
    providerStatus: null,
    durationMs: 0,
  });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        let providerResponse = "";

        for await (const delta of adapter({
          apiKey,
          messages,
          signal: request.signal,
        })) {
          providerResponse += delta;
        }

        if (request.signal.aborted) {
          controller.close();
          return;
        }

        const normalizedResponse = normalizeAssistantResponse(
          providerResponse,
          {
            language,
            messages,
          },
        );

        for (const delta of splitNormalizedResponse(normalizedResponse)) {
          if (request.signal.aborted) {
            controller.close();
            return;
          }

          controller.enqueue(
            encoder.encode(serializeEvent({ type: "text_delta", delta })),
          );
        }

        controller.enqueue(encoder.encode(serializeEvent({ type: "done" })));
        controller.close();
      } catch (error) {
        if (request.signal.aborted || isAbortError(error)) {
          controller.close();
          return;
        }

        const publicError = toPublicAiError(error, language, provider);
        logDevelopmentDiagnostic({
          requestId,
          provider,
          adapter: provider,
          authenticationFailed: isAuthenticationError(publicError.code),
          event: "adapter_failed",
          model: getProviderModel(provider),
          providerStatus:
            error instanceof NormalizedAiError
              ? (error.providerStatus ?? null)
              : null,
          durationMs: Math.round(performance.now() - startedAt),
        });
        controller.enqueue(
          encoder.encode(serializeEvent({ type: "error", error: publicError })),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...NO_STORE_HEADERS,
      ...developmentDiagnosticHeaders(provider, requestId),
      "Content-Type": "application/x-ndjson; charset=utf-8",
    },
  });
}

function developmentDiagnosticHeaders(
  provider: string,
  requestId: string,
): HeadersInit {
  if (process.env.NODE_ENV !== "development") {
    return {};
  }

  return {
    "X-AI-Provider": provider,
    "X-AI-Adapter": provider,
    "X-Request-ID": requestId,
    "X-Assistant-Instructions-Attached": "true",
    "X-Assistant-Instructions-Version": ASSISTANT_INSTRUCTIONS_VERSION,
  };
}

type DevelopmentDiagnostic = {
  requestId: string;
  provider: string;
  adapter: string;
  authenticationFailed: boolean;
  durationMs: number;
  event: "adapter_selected" | "adapter_failed";
  model: string;
  providerStatus: number | null;
};

function logDevelopmentDiagnostic(diagnostic: DevelopmentDiagnostic) {
  if (process.env.NODE_ENV === "development") {
    console.info("AI provider diagnostic", diagnostic);
  }
}

function isAuthenticationError(code: AiErrorCode): boolean {
  return code === "AI_AUTHENTICATION_FAILED" || code === "INVALID_API_KEY";
}

function serializeEvent(event: ChatStreamEvent): string {
  return `${JSON.stringify(event)}\n`;
}

function errorResponse(
  code: AiErrorCode,
  language: ChatLanguage,
  status: number,
  retryable: boolean,
) {
  const error = toPublicAiError(
    new NormalizedAiError(code, status, retryable),
    language,
  );
  const body: ChatErrorResponse = { type: "error", error };

  return NextResponse.json(body, { status, headers: NO_STORE_HEADERS });
}

function classifyValidationError(
  rawBody: unknown,
  issues: readonly { path: PropertyKey[]; message: string }[],
): AiErrorCode {
  const body = isRecord(rawBody) ? rawBody : undefined;

  if (body?.provider === undefined) return "AI_PROVIDER_REQUIRED";
  if (body.provider !== "openai" && body.provider !== "gemini") {
    return "UNSUPPORTED_AI_PROVIDER";
  }
  if (typeof body.apiKey !== "string" || body.apiKey.trim().length === 0) {
    return "API_KEY_REQUIRED";
  }
  if (
    issues.some(
      (issue) =>
        issue.path[0] === "messages" &&
        (issue.message.includes("long") || issue.message.includes("large")),
    )
  ) {
    return "MESSAGE_TOO_LONG";
  }
  return "INVALID_REQUEST";
}

function detectRequestLanguage(rawBody: unknown): ChatLanguage {
  if (!isRecord(rawBody) || !Array.isArray(rawBody.messages)) return "en";

  const latestUserMessage = [...rawBody.messages]
    .reverse()
    .find(
      (message) =>
        isRecord(message) &&
        message.role === "user" &&
        typeof message.content === "string",
    );

  return isRecord(latestUserMessage) &&
    typeof latestUserMessage.content === "string"
    ? detectChatLanguage(latestUserMessage.content)
    : "en";
}

function isRecord(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === "object" && value !== null;
}
