import React from 'react';
import { motion } from 'framer-motion';
import { UploadEmployeesCSV } from '../../components/UploadEmployeesCSV';

export const HRUploadEmployeesPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-semibold text-slate-50"
      >
        Upload CSV employés
      </motion.h2>
      <p className="text-sm text-slate-300 max-w-2xl">
        Importez massivement les collaborateurs à partir d&apos;un fichier CSV standardisé. Le module ci-dessous est
        déjà connecté à l&apos;API Nest.
      </p>
      <UploadEmployeesCSV />
    </div>
  );
};

export default HRUploadEmployeesPage;

