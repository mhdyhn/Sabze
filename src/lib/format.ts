/** Persian number & price formatting helpers. */

const faNumber = new Intl.NumberFormat("fa-IR");

/** Convert Latin digits to Persian digits with thousand separators. */
export function toFa(value: number | string): string {
  if (typeof value === "number") return faNumber.format(value);
  const latin = value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  const num = Number(latin.replace(/,/g, ""));
  if (!Number.isNaN(num) && latin.trim() !== "") return faNumber.format(num);
  return value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** Format an IRR price: ۱۲۵۰۰۰۰ -> «۱٬۲۵۰٬۰۰۰ تومان» */
export function formatPrice(value: number): string {
  return `${faNumber.format(value)} تومان`;
}

/** Current Persian calendar year in Latin digits, e.g. 1405 */
export function persianYearLatin(): string {
  return new Intl.DateTimeFormat("fa-IR-u-nu-latn", { year: "numeric" }).format(new Date());
}

/** Generate a mock order tracking code: SB-1405-XXXX */
export function trackingCode(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SB-${persianYearLatin()}-${rand}`;
}
