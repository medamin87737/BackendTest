import { create } from 'zustand';
import type { UserRoleId } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRoleId;
  firstName?: string;
  lastName?: string;
  department?: string;
  phoneNumber?: string;
  profilePicture?: string;
  isActive?: boolean;
  lastLogin?: Date;
}

type ThemeId = 'light' | 'dark' | 'white';
type LanguageId = 'fr' | 'en';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  theme: ThemeId;
  language: LanguageId;
  setTheme: (theme: ThemeId) => void;
  setLanguage: (language: LanguageId) => void;
  loginSuccess: (payload: { user: AuthUser; token: string }) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  theme: 'dark',
  language: 'fr',
  setTheme: (theme) =>
    set(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.setAttribute('data-theme', theme);
      }
      return { theme };
    }),
  setLanguage: (language) =>
    set(() => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('language', language);
      }
      return { language };
    }),
  loginSuccess: ({ user, token }) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('auth_token', token);
      window.localStorage.setItem('auth_user', JSON.stringify(user));
    }
    set({ user, token });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('auth_user');
    }
    set({ user: null, token: null });
  },
  updateUser: (updatedFields) =>
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...updatedFields };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      }
      return { user: updatedUser };
    }),
}));