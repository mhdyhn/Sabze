import Link from "next/link";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      {/* stylised grape cluster */}
      <circle cx="24" cy="14" r="4.2" fill="currentColor" />
      <circle cx="18.4" cy="21" r="4.2" fill="currentColor" opacity="0.85" />
      <circle cx="29.6" cy="21" r="4.2" fill="currentColor" opacity="0.85" />
      <circle cx="21.2" cy="28.5" r="4.2" fill="currentColor" opacity="0.7" />
      <circle cx="26.8" cy="28.5" r="4.2" fill="currentColor" opacity="0.7" />
      <circle cx="24" cy="35.5" r="4.2" fill="currentColor" opacity="0.55" />
      {/* leaf */}
      <path
        d="M24 10c-1.5-2.6-4-4-7-4.2 0.4 3 1.8 5.4 4.4 6.9"
        stroke="#B98A2F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  compact = false,
  className,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — صفحه اصلی`}
      className={cn("group flex items-center gap-3", className)}
    >
      <LogoMark
        className={cn(
          "h-10 w-10 shrink-0 transition-transform duration-300 group-hover:-rotate-6",
          tone === "dark" ? "text-primary" : "text-cream",
        )}
      />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-xl font-extrabold tracking-tight",
            tone === "dark" ? "text-primary" : "text-cream",
          )}
        >
          {brand.name}
        </span>
        {!compact && (
          <span
            className={cn(
              "text-[11px] font-medium",
              tone === "dark" ? "text-sage" : "text-cream/70",
            )}
          >
            کشمش سبز پریمیوم
          </span>
        )}
      </span>
    </Link>
  );
}
