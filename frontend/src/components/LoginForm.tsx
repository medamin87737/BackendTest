import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { LoginFormData } from '../types';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void> | void;
  disabled?: boolean;
}

// Schéma de validation Zod pour le formulaire de login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L’email est requis')
    .email('Adresse email invalide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  rememberMe: z.boolean(),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

// Formulaire de login avec validation en temps réel (sans sélection de rôle)
export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, disabled }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onValidSubmit = async (values: LoginFormSchema) => {
    const payload: LoginFormData = {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    };

    await onSubmit(payload);
  };

  const isFormDisabled = disabled || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      className="space-y-4"
      aria-label="Formulaire de connexion"
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white"
        >
          Email professionnel
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
          disabled={isFormDisabled}
        />
        {errors.email && (
          <p
            id="email-error"
            className="text-sm text-red-300"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password')}
          disabled={isFormDisabled}
        />
        {errors.password && (
          <p
            id="password-error"
            className="text-sm text-red-300"
            role="alert"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember me + langue (i18n prêt) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-gray-200 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/40 bg-transparent text-primary-400 focus:ring-primary-400"
            {...register('rememberMe')}
            disabled={isFormDisabled}
          />
          <span>Se souvenir de moi</span>
        </label>

        {/* Placeholder pour futur sélecteur de langue (i18n) */}
        <div className="flex items-center gap-2 text-sm text-gray-200">
          <span className="sr-only">Langue de l’interface</span>
          <select
            className="bg-white/5 border border-white/20 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label="Sélectionner la langue"
            defaultValue="fr"
            disabled={isFormDisabled}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 focus-visible:ring-offset-transparent text-white font-semibold shadow-lg shadow-primary-900/40 transition-transform transform-gpu hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isFormDisabled}
        aria-busy={isFormDisabled}
      >
        {isSubmitting ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
};
