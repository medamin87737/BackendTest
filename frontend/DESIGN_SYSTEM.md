## Design System – Intelligent Employee Recommendation Dashboard

Ce fichier documente le **template UI** utilisé dans ton projet (couleurs, typographie, composants, états). Tu peux le montrer directement à ton enseignant comme référence de design.

---

### 1. Palette de couleurs

- **Couleurs principales (`primary` – Tailwind)**  
  - `primary-50`  : `#eff6ff`  
  - `primary-100` : `#dbeafe`  
  - `primary-200` : `#bfdbfe`  
  - `primary-300` : `#93c5fd`  
  - `primary-400` : `#60a5fa`  
  - **`primary-500` : `#3b82f6` (boutons, éléments actifs)**  
  - `primary-600` : `#2563eb` (hover boutons)  
  - `primary-700` : `#1d4ed8`  
  - **`primary-800` : `#1e40af` (fond dégradé)**  
  - `primary-900` : `#1e3a8a`

#### Fond & surfaces (mode sombre – thème `dark`)  

- Background global : `#020617` → `#0b1120` (gradient)  
- Surface principale : `#020617` / `#0f172a`  
- Surface secondaire (cartes) : `rgba(15, 23, 42, 0.80)` (glassmorphism)  
- Bordures : `rgba(148, 163, 184, 0.4)` (`#94a3b8` à opacité réduite)

#### Fond & surfaces (mode clair – thème `light`)  

- Background global : `#f9fafb` (gris très clair)  
- Surface principale : `#ffffff`  
- Surface secondaire (cartes) : `#f3f4f6` avec ombre douce  
- Bordures : `#e5e7eb`  
- Texte principal : `#111827` (`text-gray-900`)  
- Texte secondaire : `#4b5563` (`text-gray-600`)

#### Fond & surfaces (mode blanc – thème `white`)  

- Background global : `#f9fafb` avec overlay très léger pour laisser apparaître l’animation 3D  
- Cartes : `#ffffff` (`bg-white`) avec shadow légère `rgba(15, 23, 42, 0.08)`  
- Sidebar : `#f3f4f6` (`bg-gray-100` / `bg-gray-50`)  
- Tableaux : head `#e5e7eb`, lignes alternées `#ffffff` / `#f3f4f6`, hover `#e5e7eb`, texte par défaut `#000000` et sur hover `#000000`

- **Texte**  
  - Titre / texte principal (dark) : `#e5e7eb`  
  - Texte secondaire (dark) : `#9ca3af`  
  - Texte désactivé (dark) : `#6b7280`  
  - Titre / texte principal (light/white) : `#111827`  
  - Texte secondaire (light/white) : `#4b5563`

- **État & feedback**  
  - Succès : `#22c55e`  
  - Danger : `#ef4444`  
  - Warning : `#fbbf24`

---

### 2. Branding – Titre SkillUpTN

Le titre **SkillUpTN** est animé et s’adapte au thème via le composant `BrandTitle`.

- **Composant** : `src/components/BrandTitle.tsx`  
- **Animation** :
  - Gradient animé (background-position X) + légère rotation 3D (`rotateX`, `rotateY`) et petit `scale`.
  - Durée : ~10s en boucle infinie (Framer Motion).

#### Couleurs du gradient selon le thème

- **Thème sombre (`dark`)** :  
  - Gradient texte : `from-blue-400 via-blue-600 to-blue-800`  
  - Ombre texte hero : `drop-shadow(0 0 16px rgba(30, 64, 175, 0.5))`  
  - Ombre texte sidebar/chip : `drop-shadow(0 0 10px rgba(30, 64, 175, 0.45))`

- **Thème clair (`light`)** :  
  - Gradient texte : `from-white via-gray-400 to-blue-800` (donc lisible sur fond clair)  
  - Ombre texte hero : `drop-shadow(0 0 22px rgba(30, 64, 175, 0.65))`  
  - Ombre texte sidebar : `drop-shadow(0 0 14px rgba(30, 64, 175, 0.6))`

- **Thème blanc (`white`)** :  
  - Texte plein : `text-blue-800` (bleu sombre uniforme)  
  - Ombre : `drop-shadow(0 0 12px rgba(30, 64, 175, 0.35))` (hero) / `0 0 8px rgba(30, 64, 175, 0.3)` (sidebar)

Le composant est utilisé :
- Sur la page de login (titre hero)
- Dans la sidebar Admin et RH (titre de l’application)

---

### 3. Typographie

- **Font principale** : `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`  
- **Hiérarchie** :
  - H1 (page title) : 32–48 px, `font-bold`, couleur `#e5e7eb`
  - H2 : 24–28 px, `font-semibold`
  - H3 : 18–20 px, `font-semibold`
  - Body : 14–16 px, `font-normal`, couleur `#e5e7eb` ou `#9ca3af`
  - Légendes / labels : 11–12 px, `uppercase` pour les labels de KPI

---

