"use client";

import {
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { type FormEvent, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AI_PROVIDER_OPTIONS,
  type AiConnection,
  type AiProvider,
} from "@/features/chat/types/ai";
import { cn } from "@/lib/utils";

type AiConnectionSetupProps = {
  onConnect: (connection: AiConnection) => void;
  initialProvider?: AiProvider | null;
};

type ConnectionDraft = {
  provider: AiProvider | null;
  apiKey: string;
};

export function AiConnectionSetup({
  onConnect,
  initialProvider = null,
}: AiConnectionSetupProps) {
  const keyInputId = useId();
  const [connectionDraft, setConnectionDraft] = useState<ConnectionDraft>({
    provider: initialProvider,
    apiKey: "",
  });
  const [showKey, setShowKey] = useState(false);
  const { apiKey, provider } = connectionDraft;
  const canContinue = provider !== null && apiKey.trim().length > 0;

  function handleProviderChange(nextProvider: AiProvider) {
    if (nextProvider !== provider) {
      setConnectionDraft({ provider: nextProvider, apiKey: "" });
      setShowKey(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!provider || !apiKey.trim()) return;
    onConnect({ provider, apiKey: apiKey.trim() });
  }

  function clearKey() {
    setConnectionDraft((current) => ({ ...current, apiKey: "" }));
    setShowKey(false);
  }

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-10 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="border-border bg-card w-full max-w-xl rounded-2xl border p-5 shadow-sm sm:p-7"
        autoComplete="off"
      >
        <div className="bg-muted mb-5 flex size-11 items-center justify-center rounded-xl">
          <KeyRoundIcon className="size-5" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">
          เชื่อมต่อผู้ให้บริการ AI
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          Connect an AI provider with your own API key before starting the
          basketball shoe chat.
        </p>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium">
            เลือกผู้ให้บริการ AI / Select provider
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {AI_PROVIDER_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={cn(
                  "border-border focus-within:ring-ring cursor-pointer rounded-xl border p-4 transition focus-within:ring-2",
                  provider === option.id && "border-foreground/30 bg-muted/60",
                )}
              >
                <input
                  type="radio"
                  name="ai-provider"
                  value={option.id}
                  checked={provider === option.id}
                  onChange={() => handleProviderChange(option.id)}
                  className="accent-foreground"
                />
                <span className="ml-2 text-sm font-medium">{option.label}</span>
                <span className="text-muted-foreground mt-2 block text-xs leading-5">
                  {option.description}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor={keyInputId} className="text-sm font-medium">
            กรอก API Key / Enter API key
          </label>
          <div className="border-input focus-within:ring-ring mt-2 flex items-center rounded-xl border bg-transparent focus-within:ring-2">
            <input
              id={keyInputId}
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(event) =>
                setConnectionDraft((current) => ({
                  ...current,
                  apiKey: event.target.value,
                }))
              }
              disabled={!provider}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-describedby={`${keyInputId}-guidance`}
              placeholder={
                provider
                  ? "API Key จะอยู่ในหน่วยความจำชั่วคราวเท่านั้น"
                  : "เลือกผู้ให้บริการก่อน / Select a provider first"
              }
              className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowKey((visible) => !visible)}
              disabled={!apiKey}
              aria-label={
                showKey ? "ซ่อนคีย์ / Hide API key" : "แสดงคีย์ / Show API key"
              }
              className="mr-1"
            >
              {showKey ? (
                <EyeOffIcon className="size-4" aria-hidden="true" />
              ) : (
                <EyeIcon className="size-4" aria-hidden="true" />
              )}
            </Button>
          </div>
          <p
            id={`${keyInputId}-guidance`}
            className="text-muted-foreground mt-2 text-xs leading-5"
            aria-live="polite"
          >
            {!provider
              ? "กรุณาเลือก OpenAI หรือ Google Gemini ก่อน / Select a provider first."
              : !apiKey.trim()
                ? `กรุณากรอก API Key สำหรับ ${provider === "openai" ? "OpenAI" : "Google Gemini"}`
                : "ระบบจะตรวจสอบคีย์เมื่อส่งข้อความครั้งแรก / The key is checked on the first request."}
          </p>
        </div>

        <div className="bg-muted/70 mt-5 rounded-xl p-4 text-xs leading-5">
          <p className="flex gap-2 font-medium">
            <ShieldCheckIcon
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            คีย์จะถูกเก็บไว้ชั่วคราวระหว่างที่เปิดหน้านี้เท่านั้น
          </p>
          <p className="text-muted-foreground mt-2">
            The key is sent to the application server only for active chat
            requests and is cleared when this page refreshes or closes. API
            usage and charges are the key owner&apos;s responsibility.
          </p>
          <p className="text-muted-foreground mt-2">
            การดำเนินการต่อยังไม่ได้ยืนยันว่าคีย์ถูกต้อง ระบบจะตรวจสอบเมื่อส่ง
            ข้อความครั้งแรก
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={clearKey}
            disabled={!apiKey}
          >
            ล้างคีย์ / Clear key
          </Button>
          <Button type="submit" disabled={!canContinue}>
            ดำเนินการต่อ / Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
