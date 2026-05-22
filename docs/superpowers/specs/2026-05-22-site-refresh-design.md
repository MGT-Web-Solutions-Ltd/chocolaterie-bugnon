# Chocolaterie du Bugnon — Site Refresh Design Spec
**Date:** 2026-05-22  
**Status:** Approved  
**Scope:** Visual refresh + product section overhaul

---

## 1. Overview

A targeted refresh of the existing static HTML/CSS/JS landing page. The core goal is to elevate the product section into the strongest, most luxurious part of the site — a full editorial gallery — while applying global visual changes (color, font) and a handful of targeted content and layout fixes across other sections.

No new backend, no new pages. All changes are within `landing/index.html`, `landing/css/styles.css`, and `landing/js/main.js`.

---

## 2. Global Visual Changes

### 2.1 Color — Vibrant Faded Brown

Replace the current flat dark brown (`#3d1f0c`) with a warmer, dustier, more vibrant palette using OKLCH. The new palette keeps the chocolate identity but feels alive and premium rather than flat and heavy.

**New CSS variables (replace existing):**

| Variable | New Value | Role |
|---|---|---|
| `--bg` | `oklch(97% 0.012 55)` | Page background — warm off-white |
| `--bg2` | `oklch(93% 0.018 55)` | Alt section background |
| `--bg-dark` | `oklch(38% 0.06 48)` | Dark sections (hero band, campaign) — rich dusty brown |
| `--bg-footer` | `oklch(28% 0.05 48)` | Footer — deeper brown |
| `--text` | `oklch(25% 0.04 48)` | Body text |
| `--text2` | `oklch(42% 0.055 50)` | Secondary text |
| `--text3` | `oklch(55% 0.05 52)` | Tertiary/muted text |
| `--accent` | `oklch(58% 0.1 52)` | Primary accent — warm caramel brown |
| `--accent-gold` | `oklch(82% 0.1 80)` | Gold accent |
| `--cta` | `oklch(38% 0.06 48)` | CTA button background (matches --bg-dark) |
| `--cta-text` | `oklch(97% 0.012 55)` | CTA button text |

### 2.2 Font — Outfit

Replace Inter with Outfit from Google Fonts for all sans-serif usage. Playfair Display stays for headings (h1, h2, h3).

