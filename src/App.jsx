import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import IntegrationGuide from './pages/IntegrationGuide';
import DownloadPage from './pages/DownloadPage';
import FeedbackPage from './pages/FeedbackPage';
import EasyWorshipGuide from './pages/EasyWorshipGuide';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/integration-guide" element={<IntegrationGuide />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/easyworship-import" element={<EasyWorshipGuide />} />
      </Routes>
    </Router>
  );
}