import React from 'react';
import { motion } from 'framer-motion';

const KPIS = [
  { label: 'Matching en cours', value: '128', sub: '+12% vs hier' },
  { label: 'Taux de satisfaction', value: '94%', sub: 'Managers satisfaits' },
  { label: 'Time-to-hire moyen', value: '8 j', sub: '-3 jours ce mois' },
  { label: 'Profils IA recommandés', value: '345', sub: 'Pool actif' },
];

export const KpiGrid: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {KPIS.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-slate-800/80 bg-slate-900/70 px-4 py-4 shadow-lg shadow-slate-950/70 backdrop-blur-xl"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">{item.value}</p>
          <p className="mt-1 text-xs text-emerald-400">{item.sub}</p>
        </motion.div>
      ))}
    </div>
  );
};

