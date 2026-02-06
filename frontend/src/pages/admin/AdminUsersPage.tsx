import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  department?: string;
  phoneNumber?: string;
}

export const AdminUsersPage: React.FC = () => {
  const token = useAuthStore((s) => s.token);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (!res.ok) {
          setError(
            (Array.isArray(json.message) ? json.message.join(', ') : json.message) ||
              json.error ||
              'Impossible de charger les utilisateurs.',
          );
          return;
        }
        setUsers(json.data ?? []);
      } catch {
        setError("Erreur de connexion au serveur.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [token]);

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase().trim();
    return users.filter((u) => {
      if (departmentFilter && (u.department ?? '').toLowerCase() !== departmentFilter.toLowerCase()) return false;
      if (roleFilter && u.role.toLowerCase() !== roleFilter.toLowerCase()) return false;
      if (!q) return true;
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      return (
        fullName.includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.department ?? '').toLowerCase().includes(q) ||
        (u.phoneNumber ?? '').toLowerCase().includes(q)
      );
    });
  }, [users, search, departmentFilter, roleFilter]);

  const toggleActive = async (user: AdminUser) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      if (!res.ok) return;
      setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, isActive: !u.isActive } : u)));
    } catch {
      // silencieux pour l'instant
    }
  };

  const deleteUser = async (user: AdminUser) => {
    if (!token) return;
    if (!window.confirm(`Supprimer le compte de ${user.firstName} ${user.lastName} ?`)) return;
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return;
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } catch {
      // silencieux pour l'instant
    }
  };

  const departments = Array.from(new Set(users.map((u) => u.department).filter(Boolean))) as string[];
  const roles = Array.from(new Set(users.map((u) => u.role))).sort();

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold text-white">User Management</h2>
          <p className="text-xs text-slate-200">
            Recherche, filtres dynamiques, activation/désactivation et suppression des comptes.
          </p>
        </div>
      </motion.div>

      {/* Filtres & recherche */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Rechercher par nom, email, département, téléphone…"
          className="w-full md:w-1/2 rounded-full border border-white/30 bg-black/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 text-xs">
          <select
            className="rounded-full border border-white/30 bg-black/60 px-3 py-1 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">Tous départements</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            className="rounded-full border border-white/30 bg-black/60 px-3 py-1 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Tous rôles</option>
            {roles.map((r) => (
              <option key={r} value={r.toLowerCase()}>
                {r.toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table haute opacité pour lecture claire */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-950/95 backdrop-blur-xl shadow-xl shadow-black/60">
        {loading && (
          <p className="px-4 py-3 text-sm text-slate-200" aria-live="polite">
            Chargement des utilisateurs…
          </p>
        )}
        {error && (
          <p className="px-4 py-3 text-sm text-red-300" role="alert">
            {error}
          </p>
        )}
        {!loading && !error && (
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-slate-900/95 text-slate-200">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Nom</th>
                <th className="px-3 py-2 text-left font-medium">Email</th>
                <th className="px-3 py-2 text-left font-medium">Rôle</th>
                <th className="px-3 py-2 text-left font-medium">Département</th>
                <th className="px-3 py-2 text-left font-medium">Téléphone</th>
                <th className="px-3 py-2 text-left font-medium">Statut</th>
                <th className="px-3 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t border-slate-800/80 hover:bg-slate-900/80">
                  <td className="px-3 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-3 py-2 text-slate-100">{user.email}</td>
                  <td className="px-3 py-2 capitalize">{user.role.toLowerCase()}</td>
                  <td className="px-3 py-2">{user.department ?? '-'}</td>
                  <td className="px-3 py-2">{user.phoneNumber ?? '-'}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${
                        user.isActive
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-500/20 text-slate-200 border border-slate-500/40'
                      }`}
                    >
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
                      {user.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => toggleActive(user)}
                      className="rounded-md border border-slate-600 px-2 py-1 text-[11px] text-slate-100 hover:bg-slate-800"
                    >
                      {user.isActive ? 'Désactiver' : 'Activer'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteUser(user)}
                      className="rounded-md border border-red-700/80 px-2 py-1 text-[11px] text-red-200 hover:bg-red-900/60"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && !error && filteredUsers.length === 0 && (
                <tr>
                  <td className="px-4 py-4 text-center text-xs text-slate-300" colSpan={7}>
                    Aucun utilisateur trouvé avec ces filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;


