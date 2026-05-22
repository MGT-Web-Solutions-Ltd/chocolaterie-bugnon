# Chocolaterie du Bugnon — Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the static landing page with a new color palette, Outfit font, a full editorial product gallery with lightbox carousel, and targeted content/layout fixes across the valeurs, contact, and événements sections.

**Architecture:** Pure static HTML/CSS/JS. All changes are isolated to three files: `landing/index.html`, `landing/css/styles.css`, `landing/js/main.js`. The lightbox is vanilla JS with no external dependencies. The produits section is rebuilt from scratch with five editorial category blocks, each containing a responsive image grid. A CTA band is inserted as a standalone `<div>` between the produits and campagne sections.

**Tech Stack:** HTML5, CSS3 (OKLCH color), vanilla JS (ES2020), Google Fonts (Outfit + Playfair Display)

---

## Task 1: Swap font from Inter to Outfit

**Files:**
- Modify: `landing/index.html` (line 10 — Google Fonts link)
- Modify: `landing/css/styles.css` (line 17 — `--font-sans` variable)

- [ ] **Step 1: Replace the Google Fonts `<link>` in `index.html`**

Find and replace this exact line (line 10):
```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;1,400;1,600&display=swap" rel="stylesheet">
```
With:
```html
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;1,400;1,600&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update `--font-sans` in `styles.css`**

Find and replace (line 17):
```css
  --font-sans:   'Inter', system-ui, sans-serif;
```
With:
```css
  --font-sans:   'Outfit', system-ui, sans-serif;
```

- [ ] **Step 3: Verify**

Open `landing/index.html` in a browser. In DevTools → Elements, inspect any body text. Computed font-family should show `Outfit`. The nav links, buttons, and body copy should render in Outfit — noticeably rounder and friendlier than Inter.

- [ ] **Step 4: Commit**

```bash
git add landing/index.html landing/css/styles.css
git commit -m "feat: swap font from Inter to Outfit"
```

---

## Task 2: Update color palette to vibrant faded brown (OKLCH)

**Files:**
- Modify: `landing/css/styles.css` (`:root {}` block + all hardcoded rgba/hex values)

- [ ] **Step 1: Replace the entire `:root {}` block**

Find (lines 1–18):
```css
/* ===== VARIABLES ===== */
:root {
  --bg:          #faf6f0;
  --bg2:         #f3ece2;
  --bg-dark:     #3d1f0c;
  --bg-footer:   #2a1508;
  --text:        #2a1508;
  --text2:       #5a3d25;
  --text3:       #7a5c3c;
  --accent:      #9c6e3c;
  --accent-gold: #e8c98a;
  /* --cta intentionally matches --bg-dark: unified dark-chocolate identity */
  --cta:         #3d1f0c;
  --cta-text:    #faf6f0;
  --radius:      6px;
  --max:         1100px;
  --font-sans:   'Outfit', system-ui, sans-serif;
}
```
Replace with:
```css
/* ===== VARIABLES ===== */
:root {
  --bg:          oklch(97% 0.012 55);
  --bg2:         oklch(93% 0.018 55);
  --bg-dark:     oklch(38% 0.06 48);
  --bg-footer:   oklch(28% 0.05 48);
  --text:        oklch(25% 0.04 48);
  --text2:       oklch(42% 0.055 50);
  --text3:       oklch(55% 0.05 52);
  --accent:      oklch(58% 0.1 52);
  --accent-gold: oklch(82% 0.1 80);
  /* --cta intentionally matches --bg-dark: unified dusty-brown identity */
  --cta:         oklch(38% 0.06 48);
  --cta-text:    oklch(97% 0.012 55);
  --radius:      6px;
  --max:         1100px;
  --font-sans:   'Outfit', system-ui, sans-serif;
}
```

- [ ] **Step 2: Replace hardcoded rgba/hex values throughout `styles.css`**

Apply each of the following find-and-replace operations in order (some values repeat — replace all occurrences):

| Find | Replace |
|---|---|
| `rgba(61,31,12,0.1)` | `oklch(25% 0.04 48 / 0.1)` |
| `rgba(61,31,12,0.12)` | `oklch(25% 0.04 48 / 0.12)` |
| `rgba(61,31,12,0.15)` | `oklch(25% 0.04 48 / 0.15)` |
| `rgba(61,31,12,0.08)` | `oklch(25% 0.04 48 / 0.08)` |
| `rgba(61,31,12,0.2)` | `oklch(25% 0.04 48 / 0.2)` |
| `rgba(61, 31, 12, 0.1)` | `oklch(25% 0.04 48 / 0.1)` |
| `rgba(156,110,60,0.12)` | `oklch(58% 0.1 52 / 0.12)` |
| `rgba(250,246,240,0.92)` | `oklch(97% 0.012 55 / 0.92)` |
| `rgba(250,246,240,0.1)` | `oklch(97% 0.012 55 / 0.1)` |
| `rgba(250,246,240,0.08)` | `oklch(97% 0.012 55 / 0.08)` |
| `rgba(250,246,240,0.75)` | `oklch(97% 0.012 55 / 0.75)` |
| `rgba(250,246,240,0.8)` | `oklch(97% 0.012 55 / 0.8)` |
| `rgba(0,0,0,0.3)` | `oklch(10% 0.01 48 / 0.3)` |
| `#fff4d6` | `oklch(95% 0.08 85)` |

