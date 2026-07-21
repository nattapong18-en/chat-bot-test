type MessageContentProps = {
  content: string;
};

export function MessageContent({ content }: MessageContentProps) {
  return (
    <div className="text-[0.9375rem] leading-7">
      <p className="break-words whitespace-pre-wrap">{content}</p>
    </div>
  );
}
