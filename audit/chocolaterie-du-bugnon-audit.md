# Audit digital — Chocolaterie du Bugnon (Lausanne)

**Client**: Chocolaterie du Bugnon — Machard Benoît, artisan chocolatier  
**Périmètre**: présence digitale publique (site web + SEO + GEO/Local + canaux)  
**Données disponibles**: **public uniquement** (pas de GA4 / Search Console / stats newsletter)  
**Date**: 2026-05-06  

## 1) Résumé exécutif

Le site `https://chocolateriedubugnon.ch/` sert principalement de **vitrine** (pas de boutique en ligne). Le potentiel d’amélioration le plus rentable concerne donc la **conversion “locale”**: rendre la découverte de l’offre plus claire, faciliter l’action (itinéraire, appel, contact, commande sur-mesure), renforcer la crédibilité (preuves sociales), et solidifier la base technique SEO (indexation, sitemap, métadonnées).

### Priorités (Top 5)
1. **Réparer le sitemap WordPress** (actuellement en erreur 500) afin d’améliorer l’indexation et le monitoring SEO.
2. **Clarifier les actions clés** (CTA): *Itinéraire*, *Appeler*, *Contacter*, *Commande sur mesure (48h)*, *Événements / Fontaine*.
3. **Revoir la hiérarchi du contenu** de la home (structure, titres, répétitions, “Menu” ambigu) pour une lecture mobile efficace.
4. **Renforcer le GEO/Local**: cohérence NAP, liens vers Google Maps/Google Business Profile, incitation aux avis, consolidation des citations.
5. **Mettre en place une capture email** (newsletter) sur le site (actuellement absente), avec proposition de valeur et conformité.

## 2) Méthodologie & critères d’audit

### UI / UX (mobile-first)
- Architecture de l’information, navigation, lisibilité, hiérarchie visuelle
- Qualité des CTA et des parcours “store visit”
- Cohérence de marque (ton, visuels, crédibilité)
- Frictions (long scroll, répétitions, libellés ambigus)

### SEO (technique + contenu)
- Indexabilité: `robots.txt`, sitemap, erreurs HTTP, cohérence `www` / non-`www`
- On-page: titres, meta description, Hn, maillage, images/alt
- Données structurées (LocalBusiness), Open Graph, canonical

### GEO / Local (SEO local)
- Cohérence NAP (Nom / Adresse / Téléphone) et présence annuaires
- Google Maps et signaux locaux (horaires, avis, photos, catégories)
- Contenu local et pages d’intention (accès, parking, quartier)

### Canaux marketing
- Réseaux sociaux: découvrabilité depuis le site, cohérence, preuves de fraîcheur
- Partenaires/annuaires locaux: qualité des citations et opportunités

### Newsletter (email marketing)
- Existence de capture email sur le site, segmentation simple, fréquence, conformité

## 3) Constat — Site web (UI/UX)

### 3.1 Positionnement & proposition de valeur
**Observation**: La home liste des catégories (chocolat/confiseries/glaces) et un discours qualité (“grands crus”, origines, vanille Madagascar), mais la **proposition de valeur** n’est pas synthétisée en 1–2 phrases + CTA clair en haut de page.  
**Impact**: perte d’attention mobile, difficulté à comprendre “pourquoi venir ici plutôt qu’ailleurs”.  
**Recommandation**: en tête de page, ajouter un bloc court:
- “Chocolaterie artisanale à Lausanne — créations originales & grands crus”
- CTA primaires: **Itinéraire** / **Appeler** / **Commander sur mesure (48h)** (selon priorités)

### 3.2 Hiérarchie du contenu & qualité rédactionnelle
**Preuve**: sur la home, la section “**Glaces et sorbets**” apparaît **deux fois** avec un texte très similaire.  
**Impact**: perception de site “non fini”, perte de confiance.  
**Recommandation**: supprimer la répétition + regrouper en sections stables:
- “Spécialités chocolatées”
- “Confiseries”
- “Glaces & sorbets”
- “Saisonnier / Éphémères”

### 3.3 Parcours d’action (conversion locale)
**Observation**: le site affiche adresse/téléphone/horaires dans la page, mais les CTA “rapides” ne sont pas mis en avant (ex. boutons).  
**Impact**: moins d’appels et d’itinéraires, surtout sur mobile.  
**Recommandation**:
- Boutons persistants ou très visibles: **Itinéraire (Google Maps)**, **Appeler**, **WhatsApp** (si utilisé), **Contacter** (formulaire).
- Clarifier “**Commandes (48h minimum)**” en bloc dédié avec CTA (formulaire + champs).

