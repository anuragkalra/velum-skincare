# VELUM — Brand & Art Direction Guidelines

**Version:** 1.0 — Approved  
**Project:** Premium Skincare E-commerce Portfolio Concept  
**Scope:** Three products · Three-day sprint · Desktop and mobile  
**Status:** Source of truth for AI imagery, website design, and implementation

> **Creative north star:** VELUM is skincare expressed through architecture, atmosphere, and material science—not botanical apothecary.

## 1. Brand Foundation

- **Name:** VELUM
- **Tagline:** *Made for the elements.*
- **Category:** Premium skincare
- **Positioning:** High-performance skincare inspired by architecture, material science, and modern urban environments.
- **Audience:** Design-conscious professionals ages 28–45 who appreciate skincare, modern architecture, refined interiors, and minimalist design.
- **Price tier:** Accessible luxury, $38–$78.
- **Personality:** Architectural, intelligent, restrained, precise, contemporary, quietly luxurious.

**Brand statement:** VELUM creates essential skincare designed to cleanse, strengthen, and protect the skin against the demands of contemporary life. Rooted in material science and architectural simplicity, VELUM combines considered formulations with purposeful design.

**Creative constraint:** VELUM is a fictional portfolio brand. Product benefits are conceptual rather than proven clinical claims; do not invent testing, certifications, or efficacy data.

## 2. Approved Product Catalog

Exactly **three products**, always presented in the sequence **01 → 02 → 03**.

| No. | Display name | Product type | Size | Price | Concept line |
|---|---|---|---|---|---|
| 01 | **CLEANSE** | Gentle Cream Cleanser | 150 mL | **$38** | *The foundation of a balanced routine.* |
| 02 | **FORTIFY** | Barrier Support Serum | 30 mL | **$68** | *Resilience, formulated.* |
| 03 | **SEAL** | Recovery Moisturizer | 50 mL | **$58** | *Protection in its purest form.* |

### 01 — VELUM Cleanse

A gentle, cream-based daily cleanser concept designed to remove impurities while respecting the skin's moisture barrier.

- **Container:** Tall cylindrical frosted bottle
- **Closure:** Brushed aluminum pump
- **Accent:** Mineral Grey

### 02 — VELUM Fortify

A lightweight serum concept focused on hydration and supporting the skin's natural moisture barrier.

- **Container:** Compact frosted glass bottle
- **Closure:** Brushed aluminum treatment pump
- **Accent:** Fog Blue

### 03 — VELUM Seal

A daily moisturizer concept designed to help retain hydration and soften the feeling of dryness.

- **Container:** Wide, low-profile frosted glass jar
- **Closure:** Brushed aluminum lid
- **Accent:** Soft Stone

**Naming convention:** Use the uppercase short names `CLEANSE`, `FORTIFY`, and `SEAL` prominently. Place the descriptive product type beneath as secondary copy. Do not add products in v1.

## 3. Visual Identity

### Color tokens

| Name | Hex | Role |
|---|---|---|
| Chalk | `#F1F0EA` | Main website background |
| Graphite | `#252728` | Main text, dark sections |
| Mineral | `#C8CED0` | Secondary backgrounds and surfaces |
| Fog Blue | `#AABAC0` | Accents and selected states |
| Frosted White | `#E2E5E2` | Packaging and subtle backgrounds |
| Pure White | `#FFFFFF` | Contrast and text over dark backgrounds |

**Approximate use:** 65% Chalk/off-white, 20% Mineral/Frosted White, 10% Graphite, 5% Fog Blue/accent. The website is primarily light and architectural; graphite sections are occasional purposeful contrasts.

**Avoid:** Amber, olive green, warm brown, saturated color, bright gradients, and botanical greens.

### Typography

- **Primary:** **Manrope** (400, 500, 600). Navigation, body, product names, prices, labels, CTAs, and UI.
- **Editorial:** **Instrument Serif** (Regular, Italic). Hero statements, philosophy, and selective editorial headings.
- **Wordmark:** `VELUM` in uppercase Manrope Medium with generous tracking; architectural rather than decorative.

| Role | Desktop | Mobile |
|---|---:|---:|
| Hero headline | 64–80px | 42–52px |
| Section headline | 40–56px | 30–38px |
| Product title | 24–30px | 22–26px |
| Body | 15–17px | 15–16px |
| Eyebrow/label | 11–12px | 11–12px |
| Navigation | 12–13px | 12–13px |

Keep line heights generous and hierarchy crisp. Avoid excessive weights, decorative typography, and noisy UI text.

## 4. Packaging Specifications

**Design intent:** Precision instruments designed for a contemporary bathroom.

**Primary materials**
- Frosted translucent glass with a cool-neutral tint and subtle contents visibility.
- Consistent **satin/brushed aluminum** pumps, caps, and lids—not reflective chrome.
- Minimal **graphite screen-printed typography**, directly on containers, without paper labels.
- Simple cylinders, controlled proportions, subtle edge rounding, and no ornamental detail.

**Front-label layout example:**

```text
VELUM

01 / CLEANSE
Gentle Cream Cleanser

150 mL / 5.1 fl oz
```

Adapt the product number, name, type, and size exactly for FORTIFY and SEAL.

**Non-negotiable consistency**
1. Same wordmark and label hierarchy in every product image.
2. Same frosted-glass finish and brushed-aluminum hardware.
3. Stable container proportions, closure geometry, and believable scale.
4. Exact product names, numbers, and volumes.
5. No invented logos, label elements, or alternate packaging versions.

**AI production guidance:** Establish and approve one canonical reference image for each product before creating variations. AI-rendered small text may be unreliable; correct it through editing/compositing rather than accepting misspellings.

## 5. Photography & Image Generation

