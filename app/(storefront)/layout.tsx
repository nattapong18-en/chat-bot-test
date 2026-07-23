import type { ReactNode } from "react";

import { DisclaimerBanner } from "@/components/storefront/disclaimer-banner";
import { FloatingChatButton } from "@/components/storefront/floating-chat-button";
import { Footer } from "@/components/storefront/footer";
import { StorefrontNav } from "@/components/storefront/storefront-nav";

type StorefrontLayoutProps = {
  children: ReactNode;
};

export default function StorefrontLayout({ children }: StorefrontLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <DisclaimerBanner />
      <StorefrontNav />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
}
