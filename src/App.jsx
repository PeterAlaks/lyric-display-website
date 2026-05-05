import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import IntegrationGuide from './pages/IntegrationGuide';
import DownloadPage from './pages/DownloadPage';
import FeedbackPage from './pages/FeedbackPage';
import EasyWorshipGuide from './pages/EasyWorshipGuide';
import DocumentationPage from './pages/DocumentationPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import DonatePage from './pages/DonatePage';
import CodeOfConductPage from './pages/CodeOfConductPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/integration-guide" element={<IntegrationGuide />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/code-of-conduct" element={<CodeOfConductPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/easyworship-import" element={<EasyWorshipGuide />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </Router>
  );
}
