// Types centralisés utilisés dans tout le frontend.
// Ce fichier est pensé pour du TypeScript strict.

export type UserRoleId = 'admin' | 'hr' | 'manager' | 'employee';

export interface UserRole {
  id: UserRoleId;
  label: string;
  description: string;
  icon: string;
}

// Données du formulaire de login (rôle déterminé par le backend)
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Paramètres d’accessibilité globaux
export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  reduceMotion: boolean;
  screenReader: boolean;
  voiceControl?: boolean;
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

// État de l'upload CSV
export interface CSVUploadState {
  file: File | null;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  successMessage: string | null;
}

// Type pour les activités d'un employé
export interface EmployeeActivity {
  id: number;
  title: string;
  type: 'TRAINING' | 'PROJECT' | 'MISSION' | 'CERTIFICATION' | 'AUDIT' | 'COACHING';
  role: string;
  date: string;
  duration?: string;
  context?: string;
  department?: string;
  status: 'PENDING_RESPONSE' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED' | 'IN_PROGRESS';
  description?: string;
}

// Pour le store employé (optionnel)
export interface EmployeeState {
  pendingActivities: EmployeeActivity[];
  activityHistory: EmployeeActivity[];
  isLoading: boolean;
  error: string | null;
}