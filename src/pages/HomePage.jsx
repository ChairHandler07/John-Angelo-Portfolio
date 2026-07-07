import { Link } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import Reveal from '../components/Reveal';
import Footer from '../components/Footer';

const PROJECT_PREVIEWS = [
  {
    id: "airlink",
    title: "Embedded Systems: Airlink Defense System",
    shortDesc: "Encryption message transmission tool built for the AFP.",
    category: "hardware"
  },
  {
    id: "lpg-iot",
    title: "IoT-enabled LPG Leak Detection and Safety System",
    shortDesc: "Hardware and software development for LPG automation.",
    category: "iot"
  },
  {
    id: "blood-bank",
    title: "Blood Bank Management System",
    shortDesc: "Web dashboard to improve data exchange and scalability.",
    category: "software"
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

const TECH_PREVIEWS = ['React', 'Laravel', 'Node.js', 'Python', 'Java'];

export default function HomePage() {
  return (
    <div className="home-page">
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
              {PROJECT_PREVIEWS.map((p) => (
                <Link to="/projects" key={p.id} className="preview-item">
                  <span className={`preview-badge ${p.category}`}>{p.category}</span>
                  <div className="preview-info">
                    <strong>{p.title}</strong>
                    <p>{p.shortDesc}</p>
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
