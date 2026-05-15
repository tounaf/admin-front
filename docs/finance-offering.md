# Gestion des Offrandes (Finance)

Permet le suivi détaillé des offrandes collectées par les différents établissements.

## 📋 Fonctionnalités
- **Recherche Avancée** : Filtres par établissement (multi-sélection) et par plage de dates.
- **Répartition des Coupures** : Visualisation détaillée des quantités par valeur faciale (ex: combien de billets de 10 000 Ar, 5 000 Ar, etc.).
- **Historique** : Liste chronologique avec calcul automatique des totaux.

## 🛠 Détails Techniques
- **Composant** : `Offering` (`src/app/offering/`)
- **UI Spécifique** : Les détails des quantités sont affichés dans un menu contextuel (`mat-menu`) pour garder l'interface épurée.
- **Filtrage** : Utilise des `ReactiveForms` pour gérer les critères de recherche envoyés à l'API.
- **Devise** : Les montants sont formatés en Ariary (MGA) via les pipes Angular standards.