### 3.4 Navigation & pages attendues
**Observation**: plusieurs URLs “classiques” renvoient 404 (ex. `/contact/`, `/newsletter/`, `/boutique/` testés).  
**Impact**: risques de liens cassés depuis annuaires, mauvaise UX, signaux SEO négatifs.  
**Recommandation**:
- Créer des pages stables et simples: `/contact/`, `/acces/`, `/a-propos/`, `/sur-mesure/`, `/evenements/`
- Ajouter des **redirections 301** depuis anciens/guess URLs si nécessaire.

## 4) Constat — SEO (technique + contenu)

### 4.1 Indexabilité & sitemap
**Preuve**: `robots.txt` référence un sitemap WordPress: `Sitemap: https://chocolateriedubugnon.ch/wp-sitemap.xml`.  
**Problème**: `https://chocolateriedubugnon.ch/wp-sitemap.xml` retourne **HTTP 500** (erreur serveur).  
**Impact**: découverte/actualisation des pages moins fiable, perte de visibilité organique potentielle, difficulté de diagnostic.  
**Recommandation**:
- Corriger l’erreur (plugin SEO, cache, PHP error, configuration WordPress).
- Vérifier ensuite dans Google Search Console (si accessible) + soumettre le sitemap.

### 4.2 Signaux WordPress / API
**Preuve**: l’API WordPress est exposée (`/wp-json/`) et renvoie les métadonnées du site (nom, description, namespaces).  
**Recommandation** (light): s’assurer que l’expo des endpoints n’expose pas d’informations inutiles; sinon laisser (usage standard WP).

### 4.3 Contenu & requêtes locales
**Observation**: le site décrit l’offre, mais manque de pages d’intention “local” (ex. “Chocolatier à Lausanne”, “cadeaux”, “Pâques/Noël”, “entreprises”).  
**Impact**: visibilité limitée sur recherches non-brand.  
**Recommandation**:
- Pages/sections dédiées saisonnières (Pâques, Noël, Saint-Valentin)
- Page “Entreprises / cadeaux” + formulaire de demande
- Optimiser titres H1/H2 et snippets (title/meta description) sur ces pages

## 5) Constat — GEO / présence locale

### 5.1 Citations & cohérence NAP
**Preuves (annuaires / institutionnels)**:
- Lausanne Tourisme mentionne l’adresse **Rue du Bugnon 10, 1005 Lausanne**, les horaires et propose un lien Google Maps. Source: `https://www.lausanne-tourisme.ch/fr/decouvrir/chocolaterie-du-bugnon/`
- local.ch et search.ch affichent l’adresse, le téléphone et des avis (note 5/5, 3 évaluations). Sources:  
  - `http://local.ch/fr/d/lausanne/1005/chocolats-chocolaterie/chocolaterie-du-bugnon-machard-benoit-artisan-chocolatier-7ICmy2St-mFe_sWM4qiuRw`  
  - `https://search.ch/tel/lausanne/rue-du-bugnon-10/chocolaterie-du-bugnon-machard-benoit-artisan-chocolatier.fr.html`

**Point d’attention**: Enjoy Lausanne affiche des horaires **différents** (10h–18h en semaine, 9h–14h samedi). Source: `https://enjoylausanne.ch/commerces/chocolaterie-du-bugnon-1`  
**Impact**: incohérences → perte de confiance + risques de visites manquées.  
**Recommandation**:
- Faire un audit “NAP + Horaires” sur 10–15 citations principales et corriger.
- Ajouter sur le site un lien direct “Voir sur Google Maps” et (idéalement) un lien vers le Google Business Profile.

### 5.2 Avis & preuves sociales
**Observation**: les annuaires montrent des avis positifs mais peu nombreux (ex. 3).  
**Impact**: conversion locale moins forte (preuve sociale limitée).  
**Recommandation**:
- Mettre en place un process simple post-achat: QR code en boutique → page “laisser un avis”.
- Répondre systématiquement aux avis (positifs/négatifs).

## 6) Constat — Canaux marketing (owned/earned)

### 6.1 Réseaux sociaux
**Signal**: présence Instagram probable (mentionnée en résultats de recherche).  
**Risque UX**: le site affiche “Follow Us / Suivez nous” mais sans preuve claire de liens cliquables dans le contenu textuel récupéré.  
**Recommandation**:
- Afficher icônes + liens explicites (Instagram en priorité) dans header/footer.
- Mettre 3–6 contenus récents (embed léger ou galerie) pour preuve de fraîcheur.

