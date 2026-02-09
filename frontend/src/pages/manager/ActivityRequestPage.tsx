import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ActivityRequestPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Demande envoyée : ${title}\nDescription : ${desc}`);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-slate-50"
      >
        Envoyer demande d’activité
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/70"
      >
        <div>
          <label className="block text-slate-300 text-sm mb-1">Titre de l’activité</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-50"
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-50"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 transition-colors"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};
