import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/shared/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CourtFit | ผู้ช่วยเลือกรองเท้าบาสด้วย AI",
    template: "%s | CourtFit",
  },
  description:
    "CourtFit คือโครงการศึกษาเกี่ยวกับการเลือกรองเท้าบาสเกตบอลด้วย AI ไม่ใช่ร้านค้าจริง",
  robots: { index: false, follow: false },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
