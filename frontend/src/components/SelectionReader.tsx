import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';

interface SelectionReaderProps {
  enabled: boolean;
}

/**
 * Composant invisible qui, lorsqu'il est activé, lit à voix haute
 * le texte sélectionné par l'utilisateur (si le navigateur supporte speechSynthesis).
 */
export const SelectionReader: React.FC<SelectionReaderProps> = ({ enabled }) => {
  const lastSpokenRef = useRef<string>('');
  const language = useAuthStore((s) => s.language);

  useEffect(() => {
    if (!enabled) {
      // Arrêter toute lecture en cours si on désactive le mode lecteur
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (!('speechSynthesis' in window)) {
      // Navigateur ne supporte pas la synthèse vocale, on ne fait rien
      return;
    }

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const text = selection ? selection.toString().trim() : '';

      if (!text || text.length < 2) return;
      if (text === lastSpokenRef.current) return;

      // Mémoriser pour éviter de relire en boucle
      lastSpokenRef.current = text;

      const utterance = new SpeechSynthesisUtterance(text);

      // Essayer de choisir une voix adaptée à la langue sélectionnée (fr ou en)
      const voices = window.speechSynthesis.getVoices();
      const targetLangPrefix = language === 'en' ? 'en' : 'fr';

      const matchedVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith(targetLangPrefix)) ?? null;

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      // Fallback sur un code de langue standard si aucune voix spécifique n'a été trouvée
      if (language === 'en') {
        utterance.lang = 'en-US';
      } else {
        utterance.lang = 'fr-FR';
      }
      utterance.rate = 1;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
    };
  }, [enabled, language]);

  return null;
};

export default SelectionReader;

