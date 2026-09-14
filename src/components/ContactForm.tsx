"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { isNonEmpty, isValidEmail, isValidIranMobile } from "@/lib/validate";

interface Errors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const inputCls = "input";
const labelCls = "form-label";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!isNonEmpty(values.name)) next.name = "لطفاً نام خود را وارد کنید.";
    if (!isValidIranMobile(values.phone)) next.phone = "شماره موبایل معتبر وارد کنید (مثل ۰۹۱۲۳۴۵۶۷۸۹).";
    if (values.email && !isValidEmail(values.email)) next.email = "ایمیل واردشده معتبر نیست.";
    if (!isNonEmpty(values.message, 10)) next.message = "پیام شما باید حداقل ۱۰ حرف باشد.";
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
      <div role="status" className="flex flex-col items-start gap-3 rounded-3xl border border-primary/25 bg-primary/5 p-8">
        <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />
        <h3 className="text-xl font-extrabold text-ink">پیام شما با موفقیت ارسال شد</h3>
        <p className="text-[15px] leading-8 text-sage">
          {values.name} عزیز، کارشناسان ما حداکثر تا یک روز کاری آینده با شما تماس می‌گیرند.
        </p>
        <button type="button" onClick={() => { setDone(false); setValues({ name: "", phone: "", email: "", message: "" }); }} className="btn-ghost mt-2">
          ثبت پیام جدید
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelCls}>نام و نام خانوادگی *</label>
          <input id="contact-name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} className={inputCls} placeholder="مثلاً سارا محمدی" />
          {errors.name && <p role="alert" className="form-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelCls}>شماره موبایل *</label>
          <input id="contact-phone" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} className={inputCls} placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
          {errors.phone && <p role="alert" className="form-error">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className={labelCls}>ایمیل (اختیاری)</label>
        <input id="contact-email" type="email" dir="ltr" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} className={`${inputCls} text-left`} placeholder="example@mail.com" />
        {errors.email && <p role="alert" className="form-error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className={labelCls}>متن پیام *</label>
        <textarea id="contact-message" rows={5} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} className={`${inputCls} min-h-32 resize-y`} placeholder="سؤال یا درخواست خود را بنویسید…" />
        {errors.message && <p role="alert" className="form-error">{errors.message}</p>}
      </div>
      <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto sm:justify-self-start">
        {sending ? "در حال ارسال…" : (<>ارسال پیام<Send className="h-4 w-4 -scale-x-100" aria-hidden="true" /></>)}
      </button>
    </form>
  );
}
