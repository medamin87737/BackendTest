import React from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const kpis = [
  { label: 'Nombre total employés', value: 248, trend: '+12 ce mois', accent: 'text-emerald-400' },
  { label: 'Nombre d’activités', value: 37, trend: '8 en préparation', accent: 'text-sky-400' },
  { label: 'Nombre de compétences', value: 96, trend: '+5 nouvelles', accent: 'text-indigo-400' },
  { label: 'Activités en cours', value: 9, trend: '3 se terminent cette semaine', accent: 'text-amber-400' },
  { label: 'Activités terminées', value: 128, trend: '92% complétées', accent: 'text-emerald-400' },
  { label: 'Recommandations générées', value: 542, trend: '+34 cette semaine', accent: 'text-fuchsia-400' },
];

const skillsDistribution = [
  { name: 'Data & Analytics', value: 32 },
  { name: 'Développement', value: 26 },
  { name: 'Gestion de projet', value: 18 },
  { name: 'Soft skills', value: 14 },
  { name: 'Autres', value: 10 },
];

const skillsProgression = [
  { month: 'Jan', junior: 24, senior: 14 },
  { month: 'Fév', junior: 28, senior: 16 },
  { month: 'Mar', junior: 31, senior: 18 },
  { month: 'Avr', junior: 35, senior: 21 },
  { month: 'Mai', junior: 39, senior: 23 },
  { month: 'Juin', junior: 42, senior: 25 },
];

const activitiesByDept = [
  { department: 'IT', activities: 18 },
  { department: 'Finance', activities: 8 },
  { department: 'Marketing', activities: 6 },
  { department: 'RH', activities: 3 },
  { department: 'Opérations', activities: 2 },
];

const skillsGaps = [
  { skill: 'Data Engineering', gap: 34 },
  { skill: 'Cloud', gap: 28 },
  { skill: 'CyberSécurité', gap: 22 },
  { skill: 'Leadership', gap: 17 },
  { skill: 'UX/UI', gap: 14 },
];

const pieColors = ['#60a5fa', '#34d399', '#fbbf24', '#a855f7', '#f97316'];

const latestActivities = [
  { name: 'Programme Data Upskilling', date: '12/01/2026', status: 'En cours', participants: 32 },
  { name: 'Parcours Leadership N-1', date: '05/01/2026', status: 'Terminé', participants: 18 },
  { name: 'Sprint Cloud Azure', date: '28/12/2025', status: 'Planifié', participants: 24 },
];

const latestEmployees = [
  { name: 'Sara Ben', role: 'Data Analyst', department: 'Data', since: '2 j' },
  { name: 'Yassine M.', role: 'Dev Full-Stack', department: 'IT', since: '5 j' },
  { name: 'Amel R.', role: 'HR Business Partner', department: 'RH', since: '1 sem.' },
];

const latestRecommendations = [
  { employee: 'Sara Ben', recommendation: 'Mission Data qualité – équipe Finance', score: 92 },
  { employee: 'Yassine M.', recommendation: 'Projet API Clients – squad Core', score: 88 },
  { employee: 'Amel R.', recommendation: 'Pilotage parcours Leadership 2026', score: 85 },
];

export const HRDashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-slate-50"
        >
          Dashboard RH
        </motion.h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Supervision en temps réel des employés, activités de développement, compétences clés et recommandations
          générées par le moteur IA.
        </p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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

      {/* Graphiques */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ChartCard title="Répartition des compétences">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={skillsDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {skillsDistribution.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderRadius: 12,
                  border: '1px solid rgba(148, 163, 184, 0.5)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Progression des compétences">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={skillsProgression} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="junior" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="senior" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderRadius: 12,
                  border: '1px solid rgba(148, 163, 184, 0.5)',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="junior"
                name="Profils junior"
                stroke="#60a5fa"
                fill="url(#junior)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="senior"
                name="Profils senior"
                stroke="#22c55e"
                fill="url(#senior)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Activités par département">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={activitiesByDept} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="department" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderRadius: 12,
                  border: '1px solid rgba(148, 163, 184, 0.5)',
                }}
              />
              <Bar dataKey="activities" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Gaps de compétences prioritaires">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={skillsGaps}
              layout="vertical"
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis type="category" dataKey="skill" stroke="#64748b" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderRadius: 12,
                  border: '1px solid rgba(148, 163, 184, 0.5)',
                }}
              />
              <Bar dataKey="gap" name="Manque de profils (%)" fill="#f97316" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Tables récentes */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TableCard title="Dernières activités" columns={['Activité', 'Date', 'Statut', 'Participants']}>
          {latestActivities.map((activity) => (
            <tr key={activity.name} className="border-t border-slate-800/80 hover:bg-slate-900/60">
              <td className="px-3 py-2 text-sm text-slate-100">{activity.name}</td>
              <td className="px-3 py-2 text-xs text-slate-300">{activity.date}</td>
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
              <td className="px-3 py-2 text-xs text-slate-300 text-right">{activity.participants}</td>
            </tr>
          ))}
        </TableCard>

        <TableCard title="Derniers employés ajoutés" columns={['Employé', 'Rôle', 'Dept.', 'Depuis']}>
          {latestEmployees.map((employee) => (
            <tr key={employee.name} className="border-t border-slate-800/80 hover:bg-slate-900/60">
              <td className="px-3 py-2 text-sm text-slate-100">{employee.name}</td>
              <td className="px-3 py-2 text-xs text-slate-300">{employee.role}</td>
              <td className="px-3 py-2 text-xs text-slate-400">{employee.department}</td>
              <td className="px-3 py-2 text-xs text-slate-300 text-right">{employee.since}</td>
            </tr>
          ))}
        </TableCard>

        <TableCard title="Dernières recommandations" columns={['Employé', 'Recommandation', 'Score']}>
          {latestRecommendations.map((rec) => (
            <tr key={rec.employee} className="border-t border-slate-800/80 hover:bg-slate-900/60">
              <td className="px-3 py-2 text-sm text-slate-100">{rec.employee}</td>
              <td className="px-3 py-2 text-xs text-slate-300">{rec.recommendation}</td>
              <td className="px-3 py-2 text-xs text-emerald-300 text-right">{rec.score} / 100</td>
            </tr>
          ))}
        </TableCard>
      </section>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <article className="rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl px-4 py-4 shadow-lg shadow-slate-950/70">
    <h2 className="text-sm font-semibold text-slate-100 mb-1">{title}</h2>
    <p className="text-xs text-slate-400 mb-3">Vue synthétique pour aider à prioriser les plans d&apos;actions RH.</p>
    <div className="h-[260px]">{children}</div>
  </article>
);

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
          <tr className="bg-slate-900/90 text-slate-300">
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

export default HRDashboardHome;

