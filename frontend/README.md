## HR Intelligence Frontend – Login 3D React/TypeScript

Interface de connexion moderne pour un système de gestion RH intelligent, construite avec **React 18+**, **TypeScript**, **Vite**, **Tailwind CSS**, **react-three/fiber**, **react-hook-form** et **zod**.

### 1. Création du projet (si tu repartais de zéro)

```bash
# 1) Créer le projet Vite React + TS
npm create vite@latest frontend -- --template react-ts

cd frontend

# 2) Installer les dépendances principales
npm install

# 3) Installer Tailwind + outils CSS
npm install -D tailwindcss postcss autoprefixer

# 4) Initialiser Tailwind (si nécessaire)
npx tailwindcss init -p

# 5) Installer les libs nécessaires à ce projet
npm install @react-three/fiber @react-three/drei three \
  react-hook-form zod @hookform/resolvers framer-motion react-icons

# 6) Installer Vitest + React Testing Library
npm install -D vitest jsdom @testing-library/react \
  @testing-library/jest-dom @testing-library/user-event
```

Dans ce dépôt, ces étapes sont déjà faites – tu peux directement passer à la section suivante.

### 2. Lancer le frontend en développement

Depuis le dossier `frontend` :

```bash
# Installer les dépendances (si ce n'est pas déjà fait)
npm install

# Lancer le serveur de dev
npm run dev
```

L’application sera disponible sur `http://localhost:5173` (par défaut).

### 3. Scripts utiles

- **Démarrer en dev** :

  ```bash
  npm run dev
  ```

- **Vérifier les types + build** :

  ```bash
  npm run build
  ```

- **Lint (ESLint)** :

  ```bash
  npm run lint
  ```

- **Tests unitaires (Vitest + RTL)** :

  ```bash
  npm run test
  # ou en mode watch
  npm run test:watch
  ```

### 4. Déploiement (build statique)

```bash
cd frontend
npm install
npm run build
```

Le build de production sera généré dans le dossier `dist/`.  
Tu peux le déployer sur n’importe quel hébergeur statique compatible (Vercel, Netlify, GitHub Pages, nginx, etc.).

### 5. Checklist d’accessibilité (A11y)

- **Navigation clavier** : tous les éléments importants (inputs, boutons, liens) sont accessibles via `Tab`.
- **Labels ARIA** : champs de formulaire, boutons et zones ont des `aria-label`, `role` ou `aria-*` appropriés.
- **Skip link** : lien « Aller au contenu principal » visible au focus pour passer directement au contenu.
- **Contraste** : thème sombre avec options de contraste dans `AccessibilityMenu`.
- **Messages d’erreur** : erreurs de validation avec `role="alert"` et association `aria-describedby`.