- [ ] **Step 3: Verify**

Open `landing/index.html` in a browser. The overall palette should feel warmer and more vibrant — less flat dark chocolate, more rich dusty caramel. Check:
- Page background: warm cream (not pure white)
- Dark sections (bandeau, campagne): warm dusty brown, not near-black
- Accent color on eyebrows, rules, links: warm caramel
- Gold accents on stars, campaign eyebrow: still golden

- [ ] **Step 4: Commit**

```bash
git add landing/css/styles.css
git commit -m "feat: update color palette to vibrant faded brown (OKLCH)"
```

---

## Task 3: Content fixes — valeurs, contact image, événements

**Files:**
- Modify: `landing/index.html` (valeurs copy, contact map image, événements image)
- Modify: `landing/css/styles.css` (événements size reduction)

- [ ] **Step 1: Remove "sans colorants ni conservateurs" from the Qualité card**

In `landing/index.html`, find:
```html
    <p>Grands crus sélectionnés, arômes francs et naturels, sans colorants ni conservateurs.</p>
```
Replace with:
```html
    <p>Grands crus sélectionnés, arômes francs et naturels.</p>
```

- [ ] **Step 2: Replace the map image with the shop photo in the contact section**

In `landing/index.html`, find:
```html
    <img
      src="images/map-lausanne.png"
      alt="Carte — Rue du Bugnon 10, 1005 Lausanne"
      class="acces__map-img"
      width="768"
      height="512"
      loading="lazy">
```
Replace with:
```html
    <img
      src="images/shop_image.webp"
      alt="Devanture de la Chocolaterie du Bugnon, Rue du Bugnon 10, Lausanne"
      class="acces__map-img"
      width="768"
      height="512"
      loading="lazy">
```

- [ ] **Step 3: Replace the événements image with the new fountain photo**

In `landing/index.html`, find:
```html
  <img src="images/fondue.jpg" alt="Fontaine chocolat pour événements" class="evenements__img">
```
Replace with:
```html
  <img src="images/new_images/fontaine.jpg" alt="Fontaine chocolat Chocolaterie du Bugnon" class="evenements__img">
```

- [ ] **Step 4: Reduce événements section visual weight in CSS**

