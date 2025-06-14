import React, { lazy, Suspense }  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import LandingPage from "./pages/LandingPage";
import AnimatedSuspenseWrapper from "./components/utils/AnimatedSuspenseWrapper";
import CircleLoader from "./components/utils/CircleLoader";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import ProjectsView from "./components/utils/ProjectsView";
import CertificatesView from "./components/utils/CertificatesView";

const DashBoard = lazy(() => import("./components/DashBoard"));

function App() {
  return (
      <Router>
        <AuthProvider>
          <AnimatedSuspenseWrapper fallback={<CircleLoader />}>
            <Routes>
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<LandingPage />} />
              </Route>
              <Route path="/admin" element={<PrivateLayout />}>
                <Route index element={<Login />} />
                <Route path="dashboard" element={<DashBoard />}/>
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
