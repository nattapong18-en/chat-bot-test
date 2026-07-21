type StreamingIndicatorProps = {
  label?: string;
};

export function StreamingIndicator({
  label = "Responding",
}: StreamingIndicatorProps) {
  return (
    <span
      className="text-muted-foreground inline-flex items-center gap-1.5 text-xs"
      role="status"
    >
      <span className="relative flex size-2">
        <span className="bg-primary/40 absolute inline-flex size-full animate-ping rounded-full motion-reduce:animate-none" />
        <span className="bg-primary relative inline-flex size-2 rounded-full" />
      </span>
      {label}
    </span>
  );
}
