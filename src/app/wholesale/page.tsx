import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  Factory,
  Handshake,
  MessageCircle,
  Package,
  Phone,
  Truck,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WholesaleForm } from "@/components/WholesaleForm";

export const metadata: Metadata = {
  title: "عمده‌فروشی و صادرات",
  description:
    "خرید عمده کشمش سبز مستقیم از تولیدکننده؛ درجه‌بندی صادراتی، ظرفیت تأمین بالا، بسته‌بندی سفارشی و ارسال نمونه — سبزه سبز.",
  alternates: { canonical: "/wholesale" },
  openGraph: {
    title: "عمده‌فروشی و صادرات سبزه سبز",
    description: "مستقیم از تولیدکننده؛ کیفیت صادراتی، قیمت منصفانه.",
    images: [{ url: "/Sabze/images/harvest.webp", width: 1200, height: 896, alt: "برداشت انگور برای صادرات" }],
  },
};

const benefits = [
  { icon: Factory, title: "تولیدکننده مستقیم", text: "بدون واسطه؛ قیمت درب باغ با حاشیه منصفانه و ثابت." },
  { icon: BadgeCheck, title: "کنترل کیفیت صادراتی", text: "درجه‌بندی چندمرحله‌ای و نمونه شاهد از هر بچ تولید." },
  { icon: Truck, title: "ظرفیت تأمین بالا", text: "پاسخ‌گویی به سفارش‌های عمده و کانتینری در فصل برداشت." },
  { icon: Package, title: "بسته‌بندی متنوع", text: "از بسته خرده‌فروشی تا کارتن ۵ تا ۲۵ کیلویی صادراتی." },
  { icon: Handshake, title: "قرارداد شفاف", text: "فاکتور رسمی، زمان‌بندی تحویل مشخص و پشتیبانی اختصاصی." },
];

const capacities = [
  { value: "۴ درجه", label: "درجه‌بندی کیفی صادراتی" },
  { value: "۵ تا ۲۵", label: "کیلوگرم، بازه بسته‌بندی عمده" },
  { value: "۴۸ ساعته", label: "ارسال نمونه برای ارزیابی" },
  { value: "۱ روزه", label: "پاسخ‌گویی به درخواست همکاری" },
];

const steps = [
  { n: "۱", title: "ثبت درخواست", text: "فرم زیر را تکمیل کنید یا در واتساپ پیام بدهید." },
  { n: "۲", title: "دریافت نمونه و لیست قیمت", text: "نمونه درجات مختلف + لیست قیمت به‌روز برایتان ارسال می‌شود." },
  { n: "۳", title: "توافق و قرارداد", text: "درجه، حجم، بسته‌بندی و زمان تحویل نهایی می‌شود." },
  { n: "۴", title: "تولید و ارسال", text: "سفارش شما از خط تولید مستقیم بارگیری و ارسال می‌گردد." },
];

export default function WholesalePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "عمده‌فروشی و صادرات" }]} />

      {/* Hero */}
      <div className="container-x pt-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary-dark text-cream">
            <Image
              src="/Sabze/images/garden.webp"
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent" />
            <div className="relative max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
              <p className="flex items-center gap-3 text-sm font-bold text-gold">
                <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
                فروش سازمانی و صادرات
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.6] sm:text-4xl">
                مستقیم از باغ ما، به انبار شما
              </h1>
              <p className="mt-4 max-w-2xl text-[16px] leading-9 text-cream/80">
                اگر پخش‌کننده، صادرکننده، قنادی، رستوران یا فروشگاه هستید، سبزه سبز را بدون واسطه و
                با کیفیت ثابت فصل‌به‌فصل از خودِ تولیدکننده بخرید.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/wholesale?type=price#request" className="btn-gold">
                  درخواست لیست قیمت
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/wholesale?type=sample#request" className="btn-outline-light">
                  درخواست نمونه
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="container-x py-16 sm:py-20">
        <SectionHeading
          eyebrow="چرا خرید مستقیم؟"
          title="مزایای همکاری با تولیدکننده"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.07}>
              <article className="h-full rounded-3xl border border-ink/10 bg-white/70 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
                  <b.icon className="h-6 w-6 text-cream" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[19px] font-extrabold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-[14px] leading-8 text-sage">{b.text}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.14}>
            <a
              href={`https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent("سلام، برای خرید عمده کشمش سبز درخواست مشاوره دارم.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full min-h-[200px] flex-col justify-center rounded-3xl bg-primary p-6 text-cream transition-colors hover:bg-primary-dark"
            >
              <MessageCircle className="h-9 w-9 text-gold" aria-hidden="true" />
              <span className="mt-3 text-xl font-extrabold">گفتگوی مستقیم با واحد فروش</span>
              <span className="mt-1 text-[14px] text-cream/75">در واتساپ پاسخ‌گوی شما هستیم.</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-bold text-gold">
                شروع گفتگو
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Capacity band */}
      <section aria-label="ظرفیت تأمین" className="bg-sand/70">
        <dl className="container-x grid grid-cols-2 gap-6 py-12 lg:grid-cols-4">
          {capacities.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <dd className="text-2xl font-extrabold text-primary sm:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-[14px] font-medium text-sage">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Steps */}
      <section aria-labelledby="steps-title" className="container-x py-16 sm:py-20">
        <SectionHeading eyebrow="مسیر همکاری" title="در چهار قدم به سفارش عمده برسید" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <li className="relative h-full rounded-3xl border border-ink/10 bg-white/70 p-6 pt-7">
                <span aria-hidden="true" className="absolute -top-5 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-lg font-extrabold text-primary-dark shadow">
                  {s.n}
                </span>
                <h3 className="mt-2 text-[18px] font-extrabold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[14px] leading-8 text-sage">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Request form */}
      <section aria-labelledby="request-title" id="request" className="scroll-mt-28 bg-primary-dark text-cream">
        <div className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <div>
            <p className="flex items-center gap-3 text-sm font-bold text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
              ثبت درخواست همکاری
            </p>
            <h2 id="request-title" className="mt-3 text-3xl font-extrabold leading-[1.6]">
              فرم درخواست لیست قیمت و نمونه
            </h2>
            <p className="mt-3 text-[15px] leading-8 text-cream/75">
              فرم را تکمیل کنید؛ واحد فروش سازمانی کمتر از یک روز کاری آینده با شما تماس می‌گیرد.
              برای پیگیری سریع‌تر می‌توانید مستقیم تماس بگیرید:
            </p>
            <ul className="mt-6 space-y-3 text-[15px]">
              <li>
                <a href={`tel:${brand.contact.phoneHref}`} className="flex items-center gap-3 font-bold text-cream transition-colors hover:text-gold">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10"><Phone className="h-5 w-5 text-gold" aria-hidden="true" /></span>
                  <span dir="ltr">{brand.contact.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-cream/75">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10"><Clock className="h-5 w-5 text-gold" aria-hidden="true" /></span>
                {brand.contact.hours}
              </li>
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-cream/15 bg-cream/[0.04] p-6 sm:p-8">
            <Suspense fallback={<p className="py-10 text-center text-cream/70">در حال بارگذاری فرم…</p>}>
              <WholesaleForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
