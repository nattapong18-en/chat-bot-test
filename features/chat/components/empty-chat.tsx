"use client";

import { CircleDotDashedIcon } from "lucide-react";
import { useState } from "react";

import { PromptSuggestions } from "@/features/chat/components/prompt-suggestions";

type EmptyChatProps = {
  onPromptSelect?: (prompt: string) => void;
  onDraftChange?: (draft: string) => void;
};

const controlGroups = [
  { label: "Position", values: ["PG", "SG", "SF", "PF", "C"] },
  { label: "Court", values: ["ในร่ม", "กลางแจ้ง"] },
  {
    label: "Priority",
    values: [
      "คล่องตัว",
      "ซัพพอร์ตดี",
      "รองรับแรงกระแทก",
      "พื้นทน",
      "เหมาะกับเท้ากว้าง",
    ],
  },
  {
    label: "Budget",
    values: ["ไม่เกิน 3,000 บาท", "3,000–5,000 บาท", "มากกว่า 5,000 บาท"],
  },
] as const;

export function EmptyChat({ onPromptSelect, onDraftChange }: EmptyChatProps) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  function select(label: string, value: string) {
    const next = { ...selected, [label]: value };
    setSelected(next);
    const parts = [
      next.Position && `ผมเล่น ${next.Position}`,
      next.Court && `เล่น${next.Court}`,
      next.Priority && `เน้น${next.Priority}`,
      next.Budget && `งบ${next.Budget}`,
    ].filter(Boolean);
    onDraftChange?.(`${parts.join(" ")} ช่วยแนะนำรองเท้าที่เหมาะให้หน่อย`);
  }
  return (
    <section className="mx-auto flex w-full max-w-[52rem] flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
      <div className="border-border bg-card mb-5 flex size-12 items-center justify-center rounded-2xl border shadow-sm">
        <CircleDotDashedIcon
          className="size-5 text-orange-600"
          aria-hidden="true"
        />
      </div>
      <h1 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
        เลือกรองเท้าบาสที่เหมาะกับคุณ
      </h1>
      <p className="text-muted-foreground mt-3 max-w-lg text-center text-sm leading-6 sm:text-base">
        บอกตำแหน่ง สไตล์การเล่น งบประมาณ หรือรูปเท้าของคุณได้เลย
        <span className="mt-1 block">
          Ask in Thai or English about play style, fit, support, or budget.
        </span>
      </p>
      <div className="mt-8 w-full">
        <div className="border-border bg-card mb-5 rounded-2xl border p-4 text-left">
          <p className="text-sm font-semibold">เริ่มจากสิ่งที่สำคัญกับคุณ</p>
          <div className="mt-3 space-y-3">
            {controlGroups.map((group) => (
              <div key={group.label}>
                <p className="text-muted-foreground text-xs font-medium">
                  {group.label}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.values.map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={selected[group.label] === value}
                      onClick={() => select(group.label, value)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition focus-visible:ring-2 focus-visible:ring-orange-500 ${selected[group.label] === value ? "border-orange-600 bg-orange-600 text-white" : "border-border hover:border-orange-500"}`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <PromptSuggestions onSelect={onPromptSelect} />
      </div>
    </section>
  );
}
