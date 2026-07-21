"use client";

import { MenuIcon } from "lucide-react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type MobileSidebarProps = {
  defaultOpen?: boolean;
};

export function MobileSidebar({ defaultOpen = false }: MobileSidebarProps) {
  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation"
        >
          <MenuIcon className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby="mobile-navigation-description">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription
          id="mobile-navigation-description"
          className="sr-only"
        >
          Start a new conversation or open a static conversation preview.
        </SheetDescription>
        <AppSidebar />
      </SheetContent>
    </Sheet>
  );
}
