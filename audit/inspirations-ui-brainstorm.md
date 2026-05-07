# Brainstorm inspirations UI — refonte “Chocolaterie du Bugnon”

**Source**: images dans `websiteImageInspiration/` (captures de sites chocolat + maquettes “Chocolaterie du Bugnon”)  
**Objectif**: transformer l’inspiration visuelle en **décisions de design concrètes** (DA, composants, patterns, contenus) pour une refonte vitrine premium orientée visites en boutique + demandes sur-mesure.

## 1) Ce que les inspirations ont en commun (patterns gagnants)

### 1.1 Hero “premium” très lisible
- **Grand titre éditorial** (serif) + **sous-texte court** (sans-serif) → hiérarchie claire.
- **Image produit immersive** (chocolat / fontaine / œuf de Pâques) avec **fond sombre** + éclairage “studio”.
- **CTA primaire** contrasté et unique (ex. bouton plein) + **CTA secondaire** (outline) lorsque nécessaire.

**Pourquoi ça marche**: en mobile, on comprend en 2 secondes “où je suis” + “quoi faire ensuite”.

### 1.2 Palette sombre “chocolat” + accent chaud
- Dominante: **bruns très foncés / noir cacao** (premium, intimiste).
- Typo et textes: **crème / ivoire** pour contraste.
- Accent CTA: **or/miel** ou **rouge profond** selon saison (Noël, St-Valentin, Pâques).

**Règle**: 1 accent principal à la fois (éviter 3 couleurs CTA différentes).

### 1.3 Sections “valeurs” en 3 piliers
Les maquettes Bugnon montrent un bloc très clair:
- **Artisanat**
- **Qualité**
- **Émotion**

**Pattern**: 3 cartes/tiles avec pictos + phrase courte → renforce la marque sans surcharger.

### 1.4 “Découvrir nos produits” en tuiles
Les tuiles (Chocolats / Confiseries / Glaces / Sorbets) fonctionnent très bien:
- photo “close-up” + label court
- grille 2x2 sur mobile, 4 colonnes sur desktop

**À ajouter**: un 5e item “Saisonnier” (Pâques / Noël / créations éphémères) pour le marketing.

### 1.5 Storytelling + preuves
Les sites plus “award winning” (ex. capture sombre “Handcrafted…”) suivent souvent:
1. promesse
2. “made with love / crafted”
3. preuves (statistiques, avis, presse, origines)
4. contact / formulaire

**À reprendre**: une section “preuves” (avis, origines cacao, presse/partenaires, photos atelier).

## 2) Lecture image par image (ce qu’on garde / ce qu’on évite)

### 2.1 `ElegantChocolateWebsite.jpg` (style clair + bande d’USP)
**À garder**
- Bandeau d’USP (icônes + micro bénéfices) sous le hero.
- Cartes produits simples, scannables.

**À éviter / adapter**
- Le style “template” très générique.
- L’abondance de sections longues sans rythme photo.

**Traduction Bugnon**
- Garder le bandeau USP, mais avec une DA premium (fond sombre, pictos cohérents).

### 2.2 `LuxuryChocolateShop.jpg` (landing premium sombre, très “brand”)
**À garder**
- Alternance sections image/texte (rythme) + gros titres.
- Preuves sociales (“What our customers say”) + stats (à condition d’être vraies).
- Formulaire contact en bas (conversion).

**À éviter / adapter**
- Trop de “fluff” marketing en anglais → chez Bugnon: contenu plus authentique, ancré Lausanne.
- Les stats inventées (on doit pouvoir les justifier).

**Traduction Bugnon**
- Remplacer “stats” par preuves réelles: “Depuis 2014”, “Origines cacao”, “100% beurre de cacao”.

### 2.3 `Image.jpeg` (maquette Bugnon — base direction artistique)
**À garder**
- Titre éditorial: “Chaque chocolat raconte une histoire” (fort, premium).
- Navigation simple: Accueil / Produits / À propos / Contact.
- Valeurs + tuiles produits (excellent pour vitrine).

**À améliorer**
- CTA: “Venez goûter…” est bien, mais prévoir aussi **Itinéraire** / **Appeler** (actions locales).
- Ajouter un bloc “Horaires + Adresse + Google Maps” plus visible.

