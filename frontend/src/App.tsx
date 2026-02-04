
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';

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
          {/* Page simple dédiée par rôle (Bienvenue HR / Manager / Employé) */}
          <Route path="/home" element={<RoleWelcomePage />} />

          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