**Google Fonts link (replace existing):**
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;1,400;1,600&display=swap" rel="stylesheet">
```

**CSS variable update:**
```css
--font-sans: 'Outfit', system-ui, sans-serif;
```

---

## 3. Produits Section — Full Editorial Gallery

This is the centrepiece of the refresh. The existing `produits__grid` (5 small uniform tiles) is completely replaced with a rich, scroll-through editorial experience.

### 3.1 Structure

Five product categories, each rendered as a full-width editorial block stacked vertically. Categories alternate text alignment left/right for visual rhythm.

**Category order:**
1. Chocolats
2. Confiseries
3. Glaces & Sorbets
4. Saisonnier
5. Créations artistiques

### 3.2 Per-Category Block Layout

Each block contains:
- **Eyebrow** (small uppercase label, e.g. "La boutique")
- **Category title** (large, Playfair Display italic)
- **Short French description** (2 lines max, Outfit)
- **Photo masonry grid** — all images from the category's `new_images/` folder displayed at once, responsive 2–3 column layout
- Odd-numbered categories: text above grid, left-aligned
- Even-numbered categories: text above grid, right-aligned

**Image folders mapping:**
| Category | Folder | Images |
|---|---|---|
| Chocolats | `images/new_images/chocolat/` | c1–c8, 1000004848.jpg |
| Confiseries | `images/new_images/confisserie/` | co1–co4, Boîte 20 pces.jpg, boîte chocolats.jpg |
| Glaces & Sorbets | `images/new_images/glace_Et_sorbet/` | g1–g7 |
| Saisonnier | `images/new_images/season/` | s1–s8 |
| Créations artistiques | `images/new_images/art/` | a1–a8 |

### 3.3 French Copy per Category

| Category | Eyebrow | Title | Description |
|---|---|---|---|
| Chocolats | Notre savoir-faire | Chocolats grands crus | Sélectionnés aux quatre coins du monde, façonnés à la main dans notre atelier lausannois. Chaque pièce est une rencontre entre terroir et maîtrise. |
| Confiseries | Douceurs artisanales | Confiseries & gourmandises | Caramels fondants, nougats, pralinés maison. Des créations qui éveillent les sens et prolongent le plaisir. |
| Glaces & Sorbets | Fraîcheur d'exception | Glaces & sorbets | L'intensité du cacao et la fraîcheur des fruits, réunis dans des recettes élaborées sans colorants ni conservateurs. |
| Saisonnier | Au fil des saisons | Créations saisonnières | Pâques, Noël, fête des mères — chaque saison inspire une collection éphémère, à découvrir avant qu'elle disparaisse. |
| Créations artistiques | L'art du chocolat | Créations artistiques | Sculptures, pièces montées, œuvres sur mesure. Quand le chocolat devient matière à expression. |

### 3.4 Lightbox Carousel

Clicking any photo in any gallery grid opens a full-screen lightbox overlay.

**Behaviour:**
- Dark semi-transparent backdrop (closes on click outside or Escape key)
- Centred large image display, max 90vw × 85vh
- Left/right arrow navigation cycling through all images in the same category
- Close button (×) top-right
- Keyboard support: ArrowLeft, ArrowRight, Escape
- No animation libraries — pure CSS transitions (opacity fade, 200ms ease-out)
- Image counter (e.g. "3 / 9") displayed bottom-centre

**Implementation:** Pure vanilla JS, added to `main.js`. No external dependencies.

### 3.5 Section CTA Block

At the bottom of the produits section, after all five category blocks, a full-width CTA band:

- Dark background (`--bg-dark`)
- Large heading (Playfair, italic): *"Venez découvrir notre boutique"*
- Subtext (Outfit): *"Rue du Bugnon 10 · 1005 Lausanne · Lun–Ven 9h–18h30 · Sam 9h–17h"*
- Button: *"Voir notre adresse"* — smooth scrolls to `#contact`

### 3.6 Section Header Copy

Change the section header from *"À découvrir en boutique"* to *"En Magasin"* (as requested).

---

## 4. Valeurs Section — Content Fix

In the **Qualité** card (`valeurs__card`), remove the phrase "sans colorants ni conservateurs" from the description. The updated text becomes:

> "Grands crus sélectionnés, arômes francs et naturels."

---

## 5. Contact Section — Replace Map with Shop Photo

Replace the Google Maps screenshot (`map-lausanne.png`) with `shop_image.webp`.

- Same `acces__map` container, same responsive behaviour
- `alt` attribute: *"Devanture de la Chocolaterie du Bugnon, Rue du Bugnon 10, Lausanne"*
- The "Ouvrir dans Google Maps" link below the image stays in place
- The wrapping anchor link to Google Maps stays in place (photo remains clickable to maps)

---

## 6. Événements Section — Reduce Visual Weight

The chocolate fountain section currently has the same visual prominence as major sections. It should feel like a useful addendum, not a centrepiece.

**Changes:**
- Reduce section padding from `5rem 0` to `2.5rem 0`
- Reduce h2 font size by one step (use `font-size: clamp(1.2rem, 2.5vw, 1.6rem)` scoped to this section)
- Reduce the image size: constrain `evenements__img` to `max-height: 280px`, `object-fit: cover`
- Replace `fondue.jpg` with `images/new_images/fontaine.jpg`
- `alt` text: *"Fontaine chocolat Chocolaterie du Bugnon"*

---

## 7. Files Changed

| File | Nature of change |
|---|---|
| `landing/index.html` | Product section markup rebuilt; valeurs copy; contact image; événements image; font link |
| `landing/css/styles.css` | CSS variables (color + font); produits gallery styles; lightbox styles; événements size reduction |
| `landing/js/main.js` | Lightbox/carousel JS logic added |

---

## 8. Out of Scope

- No changes to the navigation, hero, bandeau, avis, sur-mesure, or footer sections
- No changes to server/backend/Supabase
- No new pages or routes
- No animation library dependencies
