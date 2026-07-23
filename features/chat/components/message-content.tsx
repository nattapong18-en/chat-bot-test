import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

type MessageContentProps = {
  content: string;
  isUser?: boolean;
};

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-3 break-words last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ol: ({ children }) => (
    <ol className="mb-3 list-inside list-decimal space-y-1 pl-1 last:mb-0 [&>li]:pl-1">
      {children}
    </ol>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 list-inside list-disc space-y-1 pl-1 last:mb-0 [&>li]:pl-1">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="break-words">{children}</li>,
  code: ({ children }) => (
    <code className="bg-code text-code-foreground border-code-border rounded-md border px-1.5 py-0.5 text-[0.8125rem] font-medium break-words">
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent decoration-accent/30 hover:decoration-accent break-all underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
};

function PlainTextContent({ content }: { content: string }) {
  return <p className="break-words whitespace-pre-wrap">{content}</p>;
}

export function MessageContent({ content, isUser }: MessageContentProps) {
  if (isUser) {
    return (
      <div className="text-[0.9375rem] leading-7">
        <PlainTextContent content={content} />
      </div>
    );
  }

  return (
    <div className="text-[0.9375rem] leading-7 [&_*]:break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
        skipHtml={true}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
