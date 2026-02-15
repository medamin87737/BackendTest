## Accessibilité – SkillUpTN (Dashboard RH & Admin)

Ce document décrit toutes les fonctionnalités d’accessibilité que tu as maintenant dans le projet (où elles sont, comment les activer, et pour qui elles sont utiles). Il complète le `DESIGN_SYSTEM.md` côté UX/UI.

---

### 1. Résumé des fonctionnalités

- **Contraste élevé** : bascule un mode à contraste renforcé pour les personnes avec basse vision.
- **Taille de police** : 3 niveaux (`normal`, `A+`, `A++`) pour agrandir tous les textes de l’interface.
- **Réduction des animations** : permet de désactiver l’animation 3D de fond pour les personnes sensibles au mouvement.
- **Lecteur de sélection (text-to-speech)** : lit à voix haute le texte sélectionné (FR / EN).
- **Commande vocale (login)** : permet de renseigner l’email, le mot de passe et lancer la connexion à la voix.
- **Langue de l’interface** : FR / EN (titres, menus, textes marketing principaux).

Toutes ces options se trouvent dans le composant `AccessibilityMenu`, visible en haut à droite sur toutes les pages principales (login, admin, RH, upload CSV, page d’accueil par rôle).
Un **bouton rond** avec l’icône d’accessibilité ouvre un **panneau vertical** moderne qui se déploie sous l’icône, sans déplacer le layout.

---

### 2. Où se trouvent les composants et la logique

- **Menu d’accessibilité**  
  - Fichier : `src/components/AccessibilityMenu.tsx`  
  - Utilisé dans :
    - `src/pages/LoginPage.tsx`
    - `src/layout/AdminLayout.tsx`
    - `src/layout/HRLayout.tsx`
    - `src/pages/RoleWelcomePage.tsx`
    - `src/pages/HRDashboard.tsx` (Upload CSV legacy)
  - Contrôle les propriétés : `highContrast`, `fontSize`, `reduceMotion`, `screenReader`, `voiceControl` et la `language` (FR / EN).
  - Remplace les anciens contrôles de thème / déconnexion qui se trouvaient dans le header des layouts Admin / RH : désormais, le **changement de thème** se fait uniquement via ce menu, et la déconnexion reste disponible en bas des sidebars.

- **Lecteur de sélection (text-to-speech)**  
  - Fichier : `src/components/SelectionReader.tsx`  
  - Fonction : quand `screenReader` est activé, lit automatiquement toute sélection de texte via l’API `speechSynthesis` du navigateur.  
  - Choisit la langue de lecture selon `useAuthStore().language` (`fr-FR` ou `en-US`) et, si possible, une voix adaptée (`getVoices()`).

- **Commande vocale (login uniquement)**  
  - Fichier : `src/components/VoiceLoginCommands.tsx`  
  - Branché uniquement dans `src/pages/LoginPage.tsx` (globalement suffisant pour l’accessibilité primaire).  
  - Active un `SpeechRecognition` (ou `webkitSpeechRecognition`) continu pour reconnaître des **commandes vocales structurées** :
    - Pour l’email : phrases contenant `email` ou `adresse`
    - Pour le mot de passe : phrases contenant `mot de passe` ou `password`
    - Pour la soumission : phrases contenant `se connecter`, `connexion`, `sign in`, `log in`, `login`  
  - Remplit les champs `#email` et `#password` du `LoginForm` puis soumet le formulaire (`requestSubmit()`).
  - Utilise la langue d’écoute (`fr-FR` / `en-US`) selon `useAuthStore().language`.
  - Si l’API de reconnaissance vocale n’est pas disponible, affiche un `alert` expliquant de tester avec **Chrome desktop**.

- **Internationalisation (i18n)**  
  - Fichier : `src/i18n.ts`  
  - Hook : `useI18n()` → fournit `t(key)` et suit `useAuthStore().language` (`fr` / `en`).  
  - Déjà branché sur :
    - Login : textes marketing + titres de la carte (`login.hero.*`, `login.form.*`)
    - Sidebar Admin : libellés (`admin.sidebar.*`)
    - Sidebar RH : libellés (`hr.sidebar.*`)

- **Store global (thème + langue)**  
  - Fichier : `src/store/authStore.ts`  
  - Types : `ThemeId = 'light' | 'white'`, `LanguageId = 'fr' | 'en'`  
  - Expose :
    - `theme` / `setTheme(theme)` → gère l’attribut `data-theme` sur `<html>`
    - `language` / `setLanguage(language)` → stocke aussi le choix dans `localStorage` (`language`)

