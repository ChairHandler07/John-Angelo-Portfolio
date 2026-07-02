import { Link } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
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

const TECH_PREVIEWS = ['React', 'Laravel', 'Node.js', 'Python', 'Java', 'Firebase'];

const GALLERY_PREVIEWS = [
  '/Gallery1.png',
  '/Gallery2.png',
  '/Gallery3.png',
];

export default function HomePage() {
  return (
    <div className="home-page">
      <ProfileHeader />

      <div className="home-categories">
        <div className="home-category-row">
          <section className="home-card projects-preview">
            <div className="home-card-header">
              <h2><i className="fa-solid fa-code"></i> Projects</h2>
              <Link to="/projects" className="home-link">View All <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div className="home-card-body">
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

          <section className="home-card experience-preview">
            <div className="home-card-header">
              <h2><i className="fa-solid fa-briefcase"></i> Experience</h2>
              <Link to="/experience" className="home-link">Full History <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div className="home-card-body">
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
        </div>

        <div className="home-category-row">
          <section className="home-card tech-preview">
            <div className="home-card-header">
              <h2><i className="fa-solid fa-microchip"></i> Tech Stack</h2>
              <Link to="/tech-stack" className="home-link">See Full Stack <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div className="home-card-body">
              <div className="preview-pills">
                {TECH_PREVIEWS.map((tech) => (
                  <span key={tech} className="pill">{tech}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="home-card visual-preview">
            <div className="home-card-header">
              <h2><i className="fa-solid fa-images"></i> Visual Archive</h2>
              <Link to="/visual-archive" className="home-link">View All <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div className="home-card-body">
              <div className="preview-thumbs">
                {GALLERY_PREVIEWS.map((src, i) => (
                  <Link to="/visual-archive" key={i} className="thumb-link">
                    <img src={src} alt={`Gallery ${i + 1}`} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="home-category-row home-category-single">
          <section className="home-card cert-preview">
            <div className="home-card-header">
              <h2><i className="fa-solid fa-certificate"></i> Certification</h2>
              <Link to="/certification" className="home-link">All Certifications <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div className="home-card-body">
              <Link to="/certification" className="preview-cert-badge">
                <i className="fa-solid fa-award"></i>
                <span>View my professional certifications</span>
                <i className="fa-solid fa-chevron-right"></i>
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
