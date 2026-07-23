"use client";

import { RotateCcwIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ALL_BRANDS,
  ALL_COURT_TYPES,
  ALL_FOOT_SHAPES,
  ALL_POSITIONS,
  ALL_PRIORITIES,
  type CourtType,
  type FootShape,
  type PerformancePriority,
  type Position,
  type ProductFilters,
} from "@/data/products";
import { cn } from "@/lib/utils";

const PRICE_RANGES: { label: string; value: [number, number] }[] = [
  { label: "ต่ำกว่า 4,000 บาท", value: [0, 4000] },
  { label: "4,000 - 6,000 บาท", value: [4000, 6000] },
  { label: "6,000 - 8,000 บาท", value: [6000, 8000] },
  { label: "สูงกว่า 8,000 บาท", value: [8000, Infinity] },
];

type ProductFiltersProps = {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  resultsCount: number;
};

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-semibold">{label}</legend>
      {children}
    </fieldset>
  );
}

function CheckboxGroup<T extends string>({
  options,
  selected,
  onChange,
  getLabel,
}: {
  options: { value: T; labelTh: string; labelEn: string }[];
  selected: T[];
  onChange: (value: T) => void;
  getLabel: (opt: { value: T; labelTh: string; labelEn: string }) => string;
}) {
  return (
    <div className="space-y-1">
      {options.map((opt) => {
        const checked = selected.includes(opt.value);
        return (
          <label
            key={opt.value}
            className={cn(
              "hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              checked && "bg-accent/5",
            )}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="border-border text-accent focus:ring-accent/30 size-4 rounded"
            />
            <span
              className={cn(
                "text-muted-foreground",
                checked && "text-foreground",
              )}
            >
              {getLabel(opt)}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function RadioGroup<T extends string>({
  options,
  selected,
  onChange,
  getLabel,
  allowDeselect = false,
}: {
  options: { value: T; labelTh: string; labelEn: string }[];
  selected: T | null;
  onChange: (value: T | null) => void;
  getLabel: (opt: { value: T; labelTh: string; labelEn: string }) => string;
  allowDeselect?: boolean;
}) {
  return (
    <div className="space-y-1">
      {options.map((opt) => {
        const checked = selected === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              checked && "bg-accent/5",
            )}
          >
            <input
              type="radio"
              checked={checked}
              onChange={() => {
                if (allowDeselect && checked) {
                  onChange(null);
                } else {
                  onChange(opt.value);
                }
              }}
              className="border-border text-accent focus:ring-accent/30 size-4"
            />
            <span
              className={cn(
                "text-muted-foreground",
                checked && "text-foreground",
              )}
            >
              {getLabel(opt)}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function ProductFilters({
  filters,
  onChange,
  resultsCount,
}: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleBrand = useCallback(
    (brand: string) => {
      const next = filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand];
      onChange({ ...filters, brands: next });
    },
    [filters, onChange],
  );

  const togglePosition = useCallback(
    (position: Position) => {
      const next = filters.positions.includes(position)
        ? filters.positions.filter((p) => p !== position)
        : [...filters.positions, position];
      onChange({ ...filters, positions: next });
    },
    [filters, onChange],
  );

  const togglePriority = useCallback(
    (priority: PerformancePriority) => {
      const next = filters.priorities.includes(priority)
        ? filters.priorities.filter((p) => p !== priority)
        : [...filters.priorities, priority];
      onChange({ ...filters, priorities: next });
    },
    [filters, onChange],
  );

  const setCourtType = useCallback(
    (courtType: CourtType | null) => {
      onChange({ ...filters, courtTypes: courtType ? [courtType] : [] });
    },
    [filters, onChange],
  );

  const setFootShape = useCallback(
    (footShape: FootShape | null) => {
      onChange({ ...filters, footShape });
    },
    [filters, onChange],
  );

  const setPriceRange = useCallback(
    (range: [number, number] | null) => {
      const next =
        range &&
        filters.priceRange?.[0] === range[0] &&
        filters.priceRange?.[1] === range[1]
          ? null
          : range;
      onChange({ ...filters, priceRange: next });
    },
    [filters, onChange],
  );

  const clearFilters = useCallback(() => {
    onChange({
      brands: [],
      positions: [],
      courtTypes: [],
      priceRange: null,
      priorities: [],
      footShape: null,
    });
  }, [onChange]);

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.positions.length > 0 ||
    filters.courtTypes.length > 0 ||
    filters.priceRange !== null ||
    filters.priorities.length > 0 ||
    filters.footShape !== null;

  const filterContent = (
    <div className="space-y-6" role="group" aria-label="Product filters">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">{resultsCount} รายการ</p>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            <RotateCcwIcon className="mr-1 size-3" aria-hidden="true" />
            ล้างตัวกรอง
          </Button>
        )}
      </div>

      <FilterSection label="ยี่ห้อ / Brand">
        <div className="space-y-1">
          {ALL_BRANDS.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className={cn(
                  "hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                  checked && "bg-accent/5",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBrand(brand)}
                  className="border-border text-accent focus:ring-accent/30 size-4 rounded"
                />
                <span
                  className={cn(
                    "text-muted-foreground",
                    checked && "text-foreground",
                  )}
                >
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection label="ตำแหน่งการเล่น / Position">
        <CheckboxGroup
          options={ALL_POSITIONS}
          selected={filters.positions}
          onChange={togglePosition}
          getLabel={(opt) => `${opt.labelTh} (${opt.labelEn})`}
        />
      </FilterSection>

      <FilterSection label="ชนิดสนาม / Court Type">
        <RadioGroup
          options={ALL_COURT_TYPES}
          selected={filters.courtTypes[0] ?? null}
          onChange={setCourtType}
          getLabel={(opt) => `${opt.labelTh} (${opt.labelEn})`}
          allowDeselect
        />
      </FilterSection>

      <FilterSection label="ช่วงราคาอ้างอิง / Price Range">
        <RadioGroup
          options={PRICE_RANGES.map((r) => ({
            value: r.label,
            labelTh: r.label,
            labelEn: r.label,
          }))}
          selected={
            filters.priceRange
              ? (PRICE_RANGES.find(
                  (r) =>
                    r.value[0] === filters.priceRange![0] &&
                    r.value[1] === filters.priceRange![1],
                )?.label ?? null)
              : null
          }
          onChange={(label) => {
            const range = PRICE_RANGES.find((r) => r.label === label);
            setPriceRange(range ? range.value : null);
          }}
          getLabel={(opt) => opt.labelTh}
          allowDeselect
        />
      </FilterSection>

      <FilterSection label="คุณสมบัติเด่น / Priority">
        <CheckboxGroup
          options={ALL_PRIORITIES}
          selected={filters.priorities}
          onChange={togglePriority}
          getLabel={(opt) => `${opt.labelTh} (${opt.labelEn})`}
        />
      </FilterSection>

      <FilterSection label="รูปเท้า / Foot Shape">
        <RadioGroup
          options={ALL_FOOT_SHAPES}
          selected={filters.footShape}
          onChange={setFootShape}
          getLabel={(opt) => `${opt.labelTh} (${opt.labelEn})`}
          allowDeselect
        />
      </FilterSection>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">
        <div className="border-border bg-card sticky top-20 rounded-xl border p-4">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontalIcon
              className="text-muted-foreground size-4"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold">ตัวกรอง</span>
          </div>
          {filterContent}
        </div>
      </div>

      <div className="md:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={() => setMobileOpen(true)}
          className="mb-4 w-full"
          aria-label="เปิดตัวกรองสินค้า"
        >
          <SlidersHorizontalIcon className="size-4" aria-hidden="true" />
          ตัวกรอง{hasActiveFilters ? " (เปิดอยู่)" : ""}
        </Button>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 flex"
            role="dialog"
            aria-modal="true"
            aria-label="ตัวกรองสินค้า"
          >
            <div
              className="bg-background/80 absolute inset-0 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="bg-background relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto border-l shadow-xl">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <span className="text-sm font-semibold">ตัวกรอง</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                  aria-label="ปิดตัวกรอง"
                >
                  <XIcon className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">{filterContent}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
