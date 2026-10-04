# PriyoShop Design System

A design system for **PriyoShop** — Bangladesh's leading B2B commerce and
distribution platform. PriyoShop connects neighbourhood retailers (MSMEs)
directly with brands and distributors, replacing a fragmented middleman chain
with one app: fair prices, next-day restocking, embedded finance and a
nationwide logistics network. The brand voice is optimistic, plain-spoken and
impact-driven — built around shop owners and the communities they serve.

This system captures that brand: the red-and-ink wordmark, the warm
gradient-to-pastel surfaces, Lato display headlines over Open Sans copy, and a
library of React components and full-page recreations.

---

## Sources

The system was reconstructed from the assets the team provided. None are
embedded here as live links — recorded so a future editor can re-fetch them.

- **Figma:** "DEV_PS Website Design (Copy).fig" — page *Homepage-v2.0*
  (12 frames). Source of truth for the homepage layout, the button / badge /
  footer / store-button component families, and all raw colour + type values.
  Tokens were materialised and the brand illustrations exported from here.
- **Codebase:** `my-project-name/` — a Next.js 16 + Tailwind v4 + Clerk
  starter boilerplate. It is generic scaffolding (no PriyoShop-specific UI),
  so the Figma file — not this repo — drove the visual design.
- **Brand assets (uploaded):** `ps_logo.svg` (master logo) and the **Lato**
  webfont family (Light / Bold / Heavy / Black).

---

## Index — what's in this folder

**Foundations**
- `styles.css` — global entry point (import this one file). `@import`s all tokens + fonts.
- `tokens/colors.css` · `typography.css` · `spacing.css` · `fonts.css`
- `assets/` — `logo/` (master SVG), `fonts/` (Lato woff2), `illustrations/` (brand storefront & ecosystem art)

**Components** (`components/<group>/` — React, `window.PriyoShopDesignSystem_0fb1f5.<Name>`)
- `brand/` — **Logo**
- `core/` — **Button**, **IconButton**, **Badge**, **Icon** / **PlayIcon**
- `forms/` — **Input**
- `marketing/` — **MetricStat**, **SectionHeading**, **StoreButton**, **EcosystemCard**, **MediaCard**
- `navigation/` — **NavBar**, **Footer**

**UI Kit**
- `ui_kits/website/` — the full PriyoShop marketing homepage (`index.html`), an
  interactive click-through assembled from the components above. Sections:
  `Hero`, `EcosystemSection`, `AppSection`, `MediaSection`, `JoinSection`.

**Specimen cards** (`guidelines/*.card.html`, `components/**/**.card.html`) —
populate the Design System tab (Colors / Type / Spacing / Brand / Components).

**Skill**
- `SKILL.md` — makes this folder usable as a downloadable Agent Skill.

---

## CONTENT FUNDAMENTALS

How PriyoShop writes.

- **Voice — confident, warm, plain.** Short declarative sentences. Benefit
  first, mechanism second: *"Sourcing, simplified for every shop."* /
  *"Your whole shop's sourcing, in one app."* No jargon, no hype words like
  "revolutionary" or "synergy."
- **Person — "we" + "you/your."** The company is "we"; the reader (a shop
  owner or brand) is "you/your." *"We connect retailers directly with brands."*
  This keeps copy relational, not corporate.
- **Audience-centred.** Copy is anchored on the retailer and the corner shop —
  MSMEs, restocking, fair prices, working capital — not on the platform's
  technology. Numbers are framed as human reach ("100K+ MSMEs served",
  "1,428 route coverage", "64 districts"), not vanity metrics.
