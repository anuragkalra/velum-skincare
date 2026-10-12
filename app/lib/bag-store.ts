"use client";

import { addCartItem, BAG_STORAGE_KEY, changeCartQuantity, loadCart, removeCartItem, saveCart, type CartItem } from "./cart";
import { getProductBySlug } from "./products";
import { MAX_QUANTITY, normalizeQuantity } from "./quantity";

type BagSnapshot = { items: CartItem[]; storageUnavailable: boolean; notice: string };
const emptySnapshot: BagSnapshot = { items: [], storageUnavailable: false, notice: "" };
let snapshot = emptySnapshot;
let initialized = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(listener => listener());

function readStorage() {
  const loaded = loadCart(() => window.localStorage);
  snapshot = { items: loaded.unavailable ? snapshot.items : loaded.items, storageUnavailable: loaded.unavailable, notice: "" };
  notify();
}
function onStorage(event: StorageEvent) {
  if (event.key === BAG_STORAGE_KEY || event.key === null) readStorage();
}
export function subscribeBag(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  if (!initialized) { initialized = true; readStorage(); }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}
export const getBagSnapshot = () => snapshot;
export const getServerBagSnapshot = () => emptySnapshot;

function update(items: CartItem[], notice: string) {
  const saved = saveCart(items, () => window.localStorage);
  snapshot = { items, storageUnavailable: !saved, notice };
  notify();
}
export function addBagItem(slug: string, quantity: number) {
  const product = getProductBySlug(slug);
  if (!product) return;
  const result = addCartItem(snapshot.items, slug, quantity);
  update(result.items, result.limited ? `${product.name} has reached the limit of ${MAX_QUANTITY} units per demo bag. No more can be added.` : `${product.name} added to your bag.`);
}
export function setBagQuantity(slug: string, quantity: number) {
  const product = getProductBySlug(slug);
  if (!product) return;
  const value = normalizeQuantity(quantity);
  update(changeCartQuantity(snapshot.items, slug, value), value === MAX_QUANTITY ? `${product.name} has reached the limit of ${MAX_QUANTITY} units per demo bag.` : `${product.name} quantity updated to ${value}.`);
}
export function removeBagItem(slug: string) {
  update(removeCartItem(snapshot.items, slug), `${getProductBySlug(slug)?.name ?? "Item"} removed from your bag.`);
}