### 4. Rayons & effets (glassmorphism / néomorphisme)

- **Rayons (border-radius)**
  - Cartes / panneaux : `16px` ou `24px`  
  - Boutons : `9999px` (pill buttons) ou `12px`  
  - Inputs : `9999px`

- **Glassmorphism (ex. cartes login / dashboard)**  
  - Background : `rgba(15, 23, 42, 0.75)`  
  - Bordure : `1px solid rgba(148, 163, 184, 0.40)`  
  - `backdrop-blur`: `20px` à `32px`  
  - Légère ombre : `0 24px 60px rgba(15, 23, 42, 0.85)`

- **Effet néomorphique léger (widgets circulaires / switch)**  
  - Fond : `#0f172a`  
  - Ombre interne : `inset 0 1px 0 rgba(148, 163, 184, 0.4)`  
  - Ombre externe douce : `0 8px 20px rgba(15, 23, 42, 0.9)`

---

### 5. Composants principaux

#### 5.1. Bouton primaire

- **Styles Tailwind** :  
  - `inline-flex items-center justify-center`  
  - `px-4 py-2.5`  
  - `rounded-full`  
  - `bg-primary-600 hover:bg-primary-500`  
  - `text-white font-semibold`  
  - `shadow-lg shadow-primary-900/40`  
  - `transition-transform transform hover:-translate-y-0.5 disabled:opacity-60`

- **Usages** : CTA login, actions principales dans le dashboard.

#### 5.2. Bouton secondaire

- Bordure `border border-slate-600`, fond `transparent`, texte `#e5e7eb`, hover : `bg-slate-800/60`.

#### 5.3. Input texte (email / password)

- **Styles Tailwind** :  
  - `w-full px-3 py-2`  
  - `rounded-full`  
  - `bg-white/10 border border-white/30`  
  - `text-white placeholder:text-gray-300`  
  - `focus:outline-none focus:ring-2 focus:ring-primary-400`

#### 5.4. Sélecteur de rôle (RoleSelector)

- Boutons pill dans une grille :  
  - `rounded-xl border px-3 py-2 text-left text-xs sm:text-sm`  
  - Actif : `bg-primary-600/90 text-white border-primary-300 shadow-lg`  
  - Inactif : `bg-black/20 text-gray-100 border-white/20 hover:border-primary-300`.

#### 5.5. Cartes KPI (Dashboard)

- **Container** :  
  - `rounded-2xl border border-slate-800/80`  
  - `bg-slate-900/70 backdrop-blur-xl`  
  - `px-4 py-4 shadow-lg shadow-slate-950/70`

- **Contenu** :
  - Label : texte 11 px, `uppercase`, `text-slate-400`
  - Valeur : 24–28 px, `font-semibold`, `text-slate-50`
  - Sous-texte : 12 px, `text-emerald-400` (tendance positive)

#### 5.6. Tableau employés (HR)

- Table container : `rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl overflow-x-auto`
- Head : fond `bg-slate-900/90`, texte `text-slate-300`
- Lignes : `border-t border-slate-800/80 hover:bg-slate-900/60`

---

### 6. Thèmes & accessibilité visuelle

- **Thèmes supportés** : `dark`, `light`, `white` (pilotés par `useAuthStore().theme` et l’attribut `data-theme` sur `<html>`).  
- Le thème impacte :
  - Les fonds (`background`), couleurs des cartes et des sidebars.
  - Les couleurs de texte (noir / gris foncé en clair, blanc / gris en sombre).
  - Les tableaux (fond, hover, alternance de lignes).
  - Le titre animé **SkillUpTN** (voir section 2).

- **Overrides CSS** spécifiques aux thèmes : `src/index.css`  
  - `html[data-theme='light'] { ... }` : définit contrastes adaptés pour le mode clair.  
  - `html[data-theme='white'] { ... }` : accentue le contraste sur fond très clair et rend visible l’animation 3D.

---

### 7. Animations & micro-interactions

- **Framer Motion** :
  - Entrée de page : `initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} duration=0.4`
  - Hover boutons : léger `scale` ou `translateY(-2px)`

- **Background 3D (React Three Fiber)** :
  - Objets flottants (cubes / sphères) : animation sinus sur l’axe Y, rotation lente.
  - Particules : champ de points avec rotation lente de la caméra.

---

### 8. Organisation du projet (template UI)

- `src/pages/` : pages principales (`LoginPage`, `DashboardPage` + sous-pages dans `pages/dashboard`).
- `src/components/` : composants transverses (`AnimatedBackground`, `LoginForm`, `RoleSelector`, `AccessibilityMenu`, `ThemeToggle`, `LoadingSpinner`).
- `src/widgets/` : widgets de dashboard réutilisables (`KpiGrid`, `RecommendationMeters`, etc.).
- `src/store/` : état global (authentification, thème) via Zustand.
- `tailwind.config.js` : palette, animations globales, `darkMode: 'class'`.

---

