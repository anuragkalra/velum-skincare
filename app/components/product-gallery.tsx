"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "../lib/products";
import { CatalogImage } from "./catalog";

export function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const views = [{ image: product.image, alt: product.alt, label: "Catalog view" }, ...(product.alternateView ? [product.alternateView] : [])];
  const view = views[selected];

  return <div className="product-gallery" aria-label={`${product.name} photography`}>
    <div className={`pdp-gallery-stage${selected === 0 ? ` catalog-stage catalog-${product.number}` : " editorial-gallery-stage"}`}>
      {selected === 0 ? <CatalogImage product={product} priority sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 48vw, 620px" /> : <Image src={view.image} alt={view.alt} fill quality={85} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 48vw, 620px" />}
    </div>
    <div className="gallery-caption"><span>{view.label}</span>{views.length > 1 && <span>{selected + 1} / {views.length}</span>}</div>
    {views.length > 1 && <div className="gallery-thumbnails" aria-label="Choose a product view">
      {views.map((item, index) => <button type="button" key={item.image} aria-label={`Show ${item.label.toLowerCase()}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><Image src={item.image} alt="" fill quality={85} sizes="72px" /></button>)}
    </div>}
  </div>;
}
