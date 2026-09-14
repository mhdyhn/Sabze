import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] max-w-2xl flex-col items-center justify-center py-20 text-center">
      <span className="relative flex h-28 w-28 items-center justify-center">
        <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-dashed border-gold/60" />
        <LogoMark className="h-16 w-16 text-primary" />
      </span>
      <p className="mt-6 text-7xl font-extrabold tracking-tight text-primary/15 sm:text-8xl" aria-hidden="true">
        ۴۰۴
      </p>
      <h1 className="-mt-4 text-3xl font-extrabold text-ink sm:text-4xl">این خوشه پیدا نشد!</h1>
      <p className="mt-3 max-w-md text-[16px] leading-9 text-sage">
        به نظر می‌رسد صفحه‌ای که دنبالش هستید چیده شده یا اصلاً روی این تاک نبوده است.
        نگران نباشید؛ باغ ما پر از خوشه‌های دیگر است.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          <Home className="h-4 w-4" aria-hidden="true" />
          بازگشت به خانه
        </Link>
        <Link href="/products" className="btn-outline">
          مشاهده محصولات
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
