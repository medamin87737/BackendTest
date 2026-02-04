import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export const ThemeToggle: React.FC = () => {
  const theme = useAuthStore((s) => s.theme);
  const setTheme = useAuthStore((s) => s.setTheme);

  const isDark = theme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative inline-flex h-8 w-14 items-center rounded-full border border-slate-600 bg-slate-900/80 px-1 text-xs text-slate-200"
      aria-label="Basculer le thème clair/sombre"
    >
      <motion.div
        layout
        className="h-6 w-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 shadow-lg shadow-primary-900/40"
        initial={false}
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
      <span className="absolute left-2 text-[10px] select-none">☾</span>
      <span className="absolute right-2 text-[10px] select-none">☼</span>
    </button>
  );
};

