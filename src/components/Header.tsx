"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, Truck, X } from "lucide-react";
import { brand } from "@/lib/brand";
import { toFa } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change + lock body scroll while open
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="bg-primary-dark text-cream">
        <p className="container-x flex min-h-9 items-center justify-center gap-2 py-1.5 text-center text-[13px] font-medium">
          <Truck className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان
        </p>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-cream/90 backdrop-blur-md transition-all duration-300",
          scrolled ? "border-ink/10 shadow-[0_8px_30px_-18px_rgba(21,46,30,0.45)]" : "border-transparent",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Logo />

          <nav aria-label="ناوبری اصلی" className="hidden items-center gap-1 lg:flex">
            {brand.navigation.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors",
                    active ? "text-primary" : "text-ink/75 hover:text-primary",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold transition-all duration-300",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              aria-label={`سبد خرید، ${toFa(count)} کالا`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              <span aria-live="polite" className="sr-only">
                {toFa(count)} کالا در سبد
              </span>
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -left-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-white"
                >
                  {toFa(count)}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-50 bg-ink/45 lg:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="منوی موبایل"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-sm flex-col bg-cream shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-ink/10 p-4">
                <Logo compact />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="بستن منو"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary/10"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="منوی موبایل" className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {[...brand.navigation, { href: "/faq", label: "سوالات متداول" }].map((item) => {
                    const active =
                      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            "flex min-h-[52px] items-center rounded-xl px-4 text-[17px] font-semibold transition-colors",
                            active
                              ? "bg-primary text-cream"
                              : "text-ink hover:bg-primary/10 hover:text-primary",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="border-t border-ink/10 p-4 text-sm text-sage">
                <p className="font-semibold text-ink">{brand.contact.phone}</p>
                <p className="mt-1">{brand.contact.hours}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
