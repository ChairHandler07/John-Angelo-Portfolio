import { useState, useEffect, useRef, useCallback } from 'react';
import ProfileHeader from './components/ProfileHeader';
import AboutSection from './components/AboutSection';
import TechStack from './components/TechStack';
import ProjectsSection from './components/ProjectsSection';
import ProjectDetailPage from './components/ProjectDetailPage';
import IdentityCard from './components/IdentityCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ImageModal from './components/ImageModal';
import './App.css';

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme') === 'dark';
    if (saved) document.body.classList.add('dark-mode');
    return saved;
  });
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef(null);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    if (month >= 8) {
      const flakes = [];
      for (let i = 0; i < 40; i++) {
        const snow = document.createElement("div");
        snow.className = "snowflake";
        const size = Math.random() * 3 + 2;
        snow.style.width = size + "px";
        snow.style.height = size + "px";
        snow.style.left = Math.random() * 100 + "vw";
        snow.style.animation = `snowFall ${Math.random() * 5 + 3}s linear infinite`;
        snow.style.animationDelay = Math.random() * 5 + "s";
        document.body.appendChild(snow);
        flakes.push(snow);
      }
      return () => flakes.forEach(s => s.remove());
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openProject = useCallback((project) => {
    setActiveProjectId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeProject = useCallback(() => {
    setActiveProjectId(null);
  }, []);

  return (
    <div className="portfolio-wrapper" ref={mainRef}>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {!activeProjectId && (
        <>
          <ProfileHeader isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

          <hr className="section-divider" />

          <div className="two-col-layout">
            <div className="left-col">
              <AboutSection />
              <hr className="section-divider" />
              <TechStack />
              <hr className="section-divider" />
              <ProjectsSection onProjectClick={openProject} />
            </div>

            <aside className="right-col">
              <IdentityCard />
              <ExperienceTimeline />
            </aside>
          </div>

          <hr className="section-divider" />

          <Gallery onImageClick={setActiveImage} />

          <hr className="section-divider" />

          <Footer />
        </>
      )}

      {activeProjectId && (
        <ProjectDetailPage
          projectId={activeProjectId}
          onBack={closeProject}
        />
      )}

      <Chatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(prev => !prev)} />

      {activeImage && (
        <ImageModal src={activeImage} onClose={() => setActiveImage(null)} />
      )}
    </div>
  );
}
