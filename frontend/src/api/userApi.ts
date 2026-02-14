import axios from 'axios';
import type { User, UpdateUserDto } from '../types/user.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with interceptor for auth token
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userApi = {
  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get<{ success: boolean; message: string; data: User }>(`/users/${id}`);
    return response.data.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) {
      throw new Error('No user found');
    }
    const user = JSON.parse(userStr);
    return userApi.getUserById(user.id);
  },

  // Update user
  updateUser: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await axiosInstance.patch<{ message: string; user: User }>(`/users/${id}`, data);
    return response.data.user;
  },

  // Update profile picture
  updateProfilePicture: async (id: string, imageUrl: string): Promise<User> => {
    return userApi.updateUser(id, { profilePicture: imageUrl });
  },
};