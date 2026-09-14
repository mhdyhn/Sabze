import type { Metadata, Viewport } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import { brand } from "@/lib/brand";
import { CartProvider } from "@/store/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} | کشمش سبز پریمیوم مستقیم از تولیدکننده`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "کشمش سبز",
    "کشمش ممتاز",
    "سبزه سبز",
    "خرید کشمش",
    "کشمش صادراتی",
    "خرید عمده کشمش",
    "کشمش ارگانیک",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: brand.locale,
    siteName: brand.name,
    title: `${brand.name} | کشمش سبز پریمیوم مستقیم از تولیدکننده`,
    description: brand.description,
    images: [
      {
        url: "/images/hero-raisin.webp",
        width: 1584,
        height: 672,
        alt: "کشمش سبز پریمیوم سبزه سبز",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | کشمش سبز پریمیوم`,
    description: brand.description,
    images: ["/images/hero-raisin.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F3D2B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <MotionConfig reducedMotion="user">
          <CartProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-[14px] focus:font-bold focus:text-cream"
            >
              پرش به محتوای اصلی
            </a>
            <Header />
            <CartDrawer />
            <main id="main" className="min-h-[60vh]">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
