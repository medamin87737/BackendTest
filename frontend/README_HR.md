## HR Dashboard – Documentation

Ce fichier explique le fonctionnement de la partie **Dashboard RH** de ton projet  
_« Système intelligent de recommandation des employés »_.

Il est structuré comme `README_ADMIN.md`, mais ciblé exclusivement sur le rôle **HR**.

---

### 1. Rôle HR et accès au dashboard

- **Rôle côté backend (`UserRole`)** :
  - `HR` (et toujours `ADMIN`, `MANAGER`, `EMPLOYEE` pour les autres parties).
- À la connexion (`POST /users/login`) :
  - Le backend renvoie toujours `user` + `token` (JWT).
  - Le frontend (`useLogin` + `authStore.ts`) :
    - stocke `user` (dont `role`) et `token`,
    - redirige :
      - vers `/admin` si rôle `admin`,
      - vers `/home` sinon.
- Sur `/home`, la page `RoleWelcomePage` affiche un message spécifique :
  - si `role === 'hr'` : titre **« Bienvenue HR »** + bouton **“Uploader CSV Employés”**.
  - ce bouton redirige vers `/hr/upload-csv`, qui est maintenant intégré dans le **layout dashboard RH**.

> Résumé : un utilisateur avec `role: 'hr'` se connecte → arrive sur `/home` → clique sur le bouton **Uploader CSV**  
> → il se retrouve dans le **Dashboard RH**, protégé par `ProtectedRoute`.

---

### 2. Structure frontend dédiée au HR

#### 2.1. Layout RH – `src/layout/HRLayout.tsx`

**Objectif** : fournir le même “shell” visuel que l’admin, mais pour le rôle HR.

- Fond :
  - Gradient : `bg-gradient-to-br from-primary-800 via-primary-900 to-gray-900`
  - Vidéo : `/media/hr-intelligence-bg.mp4`
  - Fond 3D animé : `AnimatedBackground` (React Three Fiber)
  - Overlay : `bg-black/40` pour la lisibilité.
- Accessibilité :
  - `AccessibilityMenu` (contraste, taille de police, réduction des animations, screen reader).
  - Utilise le type `AccessibilitySettings` (dans `src/types/index.ts`).
- Shell :
  - **Sidebar fixe (desktop)** :
    - Titre : `AI HR Dashboard – Talent Intelligence`
    - Navigation (via `SidebarLink`, basé sur `NavLink` de `react-router-dom`) :
      - `/hr` → Dashboard RH (home)
      - `/hr/employees` → Gestion des employés
      - `/hr/employees/upload-csv` → Upload CSV employés
      - `/hr/skills` → Gestion des compétences
      - `/hr/activities` → Gestion des activités
      - `/hr/activities/new` → Lancer une activité
      - `/hr/activities/requests` → Demandes d’activités
      - `/hr/notifications` → Notifications
      - `/hr/statistics` → Statistiques & graphiques
      - `/hr/history` → Historique & traçabilité
      - `/hr/settings` → Paramètres RH
    - Bouton **Déconnexion** en bas (comme sur Admin) :
      - `logout()` via `authStore.ts`,
      - redirection vers `/auth/login`.
  - **Topbar** :
    - Logo miniature + titre (sur mobile).
    - `ThemeToggle` (mode clair / sombre géré par `ThemeProvider` + `authStore`).
    - Bouton **Déconnexion** (visible en topbar, en plus de celui de la sidebar).
  - **Contenu central** :
    - `motion.main` (Framer Motion) :
      - `initial={{ opacity: 0, y: 12 }}` → `animate={{ opacity: 1, y: 0 }}`.
      - Rend la page courante (`{children}`).

> **Important** : `HRLayout` **ne modifie pas** le design existant, il se contente de le réutiliser  
> (mêmes couleurs, même vidéo, mêmes patterns d’accessibilité, mêmes ombres, etc.).

---

#### 2.2. Routes RH – `src/routes/HRRoutes.tsx`

Ce fichier définit les **sous-routes** du dashboard RH, équivalent de `AdminRoutes.tsx` pour l’admin.