- **Headlines — Title or sentence case, no terminal period.** Eyebrows are
  Title Case capsule labels ("Ecosystem at a Glance", "The Impact", "Media &
  News"). Body copy is sentence case.
- **Stat pattern.** Big number + plain noun label: *296 Brands*, *100K+ MSMEs*.
  Use `K+` / `+` suffixes for scale. The number is the hero; the label is quiet.
- **CTAs — imperative, 2–3 words.** "Join Us", "Watch Our Story", "Download
  App", "Talk to Sales", "View All". Primary CTA is almost always *Join Us*.
- **Emoji — sparing & functional.** Occasional single emoji as a quick glyph in
  a stat or floating chip (👑 brands, 🚚 delivery, 📍 office). Never decorative
  strings of emoji, never in headlines or running text.
- **Bilingual context.** PriyoShop serves Bangladesh; product imagery shows
  Bangla shop signage. UI copy itself is English. Keep place names accurate
  (Dhaka, Dhanmondi) and respect the local retail context.

---

## VISUAL FOUNDATIONS

- **Colour.** A single hot brand red (`--ps-red-500` #EE2F47) carries the
  identity — logo, key accent words, stat values, emphasis. Everything else is
  a near-black ink scale (#000 → #545558) on warm white. Red is used as a
  *spice*, not a flood: a tinted accent word in a headline, a value, a small
  pill — rarely a large red fill. Black is the default button/fill colour.
- **Pastel accent family.** Soft mint, peach, periwinkle, purple, cyan, lime —
  used only as **panel tints** behind ecosystem feature cards and category
  chips. They rotate card-to-card for rhythm. Never saturated, always low-key.
- **Signature gradient.** The hero uses a warm-to-cool diagonal:
  `--ps-gradient-hero` (warm white → peach → soft purple, ~164°). It appears on
  the hero panel and the closing CTA band — the brand's most recognisable surface.
- **Surfaces.** Page base is warm white (#FFFCFA), not pure white — a soft,
  friendly ground. Dark sections (app promo, footer) flip to pure black with
  white/red type for contrast and weight.
- **Type.** **Lato** (Heavy 800 / Black 900) for display headlines — tight
  tracking (-0.02em), line-height ~1.05, large (52–96px). **Open Sans** for all
  body, UI and buttons (400 body, 600 buttons/labels). Headlines feel solid and
  grounded; body is highly legible at 18–22px with generous 1.5–1.64 leading.
- **Shape language.** Generously rounded. Buttons and chips are full pills
  (999px). Cards and panels use 24px; the hero/CTA panels use a big 40–48px
  radius. Nothing is sharp-cornered — the brand reads soft and approachable.
- **Cards.** Two patterns: (1) a **hairline ring** (`inset 0 0 0 1px` grey-300)
  for structural cards — borders over shadows; (2) a **soft floating shadow**
  (`--shadow-card`, 0 12px 32px /.08) for elements that pop off the gradient
  (stat chips, the "Next-day delivery" badge). Shadows are soft, low-opacity,
  never harsh.
- **Imagery.** Warm, friendly **cartoon illustrations** — a Bangladeshi corner
  shop with Bangla signage, delivery scenes, the mobile app. Full-colour,
  rounded, optimistic. No stock photography, no greyscale. Illustrations sit
  full-bleed inside the coloured panel of a feature card.
- **Layout.** Centred max-width content (~1320px) on a 1440 canvas with 64px
  side padding. Generous vertical rhythm — ~120px between major sections. The
  nav is a **floating white pill** that sticks to the top with clear space
  around it (not a flush bar).
- **Motion.** Restrained. Standard ease `cubic-bezier(.4,0,.2,1)`, 140–360ms.
  Buttons darken on hover and **shrink slightly (scale .97) on press**; cards
  **lift (translateY -4px)** on hover. Fades over slides; no bounces, no
  infinite loops on content.
- **Hover / press states.** Filled buttons → darker fill on hover; outline/ghost
  → faint tint wash. Press → 3–6% scale-down. Links → red on hover. Consistent
  and quiet.
- **Transparency & blur.** Used once, deliberately: the hero stats strip is a
  translucent white (`rgba(255,255,255,.55)`) with a 6px backdrop-blur over the
  gradient. Otherwise surfaces are solid.

---

## ICONOGRAPHY

- **Style — thin, single-weight line glyphs** that paint with `currentColor`.
  The directional arrows and the play glyph are lifted **1:1 from the Figma
  source** (`components/core/Icon.jsx`); the rest of the UI set (search, menu,
  mail, phone, location, chevrons, plus, close) follows the same ~1.75px line
  weight and 24px box.
- **No icon font.** Icons are inline SVG React components — recolourable,
  crisp at any size, no extra asset to ship.
- **Extending the set.** For glyphs beyond the bundled set, use **Lucide**
  (https://unpkg.com/lucide-static) — it matches this stroke weight and round
  line-cap style. Flagged as a substitution: Lucide is *not* the brand's own
  set, but it's the closest CDN match for the line style.
- **Emoji as glyphs.** A small set of emoji appears as functional glyphs in
  stats and chips (👑 🚚 📍). These are intentional brand touches, used singly —
  not a general icon strategy.
- **Logo mark.** The shopping-bag-with-heart mark (`<Logo mark />`) doubles as
  a compact brand glyph for favicons / avatars.

---

## Usage

Link the global stylesheet once:

```html
<link rel="stylesheet" href="styles.css" />
```

Then mount components from the compiled bundle:

```html
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Logo, SectionHeading } = window.PriyoShopDesignSystem_0fb1f5;
</script>
```

Reference colour, type and spacing through the CSS custom properties
(`var(--ps-red-500)`, `var(--font-display)`, `var(--space-8)`) rather than
hard-coded values, so designs stay on-brand if tokens change.

---

## Caveats

- **Open Sans & Parkinsans** are loaded from Google Fonts; **Lato** ships as
  brand woff2 files. If the team has licensed weights for Open Sans, drop them
  into `assets/fonts/` and add `@font-face` rules in `tokens/fonts.css`.
- The attached codebase carried no PriyoShop UI, so component internals are
  faithful **cosmetic** recreations from Figma — not the production code.
