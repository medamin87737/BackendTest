
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { AccessibilityMenu } from '../components/AccessibilityMenu';
import { UploadEmployeesCSV } from '../components/UploadEmployeesCSV';
import { useAuthStore } from '../store/authStore';
import type { AccessibilitySettings } from '../types';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';

export const UploadCSVPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'normal',
    reduceMotion: false,
    screenReader: false,
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

  const goBack = () => {
    navigate('/home');
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${fontSizeClass} ${
        accessibility.highContrast
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-primary-800 via-primary-900 to-gray-900'
      }`}
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

      {/* Fond 3D animé */}
      {!accessibility.reduceMotion && <AnimatedBackground />}

      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Menu d'accessibilité */}
      <AccessibilityMenu settings={accessibility} onSettingsChange={setAccessibility} />

      {/* Header simple */}
      <header className="relative z-10 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <FaArrowLeft />
            <span>Retour</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">
                {user?.firstName || 'Utilisateur RH'}
              </p>
              <p className="text-xs text-gray-400">Ressources Humaines</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal - juste l'upload */}
      <main className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <UploadEmployeesCSV />
        </motion.div>
      </main>
    </div>
  );
};

export default UploadCSVPage;
