"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toFa } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";

export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-sand">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0.35, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="تصاویر محصول">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`نمایش تصویر ${toFa(i + 1)}: ${img.alt}`}
            className={cn(
              "relative aspect-square overflow-hidden rounded-2xl border-2 bg-sand transition-all",
              active === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <Image src={img.src} alt="" aria-hidden="true" fill sizes="160px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function PurchaseBox({ slug, name }: { slug: string; name: string }) {
  const [qty, setQtyLocal] = useState(1);
  const { add } = useCart();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center justify-between rounded-full border border-ink/15 bg-white px-1.5 py-1.5 sm:justify-start" role="group" aria-label={`تعداد ${name}`}>
        <button
          type="button"
          onClick={() => setQtyLocal((q) => Math.min(q + 1, 99))}
          aria-label="افزایش تعداد"
          className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
        <span aria-live="polite" className="w-10 text-center text-lg font-extrabold text-ink">
          {toFa(qty)}
        </span>
        <button
          type="button"
          onClick={() => setQtyLocal((q) => Math.max(q - 1, 1))}
          aria-label="کاهش تعداد"
          disabled={qty <= 1}
          className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 disabled:opacity-30"
        >
          <Minus className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => add(slug, qty)}
        className="btn-primary flex-1"
      >
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
        افزودن به سبد خرید
      </button>
    </div>
  );
}
