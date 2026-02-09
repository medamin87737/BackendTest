import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const PromptPage: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { user: 'Manager', text: input }, { user: 'IA', text: `Réponse simulée à : "${input}"` }]);
    setInput('');
  };

  return (
    <div className="space-y-6">
      <motion.h1 className="text-2xl font-bold text-slate-50">Saisir prompt</motion.h1>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/70 space-y-4 max-h-[400px] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-slate-400 text-sm">Tapez un prompt pour voir la réponse de l’IA ici...</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={msg.user === 'Manager' ? 'text-right' : 'text-left'}>
              <p className={`inline-block rounded-xl px-3 py-2 ${msg.user === 'Manager' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-50'}`}>
                {msg.text}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-50"
          placeholder="Saisir un prompt..."
        />
        <button onClick={handleSend} className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-400 transition-colors">
          Envoyer
        </button>
      </div>
    </div>
  );
};
