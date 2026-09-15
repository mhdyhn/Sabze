import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessView } from "./SuccessView";

export const metadata: Metadata = {
  title: "ثبت موفق سفارش",
  description: "سفارش شما در سبزه سبز با موفقیت ثبت شد.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="container-x max-w-3xl py-14 sm:py-20">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-[2rem] bg-sand/70" />}>
        <SuccessView />
      </Suspense>
    </div>
  );
}
