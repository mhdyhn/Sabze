import { LogoMark } from "@/components/Logo";

export default function Loading() {
  return (
    <div className="container-x flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20">
      <LogoMark className="h-16 w-16 animate-pulse text-primary" />
      <p className="text-[15px] font-semibold text-sage">در حال بارگذاری…</p>
    </div>
  );
}
