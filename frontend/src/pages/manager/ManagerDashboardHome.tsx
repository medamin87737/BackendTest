import React from 'react';
import { motion } from 'framer-motion';

const kpis = [
  { label: 'Demandes d’activités envoyées', value: 12, trend: '+3 ce mois', accent: 'text-sky-400' },
  { label: 'Activités en cours', value: 4, trend: '2 se terminent bientôt', accent: 'text-amber-400' },
  { label: 'Employés recommandés', value: 18, trend: '+5 cette semaine', accent: 'text-emerald-400' },
  { label: 'Taux de réussite', value: '86%', trend: '↑ amélioration', accent: 'text-indigo-400' },
];

const latestRequests = [
  { activity: 'Projet Data Finance', date: '14/01/2026', status: 'Envoyée' },
  { activity: 'Sprint Cloud', date: '10/01/2026', status: 'Validée' },
  { activity: 'Leadership N-1', date: '06/01/2026', status: 'En attente' },
];

const recommendedEmployees = [
  { name: 'Sara Ben', skill: 'Data Analytics', score: 92 },
  { name: 'Yassine M.', skill: 'Full-Stack', score: 88 },
  { name: 'Amel R.', skill: 'Leadership', score: 85 },
];

const evaluations = [
  { activity: 'Projet Data Finance', result: 'Succès', score: 90 },
  { activity: 'Sprint Cloud', result: 'En cours', score: '-' },
];

const ManagerDashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-slate-50"
        >
          Dashboard Manager
        </motion.h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Suivi des demandes d’activités, recommandations d’employés et évaluation des résultats.
        </p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <motion.article
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl px-4 py-4 shadow-lg shadow-slate-950/70"
          >
            <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">{kpi.label}</p>
            <p className="text-2xl font-semibold text-slate-50">{kpi.value}</p>
            <p className={`text-xs mt-1 ${kpi.accent}`}>{kpi.trend}</p>
          </motion.article>
        ))}
      </section>

      {/* Tables */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TableCard title="Dernières demandes envoyées" columns={['Activité', 'Date', 'Statut']}>
          {latestRequests.map((req) => (
            <tr key={req.activity} className="border-t border-slate-800/80 hover:bg-slate-900/60">
              <td className="px-3 py-2 text-sm text-slate-100">{req.activity}</td>
              <td className="px-3 py-2 text-xs text-slate-300">{req.date}</td>
              <td className="px-3 py-2 text-xs text-sky-300">{req.status}</td>
            </tr>
          ))}
        </TableCard>

        <TableCard title="Employés recommandés" columns={['Employé', 'Compétence', 'Score']}>
          {recommendedEmployees.map((emp) => (
            <tr key={emp.name} className="border-t border-slate-800/80 hover:bg-slate-900/60">
              <td className="px-3 py-2 text-sm text-slate-100">{emp.name}</td>
              <td className="px-3 py-2 text-xs text-slate-300">{emp.skill}</td>
              <td className="px-3 py-2 text-xs text-emerald-300 text-right">{emp.score}</td>
            </tr>
          ))}
        </TableCard>

        <TableCard title="Évaluation des activités" columns={['Activité', 'Résultat', 'Score']}>
          {evaluations.map((ev) => (
            <tr key={ev.activity} className="border-t border-slate-800/80 hover:bg-slate-900/60">
              <td className="px-3 py-2 text-sm text-slate-100">{ev.activity}</td>
              <td className="px-3 py-2 text-xs text-amber-300">{ev.result}</td>
              <td className="px-3 py-2 text-xs text-slate-300 text-right">{ev.score}</td>
            </tr>
          ))}
        </TableCard>
      </section>
    </div>
  );
};

interface TableCardProps {
  title: string;
  columns: string[];
  children: React.ReactNode;
}

const TableCard: React.FC<TableCardProps> = ({ title, columns, children }) => (
  <article className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 overflow-hidden">
    <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/90">
      <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-xs text-slate-300">
        <thead>
          <tr className="bg-slate-900/90">
            {columns.map((col) => (
              <th key={col} className="px-3 py-2 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  </article>
);

export default ManagerDashboardHome;
