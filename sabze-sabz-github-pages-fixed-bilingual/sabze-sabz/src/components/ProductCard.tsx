"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice, toFa } from "@/lib/format";
import { useCart } from "@/store/cart";
import { Stars } from "./Stars";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(21,46,30,0.35)]"
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={`مشاهده ${product.name} ${product.weight}`}
        className="relative block aspect-[4/5] overflow-hidden bg-sand"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-[12px] font-bold text-cream shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[13px] font-semibold text-sage">{product.categoryLabel}</p>
        <Link href={`/products/${product.slug}`} className="mt-1">
          <h3 className="text-[19px] font-extrabold leading-8 text-ink transition-colors group-hover:text-primary">
            {product.name} — {product.weight}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-[13px] text-sage">({toFa(product.reviewsCount)} نظر)</span>
        </div>
        <p className="mt-2 line-clamp-2 text-[14px] leading-7 text-sage">{product.short}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            {product.oldPrice && (
              <p className="text-[13px] text-sage line-through">{formatPrice(product.oldPrice)}</p>
            )}
            <p className="text-lg font-extrabold text-primary">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => add(product.slug)}
            aria-label={`افزودن ${product.name} ${product.weight} به سبد خرید`}
            className="flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-[14px] font-bold text-cream transition-all hover:bg-primary-dark active:scale-95"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">افزودن</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
