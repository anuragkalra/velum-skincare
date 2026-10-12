import Image from "next/image";

const products = [
  { number: "01", name: "CLEANSE", type: "Gentle Cream Cleanser", size: "150 mL", price: "$38", line: "The foundation of a balanced routine.", image: "/images/cleanse.webp", alt: "VELUM CLEANSE frosted glass bottle with a brushed aluminum pump", routine: "Begin with a gentle, cream-based cleanse. A considered foundation for daily care." },
  { number: "02", name: "FORTIFY", type: "Barrier Support Serum", size: "30 mL", price: "$68", line: "Resilience, formulated.", image: "/images/fortify.webp", alt: "VELUM FORTIFY frosted glass serum bottle with a brushed aluminum treatment pump", routine: "Follow with a lightweight serum concept focused on hydration and the skin’s natural moisture barrier." },
  { number: "03", name: "SEAL", type: "Recovery Moisturizer", size: "50 mL", price: "$58", line: "Protection in its purest form.", image: "/images/seal.webp", alt: "VELUM SEAL low-profile frosted glass moisturizer jar with a brushed aluminum lid", routine: "Finish with a daily moisturizer concept designed to help retain hydration and soften the feeling of dryness." },
];

function CatalogImage({ product, decorative = false, sizes }: {
  product: (typeof products)[number];
  decorative?: boolean;
  sizes: string;
}) {
  return <span className="catalog-frame"><Image src={product.image} alt={decorative ? "" : product.alt} fill quality={85} sizes={sizes} /></span>;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="arrow"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.25" /></svg>;
}

function CollectionLink({ children = "Explore the collection", dark = false }: { children?: React.ReactNode; dark?: boolean }) {
  return <a href="#collection" className={`cta ${dark ? "cta-light" : ""}`}>{children}<Arrow /></a>;
}

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header page-gutter" id="top">
      <a className="wordmark" href="#top" aria-label="VELUM home">VELUM</a>
      <nav aria-label="Main navigation" className="main-nav">
        <a href="#collection">Shop</a><a href="#philosophy">Our Philosophy</a><a href="#system">The System</a>
      </nav>
      <button className="bag" type="button" disabled title="Shopping bag is unavailable in this homepage preview" aria-label="Shopping bag, 0 items. Unavailable in this homepage preview.">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 7.5h14l1 13H4l1-13Zm3 0V6a4 4 0 0 1 8 0v1.5" stroke="currentColor" strokeWidth="1.2" /></svg><span>0</span><span className="bag-note">Preview</span>
      </button>
    </header>
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
        <div className="product-grid">
          {products.map(product => <article className="product" key={product.number}>
            <a className={`product-image catalog-stage catalog-${product.number}`} href={`#step-${product.number}`} aria-label={`Discover ${product.name} in The System`}><CatalogImage product={product} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1599px) 30vw, 427px" /><span className="product-index" aria-hidden="true">{product.number} /</span><span className="image-link" aria-hidden="true"><Arrow diagonal /></span></a>
            <div className="product-name"><h3>{product.name}</h3><span>{product.price}</span></div>
            <div className="product-details"><p>{product.type}</p><span>{product.size}</span></div>
            <p className="product-line">{product.line}</p>
            <a className="text-link" href={`#step-${product.number}`}>Discover {product.name}<Arrow /></a>
          </article>)}
        </div>
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
            <div className="step-copy"><h3>{product.name}</h3><p>{product.routine}</p><a className="text-link" href="#collection">View in collection<Arrow /></a></div>
          </li>)}
        </ol>
        <p className="system-footnote">Essential by design. Considered at every step.</p>
      </section>

      <section id="editorial" className="closing" aria-labelledby="closing-title">
        <div className="closing-copy page-gutter"><p className="eyebrow">Made for the elements</p><h2 id="closing-title">Purpose in every form.</h2><p>Considered formulations. Purposeful design.</p><CollectionLink /></div>
        <div className="closing-image"><Image src="/images/velum-collection.webp" alt="The complete VELUM collection: CLEANSE, FORTIFY, and SEAL arranged on pale stone" fill quality={85} sizes="100vw" /></div>
      </section>
    </main>
    <footer className="footer page-gutter">
      <div className="footer-grid"><div className="footer-brand"><a className="wordmark" href="#top">VELUM</a><p>Made for the elements.</p><p className="footer-statement">Essential skincare for the conditions<br />of contemporary life.</p></div>
        <nav aria-label="Footer navigation" className="footer-nav"><p className="eyebrow">Explore</p><a href="#collection">The collection</a><a href="#philosophy">Our philosophy</a><a href="#system">The System</a><a href="#top">Back to top ↑</a></nav>
        <div className="newsletter"><label htmlFor="email" className="eyebrow">Notes from VELUM</label><p>A considered perspective on daily care.</p><div className="newsletter-field"><input id="email" type="email" placeholder="Your email address" disabled aria-describedby="newsletter-note" /><button type="button" disabled aria-label="Newsletter signup is coming soon"><Arrow /></button></div><p id="newsletter-note" className="newsletter-note">Newsletter coming soon. Sign-up is unavailable in this preview.</p></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} VELUM</p><p>Fictional skincare brand / Portfolio concept</p><div className="socials" aria-label="Social profiles coming soon"><span>Instagram — soon</span><span>Pinterest — soon</span></div></div>
    </footer>
  </>;
}
