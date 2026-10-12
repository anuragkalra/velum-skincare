import Image from "next/image";
import Link from "next/link";
import { products } from "./lib/products";
import { Arrow } from "./components/arrow";
import { CatalogImage, ProductGrid } from "./components/catalog";
import { SiteHeader, SiteFooter } from "./components/site-chrome";

function CollectionLink({ children = "Explore the collection", dark = false }: { children?: React.ReactNode; dark?: boolean }) {
  return <Link href="/shop" className={`cta ${dark ? "cta-light" : ""}`}>{children}<Arrow /></Link>;
}

export default function Home() {
  return <div className="site-page">
    <SiteHeader />
    <main id="main" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media"><Image src="/images/velum-hero.webp" alt="VELUM FORTIFY on pale architectural stone, illuminated by directional daylight" fill priority quality={85} sizes="100vw" /></div>
        <div className="hero-copy page-gutter">
          <p className="eyebrow">Considered care. Essential by design.</p>
          <h1 id="hero-title">Made for<br />the <em>elements.</em></h1>
          <p className="hero-description">Essential skincare for the conditions<br className="desktop-break" /> of contemporary life.</p>
          <CollectionLink />
        </div>
        <div className="hero-caption page-gutter" aria-hidden="true"><span>Material. Form. Function.</span><span>VELUM / 02 — FORTIFY</span></div>
      </section>

      <section id="collection" className="collection section-space page-gutter" aria-labelledby="collection-title">
        <div className="section-heading"><div><p className="eyebrow">01 / The collection</p><h2 id="collection-title">Three essentials.<br /><em>One considered routine.</em></h2></div><p className="section-intro">Designed to cleanse, strengthen, and protect.<br />Every element has a purpose.</p></div>
        <ProductGrid />
      </section>

      <section id="philosophy" className="philosophy" aria-labelledby="philosophy-title">
        <div className="philosophy-image"><Image src="/images/velum-philosophy.webp" alt="VELUM SEAL beside textured glass, with sunlight and precise architectural shadows" fill quality={85} sizes="(max-width: 767px) 100vw, 50vw" /></div>
        <div className="philosophy-copy"><p className="eyebrow">02 / Our philosophy</p><h2 id="philosophy-title">Form follows<br />function.<br /><em>Care follows<br />purpose.</em></h2><p>VELUM creates essential skincare designed to cleanse, strengthen, and protect the skin against the demands of contemporary life.</p><p>Rooted in material science and architectural simplicity, VELUM combines considered formulations with purposeful design.</p><a className="text-link" href="#system">Discover The System<Arrow /></a><span className="material-note">Frosted glass / Brushed aluminum / Essential care</span></div>
      </section>

      <section id="system" className="system section-space page-gutter" aria-labelledby="system-title">
        <div className="section-heading"><div><p className="eyebrow">03 / The System</p><h2 id="system-title">A daily structure<br /><em>for your skin.</em></h2></div><p className="section-intro">A purposeful sequence.<br />Cleanse. Strengthen. Protect.</p></div>
        <ol className="system-grid">
          {products.map(product => <li id={`step-${product.number}`} className="system-step" key={product.number}>
            <div className="step-heading"><span className="step-number">{product.number}</span><Arrow /></div>
            <div className={`step-image catalog-stage catalog-${product.number}`}><CatalogImage product={product} decorative sizes="(max-width: 767px) 35vw, (max-width: 1100px) 14vw, (max-width: 1599px) 23vw, 320px" /></div>
            <div className="step-copy"><h3>{product.name}</h3><p>{product.routine}</p><Link className="text-link" href={`/products/${product.slug}`}>Discover {product.name}<Arrow /></Link></div>
          </li>)}
        </ol>
        <p className="system-footnote">Essential by design. Considered at every step.</p>
      </section>

      <section id="editorial" className="closing" aria-labelledby="closing-title">
        <div className="closing-copy page-gutter"><p className="eyebrow">Made for the elements</p><h2 id="closing-title">Purpose in every form.</h2><p>Considered formulations. Purposeful design.</p><CollectionLink /></div>
        <div className="closing-image"><Image src="/images/velum-collection.webp" alt="The complete VELUM collection: CLEANSE, FORTIFY, and SEAL arranged on pale stone" fill quality={85} sizes="100vw" /></div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
