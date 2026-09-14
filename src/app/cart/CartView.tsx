"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { formatPrice, toFa } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, shippingMethods } from "@/lib/shop";
import { useCart } from "@/store/cart";

export function CartView() {
  const { detailed, count, subtotal, setQty, remove, clear, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]" aria-label="در حال بارگذاری سبد">
        <div className="space-y-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-3xl bg-sand/70" />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-3xl bg-sand/70" />
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-[2rem] border border-dashed border-ink/20 px-8 py-16 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sand">
          <ShoppingBag className="h-9 w-9 text-primary/60" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-extrabold text-ink">سبد خرید شما خالی است</h2>
        <p className="text-[15px] leading-8 text-sage">
          به نظر می‌رسد هنوز چیزی انتخاب نکرده‌اید؛ خوشه‌های سبز ما منتظرند.
        </p>
        <Link href="/products" className="btn-primary mt-2">
          مشاهده محصولات
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const estimatedShipping = remaining > 0 ? shippingMethods[0].fee : 0;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
      <div>
        <div className="rounded-3xl border border-ink/10 bg-white/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[14px] font-bold text-ink" aria-live="polite">
              {remaining > 0 ? (
                <>
                  <span className="text-primary">{formatPrice(remaining)}</span> تا ارسال رایگان مانده
                </>
              ) : (
                <span className="text-primary">سفارش شما شامل ارسال رایگان است</span>
              )}
            </p>
            <button
              type="button"
              onClick={clear}
              className="flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-[13px] font-bold text-sage transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              پاک کردن سبد
            </button>
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-sand"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="پیشرفت تا ارسال رایگان"
          >
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <ul className="mt-4 space-y-4">
          {detailed.map(({ product, qty }) => (
            <li
              key={product.slug}
              className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white/70 p-4 sm:flex-row sm:items-center sm:p-5"
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-sand sm:h-28 sm:w-24 sm:aspect-auto"
                aria-label={`مشاهده ${product.name} ${product.weight}`}
              >
                <Image src={product.image} alt={product.imageAlt} fill sizes="200px" className="object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-[17px] font-extrabold text-ink hover:text-primary">
                    {product.name} — {product.weight}
                  </h3>
                </Link>
                <p className="mt-1 text-[14px] text-sage">قیمت واحد: {formatPrice(product.price)}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center rounded-full border border-ink/15 px-1 py-1" role="group" aria-label={`تعداد ${product.name}`}>
                    <button type="button" onClick={() => setQty(product.slug, qty + 1)} aria-label="افزایش تعداد" className="flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-primary/10">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span aria-live="polite" className="w-8 text-center text-[16px] font-extrabold">{toFa(qty)}</span>
                    <button type="button" onClick={() => setQty(product.slug, qty - 1)} aria-label="کاهش تعداد" className="flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-primary/10">
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    aria-label={`حذف ${product.name} از سبد`}
                    className="flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-[14px] font-bold text-sage transition-colors hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    حذف
                  </button>
                </div>
              </div>
              <p className="text-lg font-extrabold text-primary sm:self-start">
                {formatPrice(product.price * qty)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-[1.75rem] border border-ink/10 bg-white/80 p-6 lg:sticky lg:top-28" aria-label="خلاصه سفارش">
        <h2 className="text-xl font-extrabold text-ink">خلاصه سفارش</h2>
        <dl className="mt-5 space-y-3 text-[15px]">
          <div className="flex items-center justify-between">
            <dt className="text-sage">تعداد کالاها</dt>
            <dd className="font-bold text-ink">{toFa(count)} کالا</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sage">جمع کالاها</dt>
            <dd className="font-bold text-ink">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sage">تخمین ارسال</dt>
            <dd className="font-bold text-ink">{estimatedShipping === 0 ? "رایگان" : formatPrice(estimatedShipping)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-ink/10 pt-4">
            <dt className="font-extrabold text-ink">مبلغ قابل پرداخت</dt>
            <dd className="text-xl font-extrabold text-primary">{formatPrice(subtotal + estimatedShipping)}</dd>
          </div>
        </dl>
        <p className="mt-2 text-[13px] leading-6 text-sage">هزینه دقیق ارسال در مرحله تسویه، بر اساس روش انتخابی محاسبه می‌شود.</p>
        <div className="mt-5 grid gap-2">
          <Link href="/checkout" className="btn-primary w-full">
            ادامه و تسویه حساب
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/products" className="btn-ghost w-full">ادامه خرید</Link>
        </div>
        <ul className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-[13px] font-medium text-sage">
          <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" aria-hidden="true" />ارسال به سراسر کشور با بسته‌بندی امن</li>
          <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />۷ روز ضمانت تازگی و عودت</li>
        </ul>
      </aside>
    </div>
  );
}
