import { getProductBySlug, products } from "./products";
import { MAX_QUANTITY, MIN_QUANTITY, normalizeQuantity } from "./quantity";

export const BAG_STORAGE_KEY = "velum-demo-bag-v1";
export type CartItem = { slug: string; quantity: number };
export type CartStorage = Pick<Storage, "getItem" | "setItem">;

// Persist only validated product identities and quantities; prices always come from the catalog.
export function parseStoredCart(value: string | null): CartItem[] {
  if (!value) return [];
  try {
    const data: unknown = JSON.parse(value);
    if (!data || typeof data !== "object" || !("version" in data) || data.version !== 1 || !("items" in data) || !Array.isArray(data.items)) return [];
    const quantities = new Map<string, number>();
    for (const item of data.items) {
      if (!item || typeof item !== "object" || typeof item.slug !== "string" || !getProductBySlug(item.slug) || !Number.isInteger(item.quantity) || item.quantity < MIN_QUANTITY || item.quantity > MAX_QUANTITY) continue;
      quantities.set(item.slug, normalizeQuantity((quantities.get(item.slug) ?? 0) + item.quantity));
    }
    return products.flatMap(product => quantities.has(product.slug) ? [{ slug: product.slug, quantity: quantities.get(product.slug)! }] : []);
  } catch { return []; }
}

export function loadCart(getStorage: () => CartStorage): { items: CartItem[]; unavailable: boolean } {
  try { return { items: parseStoredCart(getStorage().getItem(BAG_STORAGE_KEY)), unavailable: false }; }
  catch { return { items: [], unavailable: true }; }
}

export function saveCart(items: CartItem[], getStorage: () => CartStorage): boolean {
  try { getStorage().setItem(BAG_STORAGE_KEY, JSON.stringify({ version: 1, items })); return true; }
  catch { return false; }
}

export function addCartItem(items: CartItem[], slug: string, quantity: number): { items: CartItem[]; limited: boolean } {
  if (!getProductBySlug(slug)) return { items, limited: false };
  const previous = items.find(item => item.slug === slug)?.quantity ?? 0;
  const requested = previous + normalizeQuantity(quantity);
  const nextQuantity = normalizeQuantity(requested);
  const next = [...items.filter(item => item.slug !== slug), { slug, quantity: nextQuantity }];
  return { items: products.flatMap(product => next.filter(item => item.slug === product.slug)), limited: requested >= MAX_QUANTITY };
}

export function changeCartQuantity(items: CartItem[], slug: string, quantity: number): CartItem[] {
  return items.map(item => item.slug === slug ? { ...item, quantity: normalizeQuantity(quantity) } : item);
}

export function removeCartItem(items: CartItem[], slug: string): CartItem[] {
  return items.filter(item => item.slug !== slug);
}

export function cartUnits(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function cartSubtotalCents(items: CartItem[]): number {
  return items.reduce((total, item) => total + (getProductBySlug(item.slug)?.priceCents ?? 0) * item.quantity, 0);
}

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
