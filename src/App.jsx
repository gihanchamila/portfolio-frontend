import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import HeroSection from "./components/HeroSection";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import Projects from "./pages/Projects";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HeroSection />} />
          <Route path="projects" element={<Projects/>} />
        </Route>

        <Route path="/admin" element={<PrivateLayout />}>
          <Route index element={<DashBoard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
