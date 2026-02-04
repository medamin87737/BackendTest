import React from 'react';
import type { UserRoleId } from '../types';
import { motion } from 'framer-motion';
import { FaUserTie, FaUsersCog, FaUserFriends } from 'react-icons/fa';

export interface RoleSelectorProps {
  value: UserRoleId;
  onChange: (role: UserRoleId) => void;
}

const ROLES: Array<{
  id: UserRoleId;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'hr',
    label: 'RH',
    description: 'Accès complet aux dossiers et aux rapports.',
    icon: <FaUsersCog aria-hidden="true" />,
  },
  {
    id: 'manager',
    label: 'Manager',
    description: 'Suivi des équipes et validation des demandes.',
    icon: <FaUserTie aria-hidden="true" />,
  },
  {
    id: 'employee',
    label: 'Employé',
    description: 'Consultation de son dossier et de ses congés.',
    icon: <FaUserFriends aria-hidden="true" />,
  },
];

// Sélecteur de rôle animé, accessible au clavier
export const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange }) => {
  return (
    <fieldset
      className="space-y-3"
      aria-label="Sélectionner votre rôle dans l’organisation"
    >
      <legend className="sr-only">Rôle</legend>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ROLES.map((role) => {
          const isActive = value === role.id;
          return (
            <motion.button
              key={role.id}
              type="button"
              onClick={() => onChange(role.id)}
              className={`relative flex flex-col items-start gap-1 rounded-xl border px-3 py-2 text-left text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-colors ${
                isActive
                  ? 'bg-primary-600/90 text-white border-primary-300 shadow-lg'
                  : 'bg-black/20 text-gray-100 border-white/20 hover:border-primary-300 hover:bg-black/30'
              }`}
              aria-pressed={isActive}
            >
              <span className="flex items-center gap-2">
                <span className="text-base sm:text-lg" aria-hidden="true">
                  {role.icon}
                </span>
                <span className="font-semibold">{role.label}</span>
              </span>
              <span className="text-[11px] sm:text-xs opacity-90">{role.description}</span>
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
};
