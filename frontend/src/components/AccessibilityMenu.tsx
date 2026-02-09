import React, { useState } from 'react';
import type { AccessibilitySettings } from '../types';
import { FaUniversalAccess, FaLowVision, FaKeyboard, FaAdjust, FaMicrophone } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';

export interface AccessibilityMenuProps {
  settings: AccessibilitySettings;
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

// Panneau d’accessibilité en haut à droite (icône + panneau vertical déroulant)
export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ settings, onSettingsChange }) => {
  const theme = useAuthStore((s) => s.theme);
  const setTheme = useAuthStore((s) => s.setTheme);
  const language = useAuthStore((s) => s.language);
  const setLanguage = useAuthStore((s) => s.setLanguage);
  const [open, setOpen] = useState(false);

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

  const cycleTheme = () => {
    // Cycle global : dark -> light -> white -> dark...
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('white');
    } else {
      setTheme('dark');
    }
  };

  const themeLabel =
    theme === 'dark' ? 'Sombre' : theme === 'light' ? 'Clair' : 'Blanc';

  return (
    <nav
      className="fixed top-3 right-3 z-20 text-xs sm:text-sm"
      aria-label="Options d’accessibilité"
    >
      <div className="relative flex items-start justify-end">
        {/* Bouton rond d'ouverture */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/30 text-white shadow-lg backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          aria-label="Ouvrir le menu d’accessibilité"
          aria-expanded={open}
        >
          <FaUniversalAccess aria-hidden="true" className="text-primary-300" />
        </button>

        {/* Panneau vertical (en dessous du bouton, bouton reste fixe) */}
        {open && (
          <div className="absolute top-full right-0 mt-2 w-60 rounded-2xl bg-black/70 border border-white/20 text-white shadow-2xl backdrop-blur-xl p-3 flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-200 flex items-center gap-2">
              <FaUniversalAccess aria-hidden="true" className="text-primary-300" />
              <span>Accessibilité</span>
            </p>

            {/* Thème + langue */}
            <div className="flex flex-col gap-1 rounded-xl bg-black/30 border border-white/10 p-2">
              <button
                type="button"
                onClick={cycleTheme}
                className="inline-flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[11px] border border-white/20 bg-transparent hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <span className="inline-flex items-center gap-1">
                  <FaLowVision aria-hidden="true" />
                  <span>Thème</span>
                </span>
                <span className="font-semibold text-primary-200">{themeLabel}</span>
              </button>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-200">Langue</span>
                <div className="inline-flex items-center gap-1 rounded-full bg-black/40 border border-white/20 px-1 py-0.5">
                  {(['fr', 'en'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      className={`px-2 py-0.5 text-[10px] rounded-full ${
                        language === lang ? 'bg-primary-500 text-white' : 'text-slate-200'
                      }`}
                    >
                      {lang?.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Taille du texte */}
            <button
              type="button"
              onClick={cycleFontSize}
              className="inline-flex items-center justify-between gap-2 rounded-xl px-2 py-1.5 text-[11px] border border-white/15 bg-black/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              <span className="inline-flex items-center gap-1">
                <FaAdjust aria-hidden="true" />
                <span>Taille du texte</span>
              </span>
              <span>
                {settings.fontSize === 'normal' ? 'A' : settings.fontSize === 'large' ? 'A+' : 'A++'}
              </span>
            </button>

            {/* Toggles divers */}
            <div className="grid grid-cols-1 gap-1">
              <button
                type="button"
                onClick={() => toggle('voiceControl')}
                className={`inline-flex items-center justify-between gap-2 rounded-xl px-2 py-1.5 text-[11px] border bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  settings.voiceControl
                    ? 'border-primary-400 bg-primary-600/40 text-white'
                    : 'border-white/20 hover:bg-white/5'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <FaMicrophone aria-hidden="true" />
                  <span>Commande vocale</span>
                </span>
                <span className="uppercase text-[10px] opacity-80">
                  {settings.voiceControl ? 'On' : 'Off'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggle('reduceMotion')}
                className={`inline-flex items-center justify-between gap-2 rounded-xl px-2 py-1.5 text-[11px] border bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  settings.reduceMotion
                    ? 'border-white bg-white text-black'
                    : 'border-white/20 hover:bg-white/5'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <span aria-hidden="true">⏸</span>
                  <span>Animations</span>
                </span>
                <span className="uppercase text-[10px] opacity-80">
                  {settings.reduceMotion ? 'Off' : 'On'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggle('screenReader')}
                className={`inline-flex items-center justify-between gap-2 rounded-xl px-2 py-1.5 text-[11px] border bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  settings.screenReader
                    ? 'border-primary-300 bg-primary-600/40 text-white'
                    : 'border-white/20 hover:bg-white/5'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <FaKeyboard aria-hidden="true" />
                  <span>Lecteur</span>
                </span>
                <span className="uppercase text-[10px] opacity-80">
                  {settings.screenReader ? 'On' : 'Off'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};