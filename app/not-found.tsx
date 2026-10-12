import Link from "next/link";
import { SiteHeader, SiteFooter } from "./components/site-chrome";
import { Arrow } from "./components/arrow";

export default function NotFound() {
  return <div className="site-page"><SiteHeader /><main id="main" tabIndex={-1} className="not-found-page section-space page-gutter"><p className="eyebrow">VELUM / 404</p><h1>This page could not be found.</h1><Link href="/shop" className="cta">Return to the collection<Arrow /></Link></main><SiteFooter /></div>;
}
