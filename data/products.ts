export type Position =
  | "point-guard"
  | "shooting-guard"
  | "small-forward"
  | "power-forward"
  | "center";

export type CourtType = "indoor" | "outdoor" | "both";

export type PerformancePriority =
  | "cushioning"
  | "traction"
  | "support"
  | "lightweight"
  | "durability"
  | "impact-protection";

export type FootShape = "narrow" | "medium" | "wide";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  referencePrice: number;
  positions: Position[];
  courtTypes: CourtType[];
  priorities: PerformancePriority[];
  footShape: FootShape;
  shortDescription: string;
  description: string;
  features: string[];
  considerations: string[];
  featured: boolean;
}

export interface ProductFilters {
  brands: string[];
  positions: Position[];
  courtTypes: CourtType[];
  priceRange: [number, number] | null;
  priorities: PerformancePriority[];
  footShape: FootShape | null;
}

export const ALL_POSITIONS: {
  value: Position;
  labelTh: string;
  labelEn: string;
}[] = [
  { value: "point-guard", labelTh: "พอยต์การ์ด", labelEn: "Point Guard" },
  {
    value: "shooting-guard",
    labelTh: "ชูตติ้งการ์ด",
    labelEn: "Shooting Guard",
  },
  {
    value: "small-forward",
    labelTh: "สมอลฟอร์เวิร์ด",
    labelEn: "Small Forward",
  },
  {
    value: "power-forward",
    labelTh: "พาวเวอร์ฟอร์เวิร์ด",
    labelEn: "Power Forward",
  },
  { value: "center", labelTh: "เซ็นเตอร์", labelEn: "Center" },
];

export const ALL_COURT_TYPES: {
  value: CourtType;
  labelTh: string;
  labelEn: string;
}[] = [
  { value: "indoor", labelTh: "ในร่ม", labelEn: "Indoor" },
  { value: "outdoor", labelTh: "กลางแจ้ง", labelEn: "Outdoor" },
  {
    value: "both",
    labelTh: "ใช้ได้ทั้งในร่มและกลางแจ้ง",
    labelEn: "Indoor & Outdoor",
  },
];

export const ALL_PRIORITIES: {
  value: PerformancePriority;
  labelTh: string;
  labelEn: string;
}[] = [
  { value: "cushioning", labelTh: "รองรับแรงกระแทก", labelEn: "Cushioning" },
  { value: "traction", labelTh: "การยึดเกาะ", labelEn: "Traction" },
  { value: "support", labelTh: "การรองรับข้อเท้า", labelEn: "Support" },
  { value: "lightweight", labelTh: "น้ำหนักเบา", labelEn: "Lightweight" },
  { value: "durability", labelTh: "ความทนทาน", labelEn: "Durability" },
  {
    value: "impact-protection",
    labelTh: "ป้องกันแรงกระแทก",
    labelEn: "Impact Protection",
  },
];

export const ALL_BRANDS = [
  "Nike",
  "Adidas",
  "Under Armour",
  "Puma",
  "New Balance",
  "Li-Ning",
  "Anta",
];

