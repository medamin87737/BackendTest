import React from 'react';
import { motion } from 'framer-motion';

const METERS = [
  { label: 'Confiance IA globale', value: 0.89, color: 'from-emerald-400 to-emerald-600' },
  { label: 'Adéquation compétences', value: 0.76, color: 'from-sky-400 to-sky-600' },
  { label: 'Compatibilité équipe', value: 0.68, color: 'from-violet-400 to-violet-600' },
];

export const RecommendationMeters: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {METERS.map((m) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-4 backdrop-blur-xl"
        >
          <p className="text-xs text-slate-300">{m.label}</p>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-800">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${m.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${m.value * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-200">{Math.round(m.value * 100)}%</p>
        </motion.div>
      ))}
    </div>
  );
};

