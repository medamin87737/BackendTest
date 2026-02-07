
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import AdminLayout from './layout/AdminLayout';
import AdminRoutes from './routes/AdminRoutes';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RoleWelcomePage = React.lazy(() => import('./pages/RoleWelcomePage'));
// AJOUTER CET IMPORT :
const UploadCSVPage = React.lazy(() => import('./pages/HRDashboard'));

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
          
          {/* AJOUTER CETTE ROUTE SIMPLE : */}
          <Route path="/hr/upload-csv" element={<UploadCSVPage />} />

          {/* Admin dashboard réservé au rôle admin */}
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

          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
