"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, MessageCircle } from "lucide-react";
import { brand } from "@/lib/brand";
import { formatPrice, toFa } from "@/lib/format";

interface StoredItem {
  name: string;
  weight: string;
  qty: number;
  price: number;
}

interface StoredOrder {
  code: string;
  items: StoredItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  method: string;
  name: string;
  city: string;
}

export function SuccessView() {
  const params = useSearchParams();
  const code = params.get("code") ?? "";
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("sabze-order");
      if (raw) {
        const parsed = JSON.parse(raw) as StoredOrder;
        if (!code || parsed.code === code) setOrder(parsed);
        else setOrder(parsed);
      }
    } catch {
      /* ignore */
    }
  }, [code]);

  const displayCode = order?.code || code;

  const copy = async () => {
    if (!displayCode) return;
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white/80">
      <div className="bg-primary-dark px-6 py-10 text-center text-cream sm:px-10">
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold"
          role="img"
          aria-label="سفارش موفق"
        >
          <Check className="h-10 w-10 text-primary-dark" strokeWidth={3} aria-hidden="true" />
        </motion.span>
        <h1 className="mt-5 text-2xl font-extrabold sm:text-3xl">سفارش شما با موفقیت ثبت شد.</h1>
        <p className="mt-2 text-[15px] text-cream/75">
          {order ? `${order.name} عزیز، ` : ""}از اعتماد شما سپاسگزاریم؛ سفارش در صف آماده‌سازی قرار گرفت.
        </p>
        {displayCode && (
          <div className="mx-auto mt-6 flex max-w-sm items-center justify-between gap-3 rounded-2xl border border-cream/20 bg-cream/10 px-5 py-3.5">
            <span className="text-[14px] text-cream/70">کد پیگیری</span>
            <span className="flex items-center gap-2">
              <code className="text-lg font-extrabold tracking-wide text-gold" dir="ltr">{displayCode}</code>
              <button
                type="button"
                onClick={copy}
                aria-label="کپی کد پیگیری"
                className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/15 hover:text-cream"
              >
                {copied ? <Check className="h-4 w-4 text-gold" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              </button>
            </span>
          </div>
        )}
      </div>

      <div className="px-6 py-8 sm:px-10">
        {order ? (
          <>
            <h2 className="text-lg font-extrabold text-ink">خلاصه سفارش</h2>
            <ul className="mt-4 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream/60 px-5">
              {order.items.map((item) => (
                <li key={`${item.name}-${item.weight}`} className="flex items-center justify-between gap-3 py-3 text-[14px]">
                  <span className="font-bold text-ink">
                    {item.name} <span className="font-medium text-sage">({item.weight})</span>
                    <span className="text-sage"> × {toFa(item.qty)}</span>
                  </span>
                  <span className="shrink-0 font-extrabold text-ink">{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 text-[15px]">
              <div className="flex items-center justify-between">
                <dt className="text-sage">جمع کالاها</dt>
                <dd className="font-bold text-ink">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sage">ارسال ({order.method})</dt>
                <dd className="font-bold text-ink">{order.shipping === 0 ? "رایگان" : formatPrice(order.shipping)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-ink/10 pt-3">
                <dt className="font-extrabold text-ink">مبلغ پرداختی (نمایشی)</dt>
                <dd className="text-xl font-extrabold text-primary">{formatPrice(order.total)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[13px] leading-6 text-sage">
              ارسال به: {order.city} — جزئیات و کد رهگیری پستی پس از ارسال، پیامک می‌شود.
            </p>
          </>
        ) : (
          <p className="rounded-2xl bg-sand/60 p-5 text-center text-[14px] leading-8 text-sage">
            جزئیات کامل سفارش برای شما پیامک می‌شود. کد پیگیری را نگه دارید تا در پیگیری‌های بعدی از آن استفاده کنید.
          </p>
        )}

        <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
          <Link href="/products" className="btn-primary w-full">
            بازگشت به فروشگاه
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={`https://wa.me/${brand.contact.whatsapp}?text=${encodeURIComponent(`سلام، سفارش من با کد ${displayCode || "پیگیری"} ثبت شده و سؤالی دارم.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            پیگیری در واتساپ
          </a>
        </div>
      </div>
    </div>
  );
}
