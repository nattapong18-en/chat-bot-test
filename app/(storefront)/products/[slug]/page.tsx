import { notFound } from "next/navigation";
import { ShirtIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import {
  PRODUCTS,
  ALL_POSITIONS,
  ALL_COURT_TYPES,
  ALL_PRIORITIES,
  ALL_FOOT_SHAPES,
} from "@/data/products";
import { ProductCard } from "@/components/storefront/product-card";
import { cn } from "@/lib/utils";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("th-TH").format(price);
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return { title: "ไม่พบสินค้า | CourtFit" };
  }

  return {
    title: `${product.brand} ${product.name} | CourtFit`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.brand === product.brand ||
        p.positions.some((pos) => product.positions.includes(pos))),
  ).slice(0, 3);

  const positionLabels = product.positions
    .map((p) => ALL_POSITIONS.find((ap) => ap.value === p))
    .filter(Boolean);

  const courtLabels = product.courtTypes
    .map((c) => ALL_COURT_TYPES.find((ac) => ac.value === c))
    .filter(Boolean);

  const priorityLabels = product.priorities
    .map((p) => ALL_PRIORITIES.find((ap) => ap.value === p))
    .filter(Boolean);

  const footShapeLabel = ALL_FOOT_SHAPES.find(
    (f) => f.value === product.footShape,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="text-muted-foreground flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              สินค้าทั้งหมด
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground truncate" aria-current="page">
            {product.brand} {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-muted/50 flex aspect-[4/3] items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-3 text-center">
            <ShirtIcon
              className="text-muted-foreground/30 size-24"
              aria-hidden="true"
            />
            <span className="text-muted-foreground/40 text-sm">
              {product.brand} &middot; {product.name}
            </span>
            <span className="text-muted-foreground/30 text-xs">
              ภาพตัวอย่างเพื่อการศึกษา
            </span>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-sm font-medium">
            {product.brand}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-accent text-2xl font-bold">
              ฿{formatPrice(product.referencePrice)}
            </span>
            <span className="text-muted-foreground text-xs">(ราคาอ้างอิง)</span>
          </div>

          <p className="text-muted-foreground mt-4 text-sm leading-6">
            {product.shortDescription}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                ตำแหน่งที่适合 / Suitable Positions
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {positionLabels.map((p) => (
                  <span
                    key={p!.value}
                    className="bg-accent/10 text-accent inline-flex rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {p!.labelTh} ({p!.labelEn})
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                ชนิดสนาม / Court Types
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {courtLabels.map((c) => (
                  <span
                    key={c!.value}
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                      c!.value === "outdoor"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : c!.value === "indoor"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                    )}
                  >
                    {c!.labelTh}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                จุดเด่น / Priorities
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {priorityLabels.map((p) => (
                  <span
                    key={p!.value}
                    className="bg-muted inline-flex rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {p!.labelTh} ({p!.labelEn})
                  </span>
                ))}
              </div>
            </div>

            {footShapeLabel && (
              <div>
                <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  รูปเท้า / Foot Shape
                </h2>
                <p className="mt-1 text-sm">
                  {footShapeLabel.labelTh} ({footShapeLabel.labelEn})
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link
                href={`/chat?q=${encodeURIComponent(`ช่วยวิเคราะห์ ${product.brand} ${product.name} ว่าเหมาะกับตำแหน่งและสไตล์การเล่นของผมหรือไม่`)}`}
              >
                <SparklesIcon className="mr-2 size-4" aria-hidden="true" />
                ถาม CourtFit เกี่ยวกับรุ่นนี้
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">กลับไปสินค้าทั้งหมด</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold">รายละเอียดสินค้า</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-7">
            {product.description}
          </p>

          <h3 className="mt-6 text-sm font-semibold">คุณสมบัติเด่น</h3>
          <ul className="text-muted-foreground mt-2 space-y-1.5 text-sm leading-6">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent mt-1.5 block size-1.5 shrink-0 rounded-full bg-current" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold">ข้อควรพิจารณา</h2>
          <ul className="text-muted-foreground mt-3 space-y-1.5 text-sm leading-6">
            {product.considerations.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="bg-destructive/50 mt-1.5 block size-1.5 shrink-0 rounded-full" />
                {item}
              </li>
            ))}
          </ul>

          <div className="bg-muted/50 mt-6 rounded-xl border p-4 text-xs leading-5">
            <strong>ข้อความปฏิเสธความรับผิดชอบ / Disclaimer:</strong>{" "}
            ข้อมูลนี้เป็นข้อมูลอ้างอิงเพื่อการศึกษาเท่านั้น ราคา คุณสมบัติ
            และข้อมูลอื่นๆ อาจไม่ตรงกับข้อมูลปัจจุบัน
            กรุณาตรวจสอบจากผู้ผลิตหรือผู้จำหน่ายอย่างเป็นทางการก่อนตัดสินใจซื้อ
          </div>
        </section>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12 border-t pt-10">
          <h2 className="text-lg font-semibold">สินค้าที่เกี่ยวข้อง</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
