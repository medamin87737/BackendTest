import { useAuthStore } from './store/authStore';

export type SupportedLanguage = 'fr' | 'en';

const messages = {
  fr: {
    'login.hero.title': 'SkillUpTN',
    'login.hero.subtitle':
      'Système de gestion des ressources humaines intelligent, sécurisé et piloté par la donnée.',
    'login.hero.bullet1': 'Analytics avancés en temps réel',
    'login.hero.bullet2': 'Gestion optimisée des talents',
    'login.hero.bullet3': 'Rapports personnalisés et automatisés',
    'login.form.title': 'Connexion',
    'login.form.subtitle': 'Accédez à votre espace RH, manager ou employé.',

    'admin.sidebar.overview': 'Vue d’ensemble',
    'admin.sidebar.users': 'Utilisateurs',
    'admin.sidebar.roles': 'Rôles & Permissions',
    'admin.sidebar.employees': 'Employés',
    'admin.sidebar.activities': 'Activités',
    'admin.sidebar.audit': 'Journaux d’audit',
    'admin.sidebar.analytics': 'Analytics',
    'admin.sidebar.monitoring': 'Monitoring',
    'admin.sidebar.settings': 'Paramètres',

    'hr.sidebar.dashboard': 'Dashboard RH',
    'hr.sidebar.employees': 'Gestion des employés',
    'hr.sidebar.upload': 'Upload CSV employés',
    'hr.sidebar.skills': 'Gestion des compétences',
    'hr.sidebar.activities': 'Gestion des activités',
    'hr.sidebar.newActivity': 'Lancer une activité',
    'hr.sidebar.requests': 'Demandes d’activités',
    'hr.sidebar.notifications': 'Notifications',
    'hr.sidebar.statistics': 'Statistiques & graphiques',
    'hr.sidebar.history': 'Historique & traçabilité',
    'hr.sidebar.settings': 'Paramètres RH',
  },
  en: {
    'login.hero.title': 'SkillUpTN',
    'login.hero.subtitle':
      'Intelligent, secure, data‑driven human resources management system.',
    'login.hero.bullet1': 'Advanced real‑time analytics',
    'login.hero.bullet2': 'Optimized talent management',
    'login.hero.bullet3': 'Custom and automated reports',
    'login.form.title': 'Sign in',
    'login.form.subtitle': 'Access your HR, manager or employee space.',

    'admin.sidebar.overview': 'Overview',
    'admin.sidebar.users': 'Users',
    'admin.sidebar.roles': 'Roles & Permissions',
    'admin.sidebar.employees': 'Employees',
    'admin.sidebar.activities': 'Activities',
    'admin.sidebar.audit': 'Audit Logs',
    'admin.sidebar.analytics': 'Analytics',
    'admin.sidebar.monitoring': 'Monitoring',
    'admin.sidebar.settings': 'Settings',

    'hr.sidebar.dashboard': 'HR Dashboard',
    'hr.sidebar.employees': 'Employees Management',
    'hr.sidebar.upload': 'Upload employees CSV',
    'hr.sidebar.skills': 'Skills Management',
    'hr.sidebar.activities': 'Activities Management',
    'hr.sidebar.newActivity': 'Launch an activity',
    'hr.sidebar.requests': 'Activity requests',
    'hr.sidebar.notifications': 'Notifications',
    'hr.sidebar.statistics': 'Stats & charts',
    'hr.sidebar.history': 'History & traceability',
    'hr.sidebar.settings': 'HR Settings',
  },
} as const;

type MessageKey = keyof (typeof messages)['fr'];

export const useI18n = () => {
  const language = useAuthStore((s) => s.language) as SupportedLanguage;

  const t = (key: MessageKey): string => {
    const dict = messages[language] || messages.fr;
    return dict[key] || messages.fr[key] || key;
  };

  return { t, language };
};

