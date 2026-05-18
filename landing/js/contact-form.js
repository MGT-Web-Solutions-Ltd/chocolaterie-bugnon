(function () {
  const form = document.querySelector(".sur-mesure__form");
  if (!form) return;

  if (location.protocol === "file:") {
    console.error(
      "CHOCO_BUGNON: le formulaire ne fonctionne pas si la page est ouverte en fichier local. Utilisez le site en ligne.",
    );
    return;
  }

  const config = window.CHOCO_BUGNON;
  const publishableKey =
    config?.supabasePublishableKey || config?.supabaseAnonKey;

  let statusEl = form.querySelector(".form-status");
  if (!statusEl) {
    statusEl = document.createElement("p");
    statusEl.className = "form-status";
    statusEl.setAttribute("role", "status");
    statusEl.setAttribute("aria-live", "polite");
    form.appendChild(statusEl);
  }

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status form-status--" + type;
  }

  if (!config?.supabaseUrl || !publishableKey) {
    setStatus(
      "Configuration manquante (chocobugnon-config.js). Contactez l'administrateur du site ou appelez le +41 21 558 38 07.",
      "error",
    );
    console.warn(
      "CHOCO_BUGNON: missing chocobugnon-config.js (copy from chocobugnon-config.example.js)",
    );
    return;
  }

  const configIncomplete =
    config.supabaseUrl.includes("YOUR_PROJECT_REF") ||
    publishableKey.includes("YOUR_SUPABASE") ||
    publishableKey === "YOUR_SUPABASE_ANON_KEY";

  const endpoint =
    config.supabaseUrl.replace(/\/$/, "") +
    "/functions/v1/chocobugnon-contact";

  const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    setStatus("", "");

    if (configIncomplete) {
      setStatus(
        "Le formulaire n'est pas encore configuré (Supabase). Contactez l'administrateur du site.",
        "error",
      );
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours…";

    const fd = new FormData(form);
    const data = {
      nom: (fd.get("nom") ?? "").toString().trim(),
      contact: (fd.get("contact") ?? "").toString().trim(),
      type: (fd.get("type") ?? "").toString().trim(),
      message: (fd.get("message") ?? "").toString().trim(),
    };

    if (!EMAIL_RE.test(data.contact)) {
      setStatus(
        "Veuillez indiquer une adresse e-mail valide pour recevoir la confirmation (ex. marie@exemple.ch).",
        "error",
      );
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          apikey: publishableKey,
        },
        body: JSON.stringify(data),
      });

      let body = {};
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        body = await res.json().catch(function () {
          return {};
        });
      }

      if (!res.ok) {
        if (res.status === 401) {
          setStatus(
            "Clé Supabase invalide. Vérifiez js/chocobugnon-config.js sur le serveur.",
            "error",
          );
          return;
        }
        if (res.status >= 500) {
          setStatus(
            body.error ||
              "Le serveur d'envoi est temporairement indisponible. Réessayez dans quelques minutes ou appelez le +41 21 558 38 07.",
            "error",
          );
          return;
        }
        setStatus(
          body.error ||
            body.message ||
            "Une erreur est survenue. Veuillez réessayer ou nous appeler au +41 21 558 38 07.",
          "error",
        );
        return;
      }

      setStatus(
        "Merci ! Votre demande a été envoyée. Vous recevrez un e-mail de confirmation sous peu.",
        "success",
      );
      form.reset();
    } catch (err) {
      console.error("Contact form request failed:", endpoint, err);
      setStatus(
        "Connexion au serveur impossible (réseau, pare-feu ou bloqueur de publicité). Désactivez le bloqueur pour ce site, actualisez la page (Ctrl+F5), ou appelez le +41 21 558 38 07.",
        "error",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
})();
