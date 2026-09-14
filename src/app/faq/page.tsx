import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { brand } from "@/lib/brand";
import { faqs } from "@/content/faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "سوالات متداول",
  description:
    "پاسخ پرسش‌های پرتکرار درباره کشمش سبز سبزه سبز؛ فرآیند تولید، نگهداری، ارسال، خرید عمده و نمونه محصول.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "سوالات متداول" }]} />
      <PageHero
        eyebrow="راهنما"
        title="سوالات متداول"
        text="پاسخ بیشتر پرسش‌ها اینجاست؛ اگر سؤال دیگری دارید، مستقیم با ما در میان بگذارید."
      />
      <div className="container-x grid gap-8 py-10 lg:grid-cols-[1fr_1.7fr] lg:gap-12">
        <Reveal>
          <aside className="rounded-[1.75rem] bg-primary-dark p-7 text-cream lg:sticky lg:top-28">
            <h2 className="text-xl font-extrabold">هنوز سؤال دارید؟</h2>
            <p className="mt-2 text-[14px] leading-8 text-cream/70">
              تیم پشتیبانی سبزه سبز {brand.contact.hours} پاسخ‌گوی شماست.
            </p>
            <div className="mt-5 grid gap-2.5">
              <a
                href={`tel:${brand.contact.phoneHref}`}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-cream text-[15px] font-bold text-primary transition-all hover:bg-sand"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{brand.contact.phone}</span>
              </a>
              <a
                href={`https://wa.me/${brand.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-cream/30 text-[15px] font-bold text-cream transition-colors hover:bg-cream/10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                گفتگو در واتساپ
              </a>
              <Link
                href="/contact"
                className="flex min-h-[48px] items-center justify-center gap-1.5 text-[15px] font-bold text-gold transition-colors hover:text-cream"
              >
                صفحه تماس با ما
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </Reveal>
        <Reveal delay={0.08}>
          <FaqAccordion items={faqs} />
        </Reveal>
      </div>
    </>
  );
}
