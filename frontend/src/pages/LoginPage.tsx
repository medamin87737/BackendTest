import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { LoginForm } from '../components/LoginForm';
import { AccessibilityMenu } from '../components/AccessibilityMenu';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLogin } from '../hooks/useLogin';
import { useAuthStore } from '../store/authStore';
import type { AccessibilitySettings, LoginFormData } from '../types';

// Page principale de connexion au système de gestion RH intelligent
export const LoginPage: React.FC = () => {
  const { isLoading, error, login } = useLogin();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${fontSizeClass} ${
        accessibility.highContrast
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-primary-800 via-primary-900 to-gray-900'
      }`}
      role="main"
      aria-label="Page de connexion au système de gestion RH"
    >
      {/* Skip link pour accessibilité */}
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>

      {/* Vidéo de fond (placeholder) */}
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

      {/* Arrière-plan 3D (désactivable pour réduire les animations) */}
      {!accessibility.reduceMotion && <AnimatedBackground />}

      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Menu d'accessibilité (contraste, taille de police, etc.) */}
      <AccessibilityMenu
        settings={accessibility}
        onSettingsChange={setAccessibility}
      />

      {/* Bandeau de marque */}
      <header className="relative z-10 flex items-center justify-between px-4 pt-4 lg:px-8 lg:pt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 backdrop-blur border border-white/10">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          <span className="text-xs uppercase tracking-wide text-gray-200">
            HR Intelligence Suite
          </span>
        </div>
      </header>

      {/* Contenu principal */}
      <div
        id="main-content"
        className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8"
      >
        {/* Section gauche - Présentation marketing */}
        <motion.section
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12"
          aria-label="Présentation de la plateforme RH"
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1
              className={`text-4xl lg:text-6xl font-bold mb-4 ${
                accessibility.highContrast ? 'text-white' : 'text-white'
              }`}
              variants={containerVariants}
            >
              <span className="block">HR Intelligence</span>
              <span className="block text-primary-300">Platform</span>
            </motion.h1>

            <motion.p
              className={`text-xl mb-8 ${
                accessibility.highContrast ? 'text-gray-300' : 'text-gray-200'
              }`}
              variants={containerVariants}
            >
              Système de gestion des ressources humaines intelligent, sécurisé et piloté
              par la donnée.
            </motion.p>

            <motion.ul className="space-y-4" variants={containerVariants}>
              <li className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span
                  className={
                    accessibility.highContrast ? 'text-white' : 'text-gray-100'
                  }
                >
                  Analytics avancés en temps réel
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                <span
                  className={
                    accessibility.highContrast ? 'text-white' : 'text-gray-100'
                  }
                >
                  Gestion optimisée des talents
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-purple-400" />
                <span
                  className={
                    accessibility.highContrast ? 'text-white' : 'text-gray-100'
                  }
                >
                  Rapports personnalisés et automatisés
                </span>
              </li>
            </motion.ul>
          </motion.div>
        </motion.section>

        {/* Section droite - Carte de login */}
        <motion.section
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 max-w-md w-full"
          aria-label="Formulaire de connexion"
        >
          <div
            className={`backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 transform-gpu ${
              accessibility.highContrast
                ? 'bg-gray-800 border-2 border-white'
                : 'bg-white/10 border border-white/20'
            }`}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-2 ${
                  accessibility.highContrast ? 'text-white' : 'text-white'
                }`}
              >
                Connexion
              </h2>
              <p
                className={
                  accessibility.highContrast ? 'text-gray-300' : 'text-gray-200'
                }
              >
                Accédez à votre espace RH, manager ou employé.
              </p>
            </div>

            {error && (
              <div
                className="mb-4 rounded-lg border border-red-400 bg-red-500/20 px-3 py-2 text-xs text-red-100"
                role="alert"
              >
                {error}
              </div>
            )}

            <LoginForm
              onSubmit={async (values: LoginFormData) => {
                const ok = await login(values);
                if (ok) {
                  const { user } = useAuthStore.getState();
                  if (user?.role === 'admin') {
                    navigate('/admin');
                  } else if (user?.role === 'hr') {
                    // Les RH vont directement sur le dashboard RH
                    navigate('/hr');
                  } else {
                    navigate('/home');
                  }
                }
              }}
              disabled={isLoading}
            />

            {/* Liens supplémentaires */}
            <div className="mt-6 text-center space-y-4">
              <a
                href="#forgot-password"
                className={`block text-sm hover:text-primary-300 transition-colors ${
                  accessibility.highContrast ? 'text-white' : 'text-gray-300'
                }`}
                aria-label="Réinitialiser votre mot de passe"
              >
                Mot de passe oublié ?
              </a>
              <div className="border-t border-white/20 pt-4">
                <p
                  className={`text-sm ${
                    accessibility.highContrast ? 'text-gray-300' : 'text-gray-300'
                  }`}
                >
                  Nouveau dans l&apos;entreprise ?{' '}
                  <a
                    href="#register"
                    className="font-semibold text-primary-300 hover:text-primary-200 transition-colors"
                    aria-label="Créer un nouveau compte"
                  >
                    Créer un compte
                  </a>
                </p>
              </div>
            </div>

            {/* Chargement */}
            {isLoading && (
              <div className="mt-6">
                <LoadingSpinner label="Connexion en cours" />
              </div>
            )}
          </div>

          {/* Note d'accessibilité */}
          <div className="mt-6 text-center">
            <p
              className={`text-xs ${
                accessibility.highContrast ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              Ce site vise la conformité aux standards WCAG 2.1 AA.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default LoginPage;