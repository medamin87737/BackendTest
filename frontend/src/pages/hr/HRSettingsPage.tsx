import React from 'react';
import { motion } from 'framer-motion';

export const HRSettingsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <header>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-slate-50"
        >
          Paramètres RH
        </motion.h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Configuration des règles RH liées au moteur de recommandation : seuils de matching, notifications, politiques
          de confidentialité.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 p-6 space-y-5 text-xs text-slate-200">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-100">Règles de matching</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="space-y-1">
              <span className="text-[11px] font-medium">Score minimum de recommandation</span>
              <input
                type="number"
                min={0}
                max={100}
                defaultValue={80}
                className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-medium">Nb. max de recommandations / employé</span>
              <input
                type="number"
                min={1}
                defaultValue={3}
                className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </label>
            <label className="space-y-1">
              <span className="text-[11px] font-medium">Période glissante (mois)</span>
              <input
                type="number"
                min={1}
                defaultValue={6}
                className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/30 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-100">Notifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-400 bg-slate-900" />
              <span>Notifier les HR lors d&apos;un import CSV massif</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-400 bg-slate-900" />
              <span>Notifier les managers en cas de recommandation forte (&gt; 90)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-400 bg-slate-900" />
              <span>Envoyer un récap mensuel aux employés</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-400 bg-slate-900" />
              <span>Activer les alertes sur les gaps critiques</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-100">Confidentialité & RGPD</h3>
          <p className="text-[11px] text-slate-300">
            Ces réglages déterminent la façon dont les données des employés sont utilisées par le moteur de
            recommandation. À connecter aux politiques définies au niveau du backend.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-400 bg-slate-900" />
              <span>Masquer les données sensibles dans les exports</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-400 bg-slate-900" />
              <span>Autoriser l&apos;anonymisation pour les analyses globales</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-primary-900/40 hover:bg-primary-500 transition-transform hover:-translate-y-0.5"
          >
            Enregistrer les paramètres
          </button>
        </div>
      </section>
    </div>
  );
};

export default HRSettingsPage;

