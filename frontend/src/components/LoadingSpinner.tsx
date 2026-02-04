import React from 'react';
import { motion } from 'framer-motion';

export interface LoadingSpinnerProps {
  label?: string;
}

// Spinner accessible pour les chargements de formulaire
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ label }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 text-sm text-gray-100"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-10 w-10">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-primary-300/20 border-t-primary-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
        <span
          className="absolute inset-2 rounded-full bg-primary-500/40 blur-sm"
          aria-hidden="true"
        />
      </div>
      <span>{label ?? 'Chargement…'}</span>
    </div>
  );
};
