import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  activityTitle?: string;
  isLoading?: boolean;
}

export const RejectModal: React.FC<RejectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  activityTitle,
  isLoading = false
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      setError('Veuillez saisir la raison de votre refus');
      return;
    }

    onConfirm(reason.trim());
    setReason('');
    setError('');
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-xl p-6 shadow-2xl shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Refuser l'activité
                </h3>
                {activityTitle && (
                  <p className="text-sm text-slate-300 mt-1">
                    {activityTitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                disabled={isLoading}
              >
                <FaTimes className="w-4 h-4 text-slate-400" />
                <span className="sr-only">Fermer</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="reject-reason" className="block text-sm font-medium text-slate-200 mb-2">
                    Raison du refus *
                  </label>
                  <textarea
                    id="reject-reason"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Veuillez expliquer pourquoi vous refusez cette activité..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px] resize-none"
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-400">
                    Cette information sera transmise au responsable RH.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800/60 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !reason.trim()}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi...
                      </>
                    ) : (
                      'Confirmer le refus'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};