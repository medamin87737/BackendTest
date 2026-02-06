import React from 'react';
import { motion } from 'framer-motion';

export const AdminEmployeesPage: React.FC = () => {
  return (
    <div className="px-4 py-6 md:px-8 space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-semibold text-slate-50"
      >
        Employees Management
      </motion.h2>
      <p className="text-sm text-slate-300 max-w-2xl">
        Vue complète sur les employés, départements, postes et historiques. Prête pour la connexion aux endpoints
        REST.
      </p>
    </div>
  );
};

export default AdminEmployeesPage;

