# Dashboard (Tableau de Bord)

Le Dashboard est la page d'accueil de l'administration, offrant une vue d'ensemble de l'activité.

## 📋 Fonctionnalités
- **Cartes de Statistiques** : Résumé rapide des entités (Fiangonanas actives, Offrandes hebdomadaires, suivi des dépenses).
- **Graphiques d'Offrandes** : Visualisation sous forme de barres des offrandes collectées, ventilées par établissement.
- **Graphiques de Dépenses** : Visualisation des dépenses pour analyse comparative.

## 🛠 Détails Techniques
- **Composant** : `Dashboard` (`src/app/dashboard/`)
- **Graphiques** : Utilise `ng2-charts` (basé sur `Chart.js`). Les graphiques sont configurés pour être réactifs et stylisés avec la police Poppins.
- **Data Fetching** : Les données sont récupérées via le point d'entrée API `offering_total_by_fiangonanas`.
- **Performance** : Utilise la stratégie `ChangeDetectionStrategy.OnPush` pour optimiser les cycles de rendu.
