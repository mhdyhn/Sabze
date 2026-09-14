import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { getProduct, products, relatedProducts } from "@/data/products";
import { formatPrice, toFa } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { Stars } from "@/components/Stars";
import { JsonLd } from "@/components/JsonLd";
import { Gallery, PurchaseBox } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "محصول یافت نشد" };
  const title = `${product.name} — ${product.weight}`;
  return {
    title,
    description: product.short,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} | ${brand.name}`,
      description: product.short,
      images: [{ url: product.image, width: 928, height: 1152, alt: product.imageAlt }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const whatsappHref = `https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(
    `سلام، می‌خواهم ${product.name} (${product.weight}) را سفارش بدهم.`,
  )}`;
  const related = relatedProducts(slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${product.name} — ${product.weight}`,
          description: product.short,
          image: `${brand.siteUrl}${product.image}`,
          brand: { "@type": "Brand", name: brand.name },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewsCount,
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "IRT",
            price: product.price,
            availability: "https://schema.org/InStock",
            url: `${brand.siteUrl}/products/${product.slug}`,
          },
        }}
      />

      <Breadcrumbs
        items={[
          { label: "خانه", href: "/" },
          { label: "محصولات", href: "/products" },
          { label: `${product.name} ${product.weight}` },
        ]}
      />

      <div className="container-x grid gap-10 py-8 sm:py-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <Gallery images={product.gallery} />
        </Reveal>

        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sand px-3.5 py-1 text-[13px] font-bold text-primary">
                {product.categoryLabel}
              </span>
              {product.badge && (
                <span className="rounded-full bg-primary px-3.5 py-1 text-[13px] font-bold text-cream">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-gold/15 px-3.5 py-1 text-[13px] font-bold text-gold">
                  {toFa(discount)}٪ تخفیف
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.6] text-ink sm:text-4xl">
              {product.name}
              <span className="text-sage"> — {product.weight}</span>
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <Stars rating={product.rating} />
              <span className="text-[14px] font-medium text-sage">
                {toFa(product.rating)} از ۵ — {toFa(product.reviewsCount)} نظر ثبت‌شده
              </span>
            </div>
            <p className="mt-4 text-[16px] leading-9 text-sage">{product.short}</p>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              {product.oldPrice && (
                <p className="pb-1 text-[16px] text-sage line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}
              <p className="text-[28px] font-extrabold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>
            <p className="mt-2 flex items-center gap-2 text-[14px] font-semibold text-primary">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
              موجود در انبار — آماده ارسال
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 border-t border-ink/10 pt-6">
              <p id="weight-label" className="text-[14px] font-bold text-ink">
                انتخاب وزن:
              </p>
              <div role="group" aria-labelledby="weight-label" className="mt-3 flex flex-wrap gap-2">
                {products.map((p) => {
                  const active = p.slug === product.slug;
                  return (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-[44px] items-center rounded-full border px-4 text-[14px] font-bold transition-all",
                        active
                          ? "border-primary bg-primary text-cream"
                          : "border-ink/15 bg-white/60 text-ink hover:border-primary hover:text-primary",
                      )}
                    >
                      {p.weight}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <PurchaseBox slug={product.slug} name={`${product.name} ${product.weight}`} />
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-3 w-full"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              سفارش سریع در واتساپ
            </a>

            <ul className="mt-6 grid grid-cols-1 gap-2.5 rounded-2xl border border-ink/10 bg-white/60 p-4 sm:grid-cols-3">
              {[
                { icon: Truck, text: "ارسال به سراسر کشور" },
                { icon: ShieldCheck, text: "ضمانت تازگی محصول" },
                { icon: RotateCcw, text: "۷ روز مهلت عودت" },
              ].map((f) => (
                <li key={f.text} className="flex items-center gap-2 text-[13px] font-bold text-ink">
                  <f.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {f.text}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-primary-dark p-5 text-cream sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[15px] font-extrabold">خرید عمده این محصول؟</p>
                <p className="mt-0.5 text-[13px] text-cream/70">لیست قیمت همکاری و نمونه رایگان.</p>
              </div>
              <Link
                href="/wholesale"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-gold px-5 text-[14px] font-bold text-primary-dark transition-all hover:brightness-110"
              >
                عمده‌فروشی
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Details + specs */}
      <section aria-label="جزئیات محصول" className="border-t border-ink/10 bg-sand/60">
        <div className="container-x grid gap-10 py-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-[22px] font-extrabold text-ink">درباره این محصول</h2>
            {product.description.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-9 text-sage">
                {p}
              </p>
            ))}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4">
              <Check className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-[14px] leading-8 text-ink">
                <strong>شرایط نگهداری:</strong> در ظرف دربسته، جای خشک و خنک و دور از نور مستقیم
                نگه دارید تا تا ۱۲ ماه تازگی خود را حفظ کند.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-[22px] font-extrabold text-ink">مشخصات فنی</h2>
            <dl className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-cream">
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "grid grid-cols-[130px_1fr] gap-3 px-5 py-3.5 text-[14px] sm:grid-cols-[170px_1fr]",
                    i % 2 === 0 ? "bg-white/50" : "bg-transparent",
                  )}
                >
                  <dt className="font-bold text-ink">{s.label}</dt>
                  <dd className="text-sage">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-title" className="container-x py-16 sm:py-20">
        <SectionHeading eyebrow="پیشنهاد ما" title="محصولات مشابه" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
