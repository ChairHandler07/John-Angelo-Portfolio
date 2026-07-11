const EXPERIENCES = [
  {
    title: 'Hardware Design & Algorithm',
    year: '2026',
    company: 'CPE Design Project Thesis',
    description: 'Led hardware-software integration for IoT-based LPG safety system'
  },
  {
    title: 'Technical Support & Software Developer | Intern',
    year: '2026',
    company: 'Espiritu Santo Parochial School, Inc.',
    description: 'Assigned to provide technical support and proposed an initial plan for website development and maintenance for the school'
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
  },
  {
    title: 'BS Computer Engineering',
    year: '2021',
    company: 'Pamantasan ng Lungsod ng Maynila',
    description: 'Pursuing degree with focus through software engineering'
  },
  {
    title: 'First Line of Code',
    year: '2021',
    company: '',
    description: 'Began the journey into software development and engineering'
  }
];

export default function ExperiencePage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">experience</h1>
        <p className="page-subtitle">My journey through tech industry</p>
      </div>

      <div className="exp-timeline-full">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="exp-row">
            <div className="exp-marker">
              <div className="exp-box"></div>
            </div>
            <div className="exp-info">
              <div className="exp-top-row">
                <strong>{exp.title}</strong>
                <span className="exp-yr">{exp.year}</span>
              </div>
              <p className="exp-company">{exp.company}</p>
              <p className="exp-desc">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
