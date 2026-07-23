import { ArrowRightIcon, BotIcon, ShirtIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/data/products";
import type { Position } from "@/data/products";
import { ProductCard } from "@/components/storefront/product-card";

const POSITION_SECTIONS: {
  position: Position;
  title: string;
  description: string;
}[] = [
  {
    position: "point-guard",
    title: "สำหรับ Point Guard",
    description: "รองเท้าที่เน้นความคล่องตัว น้ำหนักเบา และการตอบสนองรวดเร็ว",
  },
  {
    position: "shooting-guard",
    title: "สำหรับ Shooting Guard",
    description:
      "รองเท้าที่สมดุลระหว่างความเร็วและการรองรับสำหรับการเคลื่อนไหวรอบด้าน",
  },
  {
    position: "small-forward",
    title: "สำหรับ Small Forward",
    description: "รองเท้าที่คล่องตัวแต่ยังคงให้การรองรับสำหรับเกมที่หลากหลาย",
  },
  {
    position: "power-forward",
    title: "สำหรับ Power Forward",
    description: "รองเท้าที่เน้นการรองรับแรงกระแทกและความมั่นคงในเพนต์",
  },
  {
    position: "center",
    title: "สำหรับ Center",
    description:
      "รองเท้าที่ให้การรองรับสูงสุดและป้องกันแรงกระแทกสำหรับผู้เล่นตัวสูง",
  },
];

const COURT_SECTIONS = [
  {
    type: "indoor",
    title: "สนามในร่ม",
    description:
      "รองเท้าที่ออกแบบมาเพื่อพื้นไม้ในร่ม ให้การยึดเกาะและการตอบสนองที่ดีที่สุด",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    type: "outdoor",
    title: "สนามกลางแจ้ง",
    description:
      "รองเท้าที่ใช้วัสดุยางหน้าสำหรับพื้นสนามกลางแจ้งที่หยาบและมีความร้อนสูง",
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    type: "both",
    title: "ใช้ได้ทุกสนาม",
    description:
      "รองเท้าที่สามารถใช้งานได้ทั้งในร่มและกลางแจ้ง โดยไม่ลดทอนประสิทธิภาพ",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
];

const FEATURES = [
  {
    icon: SparklesIcon,
    title: "AI แนะนำเฉพาะคุณ",
    description:
      "CourtFit วิเคราะห์ตำแหน่ง สไตล์ สนาม และงบประมาณ เพื่อแนะนำรองเท้าที่ใช่สำหรับคุณ",
  },
  {
    icon: ShirtIcon,
    title: "ข้อมูลอ้างอิงสินค้า",
    description:
      "เปรียบเทียบสเปก จุดเด่น และข้อควรพิจารณาของรองเท้าบาสเกตบอลรุ่นต่างๆ",
  },
  {
    icon: BotIcon,
    title: "ถาม-ตอบ ด้วยภาษาไทย",
    description:
      "พูดคุยกับ AI ผู้เชี่ยวชาญด้านรองเท้าบาสเกตบอลเป็นภาษาไทยหรืออังกฤษ",
  },
];

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <section className="motion-safe:animate-fade-in relative overflow-hidden border-b">
        <div className="from-accent/5 pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent" />
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="motion-safe:animate-slide-up mx-auto max-w-3xl text-center">
            <p className="text-accent mb-4 text-sm font-semibold tracking-widest uppercase">
              {BRAND.name}
            </p>
            <h1 className="text-foreground text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {BRAND.tagline}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg">
              {BRAND.thaiTagline}
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/products">
                  ดูรองเท้าทั้งหมด
                  <ArrowRightIcon className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="motion-safe:animate-fade-in py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              รองเท้าบาสเกตบอลมาแรง
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              รุ่นยอดนิยมที่รวบรวมมาให้ดูเป็นข้อมูลอ้างอิง
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/products">ดูทั้งหมด ({PRODUCTS.length} รายการ)</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 motion-safe:animate-fade-in border-y py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            เลือกตามตำแหน่งการเล่น
          </h2>
          <p className="text-muted-foreground mt-2 text-center text-sm leading-6">
            รองเท้าแต่ละรุ่นถูกออกแบบมาให้เหมาะกับตำแหน่งและสไตล์การเล่นที่แตกต่างกัน
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {POSITION_SECTIONS.map(({ position, title, description }) => (
              <Link
                key={position}
                href={`/products?position=${position}`}
                className="border-border bg-card hover:border-accent/30 group rounded-xl border p-5 transition-all duration-200 motion-safe:hover:-translate-y-0.5"
              >
                <div className="text-accent/70 group-hover:text-accent mb-3 text-2xl font-bold">
                  {position === "point-guard"
                    ? "PG"
                    : position === "shooting-guard"
                      ? "SG"
                      : position === "small-forward"
                        ? "SF"
                        : position === "power-forward"
                          ? "PF"
                          : "C"}
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="motion-safe:animate-fade-in py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            เลือกตามชนิดสนาม
          </h2>
          <p className="text-muted-foreground mt-2 text-center text-sm leading-6">
            พื้นสนามที่แตกต่างกันต้องการรองเท้าที่มีคุณสมบัติเฉพาะ
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {COURT_SECTIONS.map(({ type, title, description, color }) => (
              <Link
                key={type}
                href={`/products?courtType=${type}`}
                className="border-border bg-card hover:border-accent/30 group rounded-xl border p-6 transition-all duration-200 motion-safe:hover:-translate-y-0.5"
              >
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                    color,
                  )}
                >
                  {title}
                </span>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-y py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-accent inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
              <BotIcon className="size-3.5" aria-hidden="true" />
              AI Feature
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              พบกับ CourtFit AI Assistant
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              ผู้ช่วยแนะนำรองเท้าบาสเกตบอลอัจฉริยะที่เข้าใจคุณ
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border-border bg-card rounded-xl border p-6"
              >
                <div className="bg-accent/10 mb-4 inline-flex rounded-lg p-2.5">
                  <Icon className="text-accent size-5" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-xs leading-5">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              วิธีการเลือกรองเท้าบาสเกตบอล
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "ระบุตำแหน่ง",
                description:
                  "ตำแหน่งที่คุณเล่นมีผลต่อคุณสมบัติของรองเท้าที่ควรเลือก",
              },
              {
                step: "2",
                title: "เลือกสไตล์",
                description: "คุณชอบเล่นเกมบุก เกมรับ หรือเล่นรอบด้าน",
              },
              {
                step: "3",
                title: "ดูชนิดสนาม",
                description:
                  "สนามในร่มหรือกลางแจ้งต้องการพื้นรองเท้าที่แตกต่าง",
              },
              {
                step: "4",
                title: "ถาม AI",
                description: "ให้ CourtFit ช่วยวิเคราะห์และแนะนำรุ่นที่เหมาะสม",
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="bg-accent text-accent-foreground mx-auto flex size-12 items-center justify-center rounded-full text-lg font-bold">
                  {step}
                </div>
                <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-y py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              พร้อมหารองเท้าที่ใช่สำหรับคุณแล้วหรือยัง?
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              ให้ AI ช่วยคุณวิเคราะห์และแนะนำรองเท้าบาสเกตบอลที่เหมาะสม
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/chat">
                  <SparklesIcon className="mr-2 size-4" aria-hidden="true" />
                  เริ่มใช้ AI Shoe Finder
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
