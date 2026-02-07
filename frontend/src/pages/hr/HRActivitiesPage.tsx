import React from 'react';
import { motion } from 'framer-motion';

const mockActivities = [
  { name: 'Programme Data Upskilling', type: 'Upskilling', status: 'En cours', slots: '32 / 40' },
  { name: 'Sprint Cloud Azure', type: 'Expertise', status: 'Planifié', slots: '12 / 20' },
  { name: 'Atelier Soft Skills', type: 'Soft skills', status: 'Terminé', slots: '18 / 18' },
];

export const HRActivitiesPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold text-slate-50"
          >
            Gestion des activités
          </motion.h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Pilotage des activités de développement (formations, missions, projets) et suivi des taux de remplissage.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary-900/40 hover:bg-primary-500 transition-transform hover:-translate-y-0.5"
        >
          Lancer une activité
        </button>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/90 flex flex-wrap gap-2 items-center justify-between">
          <p className="text-xs text-slate-300">Vue consolidée des activités créées par les RH et les managers.</p>
          <div className="flex flex-wrap gap-2">
            <select
              className="px-3 py-2 rounded-full bg-white/5 border border-white/20 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option>Statut</option>
              <option>En cours</option>
              <option>Planifié</option>
              <option>Terminé</option>
            </select>
            <select
              className="px-3 py-2 rounded-full bg-white/5 border border-white/20 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option>Type</option>
              <option>Upskilling</option>
              <option>Expertise</option>
              <option>Soft skills</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-slate-900/90 text-slate-300">
                <th className="px-3 py-2 font-medium">Activité</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Statut</th>
                <th className="px-3 py-2 font-medium">Places</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockActivities.map((activity) => (
                <tr key={activity.name} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                  <td className="px-3 py-2 text-sm text-slate-100">{activity.name}</td>
                  <td className="px-3 py-2 text-xs text-slate-300">{activity.type}</td>
                  <td className="px-3 py-2 text-xs">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] ${
                        activity.status === 'En cours'
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
                          : activity.status === 'Planifié'
                            ? 'bg-sky-500/20 text-sky-200 border border-sky-400/40'
                            : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-300">{activity.slots}</td>
                  <td className="px-3 py-2 text-xs text-right space-x-2">
                    <button type="button" className="text-primary-300 hover:text-primary-200">
                      Détails
                    </button>
                    <button type="button" className="text-red-400 hover:text-red-300">
                      Annuler
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HRActivitiesPage;

