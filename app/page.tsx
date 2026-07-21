import { ChatScreen } from "@/features/chat/components/chat-screen";

type HomePageProps = {
  searchParams: Promise<{ preview?: string | string[] }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { preview } = await searchParams;

  return (
    <ChatScreen preview={typeof preview === "string" ? preview : undefined} />
  );
}
