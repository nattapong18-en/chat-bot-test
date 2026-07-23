"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";

const NAV_ITEMS = [
  { href: "/", label: "หน้าแรก", labelEn: "Home" },
  { href: "/products", label: "สินค้า", labelEn: "Products" },
  { href: "/chat", label: "AI Shoe Finder", labelEn: "AI Shoe Finder" },
  { href: "/about", label: "เกี่ยวกับ", labelEn: "About" },
] as const;

export function StorefrontNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-border/70 bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <button
          type="button"
          className="hover:bg-muted inline-flex items-center justify-center rounded-lg p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <XIcon className="size-5" aria-hidden="true" />
          ) : (
            <MenuIcon className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="border-border/70 bg-background border-t md:hidden"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="space-y-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "hover:bg-muted block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-border/60 flex items-center justify-between border-t pt-3">
              <span className="text-muted-foreground text-xs">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
