const STACK = {
  Frontend: ['React', 'JavaScript', 'React Native', 'HTML5', 'CSS3'],
  Backend: ['PHP', 'Laravel', 'Node.js', 'Python', 'Java', 'REST APIs'],
  'DevOps & Cloud': ['GitHub', 'Firebase', 'MySQL', 'Vite', 'Docker'],
  'Hardware & IoT': ['ESP32', 'Arduino', 'MQ-6 Sensor', 'Load Cell', 'ATECC608a']
};

export default function TechStackPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Technical Proficiency</h1>
        <p className="page-subtitle">Technologies and tools I work with across the full stack.</p>
      </div>

      <div className="tech-stack-full">
        {Object.entries(STACK).map(([category, items]) => (
          <div key={category} className="stack-group">
            <h3 className="stack-label">{category}</h3>
            <div className="stack-pills">
              {items.map((item) => (
                <span key={item} className="stack-pill">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
