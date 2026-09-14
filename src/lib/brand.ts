/**
 * Brand single source of truth — Sabze Sabz (سبزه سبز)
 *
 * NOTE: Contact details, prices and stats marked [PLACEHOLDER] are logical
 * placeholders to be replaced with real verified business data before launch.
 */

export const brand = {
  name: "سبزه سبز",
  nameEn: "Sabze Sabz",
  tagline: "کشمش سبز پریمیوم، مستقیم از تولیدکننده",
  description:
    "سبزه سبز تولیدکننده مستقیم کشمش سبز پریمیوم است؛ از باغ و برداشت تا خشک‌کردن، کنترل کیفیت و بسته‌بندی اختصاصی — بدون واسطه.",
  /** [PLACEHOLDER] replace with the real production domain */
  siteUrl: "https://sabze-sabz.ir",
  locale: "fa_IR",
  colors: {
    primary: "#1F3D2B",
    primaryDark: "#152E1E",
    bg: "#FAF7F0",
    bgAlt: "#F1EBDD",
    text: "#20241F",
    textMuted: "#5C6156",
    accent: "#B98A2F",
  },
  contact: {
    /** [PLACEHOLDER] */
    phone: "۰۲۱-۹۱۰۰۹۱۰۰",
    phoneHref: "+982191009100",
    /** [PLACEHOLDER] */
    mobile: "۰۹۱۲-۰۰۰۰۰۰۰",
    whatsapp: "989120000000",
    whatsappLabel: "واتساپ",
    telegram: "sabzesabz",
    /** [PLACEHOLDER] */
    email: "hello@sabze-sabz.ir",
    /** [PLACEHOLDER] */
    address: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲، واحد ۳",
    /** [PLACEHOLDER] */
    hours: "شنبه تا پنجشنبه، ۹ صبح تا ۶ عصر",
  },
  socials: [
    { id: "instagram", label: "اینستاگرام", href: "https://instagram.com/sabzesabz" },
    { id: "telegram", label: "تلگرام", href: "https://t.me/sabzesabz" },
    { id: "whatsapp", label: "واتساپ", href: "https://wa.me/989120000000" },
  ] as const,
  stats: [
    { value: "+۱۲", label: "سال تجربه تولید" },
    { value: "۴۰", label: "هکتار باغ اختصاصی" },
    { value: "۳", label: "مرحله کنترل کیفیت" },
    { value: "۱۰۰٪", label: "تولید مستقیم" },
  ],
  navigation: [
    { href: "/", label: "خانه" },
    { href: "/products", label: "محصولات" },
    { href: "/about", label: "درباره ما" },
    { href: "/wholesale", label: "عمده‌فروشی و صادرات" },
    { href: "/contact", label: "تماس" },
  ],
  footerLinks: {
    shop: [
      { href: "/products", label: "همه محصولات" },
      { href: "/products/sabz-premium-1kg", label: "کشمش ممتاز یک کیلویی" },
      { href: "/products/sabz-gift-box", label: "جعبه هدیه" },
      { href: "/wholesale", label: "خرید عمده و صادرات" },
    ],
    help: [
      { href: "/faq", label: "سوالات متداول" },
      { href: "/contact", label: "تماس با ما" },
      { href: "/cart", label: "سبد خرید" },
      { href: "/about", label: "داستان ما" },
    ],
  },
} as const;

export type Brand = typeof brand;
