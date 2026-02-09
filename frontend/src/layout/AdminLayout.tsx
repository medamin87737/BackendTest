import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { AccessibilityMenu } from '../components/AccessibilityMenu';
import { BrandTitle } from '../components/BrandTitle';
import { SelectionReader } from '../components/SelectionReader';
import { useAuthStore } from '../store/authStore';
import { useI18n } from '../i18n';
import type { AccessibilitySettings } from '../types';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'normal',
    reduceMotion: false,
    screenReader: false,
  });

  const { t } = useI18n();

  const fontSizeClass =
    accessibility.fontSize === 'large'
      ? 'text-[17px] md:text-[18px]'
      : accessibility.fontSize === 'xlarge'
        ? 'text-[18px] md:text-[19px]'
        : 'text-[15px] md:text-[16px]';

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${fontSizeClass} ${
        accessibility.highContrast
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-primary-800 via-primary-900 to-gray-900'
      }`}
    >
      {/* Fond vidéo + 3D */}
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

      {!accessibility.reduceMotion && <AnimatedBackground />}

      {/* Overlay pour lisibilité du dashboard */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Menu d'accessibilité (animations, contraste, taille police) */}
      <AccessibilityMenu settings={accessibility} onSettingsChange={setAccessibility} />
      <SelectionReader enabled={accessibility.screenReader} />

      {/* Shell du dashboard admin */}
      <div className="relative z-10 min-h-screen flex bg-transparent text-slate-50">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-700 shadow-lg shadow-primary-900/40" />
            <div>
              <p className="text-sm font-semibold tracking-wide">
                <BrandTitle variant="sidebar" />
              </p>
              <p className="text-[11px] text-slate-200">Admin Console</p>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
            <SidebarLink to="/admin" label={t('admin.sidebar.overview')} />
            <SidebarLink to="/admin/users" label={t('admin.sidebar.users')} />
            <SidebarLink to="/admin/roles" label={t('admin.sidebar.roles')} />
            <SidebarLink to="/admin/employees" label={t('admin.sidebar.employees')} />
            <SidebarLink to="/admin/activities" label={t('admin.sidebar.activities')} />
            <SidebarLink to="/admin/audit" label={t('admin.sidebar.audit')} />
            <SidebarLink to="/admin/analytics" label={t('admin.sidebar.analytics')} />
            <SidebarLink to="/admin/monitoring" label={t('admin.sidebar.monitoring')} />
            <SidebarLink to="/admin/settings" label={t('admin.sidebar.settings')} />
          </nav>

          {/* Bouton de déconnexion en bas de la sidebar */}
          <div className="px-4 py-4 border-t border-white/10 text-xs text-slate-200">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/auth/login');
              }}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs text-slate-100 hover:bg-slate-800 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-2 lg:hidden">
              <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-700" />
              <div>
                <p className="text-sm font-semibold">
                  <BrandTitle variant="sidebar" />
                </p>
                <p className="text-[11px] text-slate-200">Admin</p>
              </div>
            </div>
            <div className="flex-1 flex justify-end items-center gap-3" />
          </header>

          <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-y-auto px-4 py-6 md:px-8"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        'flex items-center gap-2 rounded-lg px-3 py-2',
        'transition-colors duration-200',
        isActive
          ? 'bg-slate-800/80 text-slate-50 shadow-inner shadow-slate-900 border border-slate-700'
          : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-50',
      ].join(' ')
    }
  >
    <span className="h-1.5 w-1.5 rounded-full bg-primary-400" aria-hidden="true" />
    <span>{label}</span>
  </NavLink>
);

export default AdminLayout;

