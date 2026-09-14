"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { isValidEmail } from "@/lib/validate";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "footer" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }
    setError(null);
    setSending(true);
    // Mock subscription — no backend in this phase
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
    }, 700);
  };

  if (done) {
    return (
      <p
        role="status"
        className={cn(
          "flex items-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-semibold",
          variant === "footer" ? "bg-cream/10 text-cream" : "bg-primary/10 text-primary",
        )}
      >
        <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
        عضویت شما ثبت شد؛ به خانواده سبز ما خوش آمدید.
      </p>
    );
  }

  const footer = variant === "footer";

  return (
    <form onSubmit={submit} noValidate className={cn("w-full", footer ? "max-w-md" : "mx-auto max-w-xl")}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={footer ? "newsletter-footer" : "newsletter-main"} className="sr-only">
          ایمیل
        </label>
        <input
          id={footer ? "newsletter-footer" : "newsletter-main"}
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
          className={cn(
            "h-[52px] flex-1 rounded-2xl border px-5 text-left text-[15px] outline-none transition-colors placeholder:text-sage/60",
            footer
              ? "border-cream/25 bg-cream/10 text-cream focus:border-gold"
              : "border-ink/15 bg-white text-ink focus:border-primary",
          )}
        />
        <button
          type="submit"
          disabled={sending}
          className={cn(footer ? "btn-gold" : "btn-primary", "h-[52px] shrink-0 disabled:opacity-60")}
        >
          {sending ? (
            "در حال ثبت…"
          ) : (
            <>
              عضویت
              <Send className="h-4 w-4 -scale-x-100" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="form-error">
          {error}
        </p>
      )}
    </form>
  );
}
