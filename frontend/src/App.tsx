import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

import AdminLayout from './layout/AdminLayout';
import AdminRoutes from './routes/AdminRoutes';

import HRLayout from './layout/HRLayout';
import HRRoutes from './routes/HRRoutes';

import EmployeeLayout from './layout/EmployeeLayout';
import EmployeeRoutes from './routes/EmployeeRoutes';

import ManagerLayout from './layout/ManagerLayout';
import ManagerRoutes from './routes/ManagerRoutes';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RoleWelcomePage = React.lazy(() => import('./pages/RoleWelcomePage'));

function App() {
  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
            Chargement…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/home" element={<RoleWelcomePage />} />

          {/* Dashboard RH */}
          <Route
            path="/hr/*"
            element={
              <ProtectedRoute allowedRoles={['hr']}>
                <HRLayout>
                  <HRRoutes />
                </HRLayout>
              </ProtectedRoute>
            }
          />

          {/* Dashboard Admin */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <AdminRoutes />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Dashboard Employé */}
          <Route
            path="/employee/*"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout>
                  <EmployeeRoutes />
                </EmployeeLayout>
              </ProtectedRoute>
            }
          />

          {/*  Dashboard Manager */}
          <Route
            path="/manager/*"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerLayout>
                  <ManagerRoutes />
                </ManagerLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
