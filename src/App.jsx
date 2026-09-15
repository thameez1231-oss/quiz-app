import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AudioProvider } from './context/AudioContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SubjectsPage from './pages/SubjectsPage';
import QuizOverviewPage from './pages/QuizOverviewPage';
import QuizPlayPage from './pages/QuizPlayPage';
import QuizResultsPage from './pages/QuizResultsPage';
import ParentPortalPage from './pages/ParentPortalPage';

export default function App() {
  return (
    <UserProvider>
      <AudioProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing & Login */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Student Experience */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/quiz/:subjectId/overview" element={<QuizOverviewPage />} />
            <Route path="/quiz/:subjectId/play" element={<QuizPlayPage />} />
            <Route path="/quiz/:subjectId/results" element={<QuizResultsPage />} />

            {/* Parent & Teacher Analytics */}
            <Route path="/parent-portal" element={<ParentPortalPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </UserProvider>
  );
}
