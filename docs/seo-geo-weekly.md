# Weekly SEO & GEO review — Chocolaterie du Bugnon

Brief for the scheduled agent that reviews the site once a week. **Read this first,
then follow it.** The goal is steady, low-risk improvement — not a redesign.

---

## 1. Ground rules

**Never invent facts about the business.** This is a real shop. Prices, opening
hours, products, events, awards, delivery options and dates may only come from:

- the existing content of `landing/index.html` and `landing/llms.txt`
- `landing/data/news.json`
- `audit/chocolaterie-du-bugnon-audit.md`
- something the owner wrote in the PR or an issue

If a change would read better with a fact you do not have, leave a `TODO` in the
PR description and ask. A plausible-sounding invented detail is worse than a gap.

**Stay inside these limits:**

| Allowed | Not allowed without asking |
|---|---|
| Metadata, structured data, alt text, headings, internal anchors | Redesigning a section or changing the visual identity |
| Tightening existing copy, fixing French typography | Writing new marketing claims |
| `llms.txt`, `robots.txt`, `sitemap.xml`, `.htaccess` headers | Adding pages, routes or a blog |
| Accessibility and performance fixes | Adding dependencies, frameworks or build steps |
| Proposing bigger ideas **in the PR description** | Implementing them the same week |

**Keep each week small.** One focused PR of a handful of changes that the owner
can read in five minutes beats a sprawling one they will not merge.

---

## 2. How the site is built

- `landing/` is the **source**. `hostinger-site/` is **generated** — never edit it by hand.
- The Actualités section is generated from `landing/data/news.json`; the HTML between
  the `ACTUALITES:START` / `ACTUALITES:END` markers is overwritten by the renderer.
- Single page, French (`fr-CH`), static HTML/CSS/JS. No framework, no bundler.

After any change:

```bash
node scripts/render-news.mjs      # news.json -> index.html (+ sitemap lastmod)
./landing/build-for-hostinger.sh  # landing/ -> hostinger-site/
```

Both must be run and committed, or the deploy workflow fails its freshness check.

---

## 2b. Real search data

`docs/search-console-latest.md` is refreshed every Tuesday morning from Google Search
Console, before this review runs. **Read it first.** It is generated — never edit it.

It tells you what the site is *actually* found for, which the markup cannot:

- A query with impressions but near-zero clicks is a title or description problem on
  that page, not a schema problem.
- A query ranking 8–20 is the one worth earning a sentence of real copy; a query
  ranking 90 is not.
- A query people search that the page never uses the words for is a content gap —
  report it, do not invent a claim to fill it.

The site went live on 4 October 2026, so expect the file to be empty or thin for the
first few weeks. An empty report is not a finding; carry on with the structural work.

---

## 3. Weekly rotation

Pick the focus for the current ISO week number (`date +%V`), so the same ground is
not covered every week:

| `week % 4` | Focus |
|---|---|
| 0 | **Structured data & GEO** — schema coverage and accuracy, `llms.txt` |
| 1 | **Local SEO** — NAP consistency, Lausanne/CHUV/quartier intent, map links |
| 2 | **Content & intent** — headings, FAQ gaps, alt text, internal anchors |
| 3 | **Technical & performance** — image weight, caching headers, Core Web Vitals, a11y |

Always run the quick regression checks in §5 regardless of focus.

---

## 4. What to look for

### SEO

- `<title>` under ~60 characters, `<meta name="description">` 140–160, both unique and current.
- One `h1`; heading order never skips a level.
- Every `<img>` has meaningful French alt text (decorative ones: `alt=""`).
- `sitemap.xml` `<lastmod>` reflects reality; `robots.txt` still allows crawling.
- Internal anchors (`#produits`, `#actualites`, `#sur-mesure`, `#contact`, `#faq`) all resolve.
- Seasonal copy is not stale — in October, a hero about summer ice cream is a bug.
- French typography: `œ`, non-breaking space before `!?:;`, proper apostrophes (`'`).

### GEO (how AI assistants read and cite the site)

GEO is mostly about being **unambiguous and quotable**:

- `llms.txt` agrees exactly with the page and the JSON-LD — address, phone, hours,
  prices. A contradiction makes assistants distrust all of it.
- Facts a person would ask an assistant are stated **in plain sentences on the page**,
  not only in an image or a JSON-LD blob: where it is, when it opens, what it sells,
  how far ahead to order, what the chocolate fountain costs.
- FAQ answers are self-contained — each should make sense quoted on its own, without
  the question or the surrounding page.
- The JSON-LD `FAQPage` entries stay **character-identical** to the visible FAQ text.
  Google requires it, and divergence is an easy bug to introduce.
- Entity clarity: the business name, the artisan's name (Benoît Machard), the city and
  the year founded (2014) appear in prose, not only in markup.
- Anything new and genuinely cite-worthy belongs in `llms.txt` under the right heading.

### Technical

- Images: anything over ~300 KB is worth flagging; prefer width/height attributes or
  a CSS-fixed box so nothing shifts while loading.
- `loading="lazy"` below the fold, never on the hero image.
- Check `.htaccess` still sets the right content types.
- Keyboard focus visible; contrast ≥ 4.5:1 on body text.

---

## 5. Quick regression checks

```bash
node scripts/render-news.mjs --check   # HTML matches news.json
./landing/build-for-hostinger.sh && git diff --stat -- hostinger-site
grep -c '<h1' landing/index.html       # expect 1
```

Then confirm by reading the diff:

- every JSON-LD block still parses as JSON;
- the visible FAQ and the `FAQPage` schema still match word for word;
- no `lorem`, no placeholder, no English leaking into the French copy.

---

## 6. Deliverable

One PR against `main` on a branch named `bot/seo-YYYY-WW`, with a description that states:

1. the focus area for the week;
2. what changed and the reasoning, one line each;
3. anything found but **not** changed, and why;
4. open questions for the owner.

If a week turns up nothing worth changing, say so in the PR description and open a
PR with only an updated audit note — or skip the PR and report it. Do not invent
work to fill the slot.
