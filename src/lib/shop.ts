/**
 * Shop constants (mock commerce rules).
 * NOTE: Shipping fees and thresholds are [PLACEHOLDER] values.
 */

export const FREE_SHIPPING_THRESHOLD = 2000000;

export interface ShippingMethod {
  id: string;
  title: string;
  desc: string;
  /** fee in Toman; null = calculated/free-by-threshold */
  fee: number;
}

export const shippingMethods: ShippingMethod[] = [
  { id: "post", title: "پست پیشتاز", desc: "۲ تا ۴ روز کاری — سراسر کشور", fee: 85000 },
  { id: "courier", title: "پیک (تهران)", desc: "همان روز یا روز بعد", fee: 65000 },
  { id: "pickup", title: "تحویل حضوری", desc: "هماهنگی تلفنی پس از ثبت سفارش", fee: 0 },
];

export function shippingFee(methodId: string, subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD && methodId !== "courier") return 0;
  return shippingMethods.find((m) => m.id === methodId)?.fee ?? 0;
}
