#!/usr/bin/env node
/**
 * Fills landing/data/news.json from the shop's Instagram and/or Facebook posts.
 *
 * Configure via environment variables (none set => the script is a no-op, so the
 * Actualités section keeps whatever is already in news.json):
 *   IG_USER_ID, IG_ACCESS_TOKEN   Instagram Graph API (Business/Creator account)
 *   FB_PAGE_ID,  FB_ACCESS_TOKEN  Facebook Page posts
 *
 * Images are downloaded into landing/images/news/ because Instagram CDN URLs
 * expire after a few days — hotlinking them would leave broken images on the site.
 *
 * Manual items in news.json are never deleted; only previously synced ones are replaced.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'landing', 'data', 'news.json');
const IMG_DIR = join(ROOT, 'landing', 'images', 'news');
const IMG_REL = 'images/news';

const GRAPH = 'https://graph.facebook.com/v21.0';
const IG_GRAPH = 'https://graph.instagram.com/v21.0';

/** 1 featured + 3 cards is what the section renders. */
const MAX_ITEMS = 4;
const MAX_TITLE = 70;
const MAX_TEXT = 220;

const SOCIAL_SOURCES = new Set(['instagram', 'facebook']);

async function getJson(url) {
  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.error?.message ?? `HTTP ${res.status}`;
    throw new Error(`Meta API: ${msg}`);
  }
  return body;
}

/** Captions are written for Instagram, not for a landing page: drop the noise. */
function cleanCaption(caption) {
  return String(caption ?? '')
    .replace(/#[\p{L}\p{N}_]+/gu, '')
    .replace(/@[\p{L}\p{N}_.]+/gu, '')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
    .trim();
}

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function splitCaption(caption) {
  const clean = cleanCaption(caption);
  if (!clean) return { title: '', text: '' };

  const firstBreak = clean.search(/[\n.!?]/);
  const head = firstBreak === -1 ? clean : clean.slice(0, firstBreak + 1).replace(/[\n]/g, '').trim();
  const tail = firstBreak === -1 ? '' : clean.slice(firstBreak + 1).replace(/\n+/g, ' ').trim();

  // A long first sentence works better as body copy than as a headline.
  if (head.length > MAX_TITLE) {
    return { title: truncate(head, MAX_TITLE), text: truncate(clean.replace(/\n+/g, ' '), MAX_TEXT) };
  }
  return {
    title: head.replace(/[.]$/, ''),
    text: truncate(tail || head, MAX_TEXT),
  };
}

async function downloadImage(url, id) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`image download failed for ${id}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(IMG_DIR, { recursive: true });
  const file = `${id}.jpg`;
  writeFileSync(join(IMG_DIR, file), buf);
  return `${IMG_REL}/${file}`;
}

function monthLabel(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const label = new Intl.DateTimeFormat('fr-CH', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

async function fetchInstagram() {
  const { IG_USER_ID, IG_ACCESS_TOKEN } = process.env;
  if (!IG_USER_ID || !IG_ACCESS_TOKEN) return [];

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const url = `${IG_GRAPH}/${IG_USER_ID}/media?fields=${fields}&limit=12&access_token=${encodeURIComponent(IG_ACCESS_TOKEN)}`;
  const { data = [] } = await getJson(url);

  return data
    .map((post) => ({
      raw: post,
      image: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
    }))
    .filter((p) => p.image)
    .map(({ raw, image }) => ({
      id: `ig-${raw.id}`,
      source: 'instagram',
      date: (raw.timestamp ?? '').slice(0, 10),
      caption: raw.caption,
      imageUrl: image,
      permalink: raw.permalink,
      ctaLabel: 'Voir sur Instagram',
    }));
}

async function fetchFacebook() {
  const { FB_PAGE_ID, FB_ACCESS_TOKEN } = process.env;
  if (!FB_PAGE_ID || !FB_ACCESS_TOKEN) return [];

  const fields = 'id,message,created_time,permalink_url,full_picture';
  const url = `${GRAPH}/${FB_PAGE_ID}/posts?fields=${fields}&limit=12&access_token=${encodeURIComponent(FB_ACCESS_TOKEN)}`;
  const { data = [] } = await getJson(url);

  return data
    .filter((post) => post.full_picture && post.message)
    .map((post) => ({
      id: `fb-${String(post.id).replace(/[^\w-]/g, '-')}`,
      source: 'facebook',
      date: (post.created_time ?? '').slice(0, 10),
      caption: post.message,
      imageUrl: post.full_picture,
      permalink: post.permalink_url,
      ctaLabel: 'Voir sur Facebook',
    }));
}

/** Drop downloaded images no item references any more, so the repo does not grow forever. */
function pruneImages(items) {
  let existing;
  try {
    existing = readdirSync(IMG_DIR);
  } catch {
    return;
  }
  const keep = new Set(items.map((item) => item.image?.split('/').pop()).filter(Boolean));
  for (const file of existing) {
    if (!keep.has(file)) unlinkSync(join(IMG_DIR, file));
  }
}

async function main() {
  const posts = [...(await fetchInstagram()), ...(await fetchFacebook())];

  if (!posts.length) {
    const configured = process.env.IG_ACCESS_TOKEN || process.env.FB_ACCESS_TOKEN;
    console.log(
      configured
        ? 'Social sync: the API returned no usable posts — news.json left unchanged.'
        : 'Social sync: no IG_ACCESS_TOKEN / FB_ACCESS_TOKEN configured — skipping (news.json left unchanged).',
    );
    return;
  }

  const data = JSON.parse(readFileSync(DATA, 'utf8'));
  const manual = (data.items ?? []).filter((item) => !SOCIAL_SOURCES.has(item.source));

  posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const synced = [];
  for (const post of posts.slice(0, MAX_ITEMS)) {
    const { title, text } = splitCaption(post.caption);
    if (!title || !text) continue;
    synced.push({
      id: post.id,
      badge: 'Actualité',
      eyebrow: monthLabel(post.date),
      title,
      text,
      image: await downloadImage(post.imageUrl, post.id),
      imageAlt: `${title} — Chocolaterie du Bugnon`,
      cta: { label: post.ctaLabel, href: post.permalink },
      date: post.date,
      source: post.source,
      // Captions are auto-trimmed: a human should read these before they go live.
      review: true,
    });
  }

  if (!synced.length) {
    console.log('Social sync: no post had a usable caption — news.json left unchanged.');
    return;
  }

  const items = [...manual.filter((i) => i.pinned), ...synced, ...manual.filter((i) => !i.pinned)]
    .slice(0, MAX_ITEMS)
    .map((item, index) => ({ ...item, featured: index === 0 }));

  pruneImages(items);

  data.items = items;
  data.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(DATA, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Social sync: wrote ${items.length} item(s) to news.json (${synced.length} from social).`);
}

main().catch((err) => {
  console.error(`Social sync failed: ${err.message}`);
  process.exit(1);
});
