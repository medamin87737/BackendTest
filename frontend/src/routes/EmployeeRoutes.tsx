import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EmployeeDashboard } from '../pages/employee/EmployeeDashboard';
import { EmployeeActivitiesPage } from '../pages/employee/EmployeeActivitiesPage';
import { EmployeeHistoryPage } from '../pages/employee/EmployeeHistoryPage';
import ProfilePage from '../pages/profile/ProfilePage';

export const EmployeeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<EmployeeDashboard />} />
      <Route path="activities" element={<EmployeeActivitiesPage />} />
      <Route path="history" element={<EmployeeHistoryPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="notifications" element={<EmployeeDashboard />} />
    </Routes>
  );
};

export default EmployeeRoutes;