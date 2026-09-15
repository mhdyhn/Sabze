import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "ارتباط با سبزه سبز؛ تلفن، واتساپ، تلگرام، ایمیل و آدرس — فرم تماس و ساعات پاسخ‌گویی.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Phone,
    label: "تلفن تماس",
    value: brand.contact.phone,
    href: `tel:${brand.contact.phoneHref}`,
    ltr: true,
  },
  {
    icon: MessageCircle,
    label: "واتساپ",
    value: brand.contact.mobile,
    href: `https://wa.me/${brand.contact.whatsapp}`,
    external: true,
    ltr: true,
  },
  {
    icon: Send,
    label: "تلگرام",
    value: `@${brand.contact.telegram}`,
    href: `https://t.me/${brand.contact.telegram}`,
    external: true,
    ltr: true,
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: brand.contact.email,
    href: `mailto:${brand.contact.email}`,
    ltr: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "تماس با ما" }]} />
      <PageHero
        eyebrow="در ارتباط باشیم"
        title="تماس با ما"
        text="سؤال، پیشنهاد یا سفارش خاصی دارید؟ خوشحال می‌شویم بشنویم — از هر راهی که برایتان راحت‌تر است."
      />

      <div className="container-x grid gap-8 py-10 lg:grid-cols-5 lg:gap-10">
        {/* Info column */}
        <div className="space-y-4 lg:col-span-2">
          {channels.map((ch, i) => (
            <Reveal key={ch.label} delay={i * 0.05}>
              <a
                href={ch.href}
                {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_36px_-24px_rgba(21,46,30,0.5)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary transition-colors group-hover:bg-primary-dark">
                  <ch.icon className="h-5 w-5 text-cream" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13px] font-medium text-sage">{ch.label}</span>
                  <span className="block text-[16px] font-extrabold text-ink" dir={ch.ltr ? "ltr" : undefined}>
                    {ch.value}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white/70 p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13px] font-medium text-sage">نشانی</span>
                <span className="block text-[15px] font-bold leading-7 text-ink">{brand.contact.address}</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white/70 p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand">
                <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13px] font-medium text-sage">ساعات پاسخ‌گویی</span>
                <span className="block text-[15px] font-bold text-ink">{brand.contact.hours}</span>
              </span>
            </div>
          </Reveal>

          {/* Map placeholder — designed static graphic ([PLACEHOLDER]: replace with live map) */}
          <Reveal delay={0.3}>
            <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white/70">
              <svg viewBox="0 0 400 220" role="img" aria-label="نقشه موقعیت سبزه سبز (به‌زودی)" className="h-auto w-full">
                <rect width="400" height="220" fill="#EDE6D4" />
                <g fill="#F7F3E8">
                  <rect x="18" y="18" width="90" height="60" rx="6" />
                  <rect x="122" y="18" width="120" height="60" rx="6" />
                  <rect x="256" y="18" width="126" height="60" rx="6" />
                  <rect x="18" y="120" width="150" height="82" rx="6" />
                  <rect x="232" y="120" width="150" height="82" rx="6" />
                </g>
                <g stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round">
                  <path d="M0 100 H400" />
                  <path d="M200 0 V220" />
                </g>
                <g stroke="#D8CFAF" strokeWidth="2" strokeDasharray="8 8">
                  <path d="M0 100 H400" />
                  <path d="M200 0 V220" />
                </g>
                <circle cx="200" cy="100" r="26" fill="#B98A2F" opacity="0.2" />
                <circle cx="200" cy="100" r="13" fill="#1F3D2B" />
                <circle cx="200" cy="100" r="5" fill="#FAF7F0" />
              </svg>
              <figcaption className="border-t border-ink/10 px-4 py-3 text-center text-[13px] font-medium text-sage">
                نقشه تعاملی به‌زودی به این بخش اضافه می‌شود.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Form column */}
        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="rounded-[1.75rem] border border-ink/10 bg-white/70 p-6 sm:p-8">
            <h2 className="text-[22px] font-extrabold text-ink">فرم تماس</h2>
            <p className="mb-6 mt-1 text-[14px] text-sage">
              پیامتان را بنویسید؛ حداکثر تا یک روز کاری پاسخ می‌دهیم.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </>
  );
}
