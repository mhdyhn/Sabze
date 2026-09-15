"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { homeContent } from "@/content/home";

const { hero } = homeContent;

export function Hero() {
  const reduce = useReducedMotion();
  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section aria-label="معرفی سبزه سبز" className="relative overflow-hidden bg-primary-dark text-cream">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        {...(reduce
          ? {}
          : {
              initial: { scale: 1.07 },
              animate: { scale: 1 },
              transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] as const },
            })}
      >
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/35 to-primary-dark/30" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-primary-dark/60 via-transparent to-transparent" />

      <div className="container-x relative flex min-h-[86svh] flex-col justify-center py-20 sm:py-24 lg:min-h-[90svh]">
        <div className="max-w-2xl">
          <motion.p
            {...anim(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-primary-dark/40 px-4 py-1.5 text-[13px] font-semibold text-cream backdrop-blur-sm sm:text-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            {...anim(0.2)}
            className="mt-5 text-[40px] font-extrabold leading-[1.35] sm:text-6xl sm:leading-[1.3]"
          >
            {hero.title}
          </motion.h1>
          <motion.p {...anim(0.3)} className="mt-5 max-w-xl text-[17px] leading-9 text-cream/85 sm:text-lg">
            {hero.subtitle}
          </motion.p>
          <motion.div {...anim(0.4)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={hero.primaryCta.href} className="btn-gold">
              {hero.primaryCta.label}
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn-outline-light">
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
          <motion.ul {...anim(0.5)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] font-medium text-cream/80">
            {hero.points.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-gold" aria-hidden="true" />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
