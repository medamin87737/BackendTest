import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
  }
}

interface VoiceLoginCommandsProps {
  enabled: boolean;
}

/**
 * Mode commande vocale pour la page de login :
 * - Remplit l'email et le mot de passe à partir de la voix
 * - Déclenche la soumission du formulaire sur ordre vocal
 *
 * Exemples (FR) :
 *  - "email john.doe@exemple.com"
 *  - "mot de passe secret un deux trois"
 *  - "se connecter" / "connexion"
 *
 * Exemples (EN) :
 *  - "email john.doe@example.com"
 *  - "password secret one two three"
 *  - "sign in" / "log in"
 */
export const VoiceLoginCommands: React.FC<VoiceLoginCommandsProps> = ({ enabled }) => {
  const language = useAuthStore((s) => s.language);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionImpl =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!enabled) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      return;
    }

    if (!SpeechRecognitionImpl) {
      // Navigateur ne supporte pas la reconnaissance vocale
      console.warn('[VoiceLoginCommands] Web Speech API (SpeechRecognition) non disponible dans ce navigateur.');
      if (enabled) {
        // Message simple pour l'utilisateur, une seule fois par activation
        alert(
          "La commande vocale n'est pas supportée par ce navigateur.\n" +
            'Utilisez de préférence Google Chrome sur desktop pour cette fonctionnalité.'
        );
      }
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognitionImpl();
    recognition.lang = language === 'en' ? 'en-US' : 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results[event.results.length - 1];
      if (!last || !last.isFinal) return;

      const transcript = last[0].transcript.toLowerCase().trim();
      handleTranscript(transcript, language);
    };

    recognition.onerror = () => {
      // En cas d'erreur, on arrête pour éviter les boucles
      recognition.stop();
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [enabled, language]);

  return null;
};

function handleTranscript(raw: string, language: 'fr' | 'en') {
  const text = raw.toLowerCase();

  // Email
  if (text.includes('email') || text.includes('adresse')) {
    const marker = text.includes('email') ? 'email' : 'adresse';
    const value = text.split(marker).slice(1).join(marker).trim();
    if (value) {
      fillInput('email', value);
    }
  }

  // Password
  if (text.includes('mot de passe') || text.includes('password')) {
    const marker = text.includes('mot de passe') ? 'mot de passe' : 'password';
    const value = text.split(marker).slice(1).join(marker).trim();
    if (value) {
      fillInput('password', value);
    }
  }

  // Submit / connexion
  if (
    text.includes('se connecter') ||
    text.includes('connexion') ||
    text.includes('connecter') ||
    text.includes('sign in') ||
    text.includes('login') ||
    text.includes('log in')
  ) {
    submitLoginForm();
  }
}

function fillInput(id: string, value: string) {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (!el) return;
  el.value = value;
  // Notifier React Hook Form
  const event = new Event('input', { bubbles: true });
  el.dispatchEvent(event);
}

function submitLoginForm() {
  const form = document.querySelector('form[aria-label="Formulaire de connexion"]') as
    | HTMLFormElement
    | null;
  if (!form) return;
  if (typeof form.requestSubmit === 'function') {
    form.requestSubmit();
  } else {
    form.submit();
  }
}

export default VoiceLoginCommands;