### 6.2 Partenariats locaux
**Preuves**: Lausanne Tourisme + Enjoy Lausanne créent des portes d’entrée (touristes/locaux).  
**Recommandation**:
- S’assurer que ces pages pointent vers l’URL canonique du site et que l’URL est stable.
- Ajouter sur le site une section “On parle de nous / Partenaires” (si pertinent) + backlinks.

## 7) Newsletter (email)

### 7.1 État actuel
**Observation**: aucune page/formulaire newsletter dédié n’a été identifié sur le site (URLs typiques renvoient 404).  
**Note**: Enjoy Lausanne propose une newsletter… mais **ce n’est pas la newsletter de la chocolaterie** (plateforme tierce). Source: `https://enjoylausanne.ch/commerces/chocolaterie-du-bugnon-1`

### 7.2 Recommandation “minimum viable newsletter”
- Ajouter une capture email sur le site (footer + pop-in non agressif).
- Proposition de valeur: “sorties saisonnières”, “créations éphémères”, “glaces/sorbets”, “événements”.
- Segmentation simple: **Particuliers** vs **Entreprises/Événements**.
- Conformité: consentement explicite + lien politique de confidentialité + double opt-in (bonne pratique).

## 8) Backlog de recommandations (priorisé)

### Quick wins (1 semaine)
1. **Corriger la duplication “Glaces et sorbets”** + relire toute la home.
2. **Ajouter CTA visibles**: Itinéraire / Appeler / Contacter / Sur-mesure (48h).
3. **Corriger/mettre à jour les horaires** sur citations où il y a divergence (commencer par Enjoy Lausanne).
4. **Réparer `wp-sitemap.xml`** (erreur 500) et vérifier `robots.txt`.
5. **Ajouter liens sociaux clairs** (Instagram) et contact email visible si souhaité.

### Chantiers (2–6 semaines)
6. Créer pages stables: Accès, Sur-mesure, Entreprises/Événements, Saisonnier.
7. Mettre en place **schema.org LocalBusiness** + Open Graph + metas.
8. Mettre en place newsletter (outil + formulaires + conformité).
9. Stratégie avis: QR code + process + réponses.
10. Production de contenu: calendrier saisonnier + “cadeaux” + “entreprises”.

## 9) Direction de refonte (pont vers le futur site)

### Objectif (balanced)
Un site vitrine premium qui augmente:
- **visites en boutique** (itinéraire + confiance + horaires clairs),
- **demandes de commandes sur mesure / événements**,
- **notoriété locale** (SEO local + preuves sociales),
- **base email** (newsletter).

### Cibles prioritaires
- Habitants de Lausanne: cadeaux, saisonnier
- Entreprises: coffrets, commandes en volume, événements
- Touristes: “must-try” local (via Lausanne Tourisme)

### Parcours clés à optimiser
1. Découvrir → comprendre l’offre → **venir en boutique** (itinéraire)
2. Découvrir → confiance (avis/qualité) → **appeler** / **contacter**
3. Besoin spécifique → “sur mesure (48h)” → **demande structurée**
4. Saisonnier → nouveautés → **newsletter**

### Arborescence (IA) proposée (v1)
- Accueil
- Spécialités (Chocolats / Confiseries / Glaces & sorbets)
- Saisonnier (Pâques / Noël / créations éphémères)
- Sur mesure (48h) & Entreprises
- Événements (fontaine / prestations)
- À propos (artisan, sourcing, atelier)
- Accès & Contact

### Inspirations “award winning”
Quand tu me partageras les sites de référence, on traduira leurs patterns en décisions concrètes:
- hero clair + CTA
- pages “collections” (saisonnier)
- photographie + rythme éditorial
- micro-interactions sobres (premium)
- storytelling “craft” + preuves (origines, ingrédients, presse/avis)

## 10) Annexes — Liens consultés (public)
- Site: `https://chocolateriedubugnon.ch/`
- `robots.txt`: `https://chocolateriedubugnon.ch/robots.txt`
- Sitemap (en erreur): `https://chocolateriedubugnon.ch/wp-sitemap.xml`
- Lausanne Tourisme: `https://www.lausanne-tourisme.ch/fr/decouvrir/chocolaterie-du-bugnon/`
- Enjoy Lausanne: `https://enjoylausanne.ch/commerces/chocolaterie-du-bugnon-1`
- local.ch: `http://local.ch/fr/d/lausanne/1005/chocolats-chocolaterie/chocolaterie-du-bugnon-machard-benoit-artisan-chocolatier-7ICmy2St-mFe_sWM4qiuRw`
- search.ch: `https://search.ch/tel/lausanne/rue-du-bugnon-10/chocolaterie-du-bugnon-machard-benoit-artisan-chocolatier.fr.html`