At the very end of `landing/css/styles.css`, append:
```css

/* ===== ÉVÉNEMENTS — reduced weight ===== */
.evenements { padding: 2.5rem 0; }
.evenements h2 { font-size: clamp(1.2rem, 2.5vw, 1.6rem); }
.evenements__img { height: 220px; }
```

- [ ] **Step 5: Verify**

Open `landing/index.html` in a browser and check:
- Valeurs / Qualité card: text ends with "naturels." — no mention of colorants
- Contact section: shows the shop photo instead of the map screenshot
- Événements section: visibly smaller/less prominent than other sections; fountain photo displays

- [ ] **Step 6: Commit**

```bash
git add landing/index.html landing/css/styles.css
git commit -m "feat: content fixes — valeurs copy, shop photo, événements reduction"
```

---

## Task 4: Rebuild the produits section with editorial gallery HTML

**Files:**
- Modify: `landing/index.html` (entire produits section replaced + CTA band added)

- [ ] **Step 1: Replace the entire produits section**

In `landing/index.html`, find this entire block (from the opening `<section>` tag to its closing `</section>` tag):
```html
    <!-- PRODUITS -->
    <section class="produits section section--alt" id="produits">
      <div class="container produits__inner"><div class="section-header section-header--center">
  <p class="section-eyebrow">La boutique</p>
  <h2>À découvrir en boutique</h2>
  <div class="rule rule--center"></div>
</div>
<ul class="produits__grid">
  <li class="produits__tile">
    <div class="produits__img-wrap">
      <img src="images/chocolats.jpg" alt="Chocolats artisanaux" class="produits__img">
    </div>
    <span class="produits__label">Chocolats</span>
  </li>
  <li class="produits__tile">
    <div class="produits__img-wrap">
      <img src="images/confiserie.webp" alt="Confiseries artisanales" class="produits__img">
    </div>
    <span class="produits__label">Confiseries</span>
  </li>
  <li class="produits__tile">
    <div class="produits__img-wrap">
      <img src="images/glaces.jpg" alt="Glaces artisanales" class="produits__img">
    </div>
    <span class="produits__label">Glaces</span>
  </li>
  <li class="produits__tile">
    <div class="produits__img-wrap">
      <img src="images/sorbet.jpg" alt="Sorbets artisanaux" class="produits__img">
    </div>
    <span class="produits__label">Sorbets</span>
  </li>
  <li class="produits__tile produits__tile--saison">
    <div class="produits__img-wrap">
      <img src="images/pacques.jpg" alt="Créations saisonnières" class="produits__img">
    </div>
    <span class="produits__label">Saisonnier ✦</span>
  </li>
</ul></div>
    </section>
```

