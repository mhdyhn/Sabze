import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { CheckoutView } from "./CheckoutView";

export const metadata: Metadata = {
  title: "تسویه حساب",
  description: "تکمیل سفارش سبزه سبز؛ اطلاعات گیرنده، روش ارسال و پرداخت.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "خانه", href: "/" },
          { label: "سبد خرید", href: "/cart" },
          { label: "تسویه حساب" },
        ]}
      />
      <PageHero
        eyebrow="آخرین قدم"
        title="تسویه حساب"
        text="اطلاعات را وارد کنید؛ در این نسخه نمایشی، پرداخت واقعی انجام نمی‌شود."
      />
      <div className="container-x py-10">
        <CheckoutView />
      </div>
    </>
  );
}
