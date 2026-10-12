import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "../lib/products";
import { Arrow } from "./arrow";
import { ProductGrid } from "./catalog";
import { ProductGallery } from "./product-gallery";
import { ProductPurchaseControls } from "./product-purchase-controls";
import { SiteHeader, SiteFooter } from "./site-chrome";

export function ProductDetail({ product }: { product: Product }) {
  const related = products.filter(item => item.slug !== product.slug);

  return <div className="site-page product-detail-page">
    <SiteHeader />
    <main id="main" tabIndex={-1}>
      <div className="pdp-content page-gutter">
        <Link href="/shop" className="return-link"><span aria-hidden="true">←</span> Back to the collection</Link>
        <div className="pdp-grid">
          <ProductGallery key={product.slug} product={product} />
          <section className="pdp-information" aria-labelledby="product-title">
            <p className="eyebrow">{product.number} / Essential care</p>
            <h1 id="product-title">{product.name}</h1>
            <p className="pdp-type">{product.type}</p>
            <p className="pdp-concept"><em>{product.line}</em></p>
            <p className="pdp-introduction">{product.introduction}</p>
            <div className="pdp-price"><span>{product.price}</span><span>{product.size}</span></div>
            <ProductPurchaseControls key={product.slug} productSlug={product.slug} />
            <div className="product-disclosures">
              <details><summary>Benefits<span aria-hidden="true">+</span></summary><div><p className="disclosure-note">Concept-level benefits</p><ul>{product.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul></div></details>
              <details><summary>How to Use<span aria-hidden="true">+</span></summary><div><p>{product.howToUse}</p><p className="disclosure-note">Concept routine guidance. Final usage directions are unspecified.</p></div></details>
              <details><summary>Ingredients<span aria-hidden="true">+</span></summary><div><p>Concept placeholder. Ingredients have not been specified for this fictional product.</p></div></details>
            </div>
          </section>
        </div>
      </div>
      <section className="pdp-editorial page-gutter" aria-labelledby="pdp-editorial-title">
        <div className="editorial-heading"><p className="eyebrow">Made for the elements</p><h2 id="pdp-editorial-title">Considered at every step.</h2></div>
        <div className="pdp-editorial-image"><Image src="/images/velum-collection.webp" alt="CLEANSE, FORTIFY, and SEAL together on pale architectural stone" fill quality={85} sizes="(max-width: 1599px) 90vw, 1440px" /></div>
      </section>
      <section className="pdp-related section-space page-gutter" aria-labelledby="related-title">
        <div className="section-heading"><div><p className="eyebrow">The System</p><h2 id="related-title">Complete the routine.</h2></div><Link className="text-link" href="/shop">View the collection<Arrow /></Link></div>
        <ProductGrid shop items={related} />
      </section>
    </main>
    <SiteFooter />
  </div>;
}
