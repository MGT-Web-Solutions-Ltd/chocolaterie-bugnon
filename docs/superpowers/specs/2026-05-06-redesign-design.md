# Redesign Spec — Chocolaterie du Bugnon

**Date**: 2026-05-06  
**Approach**: Clean slate rebuild (new index.html + styles.css from scratch)  
**Tech stack**: Vanilla HTML5, CSS3, vanilla JavaScript — no build tools, no dependencies  

---

## Context

The existing site was AI-generated with Cursor and suffers from: pervasive "démo/concept/provisoire" scaffolding text, a single stock photo reused across all tiles, a CSS-drawn Easter egg, and a generic template feel that undermines the brand. Th§e goal is a complete rewrite that reads as a confident, finished piece for a real Lausanne chocolatier.

---

## Visual Direction

**Palette — Clair & Chaleureux (Warm Light)**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#faf6f0` | Page background (parchment) |
| `--bg2` | `#f3ece2` | Alternating section background |
| `--bg-dark` | `#3d1f0c` | Dark accent sections (bandeau, campagne, footer) |
| `--bg-footer` | `#2a1508` | Footer background |
| `--text` | `#2a1508` | Primary text (deep cacao brown) |
| `--text2` | `#5a3d25` | Secondary text |
| `--text3` | `#7a5c3c` | Tertiary / nav links |
| `--accent` | `#9c6e3c` | Warm amber — borders, labels, decorative rules |
| `--accent-gold` | `#e8c98a` | Gold — stats, headings on dark backgrounds |
| `--cta` | `#3d1f0c` | Primary CTA button background |
| `--cta-text` | `#faf6f0` | Primary CTA button text |
| `--radius` | `6px` | Standard border radius |
| `--max` | `1100px` | Max container width |

**Typography**
- Headings: Playfair Display, italic weight, generous line-height (1.15–1.25)
- Body: Inter or system-ui, 400/500, line-height 1.6
- Labels/caps: system-ui, 9–10px, letter-spacing 3–5px, uppercase

**Decorative elements**
- Thin horizontal rule: 28px wide, 2px tall, `var(--accent)` color — used under hero h1 and section subtitles
- Left border accent: 2px solid `var(--accent)` on testimonial cards

---

## Page Structure — Single Page, Long Scroll

### Navigation (fixed, sticky on scroll)
- Logo left: "Bugnon" in Playfair + tagline "Chocolatier artisan" in small caps
- Links right: Produits · Sur mesure · Événements · Contact (all anchor links to `#produits`, `#sur-mesure`, `#evenements`, `#contact` sections on the same page)
- CTA button right: "Itinéraire ↗" (primary dark pill)
- Mobile: burger menu + persistent "Appeler" tap button
- On scroll: subtle background blur + shadow (already in current JS — keep)

### ① Hero
- Layout: 55/45 grid — text left, product photo right
- Photo: warm placeholder (chocolate/fountain) with `object-fit: cover`, border-radius 6px
- Eyebrow: "Artisan chocolatier · Lausanne · Depuis 2014" (9px, letter-spaced, amber)
- H1: "Chaque chocolat raconte une histoire" — Playfair Display italic, ~48px desktop
- Decorative rule below H1
- Subtext: "Confectionnés à la main à Lausanne. Grands crus, créations de saison, dégustations en boutique."
- CTAs: "Itinéraire" (dark filled) + "Sur mesure (48h)" (outline amber)
- Address line below CTAs: "📍 Rue du Bugnon 10 · 1005 Lausanne"

### ② Bandeau Preuves
- Background: `var(--bg-dark)` (deep brown)
- 4-column grid, centered text
- Each item: large italic gold number/stat + 2-line description in cream
  1. **2014** — En boutique à Lausanne
  2. **10+** — Origines de cacao
  3. **100%** — Beurre de cacao & vanille pure
  4. **48h** — Délai sur mesure

### ③ Nos Valeurs
- Background: `var(--bg)` (parchment)
- Section heading centered: "L'artisan, le goût, l'émotion" (Playfair italic)
- 3 cards on `var(--bg2)` background, decorative symbol + title + 1 sentence:
  1. ✦ **Artisanat** — "Chaque création façonnée à la main avec soin."
  2. ◈ **Qualité** — "Grands crus sélectionnés, arômes francs et naturels."
  3. ♡ **Émotion** — "Goût, partage, raffinement à chaque dégustation."

