import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "سبد خرید سبزه سبز؛ بازبینی کالاها، محاسبه ارسال و ادامه تسویه حساب.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "سبد خرید" }]} />
      <PageHero
        eyebrow="سبد شما"
        title="سبد خرید"
        text="کالاهای انتخابی‌تان را بازبینی کنید؛ هزینه ارسال در مرحله بعد دقیق محاسبه می‌شود."
      />
      <div className="container-x py-10">
        <CartView />
      </div>
    </>
  );
}