### 2.4 `Image (1).jpeg` (variante saison Noël)
**À garder**
- Décor saisonnier discret (branches, boules) → bonne idée pour “Saisonnier”.

**Risque**
- Trop décoratif si utilisé hors-saison.

**Traduction Bugnon**
- Avoir un système de “thèmes saisonniers” légers (1–2 éléments) qui ne cassent pas la lisibilité.

### 2.5 `Image (2).jpeg` (écran campagne Pâques)
**À garder**
- Format “campagne” très clair: titre + bénéfice + 2 CTA.
- CTA secondaire “Personnaliser” (sur-mesure) est très pertinent.

**Traduction Bugnon**
- Créer un pattern réutilisable “Campagne saisonnière” (Pâques/Noël/St-Valentin):
  - CTA 1: Découvrir la collection
  - CTA 2: Commander sur mesure (48h)

### 2.6 `Image (3).jpeg` (variante St-Valentin)
**À garder**
- Code couleur émotionnel cohérent (rouge profond) + mêmes sections.

**À surveiller**
- Contraste texte sur fond rouge (accessibilité).

## 3) Direction artistique recommandée (Bugnon)

### 3.1 Mood
**Premium artisanal, chaleureux, “atelier + gourmandise”**.  
Moins “e-commerce template”, plus “maison d’artisan à Lausanne”.

### 3.2 Couleurs (proposition)
- Fond: cacao très sombre
- Texte: ivoire
- Accent CTA: or/miel (par défaut)  
- Accent saisonnier (optionnel): rouge profond (Noël/St-Valentin), vert sapin (Noël), tons pastel (Pâques) — **jamais en même temps**

### 3.3 Typographie (principe)
- Titres: serif élégante, grandes tailles, interlignage généreux
- Corps: sans-serif lisible, contrastes clairs

## 4) Composants à définir (design system “léger”)

### 4.1 Header / Navigation
- Logo à gauche, liens simples à droite
- CTA header (option): **Itinéraire** ou **Sur mesure (48h)**
- Mobile: menu burger + accès direct “Appeler”

### 4.2 Hero (template)
Contenu:
- H1 éditorial
- 1 phrase preuve (Lausanne, artisanat, grands crus)
- CTA primaire + secondaire
- Image “signature” (fontaine ou macro chocolat)

### 4.3 Bandeau “preuves”
3–4 items max:
- “Depuis 2014”
- “Origines cacao (10+ pays)”
- “Sans arômes ni colorants (glaces/sorbets)”
- “Sur mesure (délai 48h)”

### 4.4 Section “Valeurs” (3 cartes)
Icône + titre + 1 phrase.

### 4.5 Grille catégories
Tuiles photo: Chocolats / Confiseries / Glaces / Sorbets / Saisonnier.

### 4.6 Module “Saisonnier / Campagne”
Réutilisable (Pâques/Noël/St-Valentin):
- titre
- 2 CTAs (collection + personnalisation)
- visuel dédié

### 4.7 Avis / preuves sociales
Soit:
- 2–3 avis courts (Google) + lien “Voir tous les avis”
ou
- “Ils parlent de nous” (Lausanne Tourisme / partenaires)

### 4.8 Accès & Contact (conversion locale)
Bloc très “actionnable”:
- Adresse + horaires
- Boutons: Itinéraire / Appeler
- Formulaire “sur-mesure” (si on veut capter des demandes)

## 5) Architecture de contenu (proposition)

### Pages
- Accueil
- Produits (catégories + contenu éditorial + saisonnier)
- Sur mesure (48h) / Entreprises & événements
- À propos
- Contact / Accès

### Micro-copy (ton)
Court, sensoriel, authentique:
- “Fait à Lausanne”
- “Grands crus”
- “Créations de saison”
- “Conseils & dégustations en boutique”

## 6) Check-list “à valider” avant d’implémenter une refonte
- Photos: disposer de 15–25 photos premium (macro produits + boutique + atelier).
- Saisonnier: choisir 3 campagnes annuelles (Pâques, Noël, St-Valentin) + dates.
- Conversions locales: décider CTA primaire (Itinéraire vs Sur-mesure) selon priorité.
- Newsletter: définir 1 lead magnet simple (ex. “nouveautés saisonnières”).