### ④ Nos Produits
- Background: `var(--bg2)`
- Centered heading: "Découvrir nos créations" (Playfair italic)
- 5-column tile grid (2-col on mobile):
  - Each tile: square photo placeholder + label below
  - Categories: Chocolats · Confiseries · Glaces · Sorbets · Saisonnier ✦
  - Saisonnier tile uses a warmer/darker gradient to distinguish it
  - Hover: subtle lift transform + label highlight

### ⑤ Campagne Saisonnière
- Background: `var(--bg-dark)`
- 2-column grid: visual left, text right
- Eyebrow: "Pâques 2025" (gold, letter-spaced)
- Heading: "Offrez une Pâques gourmande" (Playfair italic, cream)
- Subtext: "Œufs en chocolat artisanal, le cadeau idéal pour célébrer ensemble."
- CTAs: "Découvrir la collection" (gold filled) + "Commander sur mesure" (outline cream)
- Visual: warm placeholder rectangle (to be replaced with seasonal product photo)

### ⑥ Sur Mesure (48h)
- Background: `var(--bg)`
- 2-column grid: pitch left, form right
- Left: heading "Une création à votre image", decorative rule, 3 use-case bullets (entreprise / anniversaire & mariage / cadeau), CTA "Faire une demande"
- Right: form on `var(--bg2)` — fields: Nom, Email/Téléphone, Type de demande (select), Message libre, submit button "Envoyer ma demande"
- Form has no `(démo)` labels — styled as real, functional-looking

### ⑦ Événements — Fontaine Chocolat
- Background: `var(--bg2)`
- 2-column grid: text left, photo right
- Heading: "La fontaine chocolat pour vos événements" (Playfair italic)
- Decorative rule, description, 3 spec tags (80 cm · 150 CHF/jour · Caution 600 CHF)
- CTA: "Demander un devis" (outline amber)
- Photo: chocolate fountain placeholder

### ⑧ Avis Clients
- Background: `var(--bg)`
- Centered heading: "Ils en parlent" (Playfair italic) + gold star row ★★★★★
- 3 testimonial cards — `var(--bg2)`, left border 2px amber, italic quote, name attribution
- Link below: "Voir tous les avis Google →" (ghost pill)

### ⑨ Accès & Contact
- Background: `var(--bg2)`
- 2-column grid: info left, map placeholder right
- Heading: "Venez nous rendre visite" (Playfair italic)
- Address, phone, hours with emoji icons
- 2 CTAs: "Itinéraire ↗" (dark filled) + "Appeler" (outline)
- Map area: green-tinted placeholder (link to Google Maps on click)

### Footer
- Background: `var(--bg-footer)`
- 3-column grid: brand+social left, navigation center, newsletter right
- Brand: "Bugnon" logotype + address in small cream text + Instagram/Facebook pills
- Nav links: Produits, Sur mesure, Événements, Contact
- Newsletter: 1-line pitch + email input + "S'inscrire" button
- Bottom bar: "© 2025 Chocolaterie du Bugnon" + "Lausanne · Suisse"

---

## JavaScript (minimal, ~40 lines)
- Sticky nav: add `.scrolled` class on scroll (background blur + shadow)
- Mobile menu: toggle burger drawer
- No other JS needed

---

## Responsive Breakpoints
- **Desktop**: ≥ 980px — all multi-column grids active
- **Mobile**: < 980px
  - Hero: stacked (text above, photo below)
  - Product tiles: 2×3 grid (2 columns)
  - All 2-column grids: stacked
  - Nav: burger menu
  - Bandeau: 2×2 grid

---

## What is NOT in scope
- E-commerce / shopping cart
- Real form backend (forms are styled, not wired)
- Real map embed (placeholder only)
- Real photos (stock/gradient placeholders throughout)
- Multi-page navigation (anchors only, all on one page)

---

## Files to create
- `landing/index.html` — complete rewrite
- `landing/css/styles.css` — complete rewrite
- `landing/js/main.js` — keep/update minimal scroll+menu JS

## Files to preserve
- `landing/assets/` — keep all existing images (logo, hero photo, fountain photo)
- `audit/` — all audit docs stay untouched
