import React from 'react';
import { motion } from 'framer-motion';
import { HRDashboardHome } from './HRDashboardHome';

export const HRStatisticsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <header>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-slate-50"
        >
          Statistiques & graphiques
        </motion.h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Vue détaillée des indicateurs clés RH : couverture de compétences, activités par département, progression
          globale et gaps critiques.
        </p>
      </header>

      {/* On réutilise les mêmes widgets que sur le Dashboard principal */}
      <HRDashboardHome />
    </div>
  );
};

export default HRStatisticsPage;

