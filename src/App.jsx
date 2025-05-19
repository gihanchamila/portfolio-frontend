import React, { lazy, Suspense }  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import LandingPage from "./pages/LandingPage";
import AnimatedSuspenseWrapper from "./components/utils/AnimatedSuspenseWrapper";
import CircleLoader from "./components/utils/CircleLoader";

const DashBoard = lazy(() => import("./components/DashBoard"));

function App() {
  return (
    <Router>
        <AnimatedSuspenseWrapper fallback={<CircleLoader/>}>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
            </Route>

            <Route path="/admin" element={<PrivateLayout />}>
              <Route index element={<DashBoard />} />
            </Route>
          </Routes>
        </AnimatedSuspenseWrapper>
    </Router>
  );
}

export default App;
