import React from 'react';
import { motion } from 'framer-motion';

const mockNotifications = [
  { title: 'Nouvelles recommandations générées', detail: '12 nouvelles correspondances pour le programme Data.', time: 'Il y a 2 h' },
  { title: 'Activité proche de la saturation', detail: 'Parcours Leadership est rempli à 95%.', time: 'Il y a 5 h' },
  { title: 'Nouveau CSV importé', detail: 'Import de 45 employés (département IT).', time: 'Hier' },
];

export const HRNotificationsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <header>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-slate-50"
        >
          Notifications RH
        </motion.h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Flux des événements clés liés aux employés, activités et recommandations. Prêt pour une intégration temps réel
          (WebSocket).
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 p-4 space-y-3">
        {mockNotifications.map((notif) => (
          <article
            key={notif.title + notif.time}
            className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-2"
          >
            <div className="mt-1 h-2 w-2 rounded-full bg-primary-400" />
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-slate-100">{notif.title}</h3>
              <p className="text-[11px] text-slate-300">{notif.detail}</p>
            </div>
            <p className="text-[10px] text-slate-400 whitespace-nowrap">{notif.time}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default HRNotificationsPage;

