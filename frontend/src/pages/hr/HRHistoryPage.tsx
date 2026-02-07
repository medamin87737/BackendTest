import React from 'react';
import { motion } from 'framer-motion';

const mockHistory = [
  { date: '12/01/2026', actor: 'HR Admin', action: 'Création activité', detail: 'Programme Data Upskilling' },
  { date: '10/01/2026', actor: 'Manager IT', action: 'Demande activité', detail: 'Mission API Clients' },
  { date: '08/01/2026', actor: 'HR BP', action: 'Import CSV', detail: '45 employés – département IT' },
];

export const HRHistoryPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <header>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-slate-50"
        >
          Historique & traçabilité
        </motion.h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Journal des actions critiques (création d&apos;activités, imports CSV, validations de recommandations) pour
          assurer la traçabilité complète.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/90 flex items-center justify-between">
          <p className="text-xs text-slate-300">Historique exportable pour audit interne.</p>
          <button
            type="button"
            className="text-[11px] text-primary-300 hover:text-primary-200 underline underline-offset-2"
          >
            Exporter l&apos;historique
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-slate-900/90 text-slate-300">
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Acteur</th>
                <th className="px-3 py-2 font-medium">Action</th>
                <th className="px-3 py-2 font-medium">Détail</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((item) => (
                <tr key={item.date + item.actor + item.action} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                  <td className="px-3 py-2 text-xs text-slate-300">{item.date}</td>
                  <td className="px-3 py-2 text-xs text-slate-100">{item.actor}</td>
                  <td className="px-3 py-2 text-xs text-slate-300">{item.action}</td>
                  <td className="px-3 py-2 text-xs text-slate-400">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HRHistoryPage;

