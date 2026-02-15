import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export const ThemeToggle: React.FC = () => {
  const theme = useAuthStore((s) => s.theme);
  const setTheme = useAuthStore((s) => s.setTheme);

  const handleToggle = () => {
    // Bascule entre 2 thèmes : light <-> white
    if (theme === 'light') {
      setTheme('white');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative inline-flex h-8 w-20 items-center rounded-full border border-slate-600 bg-slate-900/80 px-1 text-[10px] text-slate-200"
      aria-label="Basculer le thème (clair / blanc)"
    >
      <motion.div
        layout
        className="h-6 w-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 shadow-lg shadow-primary-900/40"
        initial={false}
        animate={{
          x: theme === 'light' ? 0 : 24,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
      <span className="absolute left-1.5 select-none">CL</span>
      <span className="absolute right-1.5 select-none">BL</span>
    </button>
  );
};

