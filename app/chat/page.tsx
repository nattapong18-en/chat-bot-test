import type { Metadata } from "next";

import { ChatScreen } from "@/features/chat/components/chat-screen";

type ChatPageProps = {
  searchParams: Promise<{ q?: string; preview?: string }>;
};

export const metadata: Metadata = {
  title: "AI Shoe Finder | CourtFit",
  description:
    "ให้ AI ช่วยคุณเลือกรองเท้าบาสเกตบอลที่เหมาะสมกับตำแหน่ง สไตล์ และงบประมาณ",
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const { q, preview } = await searchParams;

  return <ChatScreen initialDraft={q} preview={preview} showStorefrontBar />;
}
