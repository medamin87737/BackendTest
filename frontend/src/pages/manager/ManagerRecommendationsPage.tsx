import React from 'react';
import { motion } from 'framer-motion';

const recommendedEmployees = [
  { name: 'Sara Ben', email: 'sara@example.com', status: 'Accepté' },
  { name: 'Yassine M.', email: 'yassine@example.com', status: 'Rejeté' },
  { name: 'Amel R.', email: 'amel@example.com', status: 'En attente' },
];

export const ManagerRecommendationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.h1 className="text-2xl font-bold text-slate-50">Employés recommandés</motion.h1>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/70 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="bg-slate-800/50 text-slate-200">
              <th className="px-3 py-2">Nom</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {recommendedEmployees.map((emp) => (
              <tr key={emp.email} className="border-t border-slate-700 hover:bg-slate-800/60">
                <td className="px-3 py-2">{emp.name}</td>
                <td className="px-3 py-2">{emp.email}</td>
                <td className={`px-3 py-2 font-semibold ${emp.status === 'Accepté' ? 'text-emerald-400' : emp.status === 'Rejeté' ? 'text-red-400' : 'text-amber-400'}`}>{emp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
