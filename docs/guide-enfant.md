
# Guide du Développement KAP 🚀

Ce guide détaille l'architecture et le développement du projet KAP, facilitant la prise en main par de nouveaux développeurs.

## 🏗️ Architecture du Projet

### Structure des Dossiers
```
src/
├── components/    # Composants réutilisables
├── pages/        # Pages de l'application
├── hooks/        # Hooks personnalisés
├── utils/        # Fonctions utilitaires
├── types/        # Types TypeScript
└── integrations/ # Intégrations externes (Supabase)
```

### Composants Principaux

#### 1. Structure des Pages
- `Index.tsx` : Page d'accueil
- `Dashboard.tsx` : Tableau de bord utilisateur
- `Editor.tsx` : Éditeur de séances
- `Auth.tsx` : Authentification
- `Settings.tsx` : Paramètres

#### 2. Composants Clés
- `SessionForm` : Création/édition de séances
- `SequenceForm` : Gestion des séquences
- `ExerciseForm` : Configuration des exercices

## 🔧 Développement

### Configuration de l'Environnement
1. Installation des dépendances :
```bash
npm install
```

2. Configuration de Supabase :
- Créer un fichier `.env` à la racine
- Ajouter les variables Supabase :
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Gestion des Données

#### Base de Données (Supabase)
- Tables principales : sessions, sequences, exercises
- Relations : One-to-Many entre sessions et sequences
- Politiques RLS pour la sécurité des données

#### État de l'Application
- TanStack Query pour la gestion d'état
- Hooks personnalisés pour la logique métier
- Context React pour l'état global

### Extension du Projet

#### 1. Ajout de Nouvelles Fonctionnalités
1. Créer les composants nécessaires dans `src/components/`
2. Ajouter les types dans `src/types/`
3. Implémenter la logique dans les hooks
4. Mettre à jour les routes si nécessaire

#### 2. Modification des Types d'Activités
1. Éditer `src/types/sequence.ts`
2. Mettre à jour les formulaires correspondants
3. Adapter la validation des données

#### 3. Ajout de Nouveaux Paramètres
1. Créer/modifier les tables Supabase
2. Ajouter les types TypeScript
3. Implémenter les composants d'interface
4. Mettre à jour la logique métier

## 🧪 Tests

### Tests Unitaires
- Utilisation de Vitest
- Tests des composants avec @testing-library/react
- Coverage minimal recommandé : 80%

### Tests d'Intégration
- Tests de flux utilisateur complets
- Vérification des intégrations Supabase
- Tests des formulaires principaux

## 📚 Ressources

### Documentation Technique
- [Technical Specifications](./technical-specifications.md)
- [Architecture Overview](./architecture/overview.md)
- [API Design](./architecture/api-design.md)

### Standards
- TypeScript strict
- ESLint pour le style de code
- Prettier pour le formatage
- Commits conventionnels

## 🚀 Déploiement

### Process de Build
1. Vérification des types : `npm run type-check`
2. Tests : `npm run test`
3. Build : `npm run build`
4. Preview : `npm run preview`

### Variables d'Environnement
- Configurer les variables Supabase
- Vérifier les politiques RLS
- Mettre à jour les tokens si nécessaire

## 🤝 Contribution

### Process de Développement
1. Créer une branche feature
2. Développer et tester localement
3. Soumettre une PR
4. Code review
5. Merge après approbation

