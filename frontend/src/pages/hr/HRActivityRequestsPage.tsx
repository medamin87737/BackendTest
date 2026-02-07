import React from 'react';
import { motion } from 'framer-motion';

const mockRequests = [
  { requester: 'Manager IT', activity: 'Mission API Clients', status: 'En attente', createdAt: '10/01/2026' },
  { requester: 'Manager Data', activity: 'Programme Data Quality', status: 'Approuvée', createdAt: '06/01/2026' },
  { requester: 'HR BP', activity: 'Parcours Leadership', status: 'Refusée', createdAt: '02/01/2026' },
];

export const HRActivityRequestsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <header>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-slate-50"
        >
          Demandes d&apos;activités
        </motion.h2>
        <p className="text-sm text-slate-300 max-w-2xl">
          Centralisation des demandes d&apos;activités émises par les managers et les HRBP, prêtes à être validées ou
          rejetées.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-950/70 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/90 flex items-center justify-between">
          <p className="text-xs text-slate-300">Pipeline de validation RH.</p>
          <button
            type="button"
            className="text-[11px] text-primary-300 hover:text-primary-200 underline underline-offset-2"
          >
            Exporter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-slate-900/90 text-slate-300">
                <th className="px-3 py-2 font-medium">Demandeur</th>
                <th className="px-3 py-2 font-medium">Activité proposée</th>
                <th className="px-3 py-2 font-medium">Statut</th>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRequests.map((request) => (
                <tr key={request.activity} className="border-t border-slate-800/80 hover:bg-slate-900/60">
                  <td className="px-3 py-2 text-sm text-slate-100">{request.requester}</td>
                  <td className="px-3 py-2 text-xs text-slate-300">{request.activity}</td>
                  <td className="px-3 py-2 text-xs">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] ${
                        request.status === 'En attente'
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
                          : request.status === 'Approuvée'
                            ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
                            : 'bg-red-500/20 text-red-200 border border-red-400/40'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-300">{request.createdAt}</td>
                  <td className="px-3 py-2 text-xs text-right space-x-2">
                    <button type="button" className="text-emerald-300 hover:text-emerald-200">
                      Approuver
                    </button>
                    <button type="button" className="text-red-400 hover:text-red-300">
                      Refuser
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

export default HRActivityRequestsPage;

