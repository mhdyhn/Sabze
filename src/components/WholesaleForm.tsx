"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react";
import { isNonEmpty, isValidIranMobile } from "@/lib/validate";

interface Errors {
  name?: string;
  phone?: string;
  volume?: string;
}

const volumes = ["کمتر از ۱۰۰ کیلوگرم", "۱۰۰ تا ۵۰۰ کیلوگرم", "۵۰۰ کیلوگرم تا ۲ تن", "بیش از ۲ تن", "کانتینری / صادراتی"];
const types = [
  { id: "price", label: "درخواست لیست قیمت عمده" },
  { id: "sample", label: "درخواست نمونه محصول" },
  { id: "export", label: "همکاری صادراتی" },
  { id: "org", label: "خرید سازمانی / هدایای شرکتی" },
];

export function WholesaleForm() {
  const params = useSearchParams();
  const [values, setValues] = useState({
    name: "",
    company: "",
    country: "ایران",
    phone: "",
    volume: "",
    type: "price",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  // Preselect request type from ?type= query (?type=sample / price / export / org)
  useEffect(() => {
    const t = params.get("type");
    if (t && types.some((x) => x.id === t)) {
      setValues((v) => ({ ...v, type: t }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!isNonEmpty(values.name)) next.name = "لطفاً نام خود را وارد کنید.";
    if (!isValidIranMobile(values.phone) && !isNonEmpty(values.phone, 7))
      next.phone = "شماره تماس معتبر وارد کنید.";
    if (!values.volume) next.volume = "مقدار تقریبی خرید را انتخاب کنید.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSending(true);
    // Mock submit — no backend in this phase
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
    }, 800);
  };

  if (done) {
    return (
      <div role="status" className="flex flex-col items-start gap-3 rounded-3xl border border-gold/40 bg-gold/10 p-8">
        <CheckCircle2 className="h-10 w-10 text-gold" aria-hidden="true" />
        <h3 className="text-xl font-extrabold text-cream">درخواست شما ثبت شد</h3>
        <p className="text-[15px] leading-8 text-cream/75">
          {values.name} عزیز، واحد فروش سازمانی ما کمتر از یک روز کاری آینده برای ارسال{" "}
          {values.type === "sample" ? "نمونه محصول" : "لیست قیمت"} با شما تماس می‌گیرد.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ws-name" className="form-label-light">نام و نام خانوادگی *</label>
          <input id="ws-name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} className="input-dark" placeholder="نام شما" />
          {errors.name && <p role="alert" className="form-error-light">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ws-phone" className="form-label-light">شماره تماس *</label>
          <input id="ws-phone" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} className="input-dark" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
          {errors.phone && <p role="alert" className="form-error-light">{errors.phone}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ws-company" className="form-label-light">نام شرکت / فروشگاه (اختیاری)</label>
          <input id="ws-company" autoComplete="organization" value={values.company} onChange={set("company")} className="input-dark" placeholder="مثلاً پخش مواد غذایی…" />
        </div>
        <div>
          <label htmlFor="ws-country" className="form-label-light">کشور مقصد</label>
          <input id="ws-country" value={values.country} onChange={set("country")} className="input-dark" placeholder="ایران" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ws-volume" className="form-label-light">مقدار تقریبی خرید *</label>
          <select id="ws-volume" value={values.volume} onChange={set("volume")} aria-invalid={!!errors.volume} className="input-dark">
            <option value="">انتخاب کنید…</option>
            {volumes.map((v) => (<option key={v} value={v}>{v}</option>))}
          </select>
          {errors.volume && <p role="alert" className="form-error-light">{errors.volume}</p>}
        </div>
        <div>
          <label htmlFor="ws-type" className="form-label-light">نوع درخواست</label>
          <select id="ws-type" value={values.type} onChange={set("type")} className="input-dark">
            {types.map((t) => (<option key={t.id} value={t.id}>{t.label}</option>))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="ws-message" className="form-label-light">توضیحات تکمیلی (اختیاری)</label>
        <textarea id="ws-message" rows={4} value={values.message} onChange={set("message")} className="input-dark min-h-28 resize-y" placeholder="درجه کیفی مدنظر، نوع بسته‌بندی، زمان‌بندی تحویل…" />
      </div>
      <button type="submit" disabled={sending} className="btn-gold w-full sm:w-auto sm:justify-self-start">
        {sending ? "در حال ثبت…" : (<>ثبت درخواست<Send className="h-4 w-4 -scale-x-100" aria-hidden="true" /></>)}
      </button>
    </form>
  );
}