Replace with:
```html
    <!-- PRODUITS -->
    <section class="produits section section--alt" id="produits">
      <div class="container produits__inner">
        <div class="section-header section-header--center">
          <p class="section-eyebrow">La boutique</p>
          <h2>En Magasin</h2>
          <div class="rule rule--center"></div>
        </div>

        <div class="produit-cats">

          <!-- 1. Chocolats -->
          <div class="produit-cat">
            <div class="produit-cat__header">
              <p class="section-eyebrow">Notre savoir-faire</p>
              <h3 class="produit-cat__title">Chocolats grands crus</h3>
              <div class="rule"></div>
              <p class="produit-cat__desc">Sélectionnés aux quatre coins du monde, façonnés à la main dans notre atelier lausannois. Chaque pièce est une rencontre entre terroir et maîtrise.</p>
            </div>
            <div class="gallery" data-category="chocolats">
              <img class="gallery__img" src="images/new_images/chocolat/c1.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/chocolat/c2.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/chocolat/c3.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/chocolat/c4.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/chocolat/c5.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/chocolat/c6.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/chocolat/c7.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/chocolat/c8.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/chocolat/1000004848.jpg" alt="Chocolats artisanaux Bugnon" loading="lazy">
            </div>
          </div>

          <!-- 2. Confiseries -->
          <div class="produit-cat produit-cat--right">
            <div class="produit-cat__header">
              <p class="section-eyebrow">Douceurs artisanales</p>
              <h3 class="produit-cat__title">Confiseries &amp; gourmandises</h3>
              <div class="rule"></div>
              <p class="produit-cat__desc">Caramels fondants, nougats, pralinés maison. Des créations qui éveillent les sens et prolongent le plaisir.</p>
            </div>
            <div class="gallery" data-category="confiseries">
              <img class="gallery__img" src="images/new_images/confisserie/co1.jpg" alt="Confiseries artisanales Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/confisserie/co2.jpg" alt="Confiseries artisanales Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/confisserie/co3.jpg" alt="Confiseries artisanales Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/confisserie/co4.jpg" alt="Confiseries artisanales Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/confisserie/Boîte 20 pces.jpg" alt="Boîte de confiseries Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/confisserie/boîte chocolats.jpg" alt="Boîte de chocolats Bugnon" loading="lazy">
            </div>
          </div>

          <!-- 3. Glaces & Sorbets -->
          <div class="produit-cat">
            <div class="produit-cat__header">
              <p class="section-eyebrow">Fraîcheur d'exception</p>
              <h3 class="produit-cat__title">Glaces &amp; sorbets</h3>
              <div class="rule"></div>
              <p class="produit-cat__desc">L'intensité du cacao et la fraîcheur des fruits, réunis dans des recettes élaborées avec des ingrédients naturels et soigneusement sélectionnés.</p>
            </div>
            <div class="gallery" data-category="glaces-sorbets">
              <img class="gallery__img" src="images/new_images/glace_Et_sorbet/g1.jpg" alt="Glaces artisanales Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/glace_Et_sorbet/g2.jpg" alt="Glaces artisanales Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/glace_Et_sorbet/g3.jpg" alt="Glaces artisanales Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/glace_Et_sorbet/g4.jpg" alt="Sorbets artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/glace_Et_sorbet/g5.jpg" alt="Sorbets artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/glace_Et_sorbet/g6.jpg" alt="Sorbets artisanaux Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/glace_Et_sorbet/g7.jpg" alt="Sorbets artisanaux Bugnon" loading="lazy">
            </div>
          </div>

          <!-- 4. Saisonnier -->
          <div class="produit-cat produit-cat--right">
            <div class="produit-cat__header">
              <p class="section-eyebrow">Au fil des saisons</p>
              <h3 class="produit-cat__title">Créations saisonnières</h3>
              <div class="rule"></div>
              <p class="produit-cat__desc">Pâques, Noël, fête des mères — chaque saison inspire une collection éphémère à découvrir avant qu'elle disparaisse.</p>
            </div>
            <div class="gallery" data-category="saison">
              <img class="gallery__img" src="images/new_images/season/s1.jpg" alt="Créations saisonnières Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/season/s2.jpg" alt="Créations saisonnières Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/season/s3.jpg" alt="Créations saisonnières Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/season/s4.jpg" alt="Créations saisonnières Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/season/s5.jpg" alt="Créations saisonnières Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/season/s6.jpg" alt="Créations saisonnières Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/season/s7.jpg" alt="Créations saisonnières Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/season/s8.jpg" alt="Créations saisonnières Bugnon" loading="lazy">
            </div>
          </div>

          <!-- 5. Créations artistiques -->
          <div class="produit-cat">
            <div class="produit-cat__header">
              <p class="section-eyebrow">L'art du chocolat</p>
              <h3 class="produit-cat__title">Créations artistiques</h3>
              <div class="rule"></div>
              <p class="produit-cat__desc">Sculptures, pièces montées, œuvres sur mesure. Quand le chocolat devient matière à expression.</p>
            </div>
            <div class="gallery" data-category="art">
              <img class="gallery__img" src="images/new_images/art/a1.jpg" alt="Création artistique en chocolat Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/art/a2.jpg" alt="Création artistique en chocolat Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/art/a3.jpg" alt="Création artistique en chocolat Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/art/a4.jpg" alt="Création artistique en chocolat Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/art/a5.jpg" alt="Création artistique en chocolat Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/art/a6.jpg" alt="Création artistique en chocolat Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/art/a7.jpg" alt="Création artistique en chocolat Bugnon" loading="lazy">
              <img class="gallery__img" src="images/new_images/art/a8.jpg" alt="Création artistique en chocolat Bugnon" loading="lazy">
            </div>
          </div>

        </div><!-- /produit-cats -->
      </div><!-- /container -->
    </section>

    <!-- PRODUITS CTA BAND -->
    <div class="produits__cta-band">
      <div class="container produits__cta-inner">
        <h2 class="produits__cta-title">Venez découvrir notre boutique</h2>
        <p class="produits__cta-sub">Rue du Bugnon 10 · 1005 Lausanne · Lun–Ven 9h–18h30 · Sam 9h–17h</p>
        <a href="#contact" class="btn btn--gold">Voir notre adresse</a>
      </div>
    </div>
```

