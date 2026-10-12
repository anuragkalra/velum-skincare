import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "../../lib/products";
import { ProductDetail } from "../../components/product-detail";

type ProductPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return { title: `${product.name} — ${product.type} | VELUM`, description: `${product.introduction} ${product.size}. ${product.price}. A fictional skincare portfolio concept.` };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
