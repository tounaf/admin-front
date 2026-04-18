# École Management Application

Une application complète de gestion scolaire construite avec **Symfony 7** et **React**.

## Fonctionnalités

- **Gestion des élèves** : Fiches détaillées, inscription.
- **Suivi des écolages** : Suivi des paiements, filtrage par mois et par statut (payé/impayé).
- **Communication** : Publication d'actualités, programmes et événements pour les parents.
- **Comptabilité** : Gestion des mouvements d'entrée (écolages, inscriptions) et de sortie (salaires, matériel, travaux).
- **Interface Moderne** : Design épuré avec Tailwind CSS, responsive et personnalisable.

## Installation

1. Cloner le repository
2. Installer les dépendances PHP : `composer install`
3. Installer les dépendances JS : `npm install`
4. Configurer la base de données dans `.env` (SQLite par défaut)
5. Lancer les migrations : `php bin/console doctrine:migrations:migrate`
6. Compiler les assets : `npm run build` ou `npm run watch`

## Architecture

- **Backend** : Symfony API Platform pour une API REST robuste et auto-documentée.
- **Frontend** : React avec React Router pour une expérience SPA fluide.
- **Style** : Tailwind CSS pour un design moderne et facilement personnalisable via `assets/utils/config.js` et CSS variables.
- **Base de données** : SQLite (configurable vers MySQL/PostgreSQL).

## Personnalisation

Le fichier `assets/utils/config.js` permet de modifier facilement :
- Le nom de l'école
- Les couleurs du thème
- Le logo
- Les catégories de dépenses et d'actualités
