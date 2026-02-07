import React from 'react';
import { motion } from 'framer-motion';

const mockSkills = [
  { name: 'Data Engineering', level: 'Expert', owners: 8 },
  { name: 'Cloud Azure', level: 'Intermédiaire', owners: 14 },
  { name: 'Leadership', level: 'Avancé', owners: 21 },
];

export const HRSkillsPage: React.FC = () => {
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
            Gestion des compétences
          </motion.h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Catalogue des compétences clés de l&apos;entreprise, avec niveaux, propriétaires et liens vers les
            activités associées.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary-900/40 hover:bg-primary-500 transition-transform hover:-translate-y-0.5"
        >
          Ajouter une compétence
        </button>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/90 flex flex-wrap gap-2 items-center justify-between">
          <p className="text-xs text-slate-300">Compétences stratégiques monitorées par le moteur de recommandation.</p>
          <button
            type="button"
            className="text-[11px] text-primary-300 hover:text-primary-200 underline underline-offset-2"
          >
            Gérer les référentiels
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-slate-900/90 text-slate-300">
                <th className="px-3 py-2 font-medium">Compétence</th>
                <th className="px-3 py-2 font-medium">Niveau cible</th>
                <th className="px-3 py-2 font-medium">Nb. de porteurs</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSkills.map((skill) => (
                <tr key={skill.name} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                  <td className="px-3 py-2 text-sm text-slate-100">{skill.name}</td>
                  <td className="px-3 py-2 text-xs text-slate-300">{skill.level}</td>
                  <td className="px-3 py-2 text-xs text-slate-400">{skill.owners}</td>
                  <td className="px-3 py-2 text-xs text-right space-x-2">
                    <button type="button" className="text-primary-300 hover:text-primary-200">
                      Détails
                    </button>
                    <button type="button" className="text-red-400 hover:text-red-300">
                      Supprimer
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

export default HRSkillsPage;

