import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CoverflowGallery from '../components/originkit/ui/coverflowgallery';
import ProfileHeader from '../components/ProfileHeader';
import Reveal from '../components/Reveal';
import Footer from '../components/Footer';
import SideRays from '../components/SideRays';

const PROJECT_PREVIEWS = [
  {
    id: "airlink",
    title: "Embedded Systems: Airlink Defense System",
    shortDesc: "Encryption message transmission tool built for the AFP.",
    category: "hardware",
    logo: "/AIRLINK.png"
  },
  {
    id: "lpg-iot",
    title: "IoT-enabled LPG Leak Detection and Safety System",
    shortDesc: "Hardware and software development for LPG automation.",
    category: "iot",
    logo: "/GASOLVE.png"
  },
  {
    id: "blood-bank",
    title: "Blood Bank Management System",
    shortDesc: "Web dashboard to improve data exchange and scalability.",
    category: "software",
    logo: null
  }
];

const EXPERIENCE_PREVIEWS = [
  {
    title: 'Hardware Design & Algorithm',
    year: '2026',
    company: 'CPE Design Project Thesis',
    description: 'Leading hardware-software integration for IoT-based LPG safety system'
  },
  {
    title: 'Software & Hardware Lead',
    year: '2025',
    company: 'Airlink Defense System',
    description: 'Led development of encrypted communication system for the AFP'
  },
  {
    title: 'Project Manager',
    year: '2022',
    company: 'Red Cross Software System',
    description: 'Managed full-stack development of blood bank management system'
  }
];

const TECH_PREVIEWS = ['React', 'Laravel', 'Node.js', 'Python', 'JavaScript'];

const PROJECT_SLIDE = (project, navigate) => (
  <div
    style={{
      height: '100%',
      width: '100%',
      background: 'var(--bg)',
      border: '1px solid var(--border-color)',
      padding: '1.5rem 1.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      position: 'relative',
    }}
  >
    <div className="project-card-header">
      <span className={`project-category-badge ${project.category}`}>{project.category}</span>
    </div>
    <h3 style={{ fontSize: '0.95rem' }}>{project.title}</h3>
    <p style={{ fontSize: '0.78rem', marginBottom: 0 }}>{project.shortDesc}</p>
    <div style={{ marginTop: 'auto' }} />
    <button
      className="see-more-btn"
      onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id}`); }}
    >
      View Case Study <i className="fa-solid fa-arrow-right"></i>
    </button>

    {project.logo && (
      <img
        src={project.logo}
        alt={`${project.title} logo`}
        className="coverflow-logo"
        style={{
          position: 'absolute',
          right: '1rem',
          bottom: '1rem',
          width: '2rem',
          height: '2rem',
          objectFit: 'contain',
          borderRadius: 'var(--radius-xs)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    )}
  </div>
);

export default function HomePage() {
  const navigate = useNavigate();
  const coverRef = useRef(null);
  const [frame, setFrame] = useState({ w: 360, h: 290, gap: 4 });
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const width = coverRef.current ? coverRef.current.clientWidth : 672;
      if (width >= 860) setFrame({ w: 360, h: 290, gap: 4 });
      else if (width >= 600) setFrame({ w: 320, h: 260, gap: 3.5 });
      else setFrame({ w: Math.min(240, Math.max(190, width - 60)), h: 200, gap: 2.5 });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="home-page">
      {isDark && (
        <div className="page-rays-bg">
          <SideRays
            speed={2.5}
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            intensity={2}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1.0}
          />
        </div>
      )}
      <div className="portfolio-wrapper">
        <ProfileHeader />

        <Reveal>
          <section className="content-section">
            <div className="section-header-row">
              <h2 className="section-title">
                <span className="section-number">01</span> projects
              </h2>
              <Link to="/projects" className="home-link">View All <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div>
              <CoverflowGallery
                slides={PROJECT_PREVIEWS.map((p) => ({
                  title: p.title,
                  content: PROJECT_SLIDE(p, navigate)
                }))}
                cardWidth={frame.w}
                cardHeight={frame.h}
                radius={2}
                tilt={5}
                sideTilt={6}
                gap={frame.gap}
                opacity={72}
                showTitle={false}
                style={{ width: '100%', margin: '0 auto' }}
              />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="content-section">
            <div className="section-header-row">
              <h2 className="section-title">
                <span className="section-number">02</span> experience
              </h2>
              <Link to="/experience" className="home-link">Full History <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div>
              {EXPERIENCE_PREVIEWS.map((exp, i) => (
                <Link to="/experience" key={i} className="preview-item preview-item-row">
                  <div className="preview-year">{exp.year}</div>
                  <div className="preview-info">
                    <strong>{exp.title}</strong>
                    <p>{exp.company}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="content-section">
            <div className="section-header-row">
              <h2 className="section-title">
                <span className="section-number">03</span> tech stack
              </h2>
              <Link to="/tech-stack" className="home-link">See Full Stack <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div className="preview-pills">
              {TECH_PREVIEWS.map((tech) => (
                <span key={tech} className="pill">{tech}</span>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="content-section">
            <div className="section-header-row">
              <h2 className="section-title">
                <span className="section-number">04</span> archive
              </h2>
              <Link to="/visual-archive" className="home-link">View All <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <Link to="/visual-archive" className="preview-cert-badge">
              <i className="fa-regular fa-image"></i>
              <span>visual archive</span>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </section>
        </Reveal>

        <Reveal>
          <section className="content-section">
            <div className="section-header-row">
              <h2 className="section-title">
                <span className="section-number">05</span> certification
              </h2>
              <Link to="/certification" className="home-link">All Certifications <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <Link to="/certification" className="preview-cert-badge">
              <i className="fa-solid fa-certificate"></i>
              <span>certifications</span>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </section>
        </Reveal>

        <Reveal>
          <section className="content-section">
            <div className="section-header-row">
              <h2 className="section-title">
                <span className="section-number">06</span> achievements
              </h2>
              <Link to="/achievements" className="home-link">View All <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <Link to="/achievements" className="preview-cert-badge">
              <i className="fa-solid fa-trophy"></i>
              <span>hackathon</span>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </section>
        </Reveal>

        <Reveal>
          <Footer />
        </Reveal>
      </div>
    </div>
  );
}
