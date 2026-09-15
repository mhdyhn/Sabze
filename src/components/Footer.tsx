import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { brand } from "@/lib/brand";
import { toFa, persianYearLatin } from "@/lib/format";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { InstagramIcon } from "./icons";

const socialIcons = {
  instagram: InstagramIcon,
  telegram: Send,
  whatsapp: MessageCircle,
} as const;

export function Footer() {
  const year = toFa(persianYearLatin());

  return (
    <footer className="bg-primary-dark text-cream/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-[15px] leading-8 text-cream/70">{brand.description}</p>
          <div className="mt-5 flex items-center gap-2">
            {brand.socials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-all hover:border-gold hover:bg-gold hover:text-primary-dark"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="لینک‌های فروشگاه">
          <h3 className="text-[15px] font-extrabold text-cream">فروشگاه</h3>
          <ul className="mt-4 space-y-1">
            {brand.footerLinks.shop.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-[40px] items-center text-[15px] text-cream/70 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="لینک‌های راهنما">
          <h3 className="text-[15px] font-extrabold text-cream">راهنما</h3>
          <ul className="mt-4 space-y-1">
            {brand.footerLinks.help.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-[40px] items-center text-[15px] text-cream/70 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[15px] font-extrabold text-cream">تماس با ما</h3>
          <ul className="mt-4 space-y-3 text-[14px] leading-7 text-cream/70">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`tel:${brand.contact.phoneHref}`} className="transition-colors hover:text-gold" dir="ltr">
                {brand.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${brand.contact.email}`} className="transition-colors hover:text-gold" dir="ltr">
                {brand.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {brand.contact.address}
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {brand.contact.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-x flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-cream">عضویت در خبرنامه سبزه سبز</h3>
            <p className="mt-1 text-[14px] text-cream/65">فصل برداشت و پیشنهادهای ویژه — ماهی یک‌بار.</p>
          </div>
          <NewsletterForm variant="footer" />
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-center text-[13px] text-cream/55 sm:flex-row sm:text-start">
          <p>© {year} — تمامی حقوق توسط رابین محفوظ است.</p>
          <p>طراحی شده توسط تیم طراحی رابط کاربری و تجربه کاربری رابین - سرپرست تیم مهدی حنیفه</p>
        </div>
      </div>
    </footer>
  );
}
