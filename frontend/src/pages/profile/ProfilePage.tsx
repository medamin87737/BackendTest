import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { userApi } from '../../api/userApi';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileDetails } from '../../components/profile/ProfileDetails';
import { EditProfileModal } from '../../components/profile/EditProfileModal';
import type { User, UpdateUserDto } from '../../types/user.types';

const ProfilePage: React.FC = () => {
  const { user: authUser, updateUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await userApi.getProfile();
      setUser(userData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement du profil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async (data: UpdateUserDto) => {
    if (!authUser) return;

    const updatedUser = await userApi.updateUser(authUser.id, data);
    setUser(updatedUser);
    
    updateUser({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      department: updatedUser.department,
      phoneNumber: updatedUser.phoneNumber,
      profilePicture: updatedUser.profilePicture,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
          <button
            onClick={loadUserProfile}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Mon Profil
        </h1>

        <ProfileHeader user={user} onEditClick={() => setIsEditModalOpen(true)} />
        
        <ProfileDetails user={user} />

        <EditProfileModal
          user={user}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  );
};

export default ProfilePage;