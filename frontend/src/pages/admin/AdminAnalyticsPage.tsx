import React from 'react';
import { motion } from 'framer-motion';

export const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="px-4 py-6 md:px-8 space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-semibold text-slate-50"
      >
        Analytics & Statistics
      </motion.h2>
      <p className="text-sm text-slate-300 max-w-2xl">
        Statistiques globales (croissance utilisateurs, couverture de compétences, efficacité de l&apos;IA, etc.).
      </p>
    </div>
  );
};

export default AdminAnalyticsPage;

