import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAuthStore((s) => s.theme);
  const setTheme = useAuthStore((s) => s.setTheme);

  useEffect(() => {
    // Initialisation depuis localStorage si présent (une seule fois)
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark' || stored === 'white') {
        setTheme(stored);
      }
    }
    // On ne met pas `theme` en dépendance pour éviter une boucle infinie :
    // on ne veut lire localStorage qu'une seule fois à l'initialisation.
  }, [setTheme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return <>{children}</>;
};

