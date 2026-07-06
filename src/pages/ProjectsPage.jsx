import { useNavigate } from 'react-router-dom';

const PROJECTS = [
  {
    id: "airlink",
    title: "Embedded Systems: Airlink Defense System with Encryption Message for Indigenous People",
    shortDesc: "Encryption message transmission tool built for the AFP to provide services in indigenous areas.",
    category: "hardware"
  },
  {
    id: "lpg-iot",
    title: "IoT-enabled LPG Leak Detection, Weight Monitoring, and Valve Automatic Shutoff System",
    shortDesc: "Hardware and software development for LPG automation utilizing ESP32 microcontroller.",
    category: "iot"
  },
  {
    id: "blood-bank",
    title: "Software Design: Blood Bank Management System",
    shortDesc: "Web dashboard created to improve data exchange and enrich scalability.",
    category: "software"
  },
  {
    id: "hotellium",
    title: "Online Booking Hotel Reservation System for Tourists and Travelers",
    shortDesc: "A web-based hotel reservation system that allows users to book rooms online.",
    category: "software"
  }
];

const CATEGORIES = [
  { key: 'software', number: '01', label: 'Software' },
  { key: 'hardware', number: '02', label: 'Hardware' },
  { key: 'iot', number: '03', label: 'IoT' },
];

export default function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">projects</h1>
        <p className="page-subtitle">A collection of software, hardware, and IoT projects I've built.</p>
      </div>

      {CATEGORIES.map((cat) => {
        const filtered = PROJECTS.filter(p => p.category === cat.key);
        if (filtered.length === 0) return null;
        return (
          <section key={cat.key} className="content-section" style={{ marginBottom: '1.5rem' }}>
            <h2 className="section-title">
              <span className="section-number">{cat.number}</span>
              {cat.label}
            </h2>
            <div className="projects-grid">
              {filtered.map((project) => (
                <article
                  key={project.id}
                  className="project-card clickable"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div className="project-card-header">
                    <span className={`project-category-badge ${project.category}`}>
                      {project.category}
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc}</p>
                  <button
                    className="see-more-btn"
                    onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id}`); }}
                  >
                    View Case Study <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
