import React from 'react';
import { motion } from 'framer-motion';

const evaluations = [
  { activity: 'Data Upskilling', score: 92, status: 'Terminé' },
  { activity: 'Leadership N-1', score: 85, status: 'En cours' },
  { activity: 'Cloud Sprint', score: 78, status: 'Terminé' },
];

export const EvaluationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.h1 className="text-2xl font-bold text-slate-50">Évaluation des activités</motion.h1>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/70 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="bg-slate-800/50 text-slate-200">
              <th className="px-3 py-2">Activité</th>
              <th className="px-3 py-2">Score</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evalItem, idx) => (
              <tr key={idx} className="border-t border-slate-700 hover:bg-slate-800/60">
                <td className="px-3 py-2">{evalItem.activity}</td>
                <td className="px-3 py-2 font-semibold text-emerald-400">{evalItem.score} / 100</td>
                <td className={`px-3 py-2 font-semibold ${evalItem.status === 'Terminé' ? 'text-emerald-400' : 'text-amber-400'}`}>{evalItem.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
