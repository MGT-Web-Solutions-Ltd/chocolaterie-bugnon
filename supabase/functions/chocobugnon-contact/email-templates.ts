const FROM_NAME = "Chocolaterie du Bugnon";
const DEFAULT_SITE_URL = "https://purple-jellyfish-746953.hostingersite.com";

const C = {
  bg: "#faf6f0",
  bg2: "#f3ece2",
  bgDark: "#3d1f0c",
  bgFooter: "#2a1508",
  text: "#2a1508",
  text2: "#5a3d25",
  text3: "#7a5c3c",
  accent: "#9c6e3c",
  gold: "#e8c98a",
  cream: "#faf6f0",
  white: "#ffffff",
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function siteBaseUrl(): string {
  const raw = Deno.env.get("chocobugnon-site-url")?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

function logoUrl(): string {
  return `${siteBaseUrl()}/assets/bugnon-logo-user.png`;
}

function siteLink(path = ""): string {
  return `${siteBaseUrl()}${path}`;
}

function wrapEmail(options: {
  preheader: string;
  eyebrow: string;
  headline: string;
  bodyHtml: string;
  footerNote?: string;
}): string {
  const preheader = escapeHtml(options.preheader);
  const logo = escapeHtml(logoUrl());
  const home = escapeHtml(siteLink("/"));
  const surMesure = escapeHtml(siteLink("/#sur-mesure"));
  const contact = escapeHtml(siteLink("/#contact"));

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(options.headline)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width: 620px) {
      .email-shell { width: 100% !important; }
      .email-pad { padding-left: 20px !important; padding-right: 20px !important; }
      .stack { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${C.bg2};font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bg2};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" class="email-shell" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-collapse:separate;">
          <!-- Header -->
          <tr>
            <td style="background-color:${C.bgDark};border-radius:12px 12px 0 0;padding:0;overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="email-pad" style="padding:28px 40px 24px;text-align:center;">
                    <a href="${home}" style="text-decoration:none;">
                      <img src="${logo}" width="72" height="72" alt="${escapeHtml(FROM_NAME)}" style="display:block;margin:0 auto 16px;border:0;border-radius:50%;background-color:${C.cream};padding:4px;">
                    </a>
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${C.gold};font-family:Inter,Segoe UI,sans-serif;">${escapeHtml(options.eyebrow)}</p>
                    <h1 style="margin:0;font-size:26px;line-height:1.25;font-weight:400;font-style:italic;color:${C.cream};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(options.headline)}</h1>
                    <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:18px auto 0;">
                      <tr><td style="width:32px;height:2px;background-color:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:${C.bg};padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="email-pad" style="padding:36px 40px 32px;color:${C.text};font-size:16px;line-height:1.65;">
                    ${options.bodyHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:${C.bgFooter};border-radius:0 0 12px 12px;padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="email-pad" style="padding:28px 40px;text-align:center;">
                    <p style="margin:0 0 6px;font-size:15px;font-style:italic;color:${C.cream};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(FROM_NAME)}</p>
                    <p style="margin:0 0 14px;font-size:13px;color:rgba(250,246,240,0.75);line-height:1.5;">
                      Rue du Bugnon 10 · 1005 Lausanne<br>
                      <a href="tel:+41215583807" style="color:${C.gold};text-decoration:none;">+41 21 558 38 07</a>
                    </p>
                    <p style="margin:0 0 16px;font-size:12px;color:rgba(250,246,240,0.55);">
                      Artisan chocolatier · Lausanne · Depuis 2014
                    </p>
                    <p style="margin:0;font-size:12px;">
                      <a href="${home}" style="color:${C.gold};text-decoration:none;margin:0 8px;">Site web</a>
                      <span style="color:rgba(250,246,240,0.35);">·</span>
                      <a href="${surMesure}" style="color:${C.gold};text-decoration:none;margin:0 8px;">Sur mesure</a>
                      <span style="color:rgba(250,246,240,0.35);">·</span>
                      <a href="${contact}" style="color:${C.gold};text-decoration:none;margin:0 8px;">Contact</a>
                    </p>
                    ${options.footerNote ? `<p style="margin:16px 0 0;font-size:11px;color:rgba(250,246,240,0.45);line-height:1.5;">${options.footerNote}</p>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function recapCard(
  rows: { label: string; value: string; isMessage?: boolean; richValue?: string }[],
): string {
  const rowsHtml = rows.map((row) => {
    if (row.isMessage) {
      return `
        <tr>
          <td colspan="2" style="padding:16px 0 0;border-top:1px solid ${C.bg2};">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.accent};font-weight:600;">${escapeHtml(row.label)}</p>
            <p style="margin:0;font-size:15px;line-height:1.6;color:${C.text};white-space:pre-wrap;">${escapeHtml(row.value)}</p>
          </td>
        </tr>`;
    }
    const cell = row.richValue ?? escapeHtml(row.value);
    return `
        <tr>
          <td style="padding:10px 0;width:38%;vertical-align:top;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${C.text3};font-weight:600;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 0;vertical-align:top;font-size:15px;color:${C.text};">${cell}</td>
        </tr>`;
  }).join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0;background-color:${C.bg2};border-radius:8px;border:1px solid #e8dfd0;">
      <tr>
        <td style="padding:20px 22px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${rowsHtml}
          </table>
        </td>
      </tr>
    </table>`;
}

function ctaButton(href: string, label: string, variant: "dark" | "gold" = "dark"): string {
  const bg = variant === "gold" ? C.gold : C.bgDark;
  const color = variant === "gold" ? C.text : C.cream;
  const border = variant === "gold" ? C.gold : C.bgDark;
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px auto 0;">
      <tr>
        <td align="center" style="border-radius:6px;background-color:${bg};">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 28px;font-size:13px;letter-spacing:0.06em;text-decoration:none;color:${color};font-weight:600;border:2px solid ${border};border-radius:6px;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`;
}

export function buildClientEmailHtml(data: {
  nom: string;
  typeLabel: string;
  message: string;
  contact: string;
}): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:17px;color:${C.text};">
      Bonjour <strong style="color:${C.bgDark};">${escapeHtml(data.nom)}</strong>,
    </p>
    <p style="margin:0 0 8px;color:${C.text2};">
      Merci pour votre confiance. Nous avons bien reçu votre demande de création sur mesure et notre équipe la traite avec la plus grande attention.
    </p>
    <p style="margin:0;color:${C.text2};">
      Nous vous répondrons personnellement dans les meilleurs délais — généralement sous <strong>48&nbsp;heures ouvrables</strong>.
    </p>
    ${recapCard([
    { label: "Type de demande", value: data.typeLabel },
    { label: "Vos coordonnées", value: data.contact },
    { label: "Votre message", value: data.message, isMessage: true },
  ])}
    <p style="margin:24px 0 0;font-size:14px;color:${C.text3};line-height:1.55;">
      En répondant à cet e-mail, vous contacterez directement notre boutique à Lausanne.
    </p>
    ${ctaButton(siteLink("/#contact"), "Nous rendre visite", "dark")}
    <p style="margin:28px 0 0;font-size:15px;color:${C.text2};">
      À très bientôt,<br>
      <span style="font-style:italic;font-family:Georgia,'Times New Roman',serif;color:${C.bgDark};">L'équipe ${escapeHtml(FROM_NAME)}</span>
    </p>`;

  return wrapEmail({
    preheader: "Votre demande sur mesure a bien été reçue — nous revenons vers vous très vite.",
    eyebrow: "Confirmation",
    headline: "Votre demande est entre de bonnes mains",
    bodyHtml,
    footerNote: "Vous recevez cet e-mail suite à votre demande sur le formulaire «&nbsp;Sur mesure&nbsp;».",
  });
}

export function buildCompanyEmailHtml(data: {
  nom: string;
  typeLabel: string;
  message: string;
  contact: string;
  clientEmail: string;
}): string {
  const mailto = `mailto:${encodeURIComponent(data.clientEmail)}`;

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;">
      <tr>
        <td style="background-color:${C.gold};border-radius:8px;padding:12px 18px;text-align:center;">
          <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.04em;color:${C.text};">
            ✦ Nouvelle demande · Formulaire sur mesure
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 8px;font-size:16px;color:${C.text2};">
      Une nouvelle demande vient d'être envoyée depuis le site. Répondez à cet e-mail pour joindre directement le client.
    </p>
    ${recapCard([
    { label: "Nom", value: data.nom },
    {
      label: "E-mail client",
      value: data.clientEmail,
      richValue:
        `<a href="mailto:${escapeHtml(data.clientEmail)}" style="color:${C.accent};text-decoration:none;font-weight:600;">${escapeHtml(data.clientEmail)}</a>`,
    },
    { label: "Coordonnées", value: data.contact },
    { label: "Type", value: data.typeLabel },
    { label: "Message", value: data.message, isMessage: true },
  ])}
    ${ctaButton(mailto, "Répondre au client", "gold")}
    <p style="margin:20px 0 0;padding:14px 16px;background-color:${C.bg2};border-left:3px solid ${C.accent};border-radius:0 6px 6px 0;font-size:13px;color:${C.text3};line-height:1.5;">
      <strong style="color:${C.text};">Astuce&nbsp;:</strong> le champ «&nbsp;Répondre&nbsp;» est prérempli avec l'adresse du client (<a href="${escapeHtml(mailto)}" style="color:${C.accent};text-decoration:none;">${escapeHtml(data.clientEmail)}</a>).
    </p>`;

  return wrapEmail({
    preheader: `Nouvelle demande sur mesure de ${data.nom} — ${data.typeLabel}`,
    eyebrow: "Notification interne",
    headline: "Nouvelle demande sur mesure",
    bodyHtml,
    footerNote: "Notification automatique · Chocolaterie du Bugnon",
  });
}
