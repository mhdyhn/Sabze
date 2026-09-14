import { Reveal } from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  text?: string;
}

/** Consistent inner-page hero (title block under breadcrumbs). */
export function PageHero({ eyebrow, title, text }: PageHeroProps) {
  return (
    <div className="container-x pb-2 pt-8 sm:pt-10">
      <Reveal className="max-w-3xl">
        <p className="flex items-center gap-3 text-sm font-bold text-gold">
          <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-[1.6] text-ink">{title}</h1>
        {text && <p className="mt-3 text-[17px] leading-9 text-sage">{text}</p>}
      </Reveal>
    </div>
  );
}
