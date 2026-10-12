export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;

export function normalizeQuantity(value: number): number {
  if (!Number.isFinite(value)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(value)));
}
