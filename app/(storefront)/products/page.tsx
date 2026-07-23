import type { Metadata } from "next";

import { ProductsPageClient } from "@/components/storefront/products-page-client";
import type { CourtType, Position } from "@/data/products";

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด | CourtFit",
  description:
    "ข้อมูลอ้างอิงรองเท้าบาสเกตบอลสำหรับการศึกษา เปรียบเทียบรุ่น ยี่ห้อ และคุณสมบัติ",
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const initialPosition =
    typeof params.position === "string"
      ? (params.position as Position)
      : undefined;
  const initialCourtType =
    typeof params.courtType === "string"
      ? (params.courtType as CourtType)
      : undefined;

  return (
    <ProductsPageClient
      initialPosition={initialPosition}
      initialCourtType={initialCourtType}
    />
  );
}
