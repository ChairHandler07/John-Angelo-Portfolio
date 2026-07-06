const PROJECTS = [
  {
    id: "airlink",
    title: "Embedded Systems: Airlink Defense System",
    shortDesc: "Encryption message transmission tool built for the AFP to provide services in indigenous areas.",
    category: "hardware"
  },
  {
    id: "lpg-iot",
    title: "IoT-enabled LPG Leak Detection and Safety System",
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

export default function ProjectsSection({ onProjectClick }) {
  return (
    <section className="content-section">
      <div className="section-header-row">
        <h2 className="section-title">Recent Projects</h2>
      </div>

      {CATEGORIES.map((cat) => {
        const filtered = PROJECTS.filter(p => p.category === cat.key);
        if (filtered.length === 0) return null;
        return (
          <div key={cat.key} className="content-section" style={{ marginBottom: '1.5rem' }}>
            <h3 className="section-title">
              <span className="section-number">{cat.number}</span>
              {cat.label}
            </h3>
            <div className="projects-grid">
              {filtered.map((project) => (
                <article key={project.id} className="project-card">
                  <div className="project-card-header">
                    <span className={`project-category-badge ${project.category}`}>
                      {project.category}
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc}</p>
                  <button
                    className="see-more-btn"
                    onClick={() => onProjectClick(project)}
                  >
                    View Case Study <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