**Aesthetic:** Architectural still life meets premium skincare campaign photography. Prioritize precision, tactility, atmosphere, and quiet luxury.

**Lighting**
- Directional natural sunlight; hard or semi-hard architectural shadows.
- Cool-neutral temperature, controlled highlights, physically plausible reflections.
- Soft, diffused daylight for consistent catalog packshots.
- Avoid over-glossy traditional beauty-ad lighting.

**Approved materials and environments:** Travertine, pale limestone, brushed aluminum, frosted glass, concrete, architectural plaster, water, subtle skincare textures, translucent surfaces.

**Prohibited motifs:** Flowers, leaves, botanical arrangements, amber bottles, wood-heavy sets, fake-looking CGI, exaggerated splashes, generic laboratory scenes.

### Required image families

| Image family | Aspect ratio | Creative requirements |
|---|---|---|
| Campaign hero | **16:9** | Architectural environment, one hero product or abstract material scene, directional light, intentional negative space for headline |
| Product catalog | **4:5** | Single product frontal or three-quarter view, Chalk or Mineral backdrop, realistic grounding shadow, consistent scale |
| Product detail | **4:5 or 1:1** | Close-up on glass, cap, pump, label, texture; packaging must match canonical image |
| Editorial/lifestyle | **3:4 or 16:9** | Product among architectural surfaces, water or reflections, occasional cropped hand, controlled atmosphere |

**Generation priority:** Consistency over quantity. Reuse canonical references to maintain exact product identity across catalog, PDP, and campaign images.

## 6. Website Art Direction

**Design thesis:** Editorial storytelling supported by precise, frictionless commerce. The site feels like a premium design publication that happens to sell skincare.

### Layout rules

- **Grid:** 12 columns desktop; 4 columns mobile.
- **Maximum content width:** 1440px.
- **Horizontal page margins:** 64–80px desktop; 20–24px mobile.
- **Section spacing:** 96–160px desktop, scaled appropriately for mobile.
- **UI details:** Thin dividers, strong alignment, abundant negative space, minimal rounded corners, few visual cards or containers.
- **Rhythm:** Atmospheric full-bleed imagery alternating with quiet functional commerce areas.

### Homepage sections — exact order

1. **Hero:** Architectural campaign image. Headline: *Made for the elements.* Supporting copy: “Essential skincare for the conditions of contemporary life.” CTA: **Explore the collection**.
2. **Collection:** Three-product grid with consistent images, names, descriptions, prices, and links.
3. **Brand philosophy:** Split-screen editorial image and text. Headline: *Form follows function. Care follows purpose.*
4. **The System:** Explain the 01 Cleanse → 02 Fortify → 03 Seal routine with restrained visuals and concise copy.
5. **Closing editorial:** Full-width architectural imagery, short brand statement, collection CTA.
6. **Footer:** Minimal navigation, brand statement, newsletter field, social links.

**Header navigation:** VELUM wordmark · Shop · Our Philosophy · The System · Cart icon/count.

### Product detail page

**Desktop two-column layout**
- **Left:** Large product hero image, secondary photography, packaging details.
- **Right:** Product name, description, price, size, quantity, Add to Cart, Benefits, How to Use, Ingredients placeholder.
- **Below the fold:** Editorial imagery, product philosophy, related products.
- **Mobile:** Readable vertically stacked layout with conspicuous purchase action and strong imagery.

## 7. Interaction & Motion

**Use:** Subtle scroll image reveals, gentle opacity transitions, restrained hover states, simple gallery transitions, smooth cart drawer, and reduced-motion support.

**Avoid:** Scroll hijacking, excessive parallax, cursor-following effects, continuous decorative animation, and elaborate page transitions.

## 8. Creative Guardrails

**Always**
- Prioritize cohesive premium photography over decorative UI.
- Maintain precise alignment, legible type, and generous spacing.
- Treat packaging as designed objects with consistent geometry.
- Write concise, assured copy.
- Balance atmospheric storytelling with shopping clarity.
- Deliver an excellent responsive/mobile experience.

**Never**
- Copy Aesop packaging or page compositions pixel-for-pixel.
- Use amber-apothecary or botanical styling.
- Introduce inconsistent AI-generated packaging across images.
- Add an unapproved fourth product.
- Make unsupported clinical, testing, or certification claims.

**Deliberate contrast with Aesop:** Aesop is warm, botanical, literary, apothecary. **VELUM is cool, mineral, architectural, technical.**

## 9. Three-Day Production Plan

**Stack:** Next.js, TypeScript, Tailwind CSS; Grok/Cursor implementation; ChatGPT Images as primary photography source.

| Day | Goal | Deliverables |
|---|---|---|
| **1** | Art assets and packaging | Three approved canonical product designs, catalog images, hero, editorial photography |
| **2** | Website implementation | Responsive homepage, collection page, product detail page |
| **3** | Polish and deployment | Demo cart, mobile refinement, QA, Vercel deploy, portfolio screenshots |

**Technical scope:** Static product data and client-side cart interactions. No authentication, checkout/payment integration, CMS, or backend.

### Definition of done

- [ ] Exactly three products with coherent, recognizable packaging.
- [ ] Cohesive photography across all pages.
- [ ] Distinctive premium brand communicated above the fold.
- [ ] Browse, product-detail, and demo Add to Cart interactions work.
- [ ] Desktop and mobile layouts are polished.
- [ ] Colors, type, and spacing follow this brief.
- [ ] Site is publicly deployed to Vercel.
- [ ] Portfolio-ready screenshots are captured.

---

**Final direction:** **VELUM — Made for the elements.** Cool mineral palette, frosted glass, brushed aluminum, architectural photography, editorial commerce.

**Change control:** Treat this file as the approved source of truth for v1. Modify brand specifications only after an explicit creative decision.
