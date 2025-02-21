
# Design de l'API - KAP

## 1. API REST

### 1.1 Points d'Entrée Principaux
```
/api/sessions
  GET    /        - Liste des sessions
  POST   /        - Création de session
  GET    /:id     - Obtenir une session
  PUT    /:id     - Mettre à jour une session
  DELETE /:id     - Supprimer une session

/api/sequences
  GET    /        - Liste des séquences
  POST   /        - Création de séquence
  GET    /:id     - Obtenir une séquence
  PUT    /:id     - Mettre à jour une séquence
  DELETE /:id     - Supprimer une séquence

/api/exercises
  GET    /        - Liste des exercices
  POST   /        - Création d'exercice
  GET    /:id     - Obtenir un exercice
  PUT    /:id     - Mettre à jour un exercice
  DELETE /:id     - Supprimer un exercice
```

### 1.2 Points d'Entrée d'Authentification
```
/api/auth
  POST   /login   - Connexion utilisateur
  POST   /logout  - Déconnexion utilisateur
  POST   /refresh - Rafraîchissement du token
```

## 2. API WebSocket

### 2.1 Points d'Entrée Temps Réel
```
/ws/collaboration
  - Édition en temps réel
  - Mises à jour de présence
  - Messages de chat

/ws/notifications
  - Alertes système
  - Notifications utilisateur
  - Mises à jour de statut
```

## 3. Standards API

### 3.1 Format Requête/Réponse
- Payloads JSON
- Authentification JWT
- Codes de statut
- Gestion des erreurs

### 3.2 Sécurité
- Limitation de débit
- Validation des entrées
- Politiques CORS
- Versionnage API

Voir aussi :
- [Vue d'ensemble de l'Architecture](./overview.md)
- [Design des Composants](./component-design.md)
- [Design de la Base de Données](./database-design.md)
