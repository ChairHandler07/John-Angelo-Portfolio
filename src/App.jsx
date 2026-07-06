import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import ExperiencePage from './pages/ExperiencePage';
import TechStackPage from './pages/TechStackPage';
import VisualArchivePage from './pages/VisualArchivePage';
import CertificationPage from './pages/CertificationPage';
import AchievementsPage from './pages/AchievementsPage';
import './App.css';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/tech-stack" element={<TechStackPage />} />
          <Route path="/visual-archive" element={<VisualArchivePage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
