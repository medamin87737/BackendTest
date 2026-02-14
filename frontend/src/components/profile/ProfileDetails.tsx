import React from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import type { User } from '../../types/user.types';

interface ProfileDetailsProps {
  user: User;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Informations du compte
      </h2>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
          <FiCalendar className="w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Créé le</p>
            <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
          </div>
        </div>

        {user.lastLogin && (
          <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
            <FiClock className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Dernière connexion</p>
              <p className="text-sm font-medium">{formatDate(user.lastLogin)}</p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Statut du compte</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.isActive
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {user.isActive ? 'Actif' : 'Inactif'}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">ID Utilisateur</span>
            <span className="text-sm font-mono text-gray-900 dark:text-gray-100">
              {user._id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};