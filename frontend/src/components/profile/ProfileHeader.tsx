import React from 'react';
import { FiEdit2, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import type { User } from '../../types/user.types';

interface ProfileHeaderProps {
  user: User;
  onEditClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditClick }) => {
  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'ADMIN':
        return 'bg-purple-500';
      case 'HR':
        return 'bg-blue-500';
      case 'MANAGER':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <div className="relative">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {getInitials()}
              </div>
            )}
            <div
              className={`absolute bottom-0 right-0 w-6 h-6 ${
                user.isActive ? 'bg-green-500' : 'bg-gray-400'
              } rounded-full border-4 border-white dark:border-gray-800`}
            />
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getRoleBadgeColor()}`}
              >
                {user.role}
              </span>
              {user.department && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  • {user.department}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEditClick}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FiEdit2 className="w-4 h-4" />
          <span>Modifier</span>
        </button>
      </div>

      {/* Contact Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
          <FiMail className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-sm font-medium">{user.email}</p>
          </div>
        </div>

        {user.phoneNumber && (
          <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
            <FiPhone className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Téléphone</p>
              <p className="text-sm font-medium">{user.phoneNumber}</p>
            </div>
          </div>
        )}

        {user.department && (
          <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
            <FiBriefcase className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Département</p>
              <p className="text-sm font-medium">{user.department}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};