export const ALL_FOOT_SHAPES: {
  value: FootShape;
  labelTh: string;
  labelEn: string;
}[] = [
  { value: "narrow", labelTh: "เท้าแคบ", labelEn: "Narrow" },
  { value: "medium", labelTh: "เท้าปกติ", labelEn: "Medium" },
  { value: "wide", labelTh: "เท้ากว้าง", labelEn: "Wide" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "nike-lebron-nxxt-gen",
    name: "LeBron NXXT Gen",
    brand: "Nike",
    referencePrice: 6500,
    positions: ["small-forward", "power-forward"],
    courtTypes: ["indoor"],
    priorities: ["cushioning", "impact-protection", "support"],
    footShape: "wide",
    shortDescription:
      "รองเท้าที่ออกแบบมาเพื่อเกมการเล่นแบบทรงพลัง เน้นการกระแทกและการเปลี่ยนทิศทาง",
    description:
      "LeBron NXXT Gen คือรองเท้าบาสเกตบอลที่ได้รับแรงบันดาลใจจากไลฟ์สไตล์การเล่นของ LeBron James รองเท้ารุ่นนี้ถูกออกแบบมาเพื่อรองรับผู้เล่นที่ต้องการความมั่นคงและการตอบสนองในทุกก้าว พื้นรองเท้าชั้นนอกแบบ multidirectional ช่วยให้การเปลี่ยนทิศทางเป็นไปอย่างราบรื่น มาพร้อมเทคโนโลยี Air Zoom Unit และ Cushlon โฟมที่ให้สัมผัสนุ่มแต่เด้งกลับเร็ว",
    features: [
      "เทคโนโลยี Air Zoom Unit บริเวณส่วนหน้าเท้า",
      "Cushlon โฟมให้ความนุ่มกระเด้ง",
      "พื้นรองเท้าแบบ multidirectional traction",
      "โครงสร้างเสริมความมั่นคงบริเวณส้นเท้า",
      "วัสดุตาข่ายระบายอากาศ",
    ],
    considerations: [
      "เหมาะกับพื้นสนามในร่มมากกว่า",
      "น้ำหนักค่อนข้างมากเมื่อเทียบกับรุ่น Point Guard",
      "อาจคับเกินไปสำหรับผู้ที่มีเท้าแคบ",
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "nike-gt-cut-3",
    name: "GT Cut 3",
    brand: "Nike",
    referencePrice: 7000,
    positions: ["point-guard", "shooting-guard"],
    courtTypes: ["indoor"],
    priorities: ["lightweight", "cushioning", "traction"],
    footShape: "medium",
    shortDescription:
      "รองเท้าสำหรับการ์ดที่ต้องการความคล่องตัวสูงและการตอบสนองที่รวดเร็ว",
    description:
      "Nike GT Cut 3 เป็นรองเท้าที่ออกแบบมาสำหรับผู้เล่นตำแหน่งการ์ดที่ต้องการความคล่องตัวสูง รองเท้ารุ่นนี้มีน้ำหนักเบาและให้ความรู้สึกแนบเท้า พร้อมเทคโนโลยี ZoomX foam ที่ให้การตอบสนองและความนุ่มเป็นพิเศษ พื้นรองเท้ามีลายแนวตั้งและแนวนอนเพื่อการยึดเกาะที่เหนือชั้น",
    features: [
      "ZoomX foam ให้ความนุ่มและตอบสนองสูง",
      "น้ำหนักเบาเป็นพิเศษ",
      "พื้นรองเท้าแบบ multi-directional traction",
      "โครงสร้างส้นเท้าที่มั่นคง",
      "แผ่นรองรับส่วนโค้งเท้า",
    ],
    considerations: [
      "ราคาค่อนข้างสูง",
      "ไม่เหมาะกับผู้เล่นที่ต้องการการรองรับข้อเท้าสูง",
      "พื้นสนามกลางแจ้งอาจทำให้ยางสึกเร็ว",
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "nike-gt-jump-2",
    name: "GT Jump 2",
    brand: "Nike",
    referencePrice: 7500,
    positions: ["power-forward", "center"],
    courtTypes: ["indoor"],
    priorities: ["impact-protection", "cushioning", "support"],
    footShape: "wide",
    shortDescription:
      "รองเท้าสำหรับผู้เล่นตำแหน่งสูงที่ต้องการแรงกระโดดและการลงสู่พื้นที่นุ่มนวล",
    description:
      "GT Jump 2 ถูกออกแบบเพื่อผู้เล่นที่ต้องการแรงกระโดดสูงและการลงสู่พื้นที่ปลอดภัย รองเท้ามีเทคโนโลยี Air Zoom และ ZoomX foam ที่ให้การตอบสนองและการรองรับแรงกระแทกได้ดีเยี่ยม โครงสร้างที่สูงถึงข้อเท้าช่วยเพิ่มความมั่นคงในการลงสู่พื้น โครงสร้างเสริมพิเศษช่วยลดแรงกระแทกบริเวณส้นเท้า",
    features: [
      "Air Zoom unit บริเวณส้นเท้าและส่วนหน้า",
      "ZoomX foam ให้ความนุ่มพิเศษ",
      "โครงสร้างสูงถึงข้อเท้า",
      "แผ่นรองรับแรงกระแทกบริเวณส้นเท้า",
      "วัสดุสังเคราะห์น้ำหนักเบาแต่ทนทาน",
    ],
    considerations: [
      "น้ำหนักมากกว่ารุ่นการ์ดทั่วไป",
      "ราคาอ้างอิงสูงกว่ารุ่นอื่น",
      "อาจไม่เหมาะกับผู้เล่นที่ต้องการความคล่องตัวสูง",
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "adidas-harden-vol-8",
    name: "Harden Vol. 8",
    brand: "Adidas",
    referencePrice: 6200,
    positions: ["shooting-guard", "small-forward"],
    courtTypes: ["indoor", "outdoor"],
    priorities: ["cushioning", "traction", "support"],
    footShape: "medium",
    shortDescription:
      "รองเท้าสไตล์ James Harden เน้นลูกถ่ายน้ำหนักและการเปลี่ยนทิศทางที่เฉียบคม",
    description:
      "Harden Vol. 8 เป็นรองเท้าที่ออกแบบร่วมกับ James Harden รองเท้ารุ่นนี้เน้นการถ่ายน้ำหนักและการเปลี่ยนทิศทาง พื้นรองเท้ามีลวดลายพิเศษที่ช่วยให้การเคลื่อนไหวด้านข้างเป็นไปอย่างราบรื่น มาพร้อมเทคโนโลยี BOOST และ Lightstrike ที่ให้ความสมดุลระหว่างความนุ่มและการตอบสนอง",
    features: [
      "เทคโนโลยี BOOST ให้ความนุ่มเด้ง",
      "Lightstrike โฟมเพื่อความเบาและการตอบสนอง",
      "พื้นรองเท้าแบบลวดลายพิเศษสำหรับการเคลื่อนไหวด้านข้าง",
      "โครงสร้างส้นเท้าแบบไม่สมมาตร",
      "ผ้าถักรองเท้าแบบ透气 Primeknit",
    ],
    considerations: [
      "ไซส์อาจเล็กไปครึ่งนิ้ว",
      "ต้องการระยะเวลาในการสวมใส่เพื่อความพอดี",
      "อาจไม่เหมาะกับเท้าที่กว้างมาก",
    ],
    featured: true,
  },
  {
    id: "5",
    slug: "adidas-dame-9",
    name: "Dame 9",
    brand: "Adidas",
    referencePrice: 5500,
    positions: ["point-guard", "shooting-guard"],
    courtTypes: ["indoor", "outdoor"],
    priorities: ["lightweight", "traction", "durability"],
    footShape: "medium",
    shortDescription:
      "รองเท้าสำหรับการ์ดที่ต้องการความทนทานและคล่องตัวในราคาที่เข้าถึงได้",
    description:
      "Dame 9 รองเท้าที่ออกแบบมาสำหรับ Damian Lillard เน้นความทนทานและคล่องตัวในราคาที่ไม่สูงเกินไป รองเท้ารุ่นนี้ใช้วัสดุยางพื้นรองเท้าแบบหนาที่สามารถใช้งานได้ทั้งในร่มและกลางแจ้ง มาพร้อมเทคโนโลยี BOOST และ Lightstrike Pro ที่ให้ความสบายในทุกการเคลื่อนไหว",
    features: [
      "เทคโนโลยี BOOST รุ่นปรับปรุง",
      "Lightstrike Pro โฟม",
      "พื้นยางหนาสำหรับใช้ได้ทั้งในร่มและกลางแจ้ง",
      "น้ำหนักเบา",
      "ดีไซน์สวมใส่ง่าย",
    ],
    considerations: [
      "การรองรับแรงกระแทกน้อยกว่ารุ่นเรือธง",
      "อาจไม่เหมาะกับผู้เล่นที่ต้องการการรองรับข้อเท้าสูง",
      "วัสดุอาจยืดตัวเมื่อใช้งานนาน",
    ],
    featured: false,
  },
  {
    id: "6",
    slug: "ua-curry-12",
    name: "Curry 12",
    brand: "Under Armour",
    referencePrice: 6800,
    positions: ["point-guard", "shooting-guard"],
    courtTypes: ["indoor"],
    priorities: ["traction", "lightweight", "cushioning"],
    footShape: "medium",
    shortDescription:
      "รองเท้าสำหรับผู้เล่นที่เน้นการยิงและความคล่องตัว สไตล์ Stephen Curry",
    description:
      "Curry 12 ออกแบบเพื่อผู้เล่นที่ต้องการการยึดเกาะที่เหนือชั้นและความคล่องตัวสูง มาพร้อมเทคโนโลยี UA Flow ที่ให้การยึดเกาะโดยไม่ต้องใช้ยาง พื้นรองเท้าด้านนอกเป็น Flow foam ที่ให้ทั้งความนุ่มและการตอบสนองที่ดี โครงสร้างน้ำหนักเบาช่วยให้เคลื่อนไหวได้อย่างรวดเร็ว",
    features: [
      "เทคโนโลยี UA Flow ให้การยึดเกาะโดยไม่ใช้ยาง",
      "น้ำหนักเบาพิเศษ",
      "โครงสร้างตาข่ายระบายอากาศ",
      "แผ่นรองรับเท้าแบบ anatomic",
      "ดีไซน์ส้นเท้าที่มั่นคง",
    ],
    considerations: [
      "UA Flow อาจสึกหรอเร็วเมื่อใช้กลางแจ้ง",
      "ราคาอ้างอิงสูง",
      "อาจไม่เหมาะกับผู้เล่นที่ต้องการความสูงของส้นมาก",
    ],
    featured: false,
  },
  {
    id: "7",
    slug: "puma-mb-04",
    name: "MB.04",
    brand: "Puma",
    referencePrice: 5800,
    positions: ["point-guard", "shooting-guard", "small-forward"],
    courtTypes: ["indoor", "outdoor"],
    priorities: ["support", "cushioning", "durability"],
    footShape: "wide",
    shortDescription:
      "รองเท้าสไตล์ LaMelo Ball ที่โดดเด่นทั้งดีไซน์และฟังก์ชันการเล่น",
    description:
      "Puma MB.04 รองเท้ารุ่นซิกเนเจอร์ของ LaMelo Ball ที่ผสมผสานดีไซน์โดดเด่นเข้ากับฟังก์ชันการเล่นที่ครบครัน มาพร้อมเทคโนโลยี NITRO foam ที่ให้ความนุ่มสบายและการตอบสนองที่ดี พื้นรองเท้าหนาสามารถใช้งานได้ทั้งในร่มและกลางแจ้ง โครงสร้างเสริมความมั่นคงรอบเท้า",
    features: [
      "เทคโนโลยี NITRO foam",
      "พื้นยางหนาใช้ได้ทั้งในร่มและกลางแจ้ง",
      "โครงสร้างเสริมความมั่นคง",
      "ดีไซน์โดดเด่น",
      "วัสดุคุณภาพสูง",
    ],
    considerations: [
      "อาจมีน้ำหนักมากกว่ารุ่นแข่ง",
      "ดีไซน์อาจไม่ถูกใจทุกคน",
      "ราคาอ้างอิงระดับกลางถึงสูง",
    ],
    featured: true,
  },
  {
    id: "8",
    slug: "new-balance-two-wxy-v5",
    name: "Two Wxy v5",
    brand: "New Balance",
    referencePrice: 5200,
    positions: ["point-guard", "shooting-guard", "small-forward"],
    courtTypes: ["indoor"],
    priorities: ["lightweight", "traction", "cushioning"],
    footShape: "medium",
    shortDescription: "รองเท้าสมรรถนะสูงที่เน้นความเบาและความเร็วในการตอบสนอง",
    description:
      "New Balance Two Wxy v5 เป็นรองเท้าที่ถูกออกแบบมาเพื่อผู้เล่นที่ต้องการความเร็วและความคล่องตัวสูง รองเท้ามีน้ำหนักเบาพิเศษ มาพร้อมเทคโนโลยี FuelCell ที่ให้ความนุ่มและการตอบสนองที่ดีเยี่ยม พื้นรองเท้าแบบ multidirectional ช่วยในการเปลี่ยนทิศทางได้อย่างรวดเร็ว",
    features: [
      "เทคโนโลยี FuelCell foam",
      "น้ำหนักเบาพิเศษ",
      "พื้นรองเท้าแบบ multidirectional traction",
      "โครงสร้างที่พอดีเท้า",
      "วัสดุสังเคราะห์น้ำหนักเบา",
    ],
    considerations: [
      "ควรใช้ในร่มเป็นหลัก",
      "อาจไม่เหมาะกับเท้ากว้าง",
      "การรองรับข้อเท้าอยู่ในระดับปานกลาง",
    ],
    featured: false,
  },
  {
    id: "9",
    slug: "li-ning-way-of-wade-11",
    name: "Way of Wade 11",
    brand: "Li-Ning",
    referencePrice: 8000,
    positions: ["shooting-guard", "small-forward"],
    courtTypes: ["indoor"],
    priorities: ["cushioning", "support", "impact-protection"],
    footShape: "wide",
    shortDescription:
      "รองเท้ารุ่นซิกเนเจอร์ของ Dwyane Wade ระดับพรีเมียมที่เน้นทุกการเคลื่อนไหว",
    description:
      "Way of Wade 11 เป็นรองเท้าระดับพรีเมียมที่ออกแบบร่วมกับ Dwyane Wade มาพร้อมเทคโนโลยี BOOM foam ที่ให้การตอบสนองและความนุ่มพิเศษ พื้นรองเท้าแบบ carbon fiber plate ช่วยในการถ่ายเทพลังงานขณะเคลื่อนไหว โครงสร้างสูงถึงข้อเท้าให้ความมั่นคงและการรองรับที่ดีเยี่ยม",
    features: [
      "เทคโนโลยี BOOM foam",
      "Carbon fiber plate สำหรับการถ่ายเทพลังงาน",
      "โครงสร้างสูงถึงข้อเท้า",
      "วัสดุคุณภาพพรีเมียม",
      "ดีไซน์หรูหรา",
    ],
    considerations: [
      "ราคาอ้างอิงสูงที่สุดในกลุ่ม",
      "หาซื้อได้ยากในไทย",
      "อาจหนักเกินไปสำหรับผู้เล่นที่เน้นความเร็ว",
    ],
    featured: false,
  },
  {
    id: "10",
    slug: "anta-kt-9",
    name: "KT 9",
    brand: "Anta",
    referencePrice: 4800,
    positions: ["shooting-guard", "small-forward"],
    courtTypes: ["indoor", "outdoor"],
    priorities: ["support", "durability", "traction"],
    footShape: "medium",
    shortDescription:
      "รองเท้ารุ่นซิกเนเจอร์ของ Klay Thompson เน้นความมั่นคงและความทนทาน",
    description:
      "KT 9 รองเท้ารุ่นซิกเนเจอร์ของ Klay Thompson จาก Anta มาพร้อมเทคโนโลยี A-FLASHEDGE foam ที่ให้ความนุ่มและการรองรับที่ดี พื้นรองเท้าหนาและทนทานเหมาะสำหรับการใช้งานทั้งในร่มและกลางแจ้ง โครงสร้างเสริมความมั่นคงบริเวณส้นเท้าเพื่อป้องกันการบิดพลิ้ว",
    features: [
      "เทคโนโลยี A-FLASHEDGE foam",
      "พื้นยางหนาทนทาน",
      "โครงสร้างเสริมความมั่นคงบริเวณส้นเท้า",
      "ใช้ได้ทั้งในร่มและกลางแจ้ง",
      "ราคาอ้างอิงเข้าถึงได้",
    ],
    considerations: [
      "ดีไซน์อาจไม่โดดเด่นเท่ารุ่นอื่น",
      "น้ำหนักปานกลางถึงมาก",
      "อาจต้องหาขนาดที่ถูกต้องเนื่องจาก Anta ใช้ไซส์จีน",
    ],
    featured: false,
  },
  {
    id: "11",
    slug: "nike-giannis-immortality-4",
    name: "Giannis Immortality 4",
    brand: "Nike",
    referencePrice: 3800,
    positions: ["power-forward", "center"],
    courtTypes: ["indoor", "outdoor"],
    priorities: ["durability", "support", "impact-protection"],
    footShape: "wide",
    shortDescription: "รองเท้าราคาประหยัดที่ออกแบบมาสำหรับเกมการเล่นที่ดุดัน",
    description:
      "Giannis Immortality 4 รองเท้าราคาประหยัดที่ออกแบบร่วมกับ Giannis Antetokounmpo เหมาะสำหรับผู้เล่นที่ต้องการรองเท้าสำหรับการเล่นที่หนักหน่วงและดุดัน มาพร้อมเทคโนโลยี Air Zoom และ foam ที่ให้ความสบาย พื้นยางทนทานสำหรับการใช้งานทั้งในร่มและกลางแจ้ง",
    features: [
      "เทคโนโลยี Air Zoom unit",
      "พื้นยางทนทาน",
      "ใช้ได้ทั้งในร่มและกลางแจ้ง",
      "ราคาอ้างอิงเข้าถึงได้",
      "โครงสร้างที่ทนทาน",
    ],
    considerations: [
      "การรองรับแรงกระแทกน้อยกว่ารุ่นแพงกว่า",
      "วัสดุอาจมีความแข็งในช่วงแรก",
      "น้ำหนักค่อนข้างมาก",
    ],
    featured: false,
  },
  {
    id: "12",
    slug: "adidas-adizero-select-2",
    name: "Adizero Select 2",
    brand: "Adidas",
    referencePrice: 4500,
    positions: ["point-guard", "shooting-guard"],
    courtTypes: ["indoor", "outdoor"],
    priorities: ["lightweight", "traction", "durability"],
    footShape: "narrow",
    shortDescription:
      "รองเท้าน้ำหนักเบาพิเศษสำหรับการ์ดที่ต้องการความเร็วเหนือสิ่งอื่นใด",
    description:
      "Adizero Select 2 เป็นรองเท้าที่เน้นความเบาเป็นหลัก ออกแบบมาสำหรับผู้เล่นที่ต้องการความเร็วเหนือสิ่งอื่นใด มาพร้อมเทคโนโลยี Lightstrike Pro foam ที่มีน้ำหนักเบาแต่ยังคงให้การตอบสนองที่ดี พื้นรองเท้ามีลวดลายพิเศษเพื่อการยึดเกาะที่เหนือชั้น",
    features: [
      "เทคโนโลยี Lightstrike Pro foam",
      "น้ำหนักเบาพิเศษ",
      "พื้นรองเท้าแบบ aggressive traction",
      "โครงสร้างตาข่ายระบายอากาศ",
      "ราคาอ้างอิงระดับกลาง",
    ],
    considerations: [
      "การรองรับแรงกระแทกน้อย",
      "อาจไม่ทนทานเท่ารุ่นที่เน้น durability",
      "ไม่เหมาะกับผู้เล่นที่ต้องการการรองรับข้อเท้า",
    ],
    featured: false,
  },
];
