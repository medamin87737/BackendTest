import { create } from 'zustand';
import type { UserRoleId } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRoleId;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  loginSuccess: (payload: { user: AuthUser; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  theme: 'dark',
  setTheme: (theme) =>
    set(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
      return { theme };
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
}));

