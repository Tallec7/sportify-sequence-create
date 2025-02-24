
# Glossaire Technique - KAP

## A

### Accessibilité (A11y)
Standards et pratiques garantissant l'accès à l'application pour tous les utilisateurs, incluant ceux ayant des besoins spéciaux.

### API (Application Programming Interface)
Interface permettant la communication entre différents composants logiciels. Dans KAP, principalement utilisée pour les interactions avec Supabase.

### Authentification
Processus de vérification de l'identité d'un utilisateur. Utilise JWT et Supabase Auth.

## B

### Backend
Partie serveur de l'application, gérée par Supabase dans KAP.

### Build
Processus de compilation et d'optimisation du code source pour la production.

## C

### Composant React
Bloc de construction réutilisable de l'interface utilisateur.
```typescript
interface Component {
  props: any;
  state: any;
  render(): JSX.Element;
}
```

### CRUD
Create, Read, Update, Delete - Opérations fondamentales sur les données.

## D

### Database
Base de données PostgreSQL hébergée sur Supabase.
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### DOM (Document Object Model)
Représentation en arbre des éléments HTML de la page.

## E

### Edge Functions
Fonctions serverless exécutées sur le réseau edge de Supabase.
```typescript
// Example d'Edge Function
export async function handler(req: Request) {
  // Implementation
}
```

### Exercice
Unité d'activité dans une séquence d'entraînement.
```typescript
interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number;
}
```

## F

### Frontend
Interface utilisateur de l'application, construite avec React et TypeScript.

### Form Validation
Processus de vérification des données de formulaire.
```typescript
interface ValidationRules {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
}
```

## H

### Hook
Fonction spéciale React permettant d'utiliser l'état et d'autres fonctionnalités.
```typescript
const useCustomHook = () => {
  const [state, setState] = useState(initial);
  return { state, setState };
};
```

## I

### Intensité
Niveau d'effort requis pour une activité.
```typescript
type IntensityLevel = 'low' | 'medium' | 'high' | 'maximum';
```

## J

### JWT (JSON Web Token)
Token d'authentification sécurisé utilisé pour les sessions utilisateur.
```typescript
interface JWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
}
```

## L

### Lazy Loading
Technique de chargement différé des ressources pour optimiser les performances.
```typescript
const LazyComponent = lazy(() => import('./Component'));
```

## M

### Mutation
Opération modifiant des données dans la base de données.
```typescript
const mutation = useMutation({
  mutationFn: updateSession
});
```

## O

### Objectif
But spécifique d'une séance ou séquence.
```typescript
interface Objective {
  id: string;
  description: string;
  type: ObjectiveType;
}
```

## P

### Performance
Métriques de performance de l'application.
```typescript
interface PerformanceMetrics {
  loadTime: number;
  ttfb: number;
  fcp: number;
}
```

## Q

### Query
Requête de données vers la base de données.
```typescript
const query = useQuery({
  queryKey: ['sessions'],
  queryFn: fetchSessions
});
```

## R

### React
Bibliothèque JavaScript pour la construction d'interfaces utilisateur.

### RLS (Row Level Security)
Système de sécurité au niveau des lignes dans Supabase.
```sql
CREATE POLICY "users can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);
```

## S

### Séance
Unité principale d'entraînement.
```typescript
interface Session {
  id: string;
  title: string;
  sequences: Sequence[];
}
```

### Séquence
Sous-partie d'une séance contenant des exercices.
```typescript
interface Sequence {
  id: string;
  title: string;
  exercises: Exercise[];
}
```

### State Management
Gestion de l'état de l'application avec React Query.
```typescript
interface State {
  data: any;
  loading: boolean;
  error: Error | null;
}
```

### Supabase
Plateforme de backend-as-a-service utilisée dans KAP.

## T

### Tailwind CSS
Framework CSS utilitaire utilisé pour le style.
```css
.button {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
```

### TypeScript
Sur-ensemble typé de JavaScript utilisé dans le projet.
```typescript
type Props = {
  title: string;
  onClick: () => void;
};
```

## U

### UI (User Interface)
Interface utilisateur de l'application.

### UUID
Identifiant unique universel utilisé pour les enregistrements.
```typescript
type UUID = string; // format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## V

### Validation
Processus de vérification des données.
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
```

## W

### WebSocket
Protocole de communication bidirectionnelle en temps réel.
```typescript
interface WebSocketConnection {
  connect(): void;
  send(data: any): void;
  onMessage(callback: (data: any) => void): void;
}
```
