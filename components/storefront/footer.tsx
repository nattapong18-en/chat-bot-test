import { CircleDotDashedIcon } from "lucide-react";
import Link from "next/link";

import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer
      className="border-border/60 bg-muted/30 border-t"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg shadow-sm">
                <CircleDotDashedIcon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold">{BRAND.name}</span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
              {BRAND.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">หน้าเว็บ</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  สินค้าทั้งหมด
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  AI Shoe Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  เกี่ยวกับ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">ข้อมูล</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-muted-foreground text-sm">
                  โครงการการศึกษา
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  ไม่ใช่ร้านค้าจริง
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  ไม่มีข้อมูลราคาจริง
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border/60 bg-muted/50 mt-8 rounded-lg border p-4 text-xs leading-5">
          <p>
            <strong>ข้อความปฏิเสธความรับผิดชอบ / Disclaimer:</strong>{" "}
            เว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและแสดงผลงานเท่านั้น CourtFit
            ไม่ใช่ร้านค้าอย่างเป็นทางการและไม่มีการจำหน่ายสินค้าจริง ราคา รูปภาพ
            รายละเอียดสินค้า และคำแนะนำอาจไม่ตรงกับข้อมูลปัจจุบัน
            กรุณาตรวจสอบข้อมูลจากผู้ผลิตหรือผู้จำหน่ายก่อนตัดสินใจซื้อ This
            website is an educational and portfolio project only. CourtFit is
            not an official retailer and does not sell real products. Prices,
            images, product information, and AI recommendations may not reflect
            current commercial information. Verify details with the manufacturer
            or an authorized retailer before purchasing.
          </p>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} {BRAND.name}. Educational project.
          No affiliation with any shoe brand or retailer.
        </p>
      </div>
    </footer>
  );
}
