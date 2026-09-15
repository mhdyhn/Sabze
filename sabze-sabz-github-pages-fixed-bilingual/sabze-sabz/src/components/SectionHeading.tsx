import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={cn("max-w-2xl", centered ? "mx-auto text-center" : "text-start", className)}>
      <p
        className={cn(
          "flex items-center gap-3 text-sm font-bold tracking-wide text-gold",
          centered && "justify-center",
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
        {eyebrow}
        {centered && <span aria-hidden="true" className="h-px w-8 bg-gold/70" />}
      </p>
      <h2
        className={cn(
          "mt-3 text-3xl font-extrabold leading-[1.5] sm:text-[30px]",
          tone === "dark" ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </h2>
      {text && (
        <p className={cn("mt-3 text-[17px] leading-8", tone === "dark" ? "text-sage" : "text-cream/75")}>
          {text}
        </p>
      )}
    </Reveal>
  );
}
