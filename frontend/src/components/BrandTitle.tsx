import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

interface BrandTitleProps {
  /** Utilisé pour adapter légèrement le style selon le contexte (hero, sidebar, chip…) */
  variant?: 'hero' | 'sidebar' | 'chip';
}

export const BrandTitle: React.FC<BrandTitleProps> = ({ variant = 'sidebar' }) => {
  const theme = useAuthStore((s) => s.theme);
  const isDark = theme === 'dark';

  const baseClass = (() => {
    // Mode sombre : gradient blanc -> bleu sombre, shadow adoucie
    if (isDark) {
      if (variant === 'hero') {
        return 'inline-block bg-gradient-to-r from-white via-blue-400 to-blue-800 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(30,64,175,0.5)]';
      }
      return 'inline-block bg-gradient-to-r from-white via-blue-400 to-blue-800 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(30,64,175,0.45)]';
    }
    // Mode blanc : bleu sombre plein (pas de blanc/gris), avec shadow légère
    if (theme === 'white') {
      if (variant === 'hero') {
        return 'inline-block text-blue-800 drop-shadow-[0_0_12px_rgba(30,64,175,0.35)]';
      }
      return 'inline-block text-blue-800 drop-shadow-[0_0_8px_rgba(30,64,175,0.3)]';
    }
    // Mode clair (light) : blanc -> gris -> bleu sombre
    if (variant === 'hero') {
      return 'inline-block bg-gradient-to-r from-white via-gray-400 to-blue-800 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(30,64,175,0.65)]';
    }
    return 'inline-block bg-gradient-to-r from-white via-gray-400 to-blue-800 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(30,64,175,0.6)]';
  })();

  return (
    <motion.span
      className={baseClass}
      style={{ backgroundSize: '200% 200%' }}
      animate={{
        backgroundPositionX: ['0%', '100%', '0%'],
        rotateX: [0, 6, 0],
        rotateY: [0, -6, 0],
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      SkillUpTN
    </motion.span>
  );
};

export default BrandTitle;

