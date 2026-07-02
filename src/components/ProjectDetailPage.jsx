import { useParams, useNavigate } from 'react-router-dom';

const PROJECTS_DATA = [
  {
    id: "airlink",
    title: "Embedded Systems: Airlink Defense System with Encryption Message for Indigenous People",
    fullDesc: "Developed an encryption message transmission tool using ESP32 as a transmission message utility, handling software integration with encryption logic using ATECC608a chip and receiver-side architecture. Built to help the AFP provide services for indigenous people in secluded areas.",
    hardware: ["ESP32 Development Module", "ATECC608a Crypto-Chip", "Receiver-side Architecture"],
    credentials: [
      { type: "image", label: "Courtesy Call from the President", src: "/Gallery2.png" },
      { type: "image", label: "Embedded System Project", src: "airlink_hardware.jpg" },
      { type: "pdf", label: "AFP Project Documentation", src: "AFP.pdf" }
    ]
  },
  {
    id: "lpg-iot",
    title: "IoT-enabled LPG Leak Detection, Weight Monitoring, and Valve Automatic Shutoff System",
    fullDesc: "Led hardware and software development utilizing an ESP32 microcontroller. Integrates load cell for tank monitoring, MQ-6 gas sensor to detect leaks and gas concentration, and a servo motor embedded with a ball valve for auto shut-off mechanism, providing automation for users in handling LPG and can control via mobile app over the internet.",
    hardware: ["ESP32 Microcontroller", "React-Native", "MQ-6 Gas Sensor", "Load Cell", "Servo Motor with Ball Valve"],
    credentials: [
      { type: "image", label: "Mobile App Interface", src: "/GaSolve_app.png" }
    ]
  },
  {
    id: "blood-bank",
    title: "Software Design: Blood Bank Management System",
    fullDesc: "Collaborated on creating a web dashboard for the project blood bank management system to improve the exchange of data and to enrich scalability. Further, to enhance user experience and streamline operations using modern web technologies.",
    hardware: ["React", "Laravel PHP", "MySQL"],
    credentials: [
      { type: "image", label: "Dashboard Preview", src: "/bloodbank_image.png" }
    ]
  },
  {
    id: "hotellium",
    title: "Online Booking Hotel Reservation System for Tourists and Travelers",
    fullDesc: "Developed a web-based hotel reservation system that allows users to book rooms online. The system provides an easy-to-use interface for both customers and hotel administrators, streamlining the booking process and improving overall user experience.",
    hardware: ["PHP", "Laravel Framework", "MySQL", "CSS Bootstrap"],
    credentials: [
      { type: "image", label: "Hotel Booking Interface", src: "/hotellium_interface.png" },
      { type: "image", label: "Client Dashboard Interface", src: "/hotellium_dashboard.png" },
      { type: "image", label: "Admin Dashboard Interface", src: "/hotellium_admin.png" }
    ]
  }
];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="page-container">
        <p>Project not found.</p>
        <button className="btn-primary" onClick={() => navigate('/projects')}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="project-page-header">
        <button className="back-btn" onClick={() => navigate('/projects')}>
          <i className="fa-solid fa-arrow-left"></i> Back to Projects
        </button>
      </div>

      <div className="project-page-content">
        <div className="project-hero">
          <span className="page-breadcrumb">Case Study / {project.id}</span>
          <h1>{project.title}</h1>
        </div>

        <div className="project-page-body">
          <div className="project-main-desc">
            <h3>Project Overview</h3>
            <p>{project.fullDesc}</p>

            {project.credentials && project.credentials.some(c => c.type === 'image') && (
              <div className="case-study-gallery">
                {project.credentials
                  .filter(c => c.type === 'image')
                  .map((img, i) => (
                    <figure key={i} className="case-study-figure">
                      <img src={img.src} alt={img.label} className="case-study-image" />
                      <figcaption>{img.label}</figcaption>
                    </figure>
                  ))}
              </div>
            )}
          </div>

          <aside className="project-sidebar">
            {project.hardware && (
              <div className="page-section">
                <h4>Tech Stack</h4>
                <ul className="hardware-list">
                  {project.hardware.map((item, i) => (
                    <li key={i}>
                      <i className="fa-solid fa-microchip"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.credentials && project.credentials.some(c => c.type === 'pdf') && (
              <div className="page-section">
                <h4>Documents</h4>
                <div className="credentials-stack">
                  {project.credentials
                    .filter(c => c.type === 'pdf')
                    .map((cred, i) => (
                      <a key={i} href={cred.src} target="_blank" rel="noopener noreferrer" className="credential-link">
                        <div className="credential-icon">
                          <i className="fa-regular fa-file-pdf pdf-color"></i>
                        </div>
                        <div className="credential-info">
                          <span className="credential-label">{cred.label}</span>
                          <span className="credential-action">Open Document &rarr;</span>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            )}

            <div className="page-section page-cta">
              <h4>Interested in this project?</h4>
              <a href="mailto:johnangeloconcepcion8@gmail.com" className="btn-primary">
                <i className="fa-regular fa-envelope"></i> Request More Details
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
