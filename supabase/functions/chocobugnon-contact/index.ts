import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  buildClientEmailHtml,
  buildCompanyEmailHtml,
} from "./email-templates.ts";

/**
 * - FROM (Resend): noreply@mgt-solutions.com
 * - Reply-to on client confirmation: chocobugnon-company-email (business inbox)
 * - Business notification to: chocobugnon-company-email; reply-to: client email
 * - Logo / liens site: chocobugnon-site-url (optionnel)
 */
const RESEND_FROM_ADDRESS = "noreply@mgt-solutions.com";
const FROM_NAME = "Chocolaterie du Bugnon";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type ContactPayload = {
  nom?: string;
  contact?: string;
  type?: string;
  message?: string;
};

const TYPE_LABELS: Record<string, string> = {
  entreprise: "Cadeau d'entreprise",
  anniversaire: "Anniversaire",
  mariage: "Mariage",
  cadeau: "Cadeau personnel",
  autre: "Autre",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function extractEmail(contact: string): string | null {
  const match = contact.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  );
  return match ? match[0].toLowerCase() : null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendResendEmail(
  apiKey: string,
  options: {
    to: string[];
    replyTo: string;
    subject: string;
    html: string;
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${RESEND_FROM_ADDRESS}>`,
      to: options.to,
      reply_to: options.replyTo,
      subject: options.subject,
      html: options.html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Resend error:", res.status, text);
    return { ok: false, error: "Échec de l'envoi de l'e-mail." };
  }

  return { ok: true };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Méthode non autorisée." }, 405);
  }

  const resendKey = Deno.env.get("chocobugnon-resend-api-key");
  const companyEmail = Deno.env.get("chocobugnon-company-email")?.trim();

  if (!resendKey || !companyEmail) {
    console.error(
      "Missing chocobugnon secrets (chocobugnon-resend-api-key, chocobugnon-company-email)",
    );
    return jsonResponse({ error: "Configuration du serveur incomplète." }, 500);
  }

  if (companyEmail.toLowerCase() === RESEND_FROM_ADDRESS.toLowerCase()) {
    console.error(
      "chocobugnon-company-email must differ from the Resend FROM address",
    );
    return jsonResponse({ error: "Configuration du serveur invalide." }, 500);
  }

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Corps de requête invalide." }, 400);
  }

  const nom = (payload.nom ?? "").trim();
  const contact = (payload.contact ?? "").trim();
  const type = (payload.type ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!nom || nom.length > 200) {
    return jsonResponse({ error: "Veuillez indiquer votre nom." }, 400);
  }
  if (!contact || contact.length > 320) {
    return jsonResponse(
      { error: "Veuillez indiquer votre email ou téléphone." },
      400,
    );
  }
  if (!message || message.length > 5000) {
    return jsonResponse({ error: "Veuillez décrire votre demande." }, 400);
  }

  const clientEmail = extractEmail(contact);
  if (!clientEmail || !isValidEmail(clientEmail)) {
    return jsonResponse(
      {
        error:
          "Veuillez indiquer une adresse e-mail valide pour recevoir la confirmation et nous permettre de vous répondre.",
      },
      400,
    );
  }

  const typeLabel = TYPE_LABELS[type] ?? (type || "Non précisé");

  const clientHtml = buildClientEmailHtml({
    nom,
    typeLabel,
    message,
    contact,
  });

  const companyHtml = buildCompanyEmailHtml({
    nom,
    typeLabel,
    message,
    contact,
    clientEmail,
  });

  const clientResult = await sendResendEmail(resendKey, {
    to: [clientEmail],
    replyTo: companyEmail,
    subject: "Nous avons bien reçu votre demande — Chocolaterie du Bugnon",
    html: clientHtml,
  });

  if (!clientResult.ok) {
    return jsonResponse({ error: clientResult.error }, 502);
  }

  const companyResult = await sendResendEmail(resendKey, {
    to: [companyEmail],
    replyTo: clientEmail,
    subject: `Nouvelle demande sur mesure — ${nom}`,
    html: companyHtml,
  });

  if (!companyResult.ok) {
    return jsonResponse({ error: companyResult.error }, 502);
  }

  return jsonResponse({ success: true });
});
