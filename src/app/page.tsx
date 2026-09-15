import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Package,
  Quote,
  Sprout,
  Truck,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { products } from "@/data/products";
import { homeContent } from "@/content/home";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { ProcessArt, type ProcessVariant } from "@/components/ProcessArt";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Stars } from "@/components/Stars";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const trustIcons = {
  sprout: Sprout,
  "badge-check": BadgeCheck,
  package: Package,
  truck: Truck,
} as const;

const processVariants: ProcessVariant[] = ["harvest", "wash", "dry", "pack"];

export default function HomePage() {
  const c = homeContent;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: brand.name,
          alternateName: brand.nameEn,
          url: brand.siteUrl,
          slogan: brand.tagline,
          description: brand.description,
          email: brand.contact.email,
          address: { "@type": "PostalAddress", addressLocality: "تهران", addressCountry: "IR" },
        }}
      />

      <Hero />

      {/* Trust bar */}
      <section aria-label="مزیت‌های سبزه سبز" className="border-b border-ink/10 bg-cream">
        <div className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {c.trustBar.map((item, i) => {
            const Icon = trustIcons[item.icon as keyof typeof trustIcons];
            return (
              <Reveal key={item.title} delay={i * 0.07} className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[15px] font-extrabold text-ink">{item.title}</span>
                  <span className="block text-[13px] text-sage">{item.text}</span>
                </span>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section aria-labelledby="featured-title" className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow={c.featured.eyebrow}
          title={c.featured.title}
          text={c.featured.text}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href={c.featured.cta.href} className="btn-outline">
            {c.featured.cta.label}
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      {/* Brand story */}
      <section aria-labelledby="story-title" className="bg-sand/60">
        <div className="container-x grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(21,46,30,0.4)]">
              <Image
                src={c.story.image}
                alt={c.story.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-6 rounded-2xl bg-primary px-5 py-3 text-cream shadow-lg">
              <p className="text-[13px] font-medium text-cream/75">باغ اختصاصی سبزه سبز</p>
              <p className="text-lg font-extrabold">از خاک تا سفره، یک مسیر</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="start"
              eyebrow={c.story.eyebrow}
              title={c.story.title}
            />
            <Reveal delay={0.1}>
              {c.story.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-[16px] leading-9 text-sage">
                  {p}
                </p>
              ))}
              <ul className="mt-5 space-y-2.5">
                {c.story.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-[15px] font-bold text-ink">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {brand.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-ink/10 bg-cream/70 px-3 py-3 text-center">
                    <p className="text-xl font-extrabold text-primary">{s.value}</p>
                    <p className="mt-0.5 text-[12px] font-medium leading-5 text-sage">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href={c.story.cta.href} className="btn-primary mt-7">
                {c.story.cta.label}
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Production process */}
      <section aria-labelledby="process-title" className="bg-primary-dark text-cream">
        <div className="container-x py-20 sm:py-24">
          <SectionHeading
            tone="light"
            eyebrow={c.process.eyebrow}
            title={c.process.title}
            text={c.process.text}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <article className="relative h-full rounded-3xl border border-cream/10 bg-cream/[0.04] p-6 text-center transition-colors hover:border-gold/40">
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-[16px] font-extrabold text-primary-dark"
                  >
                    {step.n}
                  </span>
                  <ProcessArt variant={processVariants[i]} title={step.title} className="mx-auto max-w-[168px]" />
                  <h3 className="mt-4 text-[19px] font-extrabold">{step.title}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-cream/70">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews-title" className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow={c.reviews.eyebrow}
          title={c.reviews.title}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {c.reviews.items.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white/70 p-6">
                <Quote className="h-7 w-7 text-gold/70" aria-hidden="true" />
                <Stars rating={r.rating} className="mt-3" />
                <blockquote className="mt-3 flex-1 text-[14px] leading-8 text-ink/90">
                  «{r.text}»
                </blockquote>
                <figcaption className="mt-4 border-t border-ink/10 pt-4">
                  <p className="text-[15px] font-extrabold text-ink">{r.name}</p>
                  <p className="text-[13px] text-sage">{r.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Wholesale banner */}
      <section aria-labelledby="wholesale-title" className="container-x pb-20 sm:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary-dark text-cream">
            <Image
              src="/Sabze/images/harvest.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-primary-dark/70 to-primary-dark/30" />
            <div className="relative mx-auto max-w-3xl px-6 py-14 text-center sm:px-10 sm:py-16">
              <h2 id="wholesale-title" className="text-2xl font-extrabold leading-[1.7] sm:text-[28px]">
                {c.wholesaleBanner.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-8 text-cream/75">
                {c.wholesaleBanner.text}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={c.wholesaleBanner.primaryCta.href} className="btn-gold">
                  {c.wholesaleBanner.primaryCta.label}
                </Link>
                <Link href={c.wholesaleBanner.secondaryCta.href} className="btn-outline-light">
                  {c.wholesaleBanner.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Newsletter */}
      <section aria-labelledby="newsletter-title" className="border-t border-ink/10 bg-sand/60">
        <div className="container-x max-w-3xl py-16 text-center sm:py-20">
          <SectionHeading
            eyebrow="خبرنامه"
            title={c.newsletter.title}
            text={c.newsletter.text}
          />
          <Reveal delay={0.1} className="mt-7">
            <NewsletterForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
