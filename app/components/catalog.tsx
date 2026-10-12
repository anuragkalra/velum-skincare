import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "../lib/products";
import { Arrow } from "./arrow";

export function CatalogImage({ product, decorative = false, sizes, priority = false }: {
  product: Product;
  decorative?: boolean;
  sizes: string;
  priority?: boolean;
}) {
  return <span className="catalog-frame"><Image src={product.image} alt={decorative ? "" : product.alt} fill priority={priority} quality={85} sizes={sizes} /></span>;
}

export function ProductGrid({ shop = false, items = products }: { shop?: boolean; items?: Product[] }) {
  const ProductHeading = shop ? "h2" : "h3";
  const imageSizes = items.length === 2
    ? "(max-width: 767px) calc(100vw - 40px), (max-width: 1599px) 45vw, 700px"
    : "(max-width: 767px) calc(100vw - 40px), (max-width: 1599px) 30vw, 427px";
  return <div className={`product-grid${items.length === 2 ? " related-grid" : ""}`} aria-label="VELUM collection">
          {items.map((product, index) => <article className="product" key={product.number}>
            <Link className={`product-image catalog-stage catalog-${product.number}`} href={`/products/${product.slug}`} aria-label={`View ${product.name} product`}><CatalogImage product={product} priority={shop && index === 0} sizes={imageSizes} /><span className="product-index" aria-hidden="true">{product.number} /</span><span className="image-link" aria-hidden="true"><Arrow diagonal /></span></Link>
            <div className="product-name"><ProductHeading>{product.name}</ProductHeading><span>{product.price}</span></div>
            <div className="product-details"><p>{product.type}</p><span>{product.size}</span></div>
            <p className="product-line">{product.line}</p>
            <Link className="text-link" href={`/products/${product.slug}`}>Discover {product.name}<Arrow /></Link>
          </article>)}
        </div>;
}