```tsx
export const HRRoutes: React.FC = () => (
  <Routes>
    <Route index element={<HRDashboardHome />} />
    <Route path="employees" element={<HREmployeesPage />} />
    <Route path="employees/upload-csv" element={<HRUploadEmployeesPage />} />
    {/* Compatibilité avec /hr/upload-csv existant depuis RoleWelcomePage */}
    <Route path="upload-csv" element={<HRUploadEmployeesPage />} />
    <Route path="skills" element={<HRSkillsPage />} />
    <Route path="activities" element={<HRActivitiesPage />} />
    <Route path="activities/new" element={<HRCreateActivityPage />} />
    <Route path="activities/requests" element={<HRActivityRequestsPage />} />
    <Route path="notifications" element={<HRNotificationsPage />} />
    <Route path="statistics" element={<HRStatisticsPage />} />
    <Route path="history" element={<HRHistoryPage />} />
    <Route path="settings" element={<HRSettingsPage />} />
  </Routes>
);
```

> **Compatibilité importante** :  
> - `/hr/employees/upload-csv` est utilisé dans la sidebar.  
> - `/hr/upload-csv` est utilisé par `RoleWelcomePage`.  
> Les deux mènent à la même page `HRUploadEmployeesPage`, donc aucun bouton existant n’est cassé.

---

#### 2.3. Lien avec `App.tsx` et `ProtectedRoute`

Dans `src/App.tsx` :

```tsx
import HRLayout from './layout/HRLayout';
import HRRoutes from './routes/HRRoutes';

// ...

<Route
  path="/hr/*"
  element={
    <ProtectedRoute allowedRoles={['hr']}>
      <HRLayout>
        <HRRoutes />
      </HRLayout>
    </ProtectedRoute>
  }
/>
```

- `ProtectedRoute` :
  - lit `user` via `useAuthStore`,
  - vérifie que `user.role` est dans `allowedRoles`,
  - ici : `allowedRoles={['hr']}`,
  - sinon, redirige vers `/home` ou `/auth/login`.
- **Conclusion** : toutes les routes `/hr/*` sont réservées au rôle **HR**.

---

### 3. Pages du Dashboard RH

Toutes les pages RH sont dans `src/pages/hr/`.

#### 3.1. Dashboard principal – `HRDashboardHome.tsx`

**Objectif** : Vue globale RH avec KPIs + graphiques + tableaux récents.

- **KPIs cards** (grid responsive) :
  - Nombre total employés
  - Nombre d’activités
  - Nombre de compétences
  - Activités en cours
  - Activités terminées
  - Recommandations générées
  - Design : cartes `rounded-2xl`, `bg-slate-900/70`, `border-slate-800/80`, `backdrop-blur-xl`.
- **Graphiques (Recharts)** :
  - `PieChart` – Répartition des compétences (Data, Dev, Gestion de projet, Soft skills, Autres).
  - `AreaChart` – Progression des compétences (profils junior / senior par mois).
  - `BarChart` – Activités par département (IT, Finance, Marketing, RH, Opérations).
  - `BarChart` vertical – Gaps de compétences (%) pour les compétences critiques (Data Eng, Cloud, Cyber, etc.).
  - Tous les graphiques utilisent `ResponsiveContainer` pour être **responsive**.
- **Tableaux** :
  - **Dernières activités** :
    - Colonnes : Activité, Date, Statut, Participants.
    - Badges de statut (En cours / Planifié / Terminé).
  - **Derniers employés ajoutés** :
    - Colonnes : Employé, Rôle, Département, Depuis.
  - **Dernières recommandations** :
    - Colonnes : Employé, Recommandation, Score (sur 100).

Ces données sont actuellement **mockées** (fake data) pour illustrer l’UI.  
Elles sont prêtes à être remplacées par des appels API (ex : `GET /api/hr/dashboard`).

---

#### 3.2. Gestion des employés – `HREmployeesPage.tsx`

**Objectif** : Vue RH pour gérer les collaborateurs.

- Header :
  - Titre : **“Gestion des employés”**.
  - Boutons :
    - **Ajouter un employé** (action à brancher plus tard sur un formulaire ou un modal).
    - **Import CSV** (peut ouvrir `HRUploadEmployeesPage` ou un modal).
- Filtres / recherche :
  - Input de recherche (nom, email, poste).
  - Select “Département”.
  - Select “Statut” (Actif / Inactif).
- Tableau :
  - Colonnes : Employé, Rôle, Département, Statut, Actions.
  - Lignes mockées (ex : Sara Ben, Yassine M., etc.).
  - Actions :
    - **Modifier** (prévu pour ouvrir une page ou un formulaire).
    - **Supprimer**.

Cette page est la base UX / UI pour connecter plus tard :
- `GET /api/users?role=EMPLOYEE` / endpoints RH côté backend,
- `PATCH` / `DELETE` pour gérer le cycle de vie d’un employé.

