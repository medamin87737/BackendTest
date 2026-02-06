import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminDashboardHome } from '../pages/admin/AdminDashboardHome';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminRolesPage } from '../pages/admin/AdminRolesPage';
import { AdminEmployeesPage } from '../pages/admin/AdminEmployeesPage';
import { AdminActivitiesPage } from '../pages/admin/AdminActivitiesPage';
import { AdminAuditLogsPage } from '../pages/admin/AdminAuditLogsPage';
import { AdminAnalyticsPage } from '../pages/admin/AdminAnalyticsPage';
import { AdminMonitoringPage } from '../pages/admin/AdminMonitoringPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboardHome />} />
      <Route path="users" element={<AdminUsersPage />} />
      <Route path="roles" element={<AdminRolesPage />} />
      <Route path="employees" element={<AdminEmployeesPage />} />
      <Route path="activities" element={<AdminActivitiesPage />} />
      <Route path="audit" element={<AdminAuditLogsPage />} />
      <Route path="analytics" element={<AdminAnalyticsPage />} />
      <Route path="monitoring" element={<AdminMonitoringPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
    </Routes>
  );
};

export default AdminRoutes;

