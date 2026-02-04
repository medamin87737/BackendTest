import { useState, useCallback } from 'react';
import type { LoginFormData, UserRoleId } from '../types';
import { useAuthStore } from '../store/authStore';

export interface UseLoginResult {
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<boolean>;
}

interface BackendLoginSuccess {
  message?: string;
  token?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

interface BackendErrorResponse {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

// Hook personnalisé pour centraliser la logique de login (connexion au backend Nest)
export const useLogin = (): UseLoginResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginSuccess = useAuthStore((s) => s.loginSuccess);

  const login = useCallback(
    async (data: LoginFormData) => {
      try {
        setIsLoading(true);
        setError(null);

        const { email, password, role } = data;

        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const json = (await response.json()) as BackendLoginSuccess & BackendErrorResponse;

        if (!response.ok) {
          const message =
            (Array.isArray(json.message) ? json.message.join(', ') : json.message) ||
            json.error ||
            "Une erreur s'est produite lors de la connexion.";
          setError(message);
          return false;
        }

        const backendRole = (json.user?.role as string | undefined)?.toLowerCase() as UserRoleId | undefined;
        if (!backendRole || backendRole !== role) {
          setError("Le rôle sélectionné ne correspond pas au rôle de ce compte.");
          return false;
        }

        if (!json.token) {
          setError("Le serveur n'a pas renvoyé de jeton de connexion.");
          return false;
        }

        loginSuccess({
          token: json.token,
          user: {
            id: json.user._id ?? '',
            email: json.user.email,
            role: backendRole,
            firstName: json.user.firstName,
            lastName: json.user.lastName,
          },
        });

        return true;
      } catch (e) {
        setError(
          "Impossible de contacter le serveur. Vérifie que le backend tourne bien sur le port 3000 et que le proxy est configuré.",
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [loginSuccess],
  );

  return {
    isLoading,
    error,
    login,
  };
};