"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

const NEAR_BOTTOM_THRESHOLD_PX = 120;

export function useAutoScroll(contentKey: string) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    const isNearBottom = distanceFromBottom <= NEAR_BOTTOM_THRESHOLD_PX;

    shouldAutoScrollRef.current = isNearBottom;
    setShowScrollToBottom(!isNearBottom);
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    shouldAutoScrollRef.current = true;
    setShowScrollToBottom(false);
    scrollAnchorRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  useLayoutEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollAnchorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [contentKey]);

  return {
    scrollContainerRef,
    scrollAnchorRef,
    showScrollToBottom,
    handleScroll,
    scrollToBottom,
  };
}
