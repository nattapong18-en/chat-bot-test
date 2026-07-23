import { AlertTriangleIcon } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-accent/10 border-accent/20 border-b px-4 py-2.5 text-center text-xs leading-5">
      <div className="mx-auto flex max-w-5xl items-start justify-center gap-2">
        <AlertTriangleIcon
          className="text-accent mt-0.5 size-3.5 shrink-0"
          aria-hidden="true"
        />
        <p className="text-accent-muted">
          เว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและแสดงผลงานเท่านั้น CourtFit
          ไม่ใช่ร้านค้าอย่างเป็นทางการและไม่มีการจำหน่ายสินค้าจริง ราคา รูปภาพ
          รายละเอียดสินค้า และคำแนะนำอาจไม่ตรงกับข้อมูลปัจจุบัน
          กรุณาตรวจสอบข้อมูลจากผู้ผลิตหรือผู้จำหน่ายก่อนตัดสินใจซื้อ
        </p>
      </div>
    </div>
  );
}
