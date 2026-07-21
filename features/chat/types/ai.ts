export const AI_PROVIDERS = ["openai", "gemini"] as const;

export type AiProvider = (typeof AI_PROVIDERS)[number];

export interface AiConnection {
  provider: AiProvider;
  apiKey: string;
}

export interface AiProviderOption {
  id: AiProvider;
  label: string;
  description: string;
  enabled: boolean;
}

export const AI_PROVIDER_OPTIONS: readonly AiProviderOption[] = [
  {
    id: "openai",
    label: "OpenAI",
    description: "Use your OpenAI API key.",
    enabled: true,
  },
  {
    id: "gemini",
    label: "Google Gemini",
    description: "Use your Google AI Studio API key.",
    enabled: true,
  },
];