- **Types d’accessibilité**  
  - Fichier : `src/types/index.ts`  
  - Interface :  
    ```ts
    export interface AccessibilitySettings {
      highContrast: boolean;
      fontSize: 'normal' | 'large' | 'xlarge';
      reduceMotion: boolean;
      screenReader: boolean;
      voiceControl?: boolean;
    }
    ```

---

### 3. Détails fonctionnels – options du menu d’accessibilité

- **Contraste (High contrast)**  
  - Toggle : `highContrast`  
  - Effet : passe les cartes / fonds en gris très foncé, renforce les bordures claires, force le texte en blanc / gris.
  - Utile pour : utilisateurs avec basse vision ou environnements très lumineux.

- **Taille de police (A / A+ / A++)**  
  - Contrôle : `fontSize` dans `AccessibilitySettings`.  
  - Appliqué dans tous les layouts (`LoginPage`, `AdminLayout`, `HRLayout`, `RoleWelcomePage`, `HRDashboard`) via une `fontSizeClass` Tailwind (`text-[15px]` → `text-[19px]`).

- **Réduction des animations**  
  - Toggle : `reduceMotion`  
  - Effet : supprime l’animation 3D de fond (`AnimatedBackground`) tout en gardant la vidéo floue et le contenu lisible.  
  - Utile pour : personnes sujettes à la cinétose, migraine, ou préférant une interface plus statique.

- **Lecteur (screenReader)**  
  - Toggle : `screenReader`  
  - Effet : active le composant `SelectionReader` qui lit la sélection texte via synthèse vocale.  
  - Langues supportées : FR / EN. Le navigateur doit fournir des voix compatibles.

- **Commande vocale (voiceControl)**  
  - Toggle : `voiceControl`  
  - Effet : active `VoiceLoginCommands` sur la page de login pour :
    - Remplir l’email à partir de phrases comme :  
      - FR : “email john.doe@exemple.com”, “adresse john point doe arobase …”  
      - EN : “email john.doe@example.com”
    - Remplir le mot de passe avec :  
      - FR : “mot de passe secret un deux trois”  
      - EN : “password secret one two three”
    - Soumettre le formulaire avec :  
      - FR : “se connecter”, “connexion”  
      - EN : “sign in”, “log in”, “login”
  - Limites : dépend du support `SpeechRecognition` du navigateur (idéalement Chrome desktop).

- **Langue UI (FR / EN)**  
  - Contrôle : `language` dans `useAuthStore` et `setLanguage` appelé depuis `AccessibilityMenu`.  
  - Effet : change :
    - Les libellés de la sidebar Admin et RH via `useI18n().t(...)`
    - Les textes marketing et titres de la page de login
    - La langue de la voix pour `SelectionReader` et de l’écoute pour `VoiceLoginCommands`.

---

### 4. Pages impactées

- **Login (`src/pages/LoginPage.tsx`)**  
  - Accessibilité complète : contraste, font size, réduction animations, lecteur de sélection, **commande vocale**, changement de langue.

- **Admin Dashboard (`src/layout/AdminLayout.tsx`)**  
  - Accessibilité : contraste, font size, réduction animations, lecteur de sélection, changement de langue (libellés de la sidebar).

- **HR Dashboard (`src/layout/HRLayout.tsx`)**  
  - Accessibilité : contraste, font size, réduction animations, lecteur de sélection, changement de langue (libellés de la sidebar RH).

- **Page d’accueil par rôle (`src/pages/RoleWelcomePage.tsx`)**  
  - Accessibilité : contraste, font size, réduction animations, lecteur de sélection.

- **Page Upload CSV legacy (`src/pages/HRDashboard.tsx` alias `UploadCSVPage`)**  
  - Accessibilité : contraste, font size, réduction animations, lecteur de sélection.

---

### 5. Notes pour la soutenance / rapport

- Tu peux présenter :
  - **Support multi-thèmes** (dark / light / white) combiné avec les options de contraste et taille de police.
  - **Accessibilité avancée** : text-to-speech du texte sélectionné + commandes vocales pour le login (inclus FR / EN).
  - **Internationalisation** : la langue de l’UI et de la voix est synchronisée (FR / EN), avec une architecture prête à être étendue.
  - Le tout est encapsulé dans des composants réutilisables (`AccessibilityMenu`, `SelectionReader`, `VoiceLoginCommands`) et un store global (`useAuthStore`).

