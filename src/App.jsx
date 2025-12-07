import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import AnimatedSuspenseWrapper from './components/utils/AnimatedSuspenseWrapper';
import CircleLoader from './components/utils/CircleLoader';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const ProjectsView = lazy(() => import('./components/utils/ProjectsView'));
const CertificatesView = lazy(() => import('./components/utils/CertificatesView'));
const Project = lazy(() => import('./components/utils/Project'));

const DashBoard = lazy(() => import('./components/DashBoard'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnimatedSuspenseWrapper>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="certificates" element={<CertificatesView />} />
              <Route path="projects" element={<ProjectsView />} />
              <Route path="project/get-project/:id" element={<Project />} />
            </Route>
            <Route path="/admin" element={<PrivateLayout />}>
              <Route index element={<Login />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="projects" element={<ProjectsView />} />
              <Route path="certificates" element={<CertificatesView />} />
            </Route>
          </Routes>
        </AnimatedSuspenseWrapper>
      </AuthProvider>
    </Router>
  );
}

export default App;
