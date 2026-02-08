import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ActivityCard } from '../../components/employee/ActivityCard';
import { RejectModal } from '../../components/employee/RejectModal';

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

// Données mockées pour les activités en attente
const pendingActivitiesMock: Activity[] = [
  {
    id: 1,
    title: "Formation Agile Scrum Avancé",
    type: "TRAINING",
    role: "Participant",
    date: "2026-03-15",
    duration: "3 jours",
    context: "UPSKILLING",
    department: "IT",
    status: "PENDING_RESPONSE",
    description: "Formation approfondie sur les méthodologies Agile et Scrum pour les équipes de développement."
  },
  {
    id: 2,
    title: "Projet API Clients",
    type: "PROJECT",
    role: "Développeur Backend",
    date: "2026-04-01",
    duration: "6 semaines",
    context: "PROJECT_WORK",
    department: "IT",
    status: "PENDING_RESPONSE",
    description: "Développement de nouvelles APIs pour le module clients de l'application."
  },
  {
    id: 3,
    title: "Audit Sécurité RGPD",
    type: "AUDIT",
    role: "Auditeur Junior",
    date: "2026-03-20",
    duration: "2 semaines",
    context: "COMPLIANCE",
    department: "Compliance",
    status: "PENDING_RESPONSE",
    description: "Participation à l'audit de conformité RGPD des applications internes."
  }
];

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
  }
];

export const EmployeeActivitiesPage: React.FC = () => {
  const [pendingActivities, setPendingActivities] = useState<Activity[]>(pendingActivitiesMock);
  const [history, setHistory] = useState<Activity[]>(historyMock);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [rejectModal, setRejectModal] = useState<{
    isOpen: boolean;
    activityId: number | null;
    activityTitle: string;
  }>({
    isOpen: false,
    activityId: null,
    activityTitle: ''
  });

  const handleAccept = async (id: number) => {
    setLoadingId(id);
    
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPendingActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, status: 'ACCEPTED' as ActivityStatus }
          : activity
      )
    );
    
    // Ajouter à l'historique
    const acceptedActivity = pendingActivities.find(a => a.id === id);
    if (acceptedActivity) {
      setHistory(prev => [
        { ...acceptedActivity, status: 'ACCEPTED' as ActivityStatus },
        ...prev
      ]);
    }
    
    setLoadingId(null);
  };

  const handleRejectClick = (id: number) => {
    const activity = pendingActivities.find(a => a.id === id);
    if (activity) {
      setRejectModal({
        isOpen: true,
        activityId: id,
        activityTitle: activity.title
      });
    }
  };

  const handleRejectConfirm = async (reason: string) => {
    if (!rejectModal.activityId) return;
    
    setLoadingId(rejectModal.activityId);
    
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mettre à jour l'activité
    setPendingActivities(prev => 
      prev.map(activity => 
        activity.id === rejectModal.activityId 
          ? { 
              ...activity, 
              status: 'REJECTED' as ActivityStatus,
              description: activity.description 
                ? `${activity.description} (Refusé : ${reason})`
                : `Refusé : ${reason}`
            }
          : activity
      )
    );
    
    // Ajouter à l'historique
    const rejectedActivity = pendingActivities.find(a => a.id === rejectModal.activityId);
    if (rejectedActivity) {
      setHistory(prev => [
        { 
          ...rejectedActivity, 
          status: 'REJECTED' as ActivityStatus,
          description: rejectedActivity.description 
            ? `${rejectedActivity.description} (Refusé : ${reason})`
            : `Refusé : ${reason}`
        },
        ...prev
      ]);
    }
    
    setRejectModal({ isOpen: false, activityId: null, activityTitle: '' });
    setLoadingId(null);
  };

  const pendingCount = pendingActivities.filter(a => a.status === 'PENDING_RESPONSE').length;
  const acceptedCount = history.filter(a => a.status === 'ACCEPTED').length;
  const completedCount = history.filter(a => a.status === 'COMPLETED').length;

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
          Mes activités
        </motion.h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Gérez vos participations aux activités de développement professionnel. Acceptez ou refusez les invitations, 
          et consultez votre historique complet.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-amber-700/30 bg-amber-900/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-200">En attente</p>
                <p className="text-2xl font-bold text-white">{pendingCount}</p>
              </div>
              <span className="text-2xl">⏳</span>
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
          <div className="rounded-xl border border-sky-700/30 bg-sky-900/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sky-200">Terminées</p>
                <p className="text-2xl font-bold text-white">{completedCount}</p>
              </div>
              <span className="text-2xl">🏁</span>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Activités en attente */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-50">
            Activités en attente de réponse
          </h2>
          <span className="text-sm text-slate-400">
            {pendingCount} activité{pendingCount !== 1 ? 's' : ''} à traiter
          </span>
        </div>

        {pendingActivities.filter(a => a.status === 'PENDING_RESPONSE').length === 0 ? (
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-8 text-center">
            <div className="max-w-md mx-auto">
              <span className="text-4xl mb-4 inline-block">🎉</span>
              <h3 className="text-lg font-semibold text-white mb-2">Aucune activité en attente</h3>
              <p className="text-sm text-slate-300">
                Vous n'avez aucune activité nécessitant votre réponse pour le moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingActivities
              .filter(a => a.status === 'PENDING_RESPONSE')
              .map(activity => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                  onAccept={handleAccept}
                  onReject={handleRejectClick}
                  isActionable={true}
                  isLoading={loadingId === activity.id}
                />
              ))}
          </div>
        )}
      </section>

      {/* SECTION 2: Historique des participations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-50">
            Historique des participations
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              {history.length} activité{history.length !== 1 ? 's' : ''} au total
            </span>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-8 text-center">
            <div className="max-w-md mx-auto">
              <span className="text-4xl mb-4 inline-block">📊</span>
              <h3 className="text-lg font-semibold text-white mb-2">Historique vide</h3>
              <p className="text-sm text-slate-300">
                Vous n'avez pas encore participé à d'activités.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map(activity => (
              <ActivityCard
                key={activity.id}
                {...activity}
                isActionable={false}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal de refus */}
      <RejectModal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ isOpen: false, activityId: null, activityTitle: '' })}
        onConfirm={handleRejectConfirm}
        activityTitle={rejectModal.activityTitle}
        isLoading={loadingId === rejectModal.activityId}
      />
    </div>
  );
};

export default EmployeeActivitiesPage;