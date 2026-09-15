"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SearchX, SlidersHorizontal } from "lucide-react";
import { categoryLabels, products, type ProductCategory } from "@/data/products";
import { toFa } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";

type WeightBand = "all" | "s" | "m" | "l";
type PriceBand = "all" | "low" | "mid" | "high";
type SortKey = "featured" | "cheap" | "expensive";

const weightMatch = (g: number, band: WeightBand) =>
  band === "all" || (band === "s" && g <= 500) || (band === "m" && g > 500 && g <= 2000) || (band === "l" && g > 2000);

const priceMatch = (p: number, band: PriceBand) =>
  band === "all" || (band === "low" && p < 600000) || (band === "mid" && p >= 600000 && p <= 1500000) || (band === "high" && p > 1500000);

export function ShopClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [weight, setWeight] = useState<WeightBand>("all");
  const [price, setPrice] = useState<PriceBand>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const result = useMemo(() => {
    const q = query.trim();
    const filtered = products.filter(
      (p) =>
        weightMatch(p.weightGrams, weight) &&
        priceMatch(p.price, price) &&
        (category === "all" || p.category === category) &&
        (q === "" || `${p.name} ${p.weight} ${p.categoryLabel}`.includes(q)),
    );
    const sorted = [...filtered];
    if (sort === "cheap") sorted.sort((a, b) => a.price - b.price);
    if (sort === "expensive") sorted.sort((a, b) => b.price - a.price);
    if (sort === "featured") sorted.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
    return sorted;
  }, [query, category, weight, price, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setWeight("all");
    setPrice("all");
    setSort("featured");
  };

  const hasFilter = query !== "" || category !== "all" || weight !== "all" || price !== "all" || sort !== "featured";

  return (
    <div>
      <div className="rounded-3xl border border-ink/10 bg-white/70 p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="relative">
            <label htmlFor="shop-search" className="sr-only">جستجو در محصولات</label>
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sage" aria-hidden="true" />
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو… مثلاً هدیه"
              className="input pr-12"
            />
          </div>
          <div>
            <label htmlFor="shop-cat" className="sr-only">نوع محصول</label>
            <select id="shop-cat" value={category} onChange={(e) => setCategory(e.target.value as "all" | ProductCategory)} className="input">
              <option value="all">همه انواع</option>
              {(Object.keys(categoryLabels) as ProductCategory[]).map((k) => (
                <option key={k} value={k}>{categoryLabels[k]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="shop-weight" className="sr-only">وزن</label>
            <select id="shop-weight" value={weight} onChange={(e) => setWeight(e.target.value as WeightBand)} className="input">
              <option value="all">همه وزن‌ها</option>
              <option value="s">تا ۵۰۰ گرم</option>
              <option value="m">۵۰۰ گرم تا ۲ کیلو</option>
              <option value="l">خانوادگی (بالای ۲ کیلو)</option>
            </select>
          </div>
          <div>
            <label htmlFor="shop-price" className="sr-only">محدوده قیمت</label>
            <select id="shop-price" value={price} onChange={(e) => setPrice(e.target.value as PriceBand)} className="input">
              <option value="all">همه قیمت‌ها</option>
              <option value="low">زیر ۶۰۰ هزار تومان</option>
              <option value="mid">۶۰۰ هزار تا ۱/۵ میلیون</option>
              <option value="high">بالای ۱/۵ میلیون</option>
            </select>
          </div>
          <div>
            <label htmlFor="shop-sort" className="sr-only">مرتب‌سازی</label>
            <select id="shop-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="input">
              <option value="featured">پیشنهاد ما</option>
              <option value="cheap">ارزان‌ترین</option>
              <option value="expensive">گران‌ترین</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          <p className="flex items-center gap-2 text-[14px] font-medium text-sage" role="status" aria-live="polite">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            {toFa(result.length)} محصول یافت شد
          </p>
          {hasFilter && (
            <button type="button" onClick={reset} className="flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-[14px] font-bold text-primary hover:bg-primary/10">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              حذف فیلترها
            </button>
          )}
        </div>
      </div>

      {result.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-ink/20 py-16 text-center">
          <SearchX className="h-10 w-10 text-sage" aria-hidden="true" />
          <p className="text-lg font-extrabold text-ink">محصولی با این مشخصات پیدا نشد</p>
          <p className="text-[15px] text-sage">فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید.</p>
          <button type="button" onClick={reset} className="btn-outline mt-2">نمایش همه محصولات</button>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
