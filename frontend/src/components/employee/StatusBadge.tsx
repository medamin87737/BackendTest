import React from 'react';

/* =======================
   Types
======================= */

export type ActivityType =
  | 'TRAINING'
  | 'PROJECT'
  | 'MISSION'
  | 'CERTIFICATION'
  | 'AUDIT'
  | 'COACHING';

export type ActivityStatus =
  | 'PENDING_RESPONSE'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'IN_PROGRESS';

/* =======================
   Props
======================= */

interface StatusBadgeProps {
  status: ActivityStatus;
  size?: 'sm' | 'md' | 'lg';
}

/* =======================
   Component
======================= */

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md'
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'PENDING_RESPONSE':
        return {
          label: 'En attente',
          className: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
          icon: '⏳'
        };
      case 'ACCEPTED':
        return {
          label: 'Accepté',
          className: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
          icon: '✓'
        };
      case 'REJECTED':
        return {
          label: 'Refusé',
          className: 'bg-red-500/20 text-red-200 border-red-500/40',
          icon: '✗'
        };
      case 'COMPLETED':
        return {
          label: 'Terminé',
          className: 'bg-sky-500/20 text-sky-200 border-sky-500/40',
          icon: '🏁'
        };
      case 'IN_PROGRESS':
        return {
          label: 'En cours',
          className: 'bg-blue-500/20 text-blue-200 border-blue-500/40',
          icon: '🔄'
        };
      case 'CANCELLED':
        return {
          label: 'Annulé',
          className: 'bg-slate-500/20 text-slate-200 border-slate-500/40',
          icon: '🚫'
        };
      default:
        return {
          label: 'Inconnu',
          className: 'bg-gray-500/20 text-gray-200 border-gray-500/40',
          icon: '❓'
        };
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${sizeClasses[size]} ${config.className}`}
      title={status}
    >
      <span className="text-xs" aria-hidden="true">
        {config.icon}
      </span>
      <span>{config.label}</span>
    </span>
  );
};