---

#### 3.3. Upload CSV employés – `HRUploadEmployeesPage.tsx`

**Objectif** : Intégrer proprement le composant d’upload CSV existant dans le layout RH.

- Contient :
  - Un titre + une description,
  - Puis le composant **`<UploadEmployeesCSV />`** existant (`src/components/UploadEmployeesCSV.tsx`).
- Le composant gère :
  - la sélection de fichier `.csv`,
  - la validation (type + taille),
  - l’upload vers `POST http://localhost:3000/api/hr/upload-csv` avec `Authorization: Bearer <token>`,
  - l’affichage d’erreurs / succès.

> **Important** :  
> Le code d’upload n’est pas dupliqué, il est **réutilisé** et simplement entouré par le nouveau shell HR.

---

#### 3.4. Gestion des compétences – `HRSkillsPage.tsx`

**Objectif** : Gérer le référentiel de compétences côté RH.

- Header :
  - Titre : **“Gestion des compétences”**.
  - Bouton **“Ajouter une compétence”**.
- Tableau :
  - Colonnes : Compétence, Niveau cible, Nombre de porteurs, Actions.
  - Lien en haut à droite : **“Gérer les référentiels”** (vers une future page).
- Utilité :
  - Servira de base pour connecter un endpoint type :
    - `GET /api/hr/skills`, `POST /api/hr/skills`, `DELETE /api/hr/skills/:id`.

---

#### 3.5. Gestion des activités – `HRActivitiesPage.tsx`

**Objectif** : Lister et filtrer les activités de développement (formations, missions, parcours).

- Header :
  - Titre : **“Gestion des activités”**.
  - Bouton **“Lancer une activité”** (renvoie UX vers `HRCreateActivityPage`).
- Filtres :
  - Select “Statut” (En cours, Planifié, Terminé).
  - Select “Type” (Upskilling, Expertise, Soft skills).
- Tableau :
  - Colonnes : Activité, Type, Statut, Places (occupées / totales), Actions.
  - Actions : **Détails**, **Annuler**.

---

#### 3.6. Formulaire “Lancer une activité” – `HRCreateActivityPage.tsx`

**Objectif** : Permettre aux RH de créer une activité structurée avec toutes les informations nécessaires.

- Utilise `react-hook-form` :
  - Type du formulaire : `CreateActivityFormValues`.
  - Gestion de la validation (`required`, `valueAsNumber`, etc.).
- Champs :
  - `name` (Nom de l’activité) – obligatoire.
  - `type` (Type d’activité : Formation, Mission/Projet, Mentorat) – obligatoire.
  - `capacity` (Nombre de places) – obligatoire, nombre.
  - `date` – obligatoire (type `date`).
  - `duration` – texte libre (ex : “3 jours”).
  - `location` – texte libre (Remote, Paris, Casablanca...).
  - `description` – obligatoire (textarea).
  - `requiredSkills` – obligatoire (textarea : liste de compétences / mots-clés).
  - `desiredLevel` – texte libre (Junior, Confirmé, Expert...).
  - `context` – obligatoire :
    - boutons “pills” :
      - `upskilling` (Montée en compétences globale),
      - `expertise` (Consolidation d’un pôle expert),
      - `low`, `medium`, `expert` (niveau de criticité/gap).
- Soumission :
  - `onSubmit` loggue actuellement les données dans la console :
    - à connecter plus tard sur **`POST /api/hr/activities`**.

---

#### 3.7. Demandes d’activités – `HRActivityRequestsPage.tsx`

**Objectif** : Centraliser les demandes émises par les managers / HRBP.

- Tableau :
  - Colonnes : Demandeur, Activité proposée, Statut, Date, Actions.
  - Statuts :
    - En attente (badge amber),
    - Approuvée (badge emerald),
    - Refusée (badge red).
  - Actions :
    - **Approuver**,
    - **Refuser**.
- Prévu pour se brancher sur un endpoint type :
  - `GET /api/hr/activity-requests`,
  - `PATCH /api/hr/activity-requests/:id` (approval / rejection).

---

#### 3.8. Notifications RH – `HRNotificationsPage.tsx`

**Objectif** : Afficher les notifications clés pour les RH.

- Exemples de notifications mockées :
  - Nouvelles recommandations générées.
  - Activité proche de la saturation.
  - Nouveau CSV importé.
