# Chocolaterie du Bugnon — SEO, FAQ & Local Design Spec

**Date:** 2026-05-31  
**Status:** Implemented (2026-05-31)  
**Scope:** Technical SEO + visible FAQ accordion + structured data. No edits to existing page copy outside the new FAQ block.

---

## 1. Goals

| Goal | How |
|------|-----|
| **Local SEO (Google Maps / pack local)** | `LocalBusiness` JSON-LD with NAP, hours, URL, image; FAQ answers mention Lausanne + address |
| **Organic SEO** | FAQ targets intent (chocolatier artisanal, commandes, glaces, sur mesure); `sitemap.xml`; keep existing title/description/canonical |
| **Google FAQ compliance** | Visible Q/A on page **identical** to `FAQPage` schema |

**Out of scope:** Rewriting hero, à propos, produits, or other sections; blog; multi-page site; hreflang.

---

## 2. Files to add or change

| File | Action |
|------|--------|
| `landing/index.html` | Insert `#faq` section after `#contact`; add JSON-LD scripts; optional `link rel="sitemap"` |
| `landing/css/styles.css` | Styles for `.faq`, `.faq__item`, chevron, focus states |
| `landing/sitemap.xml` | **Create** (single URL) |
| `landing/robots.txt` | Keep as-is (already references sitemap) |
| `hostinger-site/` | Regenerate via `./landing/build-for-hostinger.sh` |

**Note:** Standard crawlers use `robots.txt`, not `robots.xml`.

---

## 3. FAQ section — placement & UI

### 3.1 Placement

Insert **after** `</section>` of `#contact` (acces), **before** `<footer>`.

```html
<!-- ACCÈS & CONTACT --> … </section>

<!-- FAQ --> … new section id="faq" …

<!-- FOOTER -->
```

### 3.2 Markup (approach A — native accordion)

- Section: `class="faq section section--alt" id="faq" aria-labelledby="faq-title"`
- Container: `.container.faq__inner`
- Header: eyebrow optional; `h2#faq-title` → **Questions fréquentes**
- List: `div.faq__list` containing 7× `details.faq__item`
- Each item: `summary.faq__question` + `div.faq__answer` (with `p` inside)

**Accessibility**

- `summary` is the only control (keyboard, screen readers)
- Chevron via CSS `::after` on `summary`, rotate when `[open]`
- Respect `prefers-reduced-motion` (no animation or instant)
- Do not nest interactive elements inside `summary`

### 3.3 Visual design (minimal)

- Match existing section rhythm: eyebrow + `h2` + optional short rule
- `details`: bottom border `1px solid rgba(49, 27, 16, 0.1)` between items
- `summary`: Outfit, `1.0625rem`, `font-weight: 500`, padding `1rem 2rem 1rem 0`, cursor pointer
- Answer: `--text2`, `1rem`, padding bottom `1.25rem`, max-width ~65ch
- Chevron: right-aligned, subtle, rotates 180° when open
- Mobile: same pattern, slightly reduced padding

### 3.4 Footer nav (optional, recommended)

Add one link under footer Navigation: `<a href="#faq">FAQ</a>`.

---

## 4. FAQ content (7 items — French)

Text below is **new copy** only in the FAQ block. Wording is grounded in existing site facts.

### Q1 — Localisation

**Question:** Où se trouve la Chocolaterie du Bugnon à Lausanne ?

**Answer:** Notre boutique artisanale est au **Rue du Bugnon 10, 1005 Lausanne**, à deux pas du CHUV. Vous pouvez venir découvrir nos créations directement en magasin ou utiliser le bouton « Itinéraire » pour nous rejoindre avec Google Maps.

### Q2 — Horaires

**Question:** Quels sont vos horaires d'ouverture ?

**Answer:** Nous vous accueillons **du lundi au vendredi de 9h à 18h**, et le **samedi de 9h à 15h** (ouverture continue). Pour une commande sur mesure, merci de nous contacter à l'avance.

### Q3 — Produits en magasin

**Question:** Quels produits proposez-vous en magasin ?

**Answer:** En boutique, vous trouverez nos **chocolats Grands Crus** (pralinés, truffes, pavés et créations de saison), des **confiseries et gourmandises**, ainsi que des **glaces et sorbets artisanaux** confectionnés à la main à Lausanne.

### Q4 — Commandes sur mesure

**Question:** Proposez-vous des commandes sur mesure ?

**Answer:** Oui. Nous réalisons des créations pour **cadeaux d'entreprise**, **anniversaires et mariages**, **cadeaux personnalisés**, et nous proposons aussi une **fontaine à chocolat** pour vos événements. Décrivez votre projet via le formulaire « Sur mesure » ou appelez-nous.

