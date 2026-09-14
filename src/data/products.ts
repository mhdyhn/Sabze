/**
 * Product catalog — single source of truth for the shop.
 * NOTE: All prices are logical [PLACEHOLDER] values in IRR (Toman).
 */

export type ProductCategory = "premium" | "special" | "gift" | "family";

export interface Product {
  id: string;
  slug: string;
  name: string;
  weight: string;
  weightGrams: number;
  category: ProductCategory;
  categoryLabel: string;
  /** [PLACEHOLDER] price in Toman */
  price: number;
  oldPrice?: number;
  badge?: string;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  short: string;
  description: string[];
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  specs: { label: string; value: string }[];
  inStock: boolean;
}

export const categoryLabels: Record<ProductCategory, string> = {
  premium: "ممتاز",
  special: "ویژه",
  gift: "هدیه",
  family: "خانوادگی",
};

/**
 * GitHub Pages base path
 * The website is deployed at:
 * https://mhdyhn.github.io/Sabze/
 */
const imagePath = (path: string) => `/Sabze${path}`;

export const products: Product[] = [
  {
    id: "p250",
    slug: "sabz-premium-250g",
    name: "کشمش سبز ممتاز",
    weight: "۲۵۰ گرم",
    weightGrams: 250,
    category: "premium",
    categoryLabel: "ممتاز",
    price: 289000,
    badge: "پرفروش",
    rating: 4.9,
    reviewsCount: 132,
    short: "انتخابی ایده‌آل برای آشنایی با طعم اصیل کشمش سبز سبزه سبز.",
    description: [
      "کشمش سبز ممتاز سبزه سبز از خوشه‌های دست‌چین باغ‌های خودمان به دست می‌آید؛ دانه‌هایی درشت، یکدست و شفاف با شیرینی ملایم و طبیعی.",
      "این بسته ۲۵۰ گرمی برای مصرف روزانه، محل کار یا هدیه‌ای کوچک و خاص طراحی شده و با همان وسواس بسته‌های بزرگ‌تر، درجه‌بندی و بسته‌بندی می‌شود.",
    ],
    image: imagePath("/images/product-250.webp"),
    imageAlt: "بسته ۲۵۰ گرمی کشمش سبز ممتاز سبزه سبز کنار کاسه کشمش",
    gallery: [
      {
        src: imagePath("/images/product-250.webp"),
        alt: "بسته ۲۵۰ گرمی کشمش سبز ممتاز",
      },
      {
        src: imagePath("/images/grapes.webp"),
        alt: "خوشه‌های انگور سبز روی تاک",
      },
      {
        src: imagePath("/images/harvest.webp"),
        alt: "برداشت انگور از باغ سبزه سبز",
      },
    ],
    specs: [
      { label: "وزن خالص", value: "۲۵۰ گرم" },
      { label: "مبدأ", value: "باغ‌های اختصاصی سبزه سبز" },
      { label: "ماندگاری", value: "۱۲ ماه در شرایط مناسب" },
      {
        label: "شرایط نگهداری",
        value: "جای خشک و خنک، دور از نور مستقیم",
      },
    ],
    inStock: true,
  },

  {
    id: "p500",
    slug: "sabz-premium-500g",
    name: "کشمش سبز ممتاز",
    weight: "۵۰۰ گرم",
    weightGrams: 500,
    category: "premium",
    categoryLabel: "ممتاز",
    price: 549000,
    oldPrice: 598000,
    badge: "تخفیف",
    rating: 4.9,
    reviewsCount: 214,
    short: "محبوب‌ترین انتخاب خانواده‌ها؛ تعادل طعم، کیفیت و قیمت.",
    description: [
      "بسته نیم‌کیلویی ممتاز، پرفروش‌ترین محصول سبزه سبز است؛ دانه‌درشت، یکدست و با همان کیفیت صادراتی که به بازارهای خارجی عرضه می‌کنیم.",
      "برای مصرف روزانه خانواده، پذیرایی و آشپزی بهترین گزینه است و در بسته‌بندی اختصاصی با حفظ تازگی عرضه می‌شود.",
    ],
    image: imagePath("/images/product-500.webp"),
    imageAlt: "بسته ۵۰۰ گرمی کشمش سبز ممتاز سبزه سبز",
    gallery: [
      {
        src: imagePath("/images/product-500.webp"),
        alt: "بسته ۵۰۰ گرمی کشمش سبز ممتاز",
      },
      {
        src: imagePath("/images/harvest.webp"),
        alt: "برداشت انگور از باغ سبزه سبز",
      },
      {
        src: imagePath("/images/garden.webp"),
        alt: "باغ انگور سبزه سبز",
      },
    ],
    specs: [
      { label: "وزن خالص", value: "۵۰۰ گرم" },
      { label: "مبدأ", value: "باغ‌های اختصاصی سبزه سبز" },
      { label: "ماندگاری", value: "۱۲ ماه در شرایط مناسب" },
      {
        label: "شرایط نگهداری",
        value: "جای خشک و خنک، دور از نور مستقیم",
      },
    ],
    inStock: true,
  },

  {
    id: "p1kg",
    slug: "sabz-premium-1kg",
    name: "کشمش سبز ممتاز",
    weight: "۱ کیلوگرم",
    weightGrams: 1000,
    category: "premium",
    categoryLabel: "ممتاز",
    price: 1049000,
    badge: "انتخاب سردبیر",
    rating: 5.0,
    reviewsCount: 186,
    short: "یک کیلوگرم خالص از بهترین برداشت فصل؛ برای عاشقان واقعی.",
    description: [
      "بسته یک کیلویی ممتاز از مرغوب‌ترین بخش برداشت هر فصل پر می‌شود؛ خوشه‌هایی که جداگانه درجه‌بندی شده‌اند و درشت‌ترین و یکدست‌ترین دانه‌ها را دارند.",
      "اگر کشمش سبز جزئی از سفره هر روز شماست، این بسته هم از نظر اقتصادی و هم از نظر تازگی بهترین انتخاب است.",
    ],
    image: imagePath("/images/product-1kg.webp"),
    imageAlt: "بسته یک کیلویی کشمش سبز ممتاز سبزه سبز",
    gallery: [
      {
        src: imagePath("/images/product-1kg.webp"),
        alt: "بسته یک کیلویی کشمش سبز ممتاز",
      },
      {
        src: imagePath("/images/garden.webp"),
        alt: "باغ انگور سبزه سبز",
      },
      {
        src: imagePath("/images/grapes.webp"),
        alt: "خوشه‌های انگور سبز روی تاک",
      },
    ],
    specs: [
      { label: "وزن خالص", value: "۱ کیلوگرم" },
      { label: "مبدأ", value: "باغ‌های اختصاصی سبزه سبز" },
      { label: "ماندگاری", value: "۱۲ ماه در شرایط مناسب" },
      {
        label: "شرایط نگهداری",
        value: "جای خشک و خنک، دور از نور مستقیم",
      },
    ],
    inStock: true,
  },

  {
    id: "p2kg",
    slug: "sabz-special-2kg",
    name: "کشمش سبز ویژه",
    weight: "۲ کیلوگرم",
    weightGrams: 2000,
    category: "special",
    categoryLabel: "ویژه",
    price: 1980000,
    isNew: true,
    badge: "جدید",
    rating: 4.8,
    reviewsCount: 64,
    short: "درجه ویژه صادراتی در بسته دو کیلویی؛ اوج کیفیت سبزه سبز.",
    description: [
      "سری «ویژه» سبزه سبز از همان خط تولیدی می‌آید که محصولات صادراتی ما را تأمین می‌کند؛ با سخت‌گیرانه‌ترین درجه‌بندی و درشت‌ترین دانه‌های هر فصل.",
      "بسته دو کیلویی برای مصرف‌کنندگان پرمصرف، قنادی‌ها و رستوران‌هایی طراحی شده که کیفیت برایشان مذاکره‌ناپذیر است.",
    ],
    image: imagePath("/images/product-2kg.webp"),
    imageAlt: "بسته دو کیلویی کشمش سبز ویژه سبزه سبز",
    gallery: [
      {
        src: imagePath("/images/product-2kg.webp"),
        alt: "بسته دو کیلویی کشمش سبز ویژه",
      },
      {
        src: imagePath("/images/harvest.webp"),
        alt: "برداشت انگور از باغ سبزه سبز",
      },
      {
        src: imagePath("/images/garden.webp"),
        alt: "باغ انگور سبزه سبز",
      },
    ],
    specs: [
      { label: "وزن خالص", value: "۲ کیلوگرم" },
      { label: "درجه کیفی", value: "ویژه صادراتی" },
      { label: "ماندگاری", value: "۱۲ ماه در شرایط مناسب" },
      {
        label: "شرایط نگهداری",
        value: "جای خشک و خنک، دور از نور مستقیم",
      },
    ],
    inStock: true,
  },

  {
    id: "pgift",
    slug: "sabz-gift-box",
    name: "جعبه هدیه سبزه سبز",
    weight: "ترکیب ویژه ۸۰۰ گرم",
    weightGrams: 800,
    category: "gift",
    categoryLabel: "هدیه",
    price: 1450000,
    badge: "هدیه خاص",
    rating: 5.0,
    reviewsCount: 91,
    short: "هدیه‌ای اصیل و ماندگار؛ ترکیب منتخب کشمش سبز در جعبه نفیس.",
    description: [
      "جعبه هدیه سبزه سبز برای کسانی طراحی شده که می‌خواهند هدیه‌ای متفاوت، اصیل و ایرانی بدهند؛ ترکیبی از بهترین درجات کشمش سبز در بسته‌بندی نفیس.",
      "هر جعبه با دست بسته‌بندی می‌شود و برای هدایای سازمانی، عیدانه و مناسبت‌های خاص با کارت تبریک اختصاصی قابل سفارش است.",
    ],
    image: imagePath("/images/product-gift.webp"),
    imageAlt: "جعبه هدیه نفیس کشمش سبز سبزه سبز با روبان",
    gallery: [
      {
        src: imagePath("/images/product-gift.webp"),
        alt: "جعبه هدیه نفیس کشمش سبز",
      },
      {
        src: imagePath("/images/grapes.webp"),
        alt: "خوشه‌های انگور سبز روی تاک",
      },
      {
        src: imagePath("/images/garden.webp"),
        alt: "باغ انگور سبزه سبز",
      },
    ],
    specs: [
      { label: "وزن خالص", value: "۸۰۰ گرم ترکیب ویژه" },
      { label: "بسته‌بندی", value: "جعبه نفیس با روبان" },
      { label: "ماندگاری", value: "۱۲ ماه در شرایط مناسب" },
      { label: "سفارش سازمانی", value: "با کارت تبریک اختصاصی" },
    ],
    inStock: true,
  },

  {
    id: "p5kg",
    slug: "sabz-family-5kg",
    name: "بسته اقتصادی خانوادگی",
    weight: "۵ کیلوگرم",
    weightGrams: 5000,
    category: "family",
    categoryLabel: "خانوادگی",
    price: 4850000,
    oldPrice: 5245000,
    badge: "اقتصادی",
    rating: 4.9,
    reviewsCount: 148,
    short: "خرید هوشمندانه سال؛ پنج کیلوگرم کیفیت ممتاز با قیمت اقتصادی.",
    description: [
      "بسته پنج کیلویی خانوادگی برای کسانی است که کشمش سبز را فله‌ای و مطمئن می‌خواهند؛ همان کیفیت ممتاز، با قیمت تمام‌شده پایین‌تر در هر کیلوگرم.",
      "مناسب خانواده‌های پرجمعیت، هیئت‌ها، رستوران‌ها و قنادی‌ها. دانه‌ها پیش از بسته‌بندی دوباره الک و کنترل می‌شوند.",
    ],
    image: imagePath("/images/product-5kg.webp"),
    imageAlt: "بسته پنج کیلویی اقتصادی کشمش سبز سبزه سبز",
    gallery: [
      {
        src: imagePath("/images/product-5kg.webp"),
        alt: "بسته پنج کیلویی اقتصادی کشمش سبز",
      },
      {
        src: imagePath("/images/garden.webp"),
        alt: "باغ انگور سبزه سبز",
      },
      {
        src: imagePath("/images/harvest.webp"),
        alt: "برداشت انگور از باغ سبزه سبز",
      },
    ],
    specs: [
      { label: "وزن خالص", value: "۵ کیلوگرم" },
      { label: "مبدأ", value: "باغ‌های اختصاصی سبزه سبز" },
      { label: "ماندگاری", value: "۱۲ ماه در شرایط مناسب" },
      {
        label: "شرایط نگهداری",
        value: "جای خشک و خنک، دور از نور مستقیم",
      },
    ],
    inStock: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 3): Product[] {
  const current = getProduct(slug);

  if (!current) {
    return products.slice(0, count);
  }

  const same = products.filter(
    (p) => p.slug !== slug && p.category === current.category
  );

  const rest = products.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );

  return [...same, ...rest].slice(0, count);
}
