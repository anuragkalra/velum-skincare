"use client";

import Link from "next/link";
import { useRef, type RefObject } from "react";
import { cartSubtotalCents, cartUnits, formatMoney } from "../lib/cart";
import { removeBagItem, setBagQuantity } from "../lib/bag-store";
import { getProductBySlug } from "../lib/products";
import { CatalogImage } from "./catalog";
import { Arrow } from "./arrow";
import { useBag } from "./bag-provider";
import { QuantitySelector } from "./quantity-selector";

export function BagDrawer({ dialogRef, onClose }: { dialogRef: RefObject<HTMLDialogElement | null>; onClose: () => void }) {
  const { items, closeBag, notice, storageUnavailable } = useBag();
  const closeButton = useRef<HTMLButtonElement>(null);
  const count = cartUnits(items);

  return <dialog ref={dialogRef} id="shopping-bag" className="bag-dialog" aria-modal="true" aria-labelledby="bag-title" aria-describedby="bag-demo-note" onClose={onClose} onCancel={event => { event.preventDefault(); closeBag(); }} onClick={event => { if (event.target === event.currentTarget) closeBag(); }} onKeyDown={event => {
    if (event.key !== "Tab") return;
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }}>
    <div className="bag-panel">
      <header className="bag-heading"><div><p className="eyebrow">VELUM / Demo shopping</p><h2 id="bag-title">Your bag<span>{count} {count === 1 ? "unit" : "units"}</span></h2></div><button ref={closeButton} type="button" className="bag-close" onClick={closeBag} aria-label="Close shopping bag"><span aria-hidden="true">×</span></button></header>
      <div className="bag-items">
        {items.length === 0 ? <div className="bag-empty"><p className="eyebrow">A considered beginning</p><h3>Your bag is empty.</h3><p>Discover three essentials for one considered routine.</p><Link href="/shop" className="text-link" onClick={closeBag}>Explore the collection<Arrow /></Link></div> : <ul className="bag-lines">{items.map(item => {
          const product = getProductBySlug(item.slug)!;
          return <li className="bag-line" key={item.slug}>
            <Link className={`bag-line-image catalog-stage catalog-${product.number}`} href={`/products/${product.slug}`} onClick={closeBag} aria-label={`View ${product.name}`}><CatalogImage product={product} sizes="110px" /></Link>
            <div className="bag-line-details"><div className="bag-line-title"><Link href={`/products/${product.slug}`} onClick={closeBag}>{product.name}</Link><span>{formatMoney(product.priceCents * item.quantity)}</span></div><p className="bag-line-type">{product.type}</p><p className="bag-line-meta">{product.size} · {formatMoney(product.priceCents)} each</p>
              <div className="bag-line-actions"><QuantitySelector id={`bag-quantity-${product.slug}`} subject={product.name} quantity={item.quantity} onChange={value => setBagQuantity(product.slug, value)} /><button type="button" className="bag-remove" aria-label={`Remove ${product.name}`} onClick={() => {
                const index = items.findIndex(line => line.slug === product.slug);
                removeBagItem(product.slug);
                // Removal destroys its focused control; retain a useful position in the dialog.
                const nextSlug = items[index + 1]?.slug ?? items[index - 1]?.slug;
                const nextInput = nextSlug ? document.getElementById(`bag-quantity-${nextSlug}`) : null;
                (nextInput ?? closeButton.current)?.focus();
              }}>Remove</button></div>
            </div>
          </li>;
        })}</ul>}
      </div>
      <footer className="bag-summary">
        <p className="bag-status" role="status" aria-live="polite" aria-atomic="true">{notice}</p>
        {storageUnavailable && <p className="bag-storage-note">Browser storage is unavailable. Your bag stays available during this visit, but may not survive a refresh.</p>}
        <div className="bag-subtotal"><span>Subtotal</span><strong>{formatMoney(cartSubtotalCents(items))}</strong></div>
        <p id="bag-demo-note" className="bag-demo-note">Portfolio demo — checkout unavailable.</p>
        <Link href="/shop" className="cta bag-continue" onClick={closeBag}>Continue Shopping<Arrow /></Link>
      </footer>
    </div>
  </dialog>;
}
