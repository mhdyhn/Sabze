"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  MapPin,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { formatPrice, toFa, trackingCode } from "@/lib/format";
import { shippingFee, shippingMethods } from "@/lib/shop";
import { isNonEmpty, isValidIranMobile, isValidPostalCode } from "@/lib/validate";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";

const steps = [
  { id: 1, title: "اطلاعات گیرنده", icon: User },
  { id: 2, title: "روش ارسال", icon: Truck },
  { id: 3, title: "بازبینی و پرداخت", icon: CreditCard },
];

interface InfoErrors {
  name?: string;
  mobile?: string;
  city?: string;
  address?: string;
  postal?: string;
}

export function CheckoutView() {
  const router = useRouter();
  const { detailed, subtotal, clear, hydrated } = useCart();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ name: "", mobile: "", city: "", address: "", postal: "", notes: "" });
  const [errors, setErrors] = useState<InfoErrors>({});
  const [method, setMethod] = useState("post");
  const [paying, setPaying] = useState(false);

  if (!hydrated) {
    return <div className="h-96 animate-pulse rounded-[2rem] bg-sand/70" aria-label="در حال بارگذاری تسویه" />;
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-[2rem] border border-dashed border-ink/20 px-8 py-16 text-center">
        <ShoppingBag className="h-10 w-10 text-sage" aria-hidden="true" />
        <h2 className="text-xl font-extrabold text-ink">سبد خرید خالی است</h2>
        <p className="text-[15px] text-sage">برای تسویه حساب ابتدا محصولی به سبد اضافه کنید.</p>
        <Link href="/products" className="btn-primary mt-2">مشاهده محصولات</Link>
      </div>
    );
  }

  const set = (key: keyof typeof info) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setInfo((v) => ({ ...v, [key]: e.target.value }));

  const validateInfo = () => {
    const next: InfoErrors = {};
    if (!isNonEmpty(info.name)) next.name = "نام گیرنده الزامی است.";
    if (!isValidIranMobile(info.mobile)) next.mobile = "شماره موبایل معتبر وارد کنید.";
    if (!isNonEmpty(info.city)) next.city = "نام شهر الزامی است.";
    if (!isNonEmpty(info.address, 10)) next.address = "نشانی کامل (حداقل ۱۰ حرف) وارد کنید.";
    if (!isValidPostalCode(info.postal)) next.postal = "کد پستی ۱۰ رقمی وارد کنید.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateInfo()) return;
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fee = shippingFee(method, subtotal);
  const total = subtotal + fee;
  const methodTitle = shippingMethods.find((m) => m.id === method)?.title ?? "";

  const pay = () => {
    setPaying(true);
    const code = trackingCode();
    const order = {
      code,
      items: detailed.map((d) => ({ name: d.product.name, weight: d.product.weight, qty: d.qty, price: d.product.price })),
      count: detailed.reduce((n, d) => n + d.qty, 0),
      subtotal,
      shipping: fee,
      total,
      method: methodTitle,
      name: info.name,
      city: info.city,
      address: info.address,
      mobile: info.mobile,
      date: new Date().toISOString(),
    };
    // Mock payment — simulate gateway latency, then "succeed"
    window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("sabze-order", JSON.stringify(order));
      } catch {
        /* ignore */
      }
      clear();
      router.push(`/success?code=${code}`);
    }, 1400);
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div>
        {/* Stepper */}
        <ol className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="مراحل تسویه">
          {steps.map((s) => {
            const done = step > s.id;
            const current = step === s.id;
            return (
              <li
                key={s.id}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-2xl border px-3 py-3 sm:px-4",
                  current
                    ? "border-primary bg-primary text-cream"
                    : done
                      ? "border-primary/30 bg-primary/5 text-primary"
                      : "border-ink/10 bg-white/60 text-sage",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] font-extrabold",
                    current ? "bg-cream text-primary" : done ? "bg-primary text-cream" : "bg-sand text-sage",
                  )}
                >
                  {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <span>{toFa(s.id)}</span>}
                </span>
                <span className="text-[13px] font-bold leading-5 sm:text-[14px]">{s.title}</span>
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="mt-5 rounded-[1.75rem] border border-ink/10 bg-white/70 p-6 sm:p-8"
          >
            {step === 1 && (
              <fieldset>
                <legend className="flex items-center gap-2 text-lg font-extrabold text-ink">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  اطلاعات گیرنده و نشانی ارسال
                </legend>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="co-name" className="form-label">نام و نام خانوادگی *</label>
                    <input id="co-name" autoComplete="name" value={info.name} onChange={set("name")} className="input" placeholder="نام گیرنده" aria-invalid={!!errors.name} />
                    {errors.name && <p role="alert" className="form-error">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="co-mobile" className="form-label">شماره موبایل *</label>
                    <input id="co-mobile" inputMode="tel" autoComplete="tel" value={info.mobile} onChange={set("mobile")} className="input" placeholder="۰۹۱۲۳۴۵۶۷۸۹" aria-invalid={!!errors.mobile} />
                    {errors.mobile && <p role="alert" className="form-error">{errors.mobile}</p>}
                  </div>
                  <div>
                    <label htmlFor="co-city" className="form-label">شهر *</label>
                    <input id="co-city" autoComplete="address-level2" value={info.city} onChange={set("city")} className="input" placeholder="مثلاً تهران" aria-invalid={!!errors.city} />
                    {errors.city && <p role="alert" className="form-error">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="co-postal" className="form-label">کد پستی *</label>
                    <input id="co-postal" inputMode="numeric" autoComplete="postal-code" value={info.postal} onChange={set("postal")} className="input" placeholder="۱۰ رقم" aria-invalid={!!errors.postal} />
                    {errors.postal && <p role="alert" className="form-error">{errors.postal}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="co-address" className="form-label">نشانی کامل *</label>
                    <textarea id="co-address" rows={3} autoComplete="street-address" value={info.address} onChange={set("address")} className="input min-h-24 resize-y" placeholder="خیابان، کوچه، پلاک، واحد…" aria-invalid={!!errors.address} />
                    {errors.address && <p role="alert" className="form-error">{errors.address}</p>}
                  </div>
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="flex items-center gap-2 text-lg font-extrabold text-ink">
                  <Truck className="h-5 w-5 text-primary" aria-hidden="true" />
                  انتخاب روش ارسال
                </legend>
                <div className="mt-5 grid gap-3" role="radiogroup" aria-label="روش ارسال">
                  {shippingMethods.map((m) => {
                    const f = shippingFee(m.id, subtotal);
                    const selected = method === m.id;
                    return (
                      <label
                        key={m.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 p-4 transition-all",
                          selected ? "border-primary bg-primary/5" : "border-ink/10 bg-white hover:border-primary/40",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={m.id}
                            checked={selected}
                            onChange={() => setMethod(m.id)}
                            className="h-5 w-5 accent-[#1F3D2B]"
                          />
                          <span>
                            <span className="block text-[16px] font-extrabold text-ink">{m.title}</span>
                            <span className="block text-[13px] text-sage">{m.desc}</span>
                          </span>
                        </span>
                        <span className="shrink-0 text-[15px] font-extrabold text-primary">
                          {f === 0 ? "رایگان" : formatPrice(f)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <div>
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink">
                  <CreditCard className="h-5 w-5 text-primary" aria-hidden="true" />
                  بازبینی و پرداخت
                </h2>
                <dl className="mt-5 grid gap-3 rounded-2xl bg-sand/60 p-5 text-[14px] sm:grid-cols-2">
                  <div><dt className="text-sage">گیرنده</dt><dd className="font-bold text-ink">{info.name}</dd></div>
                  <div><dt className="text-sage">موبایل</dt><dd className="font-bold text-ink">{info.mobile}</dd></div>
                  <div><dt className="text-sage">نشانی</dt><dd className="font-bold text-ink">{info.city} — {info.address}</dd></div>
                  <div><dt className="text-sage">روش ارسال</dt><dd className="font-bold text-ink">{methodTitle}</dd></div>
                </dl>
                <div className="mt-4">
                  <label htmlFor="co-notes" className="form-label">توضیحات سفارش (اختیاری)</label>
                  <textarea id="co-notes" rows={2} value={info.notes} onChange={set("notes")} className="input min-h-20 resize-y" placeholder="مثلاً: بسته‌بندی هدیه شود…" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border-2 border-primary bg-primary/5 p-4">
                  <span className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                      <Lock className="h-5 w-5 text-cream" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[16px] font-extrabold text-ink">پرداخت آنلاین</span>
                      <span className="block text-[13px] text-sage">نسخه نمایشی — پرداخت واقعی انجام نمی‌شود.</span>
                    </span>
                  </span>
                  <span className="text-lg font-extrabold text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              {step > 1 ? (
                <button type="button" onClick={back} className="btn-ghost">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  مرحله قبل
                </button>
              ) : (
                <Link href="/cart" className="btn-ghost">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  بازگشت به سبد
                </Link>
              )}
              {step < 3 ? (
                <button type="button" onClick={next} className="btn-primary">
                  ادامه
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button type="button" onClick={pay} disabled={paying} className="btn-gold min-w-56 disabled:opacity-70">
                  {paying ? (
                    <>در حال اتصال به درگاه نمایشی…</>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      ثبت سفارش و پرداخت {formatPrice(total)}
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Summary */}
      <aside className="rounded-[1.75rem] border border-ink/10 bg-white/80 p-6 lg:sticky lg:top-28" aria-label="خلاصه سفارش">
        <h2 className="text-xl font-extrabold text-ink">خلاصه سفارش</h2>
        <ul className="mt-4 space-y-3">
          {detailed.map(({ product, qty }) => (
            <li key={product.slug} className="flex items-center gap-3">
              <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-sand">
                <Image src={product.image} alt="" aria-hidden="true" fill sizes="48px" className="object-cover" />
                <span className="absolute left-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-cream">
                  {toFa(qty)}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-bold text-ink">{product.name}</span>
                <span className="block text-[13px] text-sage">{product.weight}</span>
              </span>
              <span className="shrink-0 text-[14px] font-extrabold text-ink">{formatPrice(product.price * qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-4 text-[15px]">
          <div className="flex items-center justify-between">
            <dt className="text-sage">جمع کالاها</dt>
            <dd className="font-bold text-ink">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sage">هزینه ارسال ({methodTitle})</dt>
            <dd className="font-bold text-ink">{fee === 0 ? "رایگان" : formatPrice(fee)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-ink/10 pt-3">
            <dt className="font-extrabold text-ink">مبلغ نهایی</dt>
            <dd className="text-xl font-extrabold text-primary">{formatPrice(total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
