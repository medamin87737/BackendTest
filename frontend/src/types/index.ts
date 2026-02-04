// Types centralisés utilisés dans tout le frontend.
// Ce fichier est pensé pour du TypeScript strict.

export type UserRoleId = 'hr' | 'manager' | 'employee';

export interface UserRole {
  id: UserRoleId;
  label: string;
  description: string;
  icon: string;
}

// Données du formulaire de login
export interface LoginFormData {
  email: string;
  password: string;
  role: UserRoleId;
  rememberMe: boolean;
}

// Paramètres d’accessibilité globaux
export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  reduceMotion: boolean;
  screenReader: boolean;
}

// Paramètres pour les objets 3D de fond
export interface ThreeDObject {
  id: string;
  type: 'cube' | 'sphere';
  position: [number, number, number];
  rotationSpeed: number;
  size: number;
  color: string;
}