
# Guide du Code KAP pour les Enfants 🚀

Salut ! Ce guide va t'aider à comprendre comment fonctionne le code de KAP et comment tu peux le modifier. C'est comme un jeu de construction, où chaque pièce a son rôle !

## 🎮 Les Parties Principales du Site

### 1. Les Pages (comme les pièces d'une maison)
- `src/pages/` : C'est ici que tu trouves toutes les pages du site
  - `Index.tsx` : La page d'accueil
  - `Dashboard.tsx` : Le tableau de bord
  - `Editor.tsx` : Là où on crée les séances

### 2. Les Petites Pièces (comme des LEGO)
- `src/components/` : Les petites pièces qu'on utilise partout
  - `Navbar.tsx` : La barre en haut du site
  - `Button.tsx` : Les boutons
  - `Form.tsx` : Les formulaires

## 🎨 Comment Changer des Choses ?

### Pour changer les couleurs :
1. Va dans les fichiers où il y a `className=`
2. Change les couleurs comme `bg-blue-500` en `bg-red-500`

### Pour ajouter un nouveau bouton :
1. Va dans la page où tu veux l'ajouter
2. Ajoute ce code :
```tsx
<Button>Mon nouveau bouton</Button>
```

### Pour ajouter une nouvelle page :
1. Crée un nouveau fichier dans `src/pages/`
2. Copie ce modèle :
```tsx
const MaNouvellePage = () => {
  return (
    <div>
      Ma nouvelle page !
    </div>
  );
};

export default MaNouvellePage;
```

## 🔧 Les Modifications Courantes

### Pour ajouter un type d'activité :
1. Va dans `src/components/dropdown-settings/activity-types/`
2. Trouve la liste des activités
3. Ajoute ton nouveau type

### Pour changer le texte :
1. Cherche le texte que tu veux changer
2. Change-le directement dans le fichier

### Pour ajouter une image :
1. Mets ton image dans le dossier `public/`
2. Utilise-la comme ça :
```tsx
<img src="/mon-image.png" alt="Ma super image" />
```

## 🎯 Astuces

- Toujours sauvegarder tes fichiers
- Regarde dans la console s'il y a des erreurs (F12)
- Teste bien tes changements avant de les partager
- N'hésite pas à demander de l'aide !

## 🌟 Pour Aller Plus Loin

Tu veux ajouter quelque chose de spécial ? Voici où chercher :

- Nouvelle fonctionnalité pour les séances : `src/components/sessions/`
- Nouveau paramètre : `src/components/dropdown-settings/`
- Nouvelle page : `src/pages/`
- Nouveau style : `tailwind.config.ts`

N'oublie pas : le code c'est comme un jeu de construction, prends ton temps et amuse-toi bien ! 🎮
