"use client";

import { MAX_QUANTITY, MIN_QUANTITY, normalizeQuantity } from "../lib/quantity";

export function QuantitySelector({ id, quantity, onChange, subject }: { id: string; quantity: number; onChange: (quantity: number) => void; subject?: string }) {
  return <div className="quantity-selector">
    <label htmlFor={id} className="quantity-label">{subject ? `Quantity for ${subject}` : "Quantity"}<span>1–10</span></label>
    <div className="quantity-control">
      <button type="button" aria-label={subject ? `Decrease ${subject} quantity` : "Decrease quantity"} disabled={quantity === MIN_QUANTITY} onClick={() => onChange(normalizeQuantity(quantity - 1))}>−</button>
      <input id={id} name="quantity" type="number" inputMode="numeric" min={MIN_QUANTITY} max={MAX_QUANTITY} step={1} value={quantity} onChange={event => onChange(normalizeQuantity(Number(event.currentTarget.value)))} onBlur={event => { const value = normalizeQuantity(Number(event.currentTarget.value)); if (value !== quantity) onChange(value); }} />
      <button type="button" aria-label={subject ? `Increase ${subject} quantity` : "Increase quantity"} disabled={quantity === MAX_QUANTITY} onClick={() => onChange(normalizeQuantity(quantity + 1))}>+</button>
    </div>
    {quantity === MAX_QUANTITY && <p className="quantity-limit">Maximum 10 units per product.</p>}
  </div>;
}
