---
name: priyoshop-design
description: Use this skill to generate well-branded interfaces and assets for PriyoShop (Bangladesh's leading B2B commerce & distribution platform), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — brand context, content & visual foundations, iconography. Read this first.
- `styles.css` — link this one file to get all tokens + fonts. Custom props are `--ps-*`, `--font-*`, `--space-*`.
- `tokens/` — colors, typography, spacing, fonts.
- `components/<group>/` — React components. After building the bundle, mount via `window.PriyoShopDesignSystem_0fb1f5.<Name>`; each has a `.prompt.md` with usage.
- `ui_kits/website/` — full marketing homepage recreation to copy patterns from.
- `assets/` — logo SVG, Lato woff2, brand illustrations.

## Essentials
- Brand red `#EE2F47` is a spice, not a flood. Black is the default fill. Warm-white (#FFFCFA) page base.
- Lato (Heavy/Black) for display headlines, tight tracking; Open Sans for everything else.
- Pills (999px) for buttons/chips; 24px cards; 40–48px hero panels. Soft shadows or hairline rings.
- Signature warm→cool hero gradient `var(--ps-gradient-hero)`.
- Voice: warm, plain, "we"+"you", benefit-first. CTAs are 2–3 imperative words ("Join Us").
