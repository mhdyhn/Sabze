"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice, toFa } from "@/lib/format";
import { useCart } from "@/store/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shop";

export function CartDrawer() {
  const { isOpen, closeCart, detailed, count, subtotal, setQty, remove } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-ink/45"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="سبد خرید"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-50 flex w-[92vw] max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink">
                <ShoppingBag className="h-5 w-5 text-primary" aria-hidden="true" />
                سبد خرید
                <span className="text-sm font-semibold text-sage">({toFa(count)} کالا)</span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="بستن سبد خرید"
                className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary/10"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {detailed.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sand">
                  <ShoppingBag className="h-9 w-9 text-primary/60" aria-hidden="true" />
                </span>
                <p className="text-lg font-bold text-ink">سبد خرید شما خالی است</p>
                <p className="text-[15px] leading-7 text-sage">
                  هنوز هیچ خوشه سبزی انتخاب نکرده‌اید؛ محصولات ما را ببینید.
                </p>
                <Link href="/products" onClick={closeCart} className="btn-primary mt-2">
                  مشاهده محصولات
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-ink/10 bg-sand/60 px-5 py-3 text-[13px] font-medium text-ink">
                  {remaining > 0 ? (
                    <>
                      <span className="font-bold text-primary">{formatPrice(remaining)}</span> تا
                      ارسال رایگان مانده است.
                    </>
                  ) : (
                    <span className="font-bold text-primary">
                      تبریک! سفارش شما شامل ارسال رایگان می‌شود.
                    </span>
                  )}
                </div>
                <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                  {detailed.map(({ product, qty }) => (
                    <li
                      key={product.slug}
                      className="flex gap-3 rounded-2xl border border-ink/10 bg-white/70 p-3"
                    >
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-[15px] font-bold text-ink">{product.name}</p>
                            <p className="mt-0.5 text-[13px] text-sage">{product.weight}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(product.slug)}
                            aria-label={`حذف ${product.name} ${product.weight} از سبد`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sage transition-colors hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div
                            className="flex items-center rounded-full border border-ink/15"
                            role="group"
                            aria-label={`تعداد ${product.name}`}
                          >
                            <button
                              type="button"
                              onClick={() => setQty(product.slug, qty + 1)}
                              aria-label="افزایش تعداد"
                              className="flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-primary/10"
                            >
                              <Plus className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <span aria-live="polite" className="w-7 text-center text-[15px] font-bold">
                              {toFa(qty)}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(product.slug, qty - 1)}
                              aria-label="کاهش تعداد"
                              className="flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-primary/10"
                            >
                              <Minus className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                          <p className="text-[15px] font-extrabold text-primary">
                            {formatPrice(product.price * qty)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 border-t border-ink/10 bg-white/60 px-5 py-4">
                  <div className="flex items-center justify-between text-[15px]">
                    <span className="font-medium text-sage">جمع سبد خرید</span>
                    <span className="text-lg font-extrabold text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="grid gap-2">
                    <Link href="/cart" onClick={closeCart} className="btn-primary w-full">
                      مشاهده سبد و تسویه حساب
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <button type="button" onClick={closeCart} className="btn-ghost w-full">
                      ادامه خرید
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
