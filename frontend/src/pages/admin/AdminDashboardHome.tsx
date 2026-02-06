import React from 'react';
import { motion } from 'framer-motion';

export const AdminDashboardHome: React.FC = () => {
  return (
    <div className="px-4 py-6 md:px-8 space-y-4">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-slate-50"
      >
        Global Overview
      </motion.h1>
      <p className="text-sm text-slate-300 max-w-2xl">
        Vue globale du système : utilisateurs, employés actifs, activités créées et recommandations IA générées.
      </p>
    </div>
  );
};

export default AdminDashboardHome;

