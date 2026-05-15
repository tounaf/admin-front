# Architecture Technique & Core Features

Ce document détaille les choix techniques transversaux et l'infrastructure de l'application.

## 🏗 Architecture Globale

L'application est construite sur **Angular 20** avec une approche par composants autonomes (**Standalone Components**). Elle utilise **Angular Material** pour l'UI et **Tailwind CSS** (via des classes utilitaires dans SCSS) pour la flexibilité du design.

## 📡 Gestion des Appels API

### ApiService (`src/app/http-client/api-service.ts`)
Un service centralisé gère toutes les requêtes HTTP (GET, POST, PUT, PATCH, DELETE). Il s'occupe de :
- Construire les URLs de base à partir des variables d'environnement.
- Configurer les en-têtes (Content-Type, etc.).
- Centraliser la gestion des erreurs.

### Centralized Loader (Intercepteur)
Un système de chargement global est implémenté pour améliorer l'UX lors des appels asynchrones.

- **LoadingService** : Gère un `BehaviorSubject<boolean>` représentant l'état de chargement.
- **LoadingInterceptor** : Intercepte chaque requête sortante pour activer le loader (`show()`) et le désactive (`hide()`) une fois la requête terminée (succès ou erreur).
- **Global UI** : Une `mat-progress-bar` est affichée tout en haut de l'application (`app.html`), liée à l'observable du `LoadingService`.

## 🎨 Design & Thématique

L'application utilise une charte graphique moderne basée sur la police **Poppins**.
Les styles sont centralisés dans `src/styles.scss` via des variables CSS :
- `--primary-color` : Indigo (#4f46e5)
- `--bg-color` : Gris très clair (#f8fafc)
- `--border-radius` : 12px pour une esthétique douce et moderne.

Les composants Material sont surchargés globalement pour correspondre à ce design (Cartes, Tableaux, Boutons).

## 🧭 Navigation & Routage

Le routage est défini dans `app.routes.ts`. Le composant racine `App` écoute les changements de route pour mettre à jour dynamiquement le titre de la page affiché dans la barre d'outils, offrant ainsi un meilleur repérage à l'utilisateur.
