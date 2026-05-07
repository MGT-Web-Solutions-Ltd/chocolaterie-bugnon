# Spécification de refonte — Chocolaterie du Bugnon (vitrine premium)

**But**: décrire précisément à quoi ressemblera le **nouveau site** (structure, contenus, composants, style) en s’appuyant sur `audit/inspirations-ui-brainstorm.md`.  
**Cible**: site vitrine (sans e-commerce) orienté **visites en boutique**, **demandes sur-mesure (48h)**, **événements**, **newsletter**.

## 1) Direction générale (look & feel)

### 1.1 Ton de marque
**Premium artisanal, chaleureux, authentique**.  
Le site doit donner l’impression d’un atelier-boutique à Lausanne: savoir-faire + gourmandise + confiance.

### 1.2 Palette & contraste (principe)
- **Fond**: cacao très sombre (noir/brun profond)
- **Texte**: ivoire/crème
- **Accent CTA**: or/miel (par défaut)
- **Accents saisonniers** (optionnels, un seul à la fois): rouge profond (Noël/St-Valentin), tons plus doux (Pâques)

### 1.3 Typographies (principe)
- **Titres**: serif élégante, grandes tailles, interlignage généreux
- **Texte**: sans-serif lisible, paragraphes courts

## 2) Architecture (IA) — pages proposées

### 2.1 Navigation (header)
- Accueil
- Produits
- Sur mesure (48h)
- Événements
- À propos
- Accès & Contact

**CTA header** (desktop): `Itinéraire` ou `Sur mesure` (selon priorité du moment).  
**Mobile**: burger + bouton “Appeler” accessible en 1 tap.

### 2.2 Pages
- **Accueil** (landing principale)
- **Produits** (catégories + storytelling + saisonnier)
- **Sur mesure (48h)** (formulaire de demande)
- **Événements** (fontaine chocolat + prestations)
- **À propos** (artisan, atelier, sourcing)
- **Accès & Contact** (horaires, maps, téléphone, formulaire simple)

## 3) Page Accueil — wireframe textuel (section par section)

### 3.1 Hero (au-dessus de la ligne de flottaison)
**Objectif**: comprendre en 2 secondes “qui” + “où” + “quoi faire”.

**Layout**
- Gauche: texte
- Droite: visuel signature (fontaine chocolat)

**Contenu**
- H1: **Chaque chocolat raconte une histoire**
- Sous-texte (1–2 lignes): *Confectionnés à la main à Lausanne. Grands crus, créations de saison, conseils & dégustations en boutique.*
- CTA primaire (plein, accent or/miel): **Itinéraire**
- CTA secondaire (outline): **Commander sur mesure (48h)** ou **Découvrir nos produits**

**Micro-éléments**
- “Depuis 2014”
- Adresse courte: “Rue du Bugnon 10, 1005 Lausanne”

### 3.2 Bandeau “preuves” (USP)
**Format**: 3–4 items max, pictos sobres.
- Depuis 2014
- Origines cacao (10+ pays)
- 100% beurre de cacao & vanille
- Sur mesure (délai 48h)

### 3.3 Section “Nos valeurs”
**Format**: 3 cartes.
- Artisanat — *Chaque création façonnée à la main avec soin.*
- Qualité — *Ingrédients sélectionnés, grands crus, arômes francs.*
- Émotion — *Goût, partage, raffinement.*

### 3.4 Section “Découvrir nos produits” (catégories)
**Format**: tuiles photos (grille).
- Chocolats
- Confiseries
- Glaces
- Sorbets
- Saisonnier

**Interaction**
- Chaque tuile mène à une ancre / section sur la page Produits (ou à la page Produits filtrée).

### 3.5 Section “Saison en vedette” (module campagne)
**Objectif**: marketing saisonnier sans boutique en ligne.

**Exemple Pâques**
- Titre: **Offrez une Pâques gourmande**
- Texte: *Nos œufs en chocolat artisanal, le cadeau idéal pour célébrer Pâques.*
- CTA primaire: **Découvrir la collection**
- CTA secondaire: **Personnaliser mon cadeau** (sur-mesure)

