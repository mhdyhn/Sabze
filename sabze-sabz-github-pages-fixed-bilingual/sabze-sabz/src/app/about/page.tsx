import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Check, Eye, Handshake, Leaf } from "lucide-react";
import { brand } from "@/lib/brand";
import { aboutContent } from "@/content/about";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProcessArt, type ProcessVariant } from "@/components/ProcessArt";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "داستان سبزه سبز؛ از باغ و برداشت دستی تا فرآوری کنترل‌شده و بسته‌بندی اختصاصی — تولیدکننده مستقیم کشمش سبز پریمیوم.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "داستان سبزه سبز",
    description: "ما باغداریم؛ نه فقط فروشنده.",
    images: [{ url: "/Sabze/images/garden.webp", width: 1200, height: 896, alt: "باغ انگور سبزه سبز" }],
  },
};

const craftVariants: ProcessVariant[] = ["wash", "dry", "pack"];
const valueIcons = { leaf: Leaf, eye: Eye, handshake: Handshake } as const;

export default function AboutPage() {
  const c = aboutContent;

  return (
    <>
      <Breadcrumbs items={[{ label: "خانه", href: "/" }, { label: "درباره ما" }]} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      {/* Hero image */}
      <div className="container-x pt-8">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] sm:aspect-[21/9]">
            <Image
              src={c.hero.image}
              alt={c.hero.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
            <figure className="absolute bottom-5 right-5 left-5 sm:bottom-8 sm:right-8 sm:left-auto sm:max-w-md rounded-2xl bg-cream/95 p-5 backdrop-blur-sm sm:p-6">
              <blockquote className="text-[16px] font-bold leading-8 text-ink sm:text-[17px]">
                «ما فقط فروشنده نیستیم؛ تولید، خشک‌کردن، کنترل کیفیت و بسته‌بندی را خودمان انجام می‌دهیم.»
              </blockquote>
              <figcaption className="mt-2 text-[13px] font-medium text-sage">— خانواده سبزه سبز</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>

      {/* Editorial sections */}
      {c.sections.map((s, i) => (
        <section key={s.id} aria-labelledby={`${s.id}-title`} className="container-x py-14 sm:py-16">
          <div className={cn("grid items-center gap-8 lg:grid-cols-2 lg:gap-14")}>
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
            <div className={cn(i % 2 === 1 && "lg:order-1")}>
              <SectionHeading align="start" eyebrow={s.eyebrow} title={s.title} />
              <Reveal delay={0.08}>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-9 text-sage sm:text-base">
                    {p}
                  </p>
                ))}
                <ul className="mt-5 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-[15px] font-bold text-ink">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Craft */}
      <section aria-labelledby="craft-title" className="bg-primary-dark text-cream">
        <div className="container-x py-20 sm:py-24">
          <SectionHeading
            tone="light"
            eyebrow={c.craft.eyebrow}
            title={c.craft.title}
            text={c.craft.text}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {c.craft.cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <article className="h-full rounded-3xl border border-cream/10 bg-cream/[0.04] p-7 text-center">
                  <ProcessArt variant={craftVariants[i]} title={card.title} className="mx-auto max-w-[150px]" />
                  <h3 className="mt-4 text-xl font-extrabold">{card.title}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-cream/70">{card.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values + stats */}
      <section aria-labelledby="values-title" className="container-x py-20 sm:py-24">
        <SectionHeading eyebrow={c.values.eyebrow} title={c.values.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {c.values.items.map((v, i) => {
            const Icon = valueIcons[v.icon as keyof typeof valueIcons];
            return (
              <Reveal key={v.title} delay={i * 0.07}>
                <article className="h-full rounded-3xl border border-ink/10 bg-white/70 p-7 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                    <Icon className="h-7 w-7 text-cream" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-8 text-sage">{v.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-[2rem] bg-sand/70 p-6 sm:grid-cols-4 sm:p-8">
            {brand.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="text-3xl font-extrabold text-primary sm:text-4xl">{s.value}</dd>
                <dt className="mt-1 text-[14px] font-medium text-sage">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* CTA */}
      <section aria-labelledby="about-cta" className="container-x pb-20 sm:pb-24">
        <Reveal>
          <div className="rounded-[2rem] border border-ink/10 bg-white/70 px-6 py-12 text-center sm:px-10">
            <h2 id="about-cta" className="text-2xl font-extrabold text-ink sm:text-[28px]">
              {c.cta.title}
            </h2>
            <p className="mt-2 text-[15px] text-sage">{c.cta.text}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={c.cta.primary.href} className="btn-primary">
                {c.cta.primary.label}
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={c.cta.secondary.href} className="btn-outline">
                {c.cta.secondary.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
