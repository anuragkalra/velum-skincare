"use client";

import { useState } from "react";
import { MIN_QUANTITY } from "../lib/quantity";
import { QuantitySelector } from "./quantity-selector";
import { useBag } from "./bag-provider";

export function ProductPurchaseControls({ productSlug }: { productSlug: string }) {
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const { addToBag } = useBag();
  const noteId = `shopping-note-${productSlug}`;

  return <div className="purchase-controls" data-product-slug={productSlug}>
    <QuantitySelector id={`quantity-${productSlug}`} quantity={quantity} onChange={setQuantity} />
    <button type="button" className="add-to-bag" onClick={() => addToBag(productSlug, quantity)} aria-describedby={noteId}>Add to Bag</button>
    <p id={noteId} className="shopping-note">Portfolio demo — checkout unavailable.</p>
  </div>;
}
