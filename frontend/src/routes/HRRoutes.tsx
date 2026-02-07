import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HRDashboardHome } from '../pages/hr/HRDashboardHome';
import { HREmployeesPage } from '../pages/hr/HREmployeesPage';
import { HRUploadEmployeesPage } from '../pages/hr/HRUploadEmployeesPage';
import { HRSkillsPage } from '../pages/hr/HRSkillsPage';
import { HRActivitiesPage } from '../pages/hr/HRActivitiesPage';
import { HRCreateActivityPage } from '../pages/hr/HRCreateActivityPage';
import { HRActivityRequestsPage } from '../pages/hr/HRActivityRequestsPage';
import { HRNotificationsPage } from '../pages/hr/HRNotificationsPage';
import { HRStatisticsPage } from '../pages/hr/HRStatisticsPage';
import { HRHistoryPage } from '../pages/hr/HRHistoryPage';
import { HRSettingsPage } from '../pages/hr/HRSettingsPage';

export const HRRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HRDashboardHome />} />
      <Route path="employees" element={<HREmployeesPage />} />
      <Route path="employees/upload-csv" element={<HRUploadEmployeesPage />} />
      {/* Compatibilité avec le bouton existant /hr/upload-csv depuis RoleWelcomePage */}
      <Route path="upload-csv" element={<HRUploadEmployeesPage />} />
      <Route path="skills" element={<HRSkillsPage />} />
      <Route path="activities" element={<HRActivitiesPage />} />
      <Route path="activities/new" element={<HRCreateActivityPage />} />
      <Route path="activities/requests" element={<HRActivityRequestsPage />} />
      <Route path="notifications" element={<HRNotificationsPage />} />
      <Route path="statistics" element={<HRStatisticsPage />} />
      <Route path="history" element={<HRHistoryPage />} />
      <Route path="settings" element={<HRSettingsPage />} />
    </Routes>
  );
};

export default HRRoutes;

