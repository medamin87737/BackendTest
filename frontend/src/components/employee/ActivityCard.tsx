import React from 'react';
import { motion } from 'framer-motion';
import { StatusBadge } from './StatusBadge';
import type { ActivityStatus } from './StatusBadge';

import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserTag, 
  FaBuilding,
  FaExternalLinkAlt 
} from 'react-icons/fa';

export type ActivityType = 'TRAINING' | 'PROJECT' | 'MISSION' | 'CERTIFICATION' | 'AUDIT' | 'COACHING';

interface ActivityCardProps {
  id: number;
  title: string;
  type: ActivityType;
  role: string;
  date: string;
  duration?: string;
  context?: string;
  department?: string;
  status: ActivityStatus;
  description?: string;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  isActionable?: boolean;
  isLoading?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  title,
  type,
  role,
  date,
  duration,
  context,
  department,
  status,
  description,
  onAccept,
  onReject,
  isActionable = false,
  isLoading = false
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'TRAINING': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'PROJECT': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'MISSION': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'CERTIFICATION': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'AUDIT': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'COACHING': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-sm p-5 hover:border-slate-600/70 transition-colors"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs border ${getTypeColor()}`}>
                  {type.toLowerCase().replace('_', ' ')}
                </span>
                <StatusBadge status={status} size="sm" />
              </div>
            </div>
            
            {department && (
              <div className="flex items-center gap-1 text-sm text-slate-400">
                <FaBuilding className="w-3.5 h-3.5" />
                <span>{department}</span>
              </div>
            )}
          </div>

          {description && (
            <p className="text-sm text-slate-300 mb-4">{description}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <FaUserTag className="w-4 h-4 text-slate-400" />
              <span className="font-medium">Rôle :</span>
              <span className="text-slate-200">{role}</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-300">
              <FaCalendarAlt className="w-4 h-4 text-slate-400" />
              <span className="font-medium">Date :</span>
              <span className="text-slate-200">{formatDate(date)}</span>
            </div>
            
            {duration && (
              <div className="flex items-center gap-2 text-slate-300">
                <FaClock className="w-4 h-4 text-slate-400" />
                <span className="font-medium">Durée :</span>
                <span className="text-slate-200">{duration}</span>
              </div>
            )}
            
            {context && (
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-medium">Contexte :</span>
                <span className="text-slate-200">{context}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        {isActionable && status === 'PENDING_RESPONSE' && (
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:ml-4 lg:w-32">
            <button
              type="button"
              onClick={() => onAccept?.(id)}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                '✓ Accepter'
              )}
            </button>
            <button
              type="button"
              onClick={() => onReject?.(id)}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-red-600 text-red-300 hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-red-300/30 border-t-red-300 rounded-full animate-spin" />
              ) : (
                '✗ Refuser'
              )}
            </button>
          </div>
        )}
      </div>

      {/* View details link for completed/historical activities */}
      {!isActionable && status !== 'PENDING_RESPONSE' && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
          >
            <FaExternalLinkAlt className="w-3 h-3" />
            Voir les détails
          </button>
        </div>
      )}
    </motion.div>
  );
};