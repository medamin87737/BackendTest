import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActivityCard } from '../../components/employee/ActivityCard';

import type { ActivityType, ActivityStatus } from '../../components/employee/StatusBadge';

// Types pour les données mockées
interface Activity {
  id: number;
  title: string;
  type: ActivityType;
  role: string;
  date: string;
  duration?: string;
  context?: string;
  department?: string;
  status: ActivityStatus;
  description?: string;
}

// Données mockées pour l'historique
const historyMock: Activity[] = [
  {
    id: 10,
    title: "Audit ISO 27001",
    type: "AUDIT",
    role: "Auditeur",
    date: "2025-12-10",
    duration: "3 semaines",
    context: "COMPLIANCE",
    department: "Compliance",
    status: "COMPLETED",
    description: "Audit de certification ISO 27001 pour le système d'information."
  },
  {
    id: 11,
    title: "Certification AWS Solutions Architect",
    type: "CERTIFICATION",
    role: "Candidat",
    date: "2025-11-05",
    status: "COMPLETED",
    description: "Préparation et obtention de la certification AWS."
  },
  {
    id: 12,
    title: "Mission Client XYZ",
    type: "MISSION",
    role: "Consultant Technique",
    date: "2025-10-15",
    duration: "2 mois",
    context: "CLIENT_PROJECT",
    department: "Consulting",
    status: "COMPLETED"
  },
  {
    id: 13,
    title: "Coaching Leadership",
    type: "COACHING",
    role: "Coaché",
    date: "2025-09-01",
    duration: "6 sessions",
    context: "LEADERSHIP_DEV",
    status: "REJECTED",
    description: "Refusé pour conflit d'emploi du temps"
  },
  {
    id: 14,
    title: "Formation React Avancé",
    type: "TRAINING",
    role: "Participant",
    date: "2025-08-20",
    duration: "5 jours",
    context: "UPSKILLING",
    department: "IT",
    status: "COMPLETED",
    description: "Formation approfondie sur React, hooks avancés et patterns."
  },
  {
    id: 15,
    title: "Projet Migration Cloud",
    type: "PROJECT",
    role: "Développeur",
    date: "2025-07-01",
    duration: "3 mois",
    context: "PROJECT_WORK",
    department: "IT",
    status: "COMPLETED",
    description: "Migration de l'infrastructure vers AWS."
  }
];

export const EmployeeHistoryPage: React.FC = () => {
  const [history] = useState<Activity[]>(historyMock);
  const [filter, setFilter] = useState<ActivityStatus | 'ALL'>('ALL');

  const filteredHistory = filter === 'ALL' 
    ? history 
    : history.filter(activity => activity.status === filter);

  const completedCount = history.filter(a => a.status === 'COMPLETED').length;
  const acceptedCount = history.filter(a => a.status === 'ACCEPTED').length;
  const rejectedCount = history.filter(a => a.status === 'REJECTED').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-slate-50"
        >
          Historique des activités
        </motion.h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Consultez l'historique complet de toutes vos participations aux activités de développement professionnel.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-sky-700/30 bg-sky-900/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sky-200">Terminées</p>
                <p className="text-2xl font-bold text-white">{completedCount}</p>
              </div>
              <span className="text-2xl">🏁</span>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-700/30 bg-emerald-900/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-200">Acceptées</p>
                <p className="text-2xl font-bold text-white">{acceptedCount}</p>
              </div>
              <span className="text-2xl">✓</span>
            </div>
          </div>
          <div className="rounded-xl border border-red-700/30 bg-red-900/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-200">Refusées</p>
                <p className="text-2xl font-bold text-white">{rejectedCount}</p>
              </div>
              <span className="text-2xl">✗</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filtres */}
      <section className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'ALL'
              ? 'bg-primary-600 text-white'
              : 'bg-white/10 border border-white/30 text-slate-200 hover:bg-white/20'
          }`}
        >
          Toutes
        </button>
        <button
          type="button"
          onClick={() => setFilter('COMPLETED')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'COMPLETED'
              ? 'bg-sky-600 text-white'
              : 'bg-white/10 border border-white/30 text-slate-200 hover:bg-white/20'
          }`}
        >
          Terminées
        </button>
        <button
          type="button"
          onClick={() => setFilter('ACCEPTED')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'ACCEPTED'
              ? 'bg-emerald-600 text-white'
              : 'bg-white/10 border border-white/30 text-slate-200 hover:bg-white/20'
          }`}
        >
          Acceptées
        </button>
        <button
          type="button"
          onClick={() => setFilter('REJECTED')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'REJECTED'
              ? 'bg-red-600 text-white'
              : 'bg-white/10 border border-white/30 text-slate-200 hover:bg-white/20'
          }`}
        >
          Refusées
        </button>
      </section>

      {/* Historique des participations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-50">
            {filter === 'ALL' ? 'Toutes les activités' : `Activités ${filter === 'COMPLETED' ? 'terminées' : filter === 'ACCEPTED' ? 'acceptées' : 'refusées'}`}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              {filteredHistory.length} activité{filteredHistory.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-8 text-center">
            <div className="max-w-md mx-auto">
              <span className="text-4xl mb-4 inline-block">📊</span>
              <h3 className="text-lg font-semibold text-white mb-2">Aucune activité trouvée</h3>
              <p className="text-sm text-slate-300">
                {filter === 'ALL' 
                  ? "Vous n'avez pas encore participé à d'activités."
                  : `Aucune activité ${filter === 'COMPLETED' ? 'terminée' : filter === 'ACCEPTED' ? 'acceptée' : 'refusée'} dans votre historique.`
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map(activity => (
              <ActivityCard
                key={activity.id}
                {...activity}
                isActionable={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EmployeeHistoryPage;
