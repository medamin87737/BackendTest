import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaHistory, FaBell, FaUserCircle } from 'react-icons/fa';

export const EmployeeDashboard: React.FC = () => {
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
          Tableau de bord Employé
        </motion.h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Bienvenue sur votre espace personnel de gestion des activités de développement professionnel.
        </p>
      </header>

      {/* Cards de navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/employee/activities"
          className="group rounded-xl border border-slate-700/50 bg-slate-900/70 p-6 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <FaCalendarCheck className="w-8 h-8 text-emerald-400" />
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/30 text-emerald-300">
              3 en attente
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Mes activités</h3>
          <p className="text-sm text-slate-300">
            Gérez vos invitations et participations aux activités
          </p>
        </Link>

        <Link
          to="/employee/history"
          className="group rounded-xl border border-slate-700/50 bg-slate-900/70 p-6 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <FaHistory className="w-8 h-8 text-blue-400" />
            <span className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-300">
              15 activités
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Historique</h3>
          <p className="text-sm text-slate-300">
            Consultez toutes vos participations passées
          </p>
        </Link>

        <div className="rounded-xl border border-slate-700/50 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between mb-4">
            <FaBell className="w-8 h-8 text-amber-400" />
            <span className="text-xs px-2 py-1 rounded-full bg-amber-900/30 text-amber-300">
              2 nouvelles
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Notifications</h3>
          <p className="text-sm text-slate-300">
            Alertes et mises à jour importantes
          </p>
        </div>

        <div className="rounded-xl border border-slate-700/50 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between mb-4">
            <FaUserCircle className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Mon profil</h3>
          <p className="text-sm text-slate-300">
            Informations personnelles et compétences
          </p>
        </div>
      </div>

      {/* Section d'activités récentes */}
      <section className="rounded-xl border border-slate-700/50 bg-slate-900/70 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Activités récentes</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
            <div>
              <p className="text-sm font-medium text-white">Formation Agile Scrum</p>
              <p className="text-xs text-slate-400">En attente de réponse</p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-amber-900/30 text-amber-300">
              ⏳ En attente
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
            <div>
              <p className="text-sm font-medium text-white">Audit ISO 27001</p>
              <p className="text-xs text-slate-400">Terminé le 10/12/2025</p>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-sky-900/30 text-sky-300">
              🏁 Terminé
            </span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/employee/activities"
            className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200"
          >
            Voir toutes les activités →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EmployeeDashboard;