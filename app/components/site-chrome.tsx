import Link from "next/link";
import { Arrow } from "./arrow";
import { BagButton } from "./bag-button";

export function SiteHeader({ shop = false }: { shop?: boolean }) {
  return <><a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header page-gutter" id="top">
      <Link className="wordmark" href="/" aria-label="VELUM home">VELUM</Link>
      <nav aria-label="Main navigation" className="main-nav">
        <Link href="/shop" aria-current={shop ? "page" : undefined}>Shop</Link><Link href="/#philosophy">Our Philosophy</Link><Link href="/#system">The System</Link>
      </nav>
      <BagButton />
    </header></>;
}

export function SiteFooter() {
  return <footer className="footer page-gutter">
      <div className="footer-grid"><div className="footer-brand"><Link className="wordmark" href="/">VELUM</Link><p>Made for the elements.</p><p className="footer-statement">Essential skincare for the conditions<br />of contemporary life.</p></div>
        <nav aria-label="Footer navigation" className="footer-nav"><p className="eyebrow">Explore</p><Link href="/shop">The collection</Link><Link href="/#philosophy">Our philosophy</Link><Link href="/#system">The System</Link><a href="#top">Back to top ↑</a></nav>
        <div className="newsletter"><label htmlFor="email" className="eyebrow">Notes from VELUM</label><p>A considered perspective on daily care.</p><div className="newsletter-field"><input id="email" type="email" placeholder="Your email address" disabled aria-describedby="newsletter-note" /><button type="button" disabled aria-label="Newsletter signup is coming soon"><Arrow /></button></div><p id="newsletter-note" className="newsletter-note">Newsletter coming soon. Sign-up is unavailable in this preview.</p></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} VELUM</p><p>Fictional skincare brand / Portfolio concept</p><div className="socials" aria-label="Social profiles coming soon"><span>Instagram — soon</span><span>Pinterest — soon</span></div></div>
    </footer>;
}
