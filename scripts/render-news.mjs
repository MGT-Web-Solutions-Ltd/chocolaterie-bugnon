#!/usr/bin/env node
/**
 * Renders landing/data/news.json into the #actualites section of landing/index.html.
 *
 * The news items are baked into the HTML rather than fetched by the browser so that
 * crawlers and AI assistants see the content without running JavaScript.
 *
 * Usage: node scripts/render-news.mjs [--check]
 *   --check  exit 1 if the HTML is out of date instead of rewriting it
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HTML = join(ROOT, 'landing', 'index.html');
const DATA = join(ROOT, 'landing', 'data', 'news.json');
const SITEMAP = join(ROOT, 'landing', 'sitemap.xml');

const START = '<!-- ACTUALITES:START (généré par scripts/render-news.mjs — ne pas éditer à la main) -->';
const END = '<!-- ACTUALITES:END -->';

const MAX_SECONDARY = 3;

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** width/height are optional: the CSS fixes the box, so they are a bonus, not a requirement. */
function sizeAttrs(item) {
  return item.width && item.height ? ` width="${esc(item.width)}" height="${esc(item.height)}"` : '';
}

function renderCta(cta, className) {
  if (!cta || !cta.href || !cta.label) return '';
  const external = /^https?:/i.test(cta.href);
  const rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${esc(cta.href)}" class="${className}"${rel}>${esc(cta.label)}</a>`;
}

function renderFeatured(item) {
  const badge = item.badge
    ? `\n          <span class="campagne__badge">${esc(item.badge)}</span>`
    : '';
  const eyebrow = item.eyebrow
    ? `\n          <p class="section-eyebrow section-eyebrow--gold campagne__eyebrow">${esc(item.eyebrow)}</p>`
    : '';
  const cta = renderCta(item.cta, 'btn btn--gold btn--lg campagne__cta');
  const actions = cta ? `\n          <div class="campagne__actions">\n            ${cta}\n          </div>` : '';

  return `      <div class="campagne__inner">
        <div class="campagne__visual">
          <div class="campagne__frame">
            <img src="${esc(item.image)}" alt="${esc(item.imageAlt)}" class="campagne__img"${sizeAttrs(item)} loading="lazy" decoding="async">
          </div>
        </div>
        <div class="campagne__text">${badge}${eyebrow}
          <h2 class="campagne__title" id="actus-title">${esc(item.title)}</h2>
          <div class="rule rule--gold campagne__rule"></div>
          <p class="campagne__sub">${esc(item.text)}</p>${actions}
        </div>
      </div>`;
}

function renderCard(item) {
  const time = item.date
    ? `\n              <p class="actus__card-date"><time datetime="${esc(item.date)}">${esc(item.eyebrow || item.date)}</time></p>`
    : '';
  const cta = renderCta(item.cta, 'actus__card-link');
  const link = cta ? `\n              ${cta}` : '';

  return `          <article class="actus__card">
            <div class="actus__card-frame">
              <img src="${esc(item.image)}" alt="${esc(item.imageAlt)}" class="actus__card-img"${sizeAttrs(item)} loading="lazy" decoding="async">
            </div>
            <div class="actus__card-body">${time}
              <h3 class="actus__card-title">${esc(item.title)}</h3>
              <p class="actus__card-text">${esc(item.text)}</p>${link}
            </div>
          </article>`;
}

function render(items) {
  if (!items.length) {
    throw new Error('news.json contains no items — the Actualités section would be empty.');
  }
  const featuredIndex = Math.max(0, items.findIndex((item) => item.featured));
  const featured = items[featuredIndex];
  const rest = items.filter((_, i) => i !== featuredIndex).slice(0, MAX_SECONDARY);

  const more = rest.length
    ? `\n      <div class="actus__more">
        <h2 class="actus__more-title">Également en ce moment</h2>
        <div class="actus__grid">
${rest.map(renderCard).join('\n')}
        </div>
      </div>`
    : '';

  return `${renderFeatured(featured)}${more}`;
}

/** Fresh content deserves a fresh <lastmod>; a stale one tells crawlers not to bother. */
function updateSitemap(updated) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(updated ?? '')) {
    console.warn('Actualités: news.json "updated" is not YYYY-MM-DD — sitemap.xml left unchanged.');
    return;
  }
  const xml = readFileSync(SITEMAP, 'utf8');
  const next = xml.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${updated}</lastmod>`);
  if (next !== xml) {
    writeFileSync(SITEMAP, next);
    console.log(`Actualités: sitemap.xml lastmod set to ${updated}.`);
  }
}

function main() {
  const check = process.argv.includes('--check');
  const data = JSON.parse(readFileSync(DATA, 'utf8'));
  const items = Array.isArray(data.items) ? data.items : [];

  for (const item of items) {
    for (const field of ['id', 'title', 'text', 'image', 'imageAlt']) {
      if (!item[field]) throw new Error(`news.json: item "${item.id ?? '?'}" is missing "${field}".`);
    }
  }

  const html = readFileSync(HTML, 'utf8');
  const startAt = html.indexOf(START);
  const endAt = html.indexOf(END);
  if (startAt === -1 || endAt === -1) {
    throw new Error(`Markers not found in ${HTML}. Expected ${START} … ${END}.`);
  }

  const next =
    html.slice(0, startAt + START.length) + '\n' + render(items) + '\n      ' + html.slice(endAt);

  if (next !== html) {
    if (check) {
      console.error('Actualités: index.html is out of date. Run: node scripts/render-news.mjs');
      process.exit(1);
    }
    writeFileSync(HTML, next);
    console.log(`Actualités: rendered ${items.length} item(s) into landing/index.html.`);
  } else {
    console.log('Actualités: index.html already up to date.');
  }

  if (!check) updateSitemap(data.updated);
}

main();
