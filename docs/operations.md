# Operations — déploiement, actualités, SEO

Trois automatisations tournent sur ce dépôt :

| Quoi | Quand | Résultat |
|---|---|---|
| Déploiement Hostinger | à chaque push sur `main` | le site en ligne est mis à jour |
| Synchro Actualités | lundi 06:17 UTC | une PR avec les derniers posts Instagram / Facebook |
| Revue SEO & GEO | mardi 08:49 (heure suisse) | une PR d'améliorations SEO |

Rien ne part en ligne sans qu'une PR soit fusionnée.

---

## 1. Déploiement automatique sur Hostinger

`.github/workflows/deploy-hostinger.yml` envoie `hostinger-site/` dans `public_html/`
par FTPS à chaque push sur `main`. Seuls les fichiers modifiés sont transférés.

### Mise en place (une seule fois)

**a. Récupérer les identifiants FTP**

hPanel Hostinger → **Fichiers** → **Comptes FTP**. Notez :

- Hôte FTP (ex. `ftp.chocolateriedubugnon.ch` ou une IP)
- Nom d'utilisateur FTP
- Mot de passe (créez-en un nouveau si besoin)

**b. Les enregistrer comme secrets GitHub**

> ⚠️ Ajouter un secret exige le rôle **admin** sur le dépôt. Un rôle *write* ne
> suffit pas : l'onglet *Secrets* n'apparaît même pas. Si vous n'êtes pas admin,
> demandez à un propriétaire de l'organisation de créer ces trois secrets (ou de
> vous passer admin). Tant qu'ils manquent, le workflow vérifie quand même le build
> puis **saute l'envoi** avec un avertissement — rien ne casse, le site se met à
> jour par téléversement manuel comme avant.

GitHub → le dépôt → **Settings** → **Secrets and variables** → **Actions** →
**New repository secret**. Créez :

| Secret | Valeur |
|---|---|
| `HOSTINGER_FTP_HOST` | l'hôte FTP, **sans** `ftp://` |
| `HOSTINGER_FTP_USER` | le nom d'utilisateur FTP |
| `HOSTINGER_FTP_PASSWORD` | le mot de passe FTP |

> Ne collez jamais ces identifiants dans une conversation, une issue ou une PR.
> Les secrets GitHub sont chiffrés et masqués dans les logs.

**c. Vérifier le dossier cible**

Par défaut le workflow écrit dans `/public_html/`. Si votre domaine pointe ailleurs
(sous-domaine, `domains/…/public_html`), créez une **variable** (onglet *Variables*,
pas *Secrets*) nommée `HOSTINGER_REMOTE_DIR` avec le bon chemin, barre oblique finale
comprise.

**d. Premier essai**

Onglet **Actions** → *Deploy to Hostinger* → **Run workflow**. Le premier envoi
transfère tout le site ; les suivants seront rapides.

### Garde-fous

Avant d'envoyer quoi que ce soit, le workflow vérifie que `hostinger-site/` est bien
à jour par rapport à `landing/`. S'il ne l'est pas, le déploiement échoue avec un
message indiquant la commande à lancer. Il ne supprime jamais de fichiers distants
automatiquement.

---

## 2. Section Actualités

### Modifier les actualités à la main

Tout se pilote depuis **`landing/data/news.json`** :

```json
{
  "id": "collection-noel-2026",
  "featured": true,
  "badge": "Nouveauté",
  "eyebrow": "Décembre 2026",
  "title": "La collection de Noël est arrivée",
  "text": "Deux phrases maximum, c'est ce qui s'affiche sous le titre.",
  "image": "images/new_images/season/s5.jpg",
  "imageAlt": "Description de la photo pour l'accessibilité et le SEO",
  "cta": { "label": "Je me rends au magasin", "href": "#contact" },
  "date": "2026-12-01",
  "source": "manual",
  "pinned": true
}
```

