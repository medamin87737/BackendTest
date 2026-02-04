import React from 'react';
import type { AccessibilitySettings } from '../types';
import { FaUniversalAccess, FaLowVision, FaKeyboard, FaAdjust } from 'react-icons/fa';

export interface AccessibilityMenuProps {
  settings: AccessibilitySettings;
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

// Petit panneau d’accessibilité en haut à droite
export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
  settings,
  onSettingsChange,
}) => {
  const toggle = (key: keyof AccessibilitySettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const cycleFontSize = () => {
    const order: AccessibilitySettings['fontSize'][] = ['normal', 'large', 'xlarge'];
    const currentIndex = order.indexOf(settings.fontSize);
    const next = order[(currentIndex + 1) % order.length];
    onSettingsChange({ ...settings, fontSize: next });
  };

  return (
    <nav
      className="fixed top-3 right-3 z-20 flex items-center gap-2 text-xs sm:text-sm"
      aria-label="Options d’accessibilité"
    >
      <div className="flex items-center gap-1 rounded-full bg-black/50 border border-white/20 px-2 py-1 text-white shadow-lg backdrop-blur">
        <span className="sr-only">Menu d’accessibilité</span>
        <FaUniversalAccess aria-hidden="true" className="text-primary-300" />

        <button
          type="button"
          onClick={() => toggle('highContrast')}
          className={`ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
            settings.highContrast
              ? 'bg-white text-black border-white'
              : 'bg-transparent border-white/30'
          }`}
        >
          <FaLowVision aria-hidden="true" />
          <span className="hidden sm:inline">Contraste</span>
        </button>

        <button
          type="button"
          onClick={cycleFontSize}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 border border-white/30 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          <FaAdjust aria-hidden="true" />
          <span className="hidden sm:inline">
            Taille {settings.fontSize === 'normal' ? 'A' : settings.fontSize === 'large' ? 'A+' : 'A++'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => toggle('reduceMotion')}
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
            settings.reduceMotion
              ? 'bg-white text-black border-white'
              : 'bg-transparent border-white/30'
          }`}
        >
          <span aria-hidden="true">⏸</span>
          <span className="hidden sm:inline">Animations</span>
        </button>

        <button
          type="button"
          onClick={() => toggle('screenReader')}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 border border-white/30 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          <FaKeyboard aria-hidden="true" />
          <span className="hidden sm:inline">Lecteur</span>
        </button>
      </div>
    </nav>
  );
};