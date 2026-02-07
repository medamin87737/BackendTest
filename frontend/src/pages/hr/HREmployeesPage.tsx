import React from 'react';
import { motion } from 'framer-motion';

const mockEmployees = [
  { name: 'Sara Ben', role: 'Data Analyst', department: 'Data', status: 'Actif' },
  { name: 'Yassine M.', role: 'Dev Full-Stack', department: 'IT', status: 'Actif' },
  { name: 'Amel R.', role: 'HR Business Partner', department: 'RH', status: 'Actif' },
];

export const HREmployeesPage: React.FC = () => {
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
            Gestion des employés
          </motion.h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Liste centralisée des collaborateurs, avec filtres par département et poste. Vue prête à être connectée aux
            endpoints REST.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary-900/40 hover:bg-primary-500 transition-transform hover:-translate-y-0.5"
          >
            Ajouter un employé
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white border border-white/30 hover:bg-white/20"
          >
            Import CSV
          </button>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/90 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Rechercher par nom, email, poste..."
              className="w-full md:w-64 px-3 py-2 rounded-full bg-white/5 border border-white/20 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <select
              className="px-3 py-2 rounded-full bg-white/5 border border-white/20 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option>Département</option>
              <option>IT</option>
              <option>Data</option>
              <option>RH</option>
            </select>
            <select
              className="px-3 py-2 rounded-full bg-white/5 border border-white/20 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option>Statut</option>
              <option>Actif</option>
              <option>Inactif</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-slate-900/90 text-slate-300">
                <th className="px-3 py-2 font-medium">Employé</th>
                <th className="px-3 py-2 font-medium">Rôle</th>
                <th className="px-3 py-2 font-medium">Département</th>
                <th className="px-3 py-2 font-medium">Statut</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockEmployees.map((employee) => (
                <tr key={employee.name} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                  <td className="px-3 py-2 text-sm text-slate-100">{employee.name}</td>
                  <td className="px-3 py-2 text-xs text-slate-300">{employee.role}</td>
                  <td className="px-3 py-2 text-xs text-slate-400">{employee.department}</td>
                  <td className="px-3 py-2 text-xs">
                    <span className="inline-flex rounded-full px-2 py-0.5 text-[11px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/40">
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-right space-x-2">
                    <button type="button" className="text-primary-300 hover:text-primary-200">
                      Modifier
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

export default HREmployeesPage;

