import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { AccessibilityMenu } from '../components/AccessibilityMenu';
import { SelectionReader } from '../components/SelectionReader';
import { useAuthStore } from '../store/authStore';
import type { AccessibilitySettings } from '../types';

export const RoleWelcomePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const role = user?.role ?? 'employee';

  let title = 'Bienvenue';
  if (role === 'admin') title = 'Bienvenue Admin';
  else if (role === 'hr') title = 'Bienvenue HR';
  else if (role === 'manager') title = 'Bienvenue Manager';
  else title = 'Bienvenue Employé';

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'normal',
    reduceMotion: false,
    screenReader: false,
    //language: 'fr',
  });

  const fontSizeClass =
    accessibility.fontSize === 'large'
      ? 'text-[17px] md:text-[18px]'
      : accessibility.fontSize === 'xlarge'
        ? 'text-[18px] md:text-[19px]'
        : 'text-[15px] md:text-[16px]';

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  // Redirection automatique selon le rôle
 useEffect(() => {
  if (role === 'hr') {
    navigate('/hr', { replace: true });
  } else if (role === 'employee') {
    navigate('/employee', { replace: true });
  } else if (role === 'admin') {
    navigate('/admin', { replace: true });
  } else if (role === 'manager') {
    navigate('/manager', { replace: true });
  }
}, [role, navigate]);

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${fontSizeClass} ${
        accessibility.highContrast
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-primary-800 via-primary-900 to-gray-900'
      }`}
      role="main"
      aria-label="Page d'accueil par rôle"
    >
      {/* Vidéo de fond */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/media/hr-intelligence-bg.mp4" type="video/mp4" />
      </video>

      {/* Fond 3D animé, désactivable via accessibilité */}
      {!accessibility.reduceMotion && <AnimatedBackground />}

      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Menu d'accessibilité */}
      <AccessibilityMenu settings={accessibility} onSettingsChange={setAccessibility} />
      <SelectionReader enabled={accessibility.screenReader} />

      {/* Contenu principal simple */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`backdrop-blur-xl rounded-2xl shadow-2xl px-8 py-10 max-w-md w-full text-center ${
            accessibility.highContrast
              ? 'bg-gray-800 border-2 border-white'
              : 'bg-white/10 border border-white/20'
          }`}
        >
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          {user?.email && (
            <p className="text-sm text-gray-200 mb-6" aria-label="Adresse email de l'utilisateur connecté">
              {user.email}
            </p>
          )}

          <div className="space-y-3">
            {/* BOUTON DÉCONNEXION POUR TOUS (les RH sont redirigés automatiquement vers /hr) */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white border border-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              Déconnexion
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleWelcomePage;