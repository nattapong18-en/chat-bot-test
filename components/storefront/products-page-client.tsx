"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/storefront/product-card";
import { ProductFilters } from "@/components/storefront/product-filters";
import {
  PRODUCTS,
  type ProductFilters as ProductFiltersType,
  type CourtType,
  type Position,
} from "@/data/products";

function filterProducts(
  products: typeof PRODUCTS,
  filters: ProductFiltersType,
): typeof PRODUCTS {
  return products.filter((product) => {
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    if (filters.positions.length > 0) {
      const hasPosition = filters.positions.some((pos) =>
        product.positions.includes(pos),
      );
      if (!hasPosition) return false;
    }
    if (filters.courtTypes.length > 0) {
      const hasCourt = filters.courtTypes.some((ct) =>
        product.courtTypes.includes(ct),
      );
      if (!hasCourt) return false;
    }
    if (filters.priceRange !== null) {
      const [min, max] = filters.priceRange;
      if (product.referencePrice < min || product.referencePrice > max) {
        return false;
      }
    }
    if (filters.priorities.length > 0) {
      const hasPriority = filters.priorities.some((p) =>
        product.priorities.includes(p),
      );
      if (!hasPriority) return false;
    }
    if (filters.footShape !== null && product.footShape !== filters.footShape) {
      return false;
    }
    return true;
  });
}

type ProductsPageClientProps = {
  initialPosition?: Position;
  initialCourtType?: CourtType;
};

export function ProductsPageClient({
  initialPosition,
  initialCourtType,
}: ProductsPageClientProps) {
  const [filters, setFilters] = useState<ProductFiltersType>(() => ({
    brands: [],
    positions: initialPosition ? [initialPosition] : [],
    courtTypes: initialCourtType ? [initialCourtType] : [],
    priceRange: null,
    priorities: [],
    footShape: null,
  }));

  const filtered = useMemo(() => filterProducts(PRODUCTS, filters), [filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          สินค้าทั้งหมด
        </h1>
        <p className="text-muted-foreground mt-1 text-sm leading-6">
          ข้อมูลอ้างอิงเพื่อการศึกษาเท่านั้น · ไม่ใช่ร้านค้าจริง
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside aria-label="ตัวกรองสินค้า" className="hidden lg:block">
          <div className="border-border bg-card sticky top-20 rounded-xl border p-4">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              resultsCount={filtered.length}
            />
          </div>
        </aside>

        <div>
          <div className="lg:hidden">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              resultsCount={filtered.length}
            />
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="border-border bg-card flex flex-col items-center justify-center rounded-2xl border p-12 text-center">
              <p className="text-muted-foreground text-sm font-medium">
                ไม่พบสินค้าที่ตรงกับตัวกรอง
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                ลองปรับเปลี่ยนตัวกรองเพื่อดูผลลัพธ์เพิ่มเติม
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
