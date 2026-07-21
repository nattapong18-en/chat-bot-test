import {
  BadgeDollarSignIcon,
  FootprintsIcon,
  ShieldCheckIcon,
  TrophyIcon,
  type LucideIcon,
} from "lucide-react";

type PromptSuggestion = {
  title: string;
  prompt: string;
  icon: LucideIcon;
};

const suggestions: PromptSuggestion[] = [
  {
    title: "เลือกตามตำแหน่ง",
    prompt: "ช่วยแนะนำรองเท้าบาสสำหรับพอยต์การ์ด",
    icon: TrophyIcon,
  },
  {
    title: "เลือกตามงบประมาณ",
    prompt: "อยากได้รองเท้าบาสเล่นกลางแจ้ง งบไม่เกิน 4,000 บาท",
    icon: BadgeDollarSignIcon,
  },
  {
    title: "Compare support",
    prompt: "Compare cushioning and support for basketball shoes",
    icon: ShieldCheckIcon,
  },
  {
    title: "Find the right fit",
    prompt: "Which basketball shoes are suitable for wide feet?",
    icon: FootprintsIcon,
  },
];

type PromptSuggestionsProps = {
  onSelect?: (prompt: string) => void;
};

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {suggestions.map(({ title, prompt, icon: Icon }) => (
        <li key={title}>
          <button
            type="button"
            className="group border-border bg-card hover:border-foreground/20 hover:bg-muted/40 focus-visible:ring-ring focus-visible:ring-offset-background h-full w-full rounded-xl border p-4 text-left shadow-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label={`${title}: ${prompt}`}
            onClick={() => onSelect?.(prompt)}
          >
            <span className="bg-muted text-muted-foreground group-hover:text-foreground flex size-8 items-center justify-center rounded-lg transition-colors">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="mt-4 block text-sm font-medium">{title}</span>
            <span className="text-muted-foreground mt-1 block text-sm leading-5">
              {prompt}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