> **Note on confisserie filenames:** The files `Boîte 20 pces.jpg` and `boîte chocolats.jpg` contain spaces and an accented character. The `src` values above use literal UTF-8 strings, which modern browsers handle correctly when served from a local file or web server. Do not URL-encode them — the literal strings match the actual filenames on disk.

- [ ] **Step 2: Verify**

Open `landing/index.html` in a browser. Scroll to the produits section and confirm:
- Section heading reads "En Magasin"
- Five category blocks appear stacked vertically
- Each block shows its heading, description, and a grid of photos
- Categories 2 and 4 (Confiseries, Saisonniers) have their text right-aligned
- The dark CTA band appears after the fifth category with "Venez découvrir notre boutique" and a gold button

- [ ] **Step 3: Commit**

```bash
git add landing/index.html
git commit -m "feat: rebuild produits section as editorial gallery with CTA band"
```

---

## Task 5: Add gallery and CTA band CSS

**Files:**
- Modify: `landing/css/styles.css` (append new blocks at end of file)

- [ ] **Step 1: Append gallery and CTA styles to `styles.css`**

At the very end of `landing/css/styles.css`, append:

```css

/* ===== PRODUITS — EDITORIAL GALLERY ===== */
.produit-cats {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding-bottom: 2rem;
}

.produit-cat {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.produit-cat__header {
  max-width: 600px;
}

.produit-cat--right .produit-cat__header {
  margin-left: auto;
  text-align: right;
}

.produit-cat--right .rule {
  margin-left: auto;
}

.produit-cat--right .produit-cat__desc {
  margin-left: auto;
}

.produit-cat__title {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-weight: 600;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  line-height: 1.2;
  color: var(--text);
  margin-top: 0.25rem;
}

.produit-cat__desc {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--text2);
  line-height: 1.7;
  max-width: 52ch;
  margin-top: 0.5rem;
}

.produit-cat--right .produit-cat__desc {
  margin-left: auto;
}

/* Gallery grid */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;
}

.gallery__img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius);
  cursor: pointer;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  display: block;
}

.gallery__img:hover {
  opacity: 0.88;
  transform: scale(1.02);
}

@media (max-width: 640px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* CTA band */
.produits__cta-band {
  background: var(--bg-dark);
  color: var(--cta-text);
  padding: 5rem 1.5rem;
}

.produits__cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.produits__cta-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-weight: 600;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: var(--cta-text);
  line-height: 1.2;
}

.produits__cta-sub {
  font-family: var(--font-sans);
  font-size: 0.88rem;
  color: oklch(97% 0.012 55 / 0.65);
  letter-spacing: 0.04em;
  margin-bottom: 0.75rem;
}
```

- [ ] **Step 2: Verify**

