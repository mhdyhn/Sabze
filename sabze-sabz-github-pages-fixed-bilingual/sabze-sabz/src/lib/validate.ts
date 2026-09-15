/** Shared form validation helpers. */

/** Convert Persian/Arabic digits to Latin digits. */
export function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Iranian mobile: 09XXXXXXXXX (accepts Persian digits, spaces, dashes). */
export function isValidIranMobile(value: string): boolean {
  const clean = normalizeDigits(value).replace(/[\s-]/g, "");
  return /^09\d{9}$/.test(clean);
}

/** Iranian postal code: 10 digits. */
export function isValidPostalCode(value: string): boolean {
  const clean = normalizeDigits(value).replace(/[\s-]/g, "");
  return /^\d{10}$/.test(clean);
}

export function isNonEmpty(value: string, min = 2): boolean {
  return value.trim().length >= min;
}
