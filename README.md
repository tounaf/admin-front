# Backoffice Administration - Gestion

Ce projet est une application de backoffice moderne développée avec **Angular 20**, conçue pour la gestion administrative et financière des établissements (Fiangonanas).

## 🌍 Contexte

Le projet vise à fournir une interface d'administration robuste et intuitive pour :
- Visualiser les performances financières via un tableau de bord.
- Gérer les établissements (Fiangonana) et leur géolocalisation.
- Suivre les offrandes et les dépenses.
- Valider les activités hebdomadaires (Sabbat).

L'application communique avec une API backend (Symfony/API Platform) pour la persistance des données.

## 🚀 Installation

### Prérequis
- Node.js (v20+)
- npm

### Étapes
1. Cloner le dépôt.
2. Installer les dépendances :
   ```bash
   npm install
   ```

## 🛠 Mode Développement

Pour lancer le serveur de développement local :

```bash
npm start
# ou
./node_modules/.bin/ng serve
```

L'application est accessible sur `http://localhost:4200/admin`. Elle se recharge automatiquement lors de la modification des fichiers sources.

## 🏗 Build (Production)

Pour compiler le projet pour la production :

```bash
npm run build
# ou
./node_modules/.bin/ng build
```

Les artefacts de build seront stockés dans le répertoire `dist/admin`. La configuration est optimisée pour la performance et le déploiement sur un sous-répertoire `/admin`.

## 📚 Documentation Détaillée

Pour plus de détails sur les fonctionnalités et l'architecture technique, veuillez consulter le dossier `docs/` :
- [Architecture & Core Features](docs/architecture.md)
- [Dashboard](docs/dashboard.md)
- [Gestion des Fiangonanas](docs/fiangonana.md)
- [Gestion des Finances (Offrandes)](docs/finance-offering.md)
- [Gestion des Dépenses](docs/expenses.md)
- [Validations Sabbat](docs/validations.md)
