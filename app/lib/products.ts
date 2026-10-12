export type ProductView = { image: string; alt: string; label: string };

export type Product = {
  number: string;
  slug: string;
  name: string;
  type: string;
  size: string;
  price: string;
  priceCents: number;
  line: string;
  image: string;
  alt: string;
  routine: string;
  introduction: string;
  benefits: string[];
  howToUse: string;
  alternateView?: ProductView;
};

export const products: Product[] = [
  {
    "number": "01",
    "name": "CLEANSE",
    "type": "Gentle Cream Cleanser",
    "size": "150 mL",
    "price": "$38",
    "priceCents": 3800,
    "line": "The foundation of a balanced routine.",
    "image": "/images/cleanse.webp",
    "alt": "VELUM CLEANSE frosted glass bottle with a brushed aluminum pump",
    "routine": "Begin with a gentle, cream-based cleanse. A considered foundation for daily care.",
    "slug": "cleanse",
    "introduction": "A gentle, cream-based cleanser concept designed to remove impurities while respecting the skin’s moisture barrier.",
    "benefits": [
      "Gentle cleansing as the foundation of daily care.",
      "Designed to remove everyday impurities.",
      "A considered approach to the skin’s moisture barrier."
    ],
    "howToUse": "Begin with CLEANSE. Gently massage over damp skin, then rinse with water before moving to FORTIFY."
  },
  {
    "number": "02",
    "name": "FORTIFY",
    "type": "Barrier Support Serum",
    "size": "30 mL",
    "price": "$68",
    "priceCents": 6800,
    "line": "Resilience, formulated.",
    "image": "/images/fortify.webp",
    "alt": "VELUM FORTIFY frosted glass serum bottle with a brushed aluminum treatment pump",
    "routine": "Follow with a lightweight serum concept focused on hydration and the skin’s natural moisture barrier.",
    "slug": "fortify",
    "introduction": "A lightweight serum concept focused on hydration and support for the skin’s natural moisture barrier.",
    "benefits": [
      "A lightweight approach to daily hydration.",
      "Designed around support for the natural moisture barrier.",
      "A considered middle step between cleansing and moisturizing."
    ],
    "howToUse": "After cleansing, apply a small amount of FORTIFY to clean skin. Follow with SEAL to complete the conceptual routine.",
    "alternateView": {
      "image": "/images/velum-hero.webp",
      "alt": "VELUM FORTIFY on pale architectural stone in directional daylight",
      "label": "Architectural view"
    }
  },
  {
    "number": "03",
    "name": "SEAL",
    "type": "Recovery Moisturizer",
    "size": "50 mL",
    "price": "$58",
    "priceCents": 5800,
    "line": "Protection in its purest form.",
    "image": "/images/seal.webp",
    "alt": "VELUM SEAL low-profile frosted glass moisturizer jar with a brushed aluminum lid",
    "routine": "Finish with a daily moisturizer concept designed to help retain hydration and soften the feeling of dryness.",
    "slug": "seal",
    "introduction": "A daily moisturizer concept designed to help retain hydration and soften the feeling of dryness.",
    "benefits": [
      "Designed to help retain hydration.",
      "Focused on softening the feeling of dryness.",
      "A purposeful finishing step in the daily routine."
    ],
    "howToUse": "Apply SEAL after FORTIFY as the final step in the conceptual routine. Spread gently over the skin.",
    "alternateView": {
      "image": "/images/velum-philosophy.webp",
      "alt": "VELUM SEAL beside textured glass with precise sunlight and architectural shadows",
      "label": "Architectural view"
    }
  }
];

export function getProductBySlug(slug: string) {
  return products.find(product => product.slug === slug);
}