Open `landing/index.html` in browser. Scroll through the produits section:
- Each category block has proper vertical spacing (generous gap between blocks)
- Photo grids show 3 columns on desktop, 2 on mobile
- Photos maintain 4:3 aspect ratio and fill their grid cells
- Text in categories 2 and 4 is right-aligned
- CTA band at the bottom is full-width, dark background, centred text with gold button

- [ ] **Step 3: Commit**

```bash
git add landing/css/styles.css
git commit -m "feat: add editorial gallery and CTA band CSS"
```

---

## Task 6: Add lightbox CSS

**Files:**
- Modify: `landing/css/styles.css` (append lightbox block at end of file)

- [ ] **Step 1: Append lightbox styles to `styles.css`**

At the very end of `landing/css/styles.css`, append:

```css

/* ===== LIGHTBOX ===== */
#lightbox {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

#lightbox.lb-active {
  display: flex;
}

.lb-backdrop {
  position: absolute;
  inset: 0;
  background: oklch(10% 0.02 48 / 0.93);
}

.lb-img-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
  max-height: 85vh;
}

.lb-img {
  display: block;
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;
  user-select: none;
}

.lb-close,
.lb-prev,
.lb-next {
  position: fixed;
  background: oklch(97% 0.012 55 / 0.12);
  border: 1px solid oklch(97% 0.012 55 / 0.2);
  color: oklch(97% 0.012 55);
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease-out;
  font-family: var(--font-sans);
  line-height: 1;
}

.lb-close:hover,
.lb-prev:hover,
.lb-next:hover {
  background: oklch(97% 0.012 55 / 0.25);
}

.lb-close {
  top: 1.25rem;
  right: 1.25rem;
  font-size: 1.1rem;
}

.lb-prev {
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4rem;
}

.lb-next {
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4rem;
}

.lb-counter {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: oklch(97% 0.012 55 / 0.6);
  font-family: var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  z-index: 2;
  user-select: none;
}

@media (max-width: 640px) {
  .lb-prev { left: 0.5rem; }
  .lb-next { right: 0.5rem; }
}
```

- [ ] **Step 2: Verify (visual only — JS not wired yet)**

Open `landing/index.html` in browser. The page should look identical to before — no lightbox visible yet. This step only validates the CSS loaded without errors (no broken layout, no console CSS parse errors).

- [ ] **Step 3: Commit**

```bash
git add landing/css/styles.css
git commit -m "feat: add lightbox CSS"
```

---

## Task 7: Add lightbox JavaScript

**Files:**
- Modify: `landing/js/main.js` (append lightbox object after existing IIFE)

- [ ] **Step 1: Append lightbox JS to `main.js`**

Open `landing/js/main.js`. The file currently contains one IIFE (lines 1–26). After the closing `})();` on line 26, append the following (leave one blank line between them):

