"use client";

import { cartUnits } from "../lib/cart";
import { useBag } from "./bag-provider";

export function BagButton() {
  const { items, isOpen, openBag } = useBag();
  const count = cartUnits(items);
  return <button className="bag" type="button" onClick={openBag} aria-label={`Shopping bag, ${count} ${count === 1 ? "unit" : "units"}`} aria-haspopup="dialog" aria-controls="shopping-bag" aria-expanded={isOpen}>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 7.5h14l1 13H4l1-13Zm3 0V6a4 4 0 0 1 8 0v1.5" stroke="currentColor" strokeWidth="1.2" /></svg><span>{count}</span><span className="bag-note">Demo</span>
  </button>;
}
