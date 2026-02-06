## Admin Dashboard – Documentation

Ce fichier explique le fonctionnement de la partie **Admin / Super Admin** de ton projet.

---

### 1. Rôles et connexion

- **Rôles gérés par le backend (`UserRole`)** :
  - `ADMIN`, `HR`, `MANAGER`, `EMPLOYEE`.
- À la connexion (`POST /users/login`) :
  - Le backend vérifie l’email + mot de passe.
  - Il renvoie un objet :
    - `user` (prénom, nom, email, rôle, etc.)
    - `token` (JWT dans la propriété `token`, dérivé de `access_token`).
  - Le frontend (`useLogin`) :
    - stocke `user` et `token` dans le **store Zustand** (`authStore.ts`),
    - déduit le rôle (`admin | hr | manager | employee`),
    - redirige :
      - vers `/admin` si rôle `admin`,
      - vers `/home` sinon (page de bienvenue par rôle).

> **SSO (Single Sign-On)**  
> Si tu ajoutes plus tard un flux SSO (Azure AD, Keycloak, etc.), il sera géré côté backend (ex: route `/auth/sso`).  
> Le frontend n’affiche pas de bouton SSO spécifique : le backend peut décider de rediriger automatiquement vers le fournisseur SSO ou de considérer un utilisateur déjà authentifié, sans changer cette page de login.

---

### 2. Structure des pages côté frontend

- `src/pages/LoginPage.tsx`  
  Page de connexion principale avec :
  - Fond vidéo + fond 3D animé,
  - Menu d’accessibilité (contraste, taille de police, animations, etc.),
  - Formulaire (`LoginForm`) pour email + mot de passe.

- `src/pages/RoleWelcomePage.tsx`  
  Page simple « Bienvenue ADMIN / HR / Manager / Employé » avec :
  - Même fond et animations que la page de login,
  - Bouton **Déconnexion**.

- `src/layout/AdminLayout.tsx`  
  Layout du dashboard admin :
  - Fond vidéo + 3D **identique** au template principal,
  - Overlay sombre pour la lisibilité,
  - Sidebar avec les liens :
    - `/admin` (Overview),
    - `/admin/users`,
    - `/admin/roles`,
    - `/admin/employees`,
    - `/admin/activities`,
    - `/admin/audit`,
    - `/admin/analytics`,
    - `/admin/monitoring`,
    - `/admin/settings`,
  - Topbar avec **ThemeToggle** (mode clair/sombre).

- `src/routes/AdminRoutes.tsx`  
  Définit toutes les sous-routes de l’admin :
  - `index` → `AdminDashboardHome`,
  - `/users` → `AdminUsersPage`,
  - `/roles` → `AdminRolesPage`,
  - `/employees` → `AdminEmployeesPage`,
  - `/activities` → `AdminActivitiesPage`,
  - `/audit` → `AdminAuditLogsPage`,
  - `/analytics` → `AdminAnalyticsPage`,
  - `/monitoring` → `AdminMonitoringPage`,
  - `/settings` → `AdminSettingsPage`.

- `src/components/Auth/ProtectedRoute.tsx`  
  - Vérifie qu’un utilisateur est connecté.
  - Vérifie que son rôle est **dans la liste `allowedRoles`**.
  - Redirige vers `/auth/login` ou `/home` si l’accès est refusé.
  - Utilisé ainsi dans `App.tsx` :
    ```tsx
    <Route
      path="/admin/*"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <AdminRoutes />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    ```

---

### 3. Lien exact entre `App.tsx` et les pages Admin

Fichier : `src/App.tsx`

- Import des briques admin :
  ```ts
  import { ProtectedRoute } from './components/Auth/ProtectedRoute';
  import AdminLayout from './layout/AdminLayout';
  import AdminRoutes from './routes/AdminRoutes';
  ```

- Déclaration de la route admin :
  ```tsx
  <Route
    path="/admin/*"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout>
          <AdminRoutes />
        </AdminLayout>
      </ProtectedRoute>
    }
  />
  ```

