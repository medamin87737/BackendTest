import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManagerDashboardHome from '../pages/manager/ManagerDashboardHome';
import { ActivityRequestPage } from '../pages/manager/ActivityRequestPage';
import { PromptPage } from '../pages/manager/PromptPage';
import { ManagerRecommendationsPage } from '../pages/manager/ManagerRecommendationsPage';
import { EvaluationPage } from '../pages/manager/EvaluationPage';

const ManagerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ManagerDashboardHome />} />
      <Route path="activity-request" element={<ActivityRequestPage />} />
      <Route path="prompt" element={<PromptPage />} />
      <Route path="recommendations" element={<ManagerRecommendationsPage />} />
      <Route path="evaluation" element={<EvaluationPage />} />
    </Routes>
  );
};

export default ManagerRoutes;
