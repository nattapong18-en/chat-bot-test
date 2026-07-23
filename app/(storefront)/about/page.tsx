import type { Metadata } from "next";
import {
  BotIcon,
  KeyRoundIcon,
  GlobeIcon,
  AlertTriangleIcon,
  BookOpenIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "เกี่ยวกับ | CourtFit",
  description: "CourtFit คือโครงการศึกษาสำหรับการเลือกรองเท้าบาสเกตบอลด้วย AI",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        เกี่ยวกับ CourtFit
      </h1>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          วัตถุประสงค์ / Academic Purpose
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-7">
          CourtFit เป็นโครงการจัดทำขึ้นเพื่อการศึกษาและการแสดงผลงาน (Portfolio
          Project)
          โดยมีเป้าหมายในการสร้างประสบการณ์การเลือกรองเท้าบาสเกตบอลผ่านระบบ AI
          ที่สามารถแนะนำรองเท้าที่เหมาะสมตามตำแหน่งการเล่น สไตล์การเล่น ชนิดสนาม
          และงบประมาณของผู้ใช้
        </p>
        <p className="text-muted-foreground mt-3 text-sm leading-7">
          โครงการนี้ไม่ได้มีวัตถุประสงค์ในเชิงพาณิชย์ ไม่มีการจำหน่ายสินค้าจริง
          และไม่มีส่วนเกี่ยวข้องกับแบรนด์รองเท้าหรือร้านค้าใดๆ
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          ปัญหาที่ต้องการแก้ไข / The Problem
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-7">
          การเลือกรองเท้าบาสเกตบอลที่เหมาะสมเป็นเรื่องที่ซับซ้อน
          ผู้เล่นต้องพิจารณาปัจจัยหลายอย่าง เช่น ตำแหน่งการเล่น สไตล์การเล่น
          ชนิดสนาม รูปเท้า และงบประมาณ
          ผู้เล่นหลายคนไม่มีเวลาหรือความรู้ในการเปรียบเทียบรองเท้าหลายรุ่น
          CourtFit ใช้ AI
          เพื่อช่วยวิเคราะห์และแนะนำรองเท้าที่เหมาะสมกับผู้เล่นแต่ละคน
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          AI Chatbot — หัวใจของโครงการ / Core Feature
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-7">
          AI Shoe Finder คือฟีเจอร์หลักของ CourtFit ที่ใช้โมเดลภาษาขนาดใหญ่
          (Large Language Model) จาก OpenAI และ Google Gemini
          ในการสนทนากับผู้ใช้ เพื่อวิเคราะห์ความต้องการ
          และแนะนำรองเท้าบาสเกตบอลที่เหมาะสม
        </p>
        <div className="mt-4 space-y-3">
          <div className="border-border bg-card flex items-start gap-3 rounded-lg border p-3">
            <BotIcon
              className="text-accent mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium">Bring Your Own Key (BYOK)</p>
              <p className="text-muted-foreground mt-0.5 text-xs leading-5">
                ผู้ใช้สามารถใช้ API Key ส่วนตัวของตนเองได้ ทั้ง OpenAI และ
                Google Gemini Key จะถูกเก็บในหน่วยความจำเท่านั้น
                ไม่มีการบันทึกลงในฐานข้อมูล และจะหายไปเมื่อรีเฟรชหรือปิดหน้าเว็บ
              </p>
            </div>
          </div>
          <div className="border-border bg-card flex items-start gap-3 rounded-lg border p-3">
            <KeyRoundIcon
              className="text-accent mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium">In-Memory API Key Handling</p>
              <p className="text-muted-foreground mt-0.5 text-xs leading-5">
                API Key จะถูกส่งไปยังเซิร์ฟเวอร์เฉพาะในระหว่างการสนทนาเท่านั้น
                และไม่มีการจัดเก็บไว้ในคุกกี้ Local Storage หรือฐานข้อมูลใดๆ
              </p>
            </div>
          </div>
          <div className="border-border bg-card flex items-start gap-3 rounded-lg border p-3">
            <GlobeIcon
              className="text-accent mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium">
                รองรับหลายผู้ให้บริการ / Multi-Provider
              </p>
              <p className="text-muted-foreground mt-0.5 text-xs leading-5">
                รองรับ AI Providers สองรายการ: OpenAI (GPT-4.1-mini) และ Google
                Gemini (Gemini Flash) ผู้ใช้สามารถเปลี่ยนผู้ให้บริการได้ตลอดเวลา
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">ข้อจำกัด / Limitations</h2>
        <ul className="text-muted-foreground mt-3 space-y-1.5 text-sm leading-6">
          <li className="flex items-start gap-2">
            <span className="bg-accent mt-1.5 block size-1.5 shrink-0 rounded-full" />
            ไม่มีการซื้อขายสินค้าจริง — เป็นเพียงข้อมูลอ้างอิงเพื่อการศึกษา
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-accent mt-1.5 block size-1.5 shrink-0 rounded-full" />
            ราคาและข้อมูลสินค้าอาจไม่ตรงกับข้อมูลปัจจุบัน
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-accent mt-1.5 block size-1.5 shrink-0 rounded-full" />
            คำแนะนำจาก AI อาจไม่ถูกต้องหรือไม่เหมาะสมสำหรับทุกคน
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-accent mt-1.5 block size-1.5 shrink-0 rounded-full" />
            ไม่มีความสัมพันธ์หรือการรับรองจากแบรนด์รองเท้าหรือร้านค้าใดๆ
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-accent mt-1.5 block size-1.5 shrink-0 rounded-full" />
            ไม่มีระบบชำระเงิน ตะกร้าสินค้า หรือคำสั่งซื้อ
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-accent mt-1.5 block size-1.5 shrink-0 rounded-full" />
            ผู้ใช้ต้องมี API Key ของตนเองสำหรับใช้งานฟีเจอร์ AI
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">
          เทคโนโลยีที่ใช้ / Technologies
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Tailwind CSS v4",
            "OpenAI API",
            "Google Gemini API",
            "shadcn/ui",
            "next-themes",
            "Zod",
            "Lucide Icons",
          ].map((tech) => (
            <div
              key={tech}
              className="border-border bg-card rounded-lg border px-3 py-2 text-center text-sm"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 mt-8 rounded-xl border p-4 text-xs leading-5">
        <div className="flex items-start gap-2">
          <AlertTriangleIcon
            className="text-accent mt-0.5 size-3.5 shrink-0"
            aria-hidden="true"
          />
          <div>
            <strong>ข้อความปฏิเสธความรับผิดชอบ / Disclaimer:</strong>{" "}
            เว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและแสดงผลงานเท่านั้น CourtFit
            ไม่ใช่ร้านค้าอย่างเป็นทางการ และไม่มีการจำหน่ายสินค้าจริง ราคา
            รูปภาพ รายละเอียดสินค้า และคำแนะนำอาจไม่ตรงกับข้อมูลปัจจุบัน
            กรุณาตรวจสอบข้อมูลจากผู้ผลิตหรือผู้จำหน่ายก่อนตัดสินใจซื้อ This
            website is an educational and portfolio project only. CourtFit is
            not an official retailer and does not sell real products. Prices,
            images, product information, and AI recommendations may not reflect
            current commercial information. Verify details with the manufacturer
            or an authorized retailer before purchasing.
          </div>
        </div>
      </section>

      <section className="mt-8 border-t pt-8">
        <div className="flex items-center gap-2">
          <BookOpenIcon
            className="text-muted-foreground size-4"
            aria-hidden="true"
          />
          <p className="text-muted-foreground text-xs">
            CourtFit &copy; {new Date().getFullYear()} — ไม่มีส่วนเกี่ยวข้องกับ
            Nike, Adidas, Under Armour, Puma, New Balance, Li-Ning, Anta
            หรือแบรนด์รองเท้าอื่นๆ
          </p>
        </div>
      </section>
    </div>
  );
}
