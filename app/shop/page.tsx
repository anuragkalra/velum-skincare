import type { Metadata } from "next";
import { ProductGrid } from "../components/catalog";
import { SiteHeader, SiteFooter } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "The Collection — VELUM",
  description: "Essential skincare designed to cleanse, strengthen, and protect. Explore CLEANSE, FORTIFY, and SEAL — VELUM’s complete three-product collection. A fictional skincare portfolio concept.",
};

export default function Shop() {
  return <div className="site-page">
    <SiteHeader shop />
    <main id="main" tabIndex={-1} className="shop-page section-space page-gutter">
      <div className="section-heading shop-intro">
        <div><p className="eyebrow">The collection</p><h1>Three essentials.<br /><em>One considered routine.</em></h1></div>
        <p className="section-intro">Essential skincare designed to cleanse, strengthen, and protect.</p>
      </div>
      <ProductGrid shop />
    </main>
    <SiteFooter />
  </div>;
}