| Champ | Rôle |
|---|---|
| `featured` | le grand bloc en haut (un seul) ; les autres deviennent des cartes |
| `pinned` | protège l'élément : la synchro automatique ne le rétrogradera pas |
| `source` | `manual` = écrit à la main, jamais supprimé par la synchro |
| `date` | format `AAAA-MM-JJ`, sert au tri |

Quatre éléments maximum s'affichent : 1 en vedette + 3 cartes.

Après modification :

```bash
node scripts/render-news.mjs      # écrit le HTML dans landing/index.html
./landing/build-for-hostinger.sh  # régénère hostinger-site/
```

Puis commit + push sur `main` → le site se met à jour tout seul.

> `landing/index.html` entre les balises `ACTUALITES:START` / `ACTUALITES:END` est
> **généré**. Toute modification manuelle y sera écrasée.

### Synchro automatique Instagram / Facebook

`scripts/sync-social.mjs` récupère les derniers posts, nettoie les légendes
(hashtags et mentions retirés), **télécharge les images dans le dépôt** — les URL du
CDN Instagram expirent en quelques jours — et réécrit `news.json`.

Les éléments repris portent `"review": true` : les légendes sont tronquées
automatiquement, donc **relisez-les dans la PR** avant de fusionner.

Sans token configuré, le script ne fait rien et la section garde son contenu actuel.

#### Obtenir un token Meta

Il faut un compte Instagram **Professionnel** (Business ou Créateur) relié à la Page
Facebook de la chocolaterie.

1. [developers.facebook.com](https://developers.facebook.com/) → **Mes apps** →
   **Créer une app** → type **Entreprise**.
2. Ajoutez le produit **Instagram Graph API** (et **Facebook Login for Business**).
3. Dans l'**Explorateur d'API Graph**, sélectionnez l'app et demandez les
   autorisations `instagram_basic`, `pages_show_list`, `pages_read_engagement`.
4. Générez un token, puis échangez-le contre un **token longue durée** (60 jours) —
   l'outil *Access Token Debugger* indique la date d'expiration.
5. Récupérez l'ID du compte Instagram professionnel :
   `GET /me/accounts?fields=instagram_business_account`.

Puis créez les secrets GitHub :

| Secret | Valeur |
|---|---|
| `IG_USER_ID` | l'ID du compte Instagram professionnel |
| `IG_ACCESS_TOKEN` | le token longue durée |
| `FB_PAGE_ID` | *(optionnel)* l'ID de la Page Facebook |
| `FB_ACCESS_TOKEN` | *(optionnel)* le token de la Page |

> **Le token expire au bout de 60 jours.** Quand il expire, la PR hebdomadaire
> échoue avec `Meta API: …` dans les logs : regénérez le token et remplacez le secret.
> Le site, lui, continue d'afficher les dernières actualités synchronisées.

---

## 3. Revue SEO & GEO hebdomadaire

Une session Claude programmée relit le site chaque semaine et ouvre une PR. Son cahier
des charges est dans **`docs/seo-geo-weekly.md`** — modifiez ce fichier pour changer ce
qu'elle regarde ou ce qu'elle s'autorise à toucher.

Elle alterne sur quatre semaines : données structurées / SEO local / contenu /
technique, et a l'interdiction explicite d'inventer un fait sur la chocolaterie.

Pour l'arrêter, la déplacer ou changer son contenu, demandez-le simplement en session.

---

## 4. Dépannage

| Symptôme | Cause probable |
|---|---|
| Le déploiement échoue sur « hostinger-site/ is out of date » | `./landing/build-for-hostinger.sh` n'a pas été relancé après une modif de `landing/` |
| Le déploiement échoue sur « Actualités are rendered » | `node scripts/render-news.mjs` n'a pas été relancé après une modif de `news.json` |
| Erreur FTP 530 | identifiants faux ou expirés → recréez le compte FTP dans hPanel et mettez les secrets à jour |
| `Meta API: Error validating access token` | token expiré (60 jours) → regénérez-le |
| Le site en ligne n'a pas changé | cache navigateur (onglet privé) ou cache Hostinger (hPanel → Performance → vider le cache) |