- Design :
  - Cartes `rounded-xl` avec bordure `border-slate-800/80`, `bg-slate-900/70`.
  - Timeline simple avec l’âge de la notification (ex : “Il y a 2 h”).
- Peut être connecté plus tard :
  - soit à un **polling REST**,
  - soit à un canal **WebSocket**.

---

#### 3.9. Statistiques & graphiques – `HRStatisticsPage.tsx`

**Objectif** : Vue dédiée “Stats & graphs RH”.

- Réutilise les composants visuels de `HRDashboardHome` :
  - KPIs,
  - Graphiques Recharts,
  - Tableaux.
- Le but est d’avoir :
  - une page “Overview” (Dashboard RH),
  - une page “Statistiques” plus détaillée,  
    mais en gardant la même base d’UI pour ton projet.

---

#### 3.10. Historique & traçabilité – `HRHistoryPage.tsx`

**Objectif** : Fournir une vue “audit” pour les actions RH.

- Tableau :
  - Colonnes : Date, Acteur, Action, Détail.
  - Exemples :
    - Création activité,
    - Demande activité,
    - Import CSV.
- Bouton **“Exporter l’historique”** :
  - pour se brancher plus tard sur un export CSV / Excel côté backend.

---

#### 3.11. Paramètres RH – `HRSettingsPage.tsx`

**Objectif** : Configurer les règles du moteur de recommandation côté RH.

- Sections :
  1. **Règles de matching** :
     - Score minimum de recommandation.
     - Nombre max de recommandations par employé.
     - Période glissante (en mois).
  2. **Notifications** :
     - Alerte lors d’un import CSV massif.
     - Notification aux managers si score > 90.
     - Récap mensuel aux employés.
     - Alertes sur les gaps critiques.
  3. **Confidentialité & RGPD** :
     - Masquer les données sensibles dans les exports.
     - Autoriser l’anonymisation pour les analyses globales.
- Bouton **“Enregistrer les paramètres”** :
  - prévu pour envoyer un `PATCH` sur un endpoint de configuration (ex : `/api/hr/settings`).

---

### 4. Navigation récapitulative

- **Routes principales HR** (toutes protégées par `ProtectedRoute` avec `allowedRoles={['hr']}`) :
  - `/hr` → `HRDashboardHome` (Dashboard RH).
  - `/hr/employees` → `HREmployeesPage` (Gestion des employés).
  - `/hr/employees/upload-csv` → `HRUploadEmployeesPage` (Upload CSV dans le layout RH).
  - `/hr/upload-csv` → `HRUploadEmployeesPage` (compatibilité bouton `RoleWelcomePage`).
  - `/hr/skills` → `HRSkillsPage` (Gestion des compétences).
  - `/hr/activities` → `HRActivitiesPage` (Liste des activités).
  - `/hr/activities/new` → `HRCreateActivityPage` (Formulaire “Lancer une activité”).
  - `/hr/activities/requests` → `HRActivityRequestsPage` (Demandes d’activités).
  - `/hr/notifications` → `HRNotificationsPage` (Flux de notifications RH).
  - `/hr/statistics` → `HRStatisticsPage` (Stats & graphiques).
  - `/hr/history` → `HRHistoryPage` (Historique & traçabilité).
  - `/hr/settings` → `HRSettingsPage` (Paramètres RH).

---

### 5. Comment faire évoluer la partie RH

Pour passer de la maquette fonctionnelle à un **dashboard RH connecté à ton backend** :

1. **Brancher les données** :
   - Remplacer les données mockées par des appels `fetch` ou `axios` vers ton Nest backend :
     - ex. `GET /api/hr/employees`, `GET /api/hr/skills`, `GET /api/hr/dashboard`, etc.
   - Ajouter la gestion du `loading` + `error` (spinners, messages).
2. **Relier les formulaires** :
   - `HRCreateActivityPage` → `POST /api/hr/activities`.
   - `HREmployeesPage` → `PATCH` + `DELETE` sur `/api/users/:id` (si autorisé aux HR).
3. **Sécuriser les actions sensibles** :
   - Coupler l’UI de `HRHistoryPage` avec un vrai `AuditLog` côté backend.
   - Faire respecter les rôles backend (`@Roles('HR', 'ADMIN')`).
4. **Temps réel / notifications** :
   - Brancher `HRNotificationsPage` sur un flux temps réel (WebSocket / SSE).

Ce README sert de **guide complet** pour expliquer ton travail RH à ton enseignant  
et pour que tu puisses facilement continuer à développer la partie backend associée.