### Q5 — Délai commande

**Question:** Quel est le délai pour une commande personnalisée ?

**Answer:** Merci de prévoir vos demandes **48 heures à l'avance**. Chaque commande est **confirmée après échange avec l'artisan**, de préférence par téléphone, une fois votre projet validé.

### Q6 — Fontaine chocolat

**Question:** Proposez-vous une fontaine à chocolat pour des événements ?

**Answer:** Oui, pour mariages, soirées d'entreprise ou anniversaires. Notre fontaine (environ **80 cm** de hauteur) est proposée à **150 CHF par jour**, avec une **caution de 600 CHF**. Contactez-nous pour les disponibilités et l'installation.

### Q7 — Historique

**Question:** Depuis quand la chocolaterie est-elle installée à Lausanne ?

**Answer:** La Chocolaterie du Bugnon est **installée à Lausanne depuis 2014**. Benoît Machard et son équipe y confectionnent des créations chocolatées artisanales à partir de cacaos « Grands Crus » sélectionnés.

**Excluded:** Question on cadmium (user request).

---

## 5. Structured data (JSON-LD)

Place in `<head>` before `</head>` or grouped at end of `<body>` (either is valid; prefer `<head>` for consistency).

Use `@context`: `https://schema.org` throughout.

### 5.1 FAQPage

- `@type`: `FAQPage`
- `mainEntity`: array of 7 `Question` objects
- Each: `name` = question text; `acceptedAnswer` → `@type Answer`, `text` = answer plain text (same as visible HTML, no HTML in `text`)

### 5.2 LocalBusiness

- `@type`: `["LocalBusiness", "Bakery"]` (or `Store`)
- `name`: `Chocolaterie du Bugnon`
- `url`: `https://chocolateriedubugnon.ch/`
- `image`: `https://chocolateriedubugnon.ch/assets/og-share.jpg`
- `telephone`: `+41-21-558-38-07`
- `address`: `PostalAddress` — `streetAddress` Rue du Bugnon 10, `postalCode` 1005, `addressLocality` Lausanne, `addressCountry` CH
- `geo`: `GeoCoordinates` — **verify against Google Business Profile** before deploy (approximate: 46.5245, 6.6334 if GBP unavailable)
- `openingHoursSpecification`:
  - Mo–Fr 09:00–18:00
  - Sa 09:00–15:00
- `priceRange`: `$$` (optional, conventional for artisan boutique)

### 5.3 WebSite (optional, small)

- `@type`: `WebSite`
- `name`, `url`, `inLanguage`: `fr-CH`
- `publisher` → `@id` referencing LocalBusiness

### 5.4 Validation

After implementation, test with [Google Rich Results Test](https://search.google.com/test/rich-results) and Schema.org validator.

---

## 6. Sitemap & robots

### 6.1 `landing/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://chocolateriedubugnon.ch/</loc>
    <lastmod>2026-05-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Update `lastmod` on each meaningful deploy.

### 6.2 `landing/robots.txt` (unchanged)

```
User-agent: *
Allow: /

Sitemap: https://chocolateriedubugnon.ch/sitemap.xml
```

### 6.3 Head hint (optional)

```html
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
```

---

## 7. Existing meta (no changes required)

Keep current:

- `<title>`, meta description, canonical `https://chocolateriedubugnon.ch/`
- Open Graph / Twitter tags
- `lang="fr"`

Bump cache-buster on `styles.css` query string when CSS changes (e.g. `?v=20260531`).

---

## 8. Implementation checklist

1. Add FAQ HTML block with 7 `details` items (copy from §4).
2. Add FAQ CSS (§3.3).
3. Add JSON-LD: FAQPage + LocalBusiness (+ optional WebSite).
4. Create `sitemap.xml`.
5. Optional: footer FAQ link; `link rel="sitemap"`.
6. Run `./landing/build-for-hostinger.sh`.
7. Upload `hostinger-site/` to Hostinger `public_html`.
8. Validate rich results; submit sitemap in Google Search Console if property exists.

---

## 9. Risks & notes

| Topic | Note |
|-------|------|
| FAQ rich results | Google limits FAQ snippets for many commercial sites; visible FAQ still helps users and other engines |
| Geo coordinates | Must match GBP to avoid local SEO inconsistency |
| New FAQ text | Only additive section; does not alter existing marketing copy |
| Single-page | One URL in sitemap is correct for current architecture |

---

## 10. Approval record

- **Approach:** A (`<details>` / `<summary>`)
- **Questions:** 7 (no cadmium FAQ)
- **Placement:** After `#contact`, before footer
- **Goals:** Local + organic (C)
