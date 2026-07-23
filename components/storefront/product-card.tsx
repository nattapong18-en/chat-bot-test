import { ShirtIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { ALL_POSITIONS, ALL_COURT_TYPES } from "@/data/products";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("th-TH").format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const positionLabels = product.positions
    .map((p) => ALL_POSITIONS.find((ap) => ap.value === p))
    .filter(Boolean);

  const courtLabel = ALL_COURT_TYPES.find(
    (c) => c.value === product.courtTypes[0],
  );

  return (
    <article className="border-border bg-card group relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-md motion-safe:hover:-translate-y-0.5">
      <div className="bg-muted/50 flex aspect-[4/3] items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <ShirtIcon
            className="text-muted-foreground/40 size-16"
            aria-hidden="true"
          />
          <span className="text-muted-foreground/30 px-4 text-xs">
            {product.brand} &middot; {product.name}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs font-medium">
              {product.brand}
            </p>
            <h3 className="truncate text-sm font-semibold">{product.name}</h3>
          </div>
          <span className="text-accent shrink-0 text-xs font-semibold">
            ฿{formatPrice(product.referencePrice)}
          </span>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-xs leading-5">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {positionLabels.slice(0, 3).map((p) => (
            <span
              key={p!.value}
              className="bg-accent/10 text-accent inline-flex rounded-full px-2 py-0.5 text-[0.6875rem] font-medium"
            >
              {p!.labelTh}
            </span>
          ))}
          {courtLabel && (
            <span
              className={cn(
                "inline-flex rounded-full px-2 py-0.5 text-[0.6875rem] font-medium",
                product.courtTypes[0] === "outdoor"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
              )}
            >
              {courtLabel.labelTh}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            asChild
          >
            <Link href={`/products/${product.slug}`}>ดูรายละเอียด</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-xs" asChild>
            <Link
              href={`/chat?q=${encodeURIComponent(`ช่วยวิเคราะห์ ${product.brand} ${product.name} ว่าเหมาะกับตำแหน่งและสไตล์การเล่นของผมหรือไม่`)}`}
            >
              ถาม CourtFit
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