- **Cycle complet** :
  1. L’utilisateur se connecte sur `/auth/login` → `useLogin` stocke `user` + `token` via `authStore`.
  2. Si `user.role === 'admin'`, `LoginPage` fait `navigate('/admin')`.
  3. `App.tsx` fait matcher la route `/admin/*` :
     - `ProtectedRoute` vérifie que le rôle est bien `admin`,
     - `AdminLayout` rend la structure visuelle du dashboard (sidebar, topbar, background),
     - `AdminRoutes` choisit la sous-page correcte (`AdminUsersPage`, `AdminRolesPage`, etc.).

Ainsi, toutes les pages admin sont **toujours** rendues à l’intérieur du même template (`AdminLayout`) et sont toutes branchées via la route `/admin/*` déclarée dans `App.tsx`.

---

### 3. Page Admin Users – gestion des utilisateurs

Fichier : `src/pages/admin/AdminUsersPage.tsx`

- **Objectif** :  
  Vue complète pour le Super Admin afin de :
  - lister tous les comptes utilisateurs,
  - rechercher / filtrer,
  - activer / désactiver un compte,
  - supprimer un compte.

- **Récupération des données** :
  - Appel `GET /api/users` (proxy Vite → `http://localhost:3000/users`) avec le header :
    - `Authorization: Bearer <token>` où `<token>` est le JWT stocké dans `authStore`.
  - Le backend (`UsersController`) renvoie `{ data: [...] }`.

- **Filtres dynamiques** :
  - **Recherche texte** : nom + prénom, email, département, téléphone.
  - **Filtre par département** : select basé sur les valeurs trouvées dans les users.
  - **Filtre par rôle** : select basé sur les rôles renvoyés (`ADMIN`, `HR`, `MANAGER`, `EMPLOYEE`).

- **Actions par ligne** :
  - **Activer / désactiver** :
    - `PATCH /api/users/:id` avec `{ isActive: !user.isActive }`.
    - Met à jour immédiatement la ligne dans le tableau.
  - **Supprimer** :
    - Confirmation `window.confirm`,
    - `DELETE /api/users/:id`,
    - Suppression locale de la ligne si succès.

- **UI du tableau** :
  - Conteneur haute opacité pour une lecture claire :
    - `bg-slate-950/95 border border-slate-800/80 backdrop-blur-xl shadow-xl`.
  - Entête sombre (`bg-slate-900/95`), texte clair.
  - Lignes avec hover `hover:bg-slate-900/80`.
  - Badges de statut (`Actif` / `Inactif`) en pill avec couleurs vertes ou grises.

---

### 4. Backend – droits Admin sur les utilisateurs

Fichier : `backend/src/users/users.controller.ts`

- **Login** :
  - Vérifie les identifiants via `AuthService.validateUser`.
  - Renvoie maintenant :
    ```ts
    const { access_token } = await this.authService.login(user);
    return { message: 'Connexion réussie', user: this.usersService.sanitizeUser(user), token: access_token };
    ```
  - Le frontend lit `json.token` et l’utilise comme JWT.

- **Droits Admin / HR** :
  - `GET /users` : `@Roles('HR', 'ADMIN')`
  - `GET /users/:id` : `@Roles('HR', 'MANAGER', 'ADMIN')`
  - `PATCH /users/:id` : `@Roles('HR', 'ADMIN')`
  - `DELETE /users/:id` : `@Roles('HR', 'ADMIN')`

Cela signifie que **HR et ADMIN** peuvent lister, mettre à jour et supprimer des utilisateurs; MANAGER ne peut que lire un user particulier.

---

### 5. Démarrer le projet (rappel)

Depuis `C:\Users\amin\Desktop\PiProject` :

```bash
# Backend Nest
cd backend
npm install         # première fois
npm run start:dev   # http://localhost:3000

# Frontend React/Vite (nouveau terminal)
cd ../frontend
npm install         # première fois
npm run dev         # http://localhost:5173
```

Ensuite :
- Connecte-toi avec un compte `ADMIN` → tu seras redirigé vers `/admin` (layout admin).
- Va dans le menu **Users** → `/admin/users` pour voir et gérer tous les comptes.

Ce fichier sert de **guide rapide pour l’admin** : tu peux le montrer à ton enseignant pour expliquer comment l’authentification, les rôles et le dashboard admin fonctionnent dans ton projet.

