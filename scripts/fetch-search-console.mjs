#!/usr/bin/env node
/**
 * Pulls Search Console performance data into docs/search-console-latest.md,
 * so the weekly SEO review can work from real search data rather than markup alone.
 *
 * Configure via environment:
 *   GSC_SERVICE_ACCOUNT_JSON  the service account key, as JSON
 *   GSC_SITE_URL              optional; defaults to the sc-domain: property below
 *
 * No npm dependencies: the service-account JWT is signed with node:crypto.
 * Without a key configured the script is a no-op, so the workflow stays green.
 */
import { createSign } from 'node:crypto';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs', 'search-console-latest.md');

// Domain properties are addressed as sc-domain:<host>, not as a URL.
const SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:chocolaterie-du-bugnon.ch';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const API = 'https://www.googleapis.com/webmasters/v3';

const DAYS = 28;
/** Search Console data lags ~2 days; asking for yesterday returns a short window. */
const LAG_DAYS = 3;

function base64url(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );

  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(credentials.private_key, 'base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`token exchange failed: ${body.error_description ?? body.error ?? res.status}`);
  return body.access_token;
}

async function query(token, body) {
  const url = `${API}/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message ?? `HTTP ${res.status}`;
    // The most common misconfiguration, and the least self-evident.
    const hint = res.status === 403
      ? ' — is the service account added under Search Console → Settings → Users and permissions?'
      : '';
    throw new Error(`Search Console API: ${msg}${hint}`);
  }
  return json.rows ?? [];
}

const pct = (n) => `${(n * 100).toFixed(1)} %`;
const pos = (n) => n.toFixed(1);

function table(rows, label) {
  if (!rows.length) return `_Aucune donnée pour cette période._\n`;
  const head = `| ${label} | Clics | Impressions | CTR | Position |\n|---|--:|--:|--:|--:|\n`;
  return head + rows
    .map((r) => `| ${String(r.keys[0]).replace(/\|/g, '\\|')} | ${r.clicks} | ${r.impressions} | ${pct(r.ctr)} | ${pos(r.position)} |`)
    .join('\n') + '\n';
}

async function main() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    console.log('Search Console: no GSC_SERVICE_ACCOUNT_JSON configured — skipping.');
    return;
  }

  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    throw new Error('GSC_SERVICE_ACCOUNT_JSON is not valid JSON — paste the whole key file, braces included.');
  }
  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('GSC_SERVICE_ACCOUNT_JSON is missing client_email or private_key.');
  }

  const token = await getAccessToken(credentials);
  const range = { startDate: isoDaysAgo(DAYS + LAG_DAYS), endDate: isoDaysAgo(LAG_DAYS) };

  const [totals, queries, pages, countries] = await Promise.all([
    query(token, { ...range, dimensions: [] }),
    query(token, { ...range, dimensions: ['query'], rowLimit: 25 }),
    query(token, { ...range, dimensions: ['page'], rowLimit: 10 }),
    query(token, { ...range, dimensions: ['country'], rowLimit: 5 }),
  ]);

  const t = totals[0];
  const summary = t
    ? `- **Clics :** ${t.clicks}\n- **Impressions :** ${t.impressions}\n- **CTR :** ${pct(t.ctr)}\n- **Position moyenne :** ${pos(t.position)}\n`
    : '_Aucune donnée sur la période. C\'est normal pour un site récemment mis en ligne : comptez deux à quatre semaines._\n';

  const doc = `# Search Console — ${SITE_URL}

**Période :** ${range.startDate} → ${range.endDate} (${DAYS} jours)
**Généré le :** ${new Date().toISOString().slice(0, 10)} — fichier **généré**, ne pas éditer à la main.

## Résumé

${summary}
## Requêtes (top 25)

${table(queries, 'Requête')}
## Pages

${table(pages, 'Page')}
## Pays

${table(countries, 'Pays')}
---

_Produit par \`scripts/fetch-search-console.mjs\`. Sert d'entrée à la revue SEO hebdomadaire (\`docs/seo-geo-weekly.md\`)._
`;

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, doc);
  console.log(
    `Search Console: wrote ${OUT} (${queries.length} queries, ${pages.length} pages, ${t ? t.clicks : 0} clicks).`,
  );
}

main().catch((err) => {
  console.error(`Search Console fetch failed: ${err.message}`);
  process.exit(1);
});
