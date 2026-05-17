# Gestion des Fiangonanas

Cette fonctionnalité permet de gérer le référentiel des établissements (Fiangonanas).

## 📋 Fonctionnalités
- **Liste des établissements** : Affichage dans un tableau moderne avec pagination (via API Platform).
- **Géolocalisation** : Visualisation de tous les établissements sur une carte interactive.
- **CRUD Complet** : Création, modification et suppression d'établissements.
- **Détails** : Chaque entrée affiche le code, l'adresse, la caution et la date de création.

## 🛠 Détails Techniques
- **Composants** :
  - `FiangonanaListComponent` : Liste et carte.
  - `FiangonanaFormComponent` : Formulaire de création/édition.
- **Cartographie** : Utilise `@bluehalo/ngx-leaflet` (Leaflet). Inclut un contrôle de géocodage pour rechercher des adresses sur la carte.
- **UI** : Utilise `mat-table` pour les données et `mat-tooltip` pour les actions.
