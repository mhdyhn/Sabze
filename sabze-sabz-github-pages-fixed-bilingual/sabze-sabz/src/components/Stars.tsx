import { Star } from "lucide-react";
import { toFa } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label={`امتیاز ${toFa(rating)} از ۵`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5",
            i < Math.round(rating) ? "fill-gold text-gold" : "fill-ink/15 text-ink/15",
          )}
        />
      ))}
    </span>
  );
}
