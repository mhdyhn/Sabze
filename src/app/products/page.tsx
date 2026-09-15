import type { Metadata } from "next";
import { Leaf, ShieldCheck, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = {
  title: "محصولات",
  description:
    "همه محصولات سبزه سبز؛ کشمش سبز ممتاز در وزن‌های ۲۵۰ گرم تا ۵ کیلوگرم، جعبه هدیه و بسته اقتصادی خانوادگی — مستقیم از تولیدکننده.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "محصولات سبزه سبز",
    description: "کشمش سبز ممتاز، ویژه، هدیه و خانوادگی — مستقیم از باغ.",
    images: [{ url: "/Sabze/images/product-1kg.webp", width: 928, height: 1152, alt: "کشمش سبز ممتاز سبزه سبز" }],
  },
};

const assurances = [
  { icon: Leaf, title: "تازه از فصل برداشت", text: "عرضه مستقیم، بدون انبار طولانی" },
  { icon: ShieldCheck, title: "ضمانت تازگی", text: "۷ روز مهلت عودت بدون قید و شرط" },
  { icon: Truck, title: "ارسال به سراسر کشور", text: "بسته‌بندی امن و ارسال سریع" },
];

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "محصولات" }]} />
      <PageHero
        eyebrow="فروشگاه"
        title="محصولات سبزه سبز"
        text="شش انتخاب سبز از بهترین برداشت فصل؛ هر بسته با درجه‌بندی دستی و بسته‌بندی اختصاصی، مستقیم از باغ ما به دست شما می‌رسد."
      />
      <div className="container-x py-10">
        <ShopClient />
      </div>
      <section aria-label="اطمینان خرید" className="border-t border-ink/10 bg-sand/60">
        <div className="container-x grid gap-6 py-12 sm:grid-cols-3">
          {assurances.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07} className="flex items-start gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream">
                <a.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[16px] font-extrabold text-ink">{a.title}</span>
                <span className="block text-[14px] text-sage">{a.text}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