```js

// ===== LIGHTBOX =====
(function () {
  const lightbox = {
    overlay: null,
    img: null,
    counter: null,
    images: [],
    currentIndex: 0,

    init: function () {
      // Build overlay DOM
      const el = document.createElement('div');
      el.id = 'lightbox';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-modal', 'true');
      el.setAttribute('aria-label', 'Galerie photos');
      el.innerHTML =
        '<div class="lb-backdrop"></div>' +
        '<button class="lb-close" aria-label="Fermer">&#x2715;</button>' +
        '<button class="lb-prev" aria-label="Photo précédente">&#x2039;</button>' +
        '<button class="lb-next" aria-label="Photo suivante">&#x203A;</button>' +
        '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""></div>' +
        '<div class="lb-counter"></div>';
      document.body.appendChild(el);

      this.overlay  = el;
      this.img      = el.querySelector('.lb-img');
      this.counter  = el.querySelector('.lb-counter');

      // Controls
      el.querySelector('.lb-close').addEventListener('click', this.close.bind(this));
      el.querySelector('.lb-backdrop').addEventListener('click', this.close.bind(this));
      el.querySelector('.lb-prev').addEventListener('click', this.prev.bind(this));
      el.querySelector('.lb-next').addEventListener('click', this.next.bind(this));

      // Keyboard
      document.addEventListener('keydown', function (e) {
        if (!this.overlay.classList.contains('lb-active')) return;
        if (e.key === 'Escape')      this.close();
        if (e.key === 'ArrowLeft')   this.prev();
        if (e.key === 'ArrowRight')  this.next();
      }.bind(this));

      // Wire up gallery images
      document.querySelectorAll('.gallery').forEach(function (gallery) {
        var category = gallery.dataset.category;
        gallery.querySelectorAll('.gallery__img').forEach(function (imgEl, idx) {
          imgEl.addEventListener('click', function () {
            var siblings = Array.from(
              document.querySelectorAll('.gallery[data-category="' + category + '"] .gallery__img')
            );
            var entries = siblings.map(function (i) {
              return { src: i.src, alt: i.alt };
            });
            this.open(entries, idx);
          }.bind(this));
        }.bind(this));
      }.bind(this));
    },

    open: function (images, index) {
      this.images = images;
      this.currentIndex = index;
      this._show();
      this.overlay.classList.add('lb-active');
      document.body.style.overflow = 'hidden';
      this.overlay.querySelector('.lb-close').focus();
    },

    close: function () {
      this.overlay.classList.remove('lb-active');
      document.body.style.overflow = '';
    },

    prev: function () {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this._show();
    },

    next: function () {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this._show();
    },

    _show: function () {
      var entry = this.images[this.currentIndex];
      this.img.src = entry.src;
      this.img.alt = entry.alt;
      this.counter.textContent = (this.currentIndex + 1) + ' / ' + this.images.length;
    }
  };

  lightbox.init();
})();
```

- [ ] **Step 2: Verify — lightbox opens and navigates**

Open `landing/index.html` in a browser. Scroll to the produits section and:

1. Click any photo in the **Chocolats** gallery — a full-screen dark overlay should appear with the photo centred, arrows left/right, an × close button top-right, and a counter (e.g. "3 / 9") at the bottom
2. Click the right arrow — next photo in the Chocolats category loads
3. Click the left arrow — previous photo loads (wraps around from first to last)
4. Press **Escape** — overlay closes
5. Click a photo in **Confiseries** — the carousel shows only Confiseries photos (not mixed with Chocolats)
6. Click outside the photo (on the dark backdrop) — overlay closes
7. Check the browser console — no JS errors

- [ ] **Step 3: Commit**

```bash
git add landing/js/main.js
git commit -m "feat: add lightbox carousel for product gallery"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** Font (Task 1) ✓ · Color (Task 2) ✓ · Valeurs copy (Task 3) ✓ · Contact image (Task 3) ✓ · Événements image + size (Task 3) ✓ · Section header "En Magasin" (Task 4) ✓ · 5-category editorial gallery HTML (Task 4) ✓ · All image paths included (Task 4 verified against `ls` output) ✓ · Gallery CSS (Task 5) ✓ · CTA band HTML + CSS (Tasks 4 + 5) ✓ · CTA scrolls to #contact (Task 4) ✓ · Lightbox CSS (Task 6) ✓ · Lightbox JS (Task 7) ✓ · Keyboard navigation (Task 7) ✓ · Image counter (Task 7) ✓ · Close on backdrop click (Task 7) ✓ · Category isolation in carousel (Task 7) ✓
- [x] **Placeholder scan:** No TBDs, TODOs, or vague steps. All code is complete.
- [x] **Type consistency:** `data-category` values match exactly between HTML (Task 4) and JS (Task 7). `gallery__img` class is consistent. `lb-active` class used consistently in CSS (Task 6) and JS (Task 7). `produit-cat--right` class applied in HTML (Task 4) and targeted in CSS (Task 5).