**Règle**: ce module change 3–4 fois/an (Pâques, été glaces, Noël, St-Valentin).

### 3.6 Section “Sur mesure (48h)” (conversion)
**Objectif**: transformer l’intention en demande structurée.

**Contenu**
- Titre: **Une création à votre image (délai 48h)**
- 3 cas d’usage: entreprise, anniversaire/mariage, cadeau personnalisé
- CTA: **Faire une demande**

### 3.7 Section “Ils en parlent / Avis”
**Format**: 2–3 avis courts + lien “Voir sur Google”.
**But**: confiance rapide + preuve sociale locale.

### 3.8 Section “Accès rapide”
**Objectif**: 1 tap = itinéraire / appel (surtout mobile).

**Blocs**
- Adresse + horaires (clairs, lisibles)
- Boutons: **Itinéraire** / **Appeler**
- Mini-carte (option) + lien “Voir sur Google Maps”

### 3.9 Footer (complet mais simple)
- Adresse + téléphone + email (si souhaité)
- Liens: Produits / Sur-mesure / Événements / À propos / Contact
- Réseaux: Instagram (prioritaire)
- Newsletter (champ email + consentement)

## 4) Page Produits — structure recommandée

### 4.1 Intro éditoriale
Titre: **Nos créations artisanales**  
Texte: 3–4 lignes max (qualité, origines, saison, dégustation).

### 4.2 Sections par catégorie (ancrées)
Chaque section suit le même pattern:
- titre + 2–3 lignes
- galerie photos (6–12 items)
- “Ce qui est disponible varie selon la saison — contactez-nous pour les créations du moment.”
- CTA: **Appeler** / **Itinéraire** / **Demande sur mesure**

Catégories:
- Chocolats (pavés, tablettes, fines feuilles, pralinés/truffes)
- Confiseries (pâtes de fruits, orangettes, gingembre confit, pâtes à tartiner)
- Glaces & sorbets (sans arômes/colorants)
- Saisonnier (Pâques, Noël, créations éphémères)

### 4.3 Bloc “Origines & ingrédients”
Courte section “preuve”:
- Origines cacao (liste courte)
- 100% beurre de cacao, vanille Madagascar

## 5) Page Sur mesure (48h) — conversion

### 5.1 Hero
Titre: **Commandes sur mesure (48h minimum)**  
Sous-texte: *Expliquez votre besoin, nous vous répondons rapidement.*

### 5.2 Formulaire (champs conseillés)
- Type de demande: Particulier / Entreprise / Événement
- Date souhaitée
- Quantité approximative / budget (optionnel)
- Allergènes / préférences
- Message libre
- Contact: nom + email + téléphone

### 5.3 Contenu rassurant
- Délai, modalités, retrait en boutique
- Exemples (photos)

## 6) Page Événements — “Fontaine chocolat”

### 6.1 Hero + promesse
Titre: **La fontaine chocolat pour vos événements**

### 6.2 Détails (clairs)
- Hauteur fontaine, chocolat de couverture, conditions (pro / caution / prix)
- CTA: **Demander un devis**

## 7) Page À propos — storytelling
- Artisan, atelier, démarche qualité
- Photos atelier
- Section “Notre expérience, vos envies…”

## 8) Accès & Contact — page utilitaire
**Objectif**: informations pratiques ultra claires.
- Adresse + lien Google Maps
- Horaires
- Téléphone (click-to-call)
- Formulaire simple (question générale)

## 9) Newsletter — placement & promesse

### 9.1 Emplacements
- Footer (toujours)
- Pop-in discret après 20–40s ou au scroll 60% (option)

### 9.2 Proposition de valeur (exemples)
- “Créations de saison (Pâques, Noël)”
- “Nouveautés glaces & sorbets”
- “Idées cadeaux & éditions limitées”

## 10) Règles UX (à respecter)
- Un CTA primaire par écran (surtout sur mobile)
- Sections courtes, beaucoup de respiration, pas de pavés de texte
- Liens d’action locale toujours visibles: Itinéraire / Appeler
- Cohérence des horaires partout (site + annuaires)

