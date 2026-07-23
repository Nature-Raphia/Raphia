# Nature Raphia & Mahalia — Plateforme Web Hybride Vitrine & Panier-Devis

## Vue d'ensemble du projet
- **Nom** : Nature Raphia & Boutique Mahalia
- **Objectif** : Site vitrine premium Single-Page pour l'écosystème artisanal Nature Raphia (atelier) et la Boutique Mahalia (showroom), à Antsirabe, Madagascar. Valorise le savoir-faire artisanal du raphia et propose un parcours d'achat hybride sans paiement immédiat (système "Panier-Devis").
- **Cibles** : B2C (touristique/local) et B2B (concept-stores, grossistes internationaux).
- **Stack** : React 19 + Vite + TypeScript + Tailwind CSS v4, déployé sur Cloudflare Pages.

## ✅ Fonctionnalités actuellement implémentées

1. **Navigation Sticky** — logo, commutateur de langue FR/EN natif (sans rechargement), icône panier avec badge de décompte animé.
2. **Accueil (Hero)** — immersion éditoriale plein écran, slogan bilingue, CTA vers Showroom/Atelier.
3. **L'Atelier (Nature Raphia)** — frise chronologique interactive à 4 étapes (Récolte côtière → Peignage & Tri → Teinture végétale → Crochetage d'art) avec visuels synchronisés.
4. **Le Showroom (Mahalia)** — lookbook produit avec filtres dynamiques (Sacs / Chapeaux / Décoration), boutons "Ajouter à ma sélection", grille Instagram.
5. **Engagements (RSE)** — mise en avant de l'autonomisation des artisanes, matériaux 100% biodégradables, citation authentique.
6. **Localisation & Contact** — coordonnées complètes, carte interactive Leaflet.js centrée sur Antsirabe avec marqueur personnalisé, formulaire professionnel B2B (envoi via WhatsApp).
7. **Système Panier-Devis** — panier latéral (drawer), gestion des quantités, modal de validation collectant Nom / E-mail / Pays / Profil acheteur (Particulier ou Grossiste B2B), récapitulatif envoyé via WhatsApp.
8. **Click-to-WhatsApp** — bouton flottant permanent, préremplit un message d'accueil personnalisé (+261 34 76 401 16).
9. **Multilingue FR/EN** — bascule dynamique sans rechargement, persistance en `localStorage`, détection automatique de la langue du navigateur.
10. **Charte graphique** — Ivoire (#FAF7F2), Vert Olive (#2E4033), Terracotta (#C97A53), Beige Sable (#E6DFD3), typographies Fraunces (serif) + Manrope (sans-serif).
11. **Mobile-First & Performance** — toutes les photographies compressées au format WebP, menu mobile dédié, mise en page responsive.
12. **Footer complet** — coordonnées, horaires, navigation, mentions légales.

## 🔗 Résumé des points d'entrée fonctionnels

Site Single-Page — toutes les sections sont accessibles par ancre depuis la navigation sticky :

| Ancre | Section |
|---|---|
| `#hero` | Accueil |
| `#atelier` | L'Atelier (Nature Raphia) |
| `#showroom` | Le Showroom (Mahalia) — filtres `?` gérés en state React, non en query params |
| `#engagements` | Engagements RSE |
| `#contact` | Localisation & Contact + formulaire B2B |

Aucune API backend n'est nécessaire pour la V1 : le "Panier-Devis" et le formulaire B2B redirigent vers WhatsApp (`https://wa.me/261347640116`) avec un message récapitulatif pré-rempli — conformément à l'arbitrage stratégique du cahier des charges (pas de paiement immédiat, validation humaine).

## 📦 Données & Architecture

- **Modèle de données** : `Product` (id, nom FR/EN, description FR/EN, catégorie, image), `CartItem` (produit + quantité), gérés en mémoire côté client via React Context (`CartContext`, `LangContext`).
- **Stockage** : Aucune base de données requise pour cette V1 — le panier est volatile (session navigateur). La langue choisie est persistée en `localStorage`.
- **Traductions** : dictionnaire statique typé dans `src/i18n/translations.ts`.
- **Assets visuels** : générés puis compressés en WebP dans `src/assets/images/` (logo, photos atelier, photos produits, RSE).

## 🧭 Guide d'utilisation

1. **Naviguer** : utiliser le menu sticky en haut de page pour accéder aux sections.
2. **Changer de langue** : cliquer sur le bouton FR/EN en haut à droite.
3. **Composer sa sélection** : dans la section Showroom, filtrer par catégorie puis cliquer sur "Ajouter à ma sélection".
4. **Valider une demande de devis** : ouvrir le panier (icône en haut à droite), ajuster les quantités, cliquer sur "Valider ma demande de devis", remplir le formulaire (Nom, E-mail, Pays, Profil) — le récapitulatif s'ouvre automatiquement dans WhatsApp.
5. **Contacter l'équipe** : formulaire B2B en bas de page, ou bouton WhatsApp flottant en bas à droite (visible sur toutes les pages).

## 🚧 Fonctionnalités non encore implémentées

- Passerelle de paiement (volontairement exclue par le cahier des charges — arbitrage stratégique "Panier-Devis").
- Back-office de gestion des produits (les produits sont actuellement codés en dur dans `src/data/products.ts`).
- Envoi d'e-mail transactionnel automatique (actuellement le récapitulatif est envoyé via redirection WhatsApp uniquement).
- Pages dédiées `/collections`, `/story`, `/b2b` (le cahier des charges privilégie une logique Single-Page ; ces contenus sont intégrés directement dans les sections correspondantes).

## 🔮 Prochaines étapes recommandées

1. Remplacer les visuels générés par de vraies photographies de l'atelier et des produits (dès que disponibles).
2. Si un volume de produits plus important est prévu : migrer `products.ts` vers Cloudflare D1 ou KV pour une gestion facilitée.
3. Ajouter un envoi d'e-mail (ex. Resend/SendGrid via route Hono côté Workers) en complément de WhatsApp pour tracer les demandes de devis.
4. Renseigner le second numéro de téléphone (actuellement placeholder `+261 32 XX XX XX XX`).
5. Déployer sur Cloudflare Pages avec domaine personnalisé.

## 🚀 Déploiement

- **Plateforme** : Cloudflare Pages
- **Statut** : ⏳ Prêt pour déploiement (build validé localement)
- **Stack technique** : React 19 + Vite + TypeScript + Tailwind CSS v4
- **Commandes** :
  ```bash
  npm run build   # build de production
  npm run deploy  # build + déploiement Cloudflare Pages
  ```

## Contact officiel (intégré au site)
- **Adresse** : Rue de l'Indépendance, Antsirabe 110, Madagascar
- **Téléphone** : +261 34 76 401 16
- **E-mail** : contact@natureraphia-mahalia.mg
- **Horaires** : Lundi–Samedi 08h30–18h00 · Dimanche fermé
