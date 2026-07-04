const STACK = {
  Frontend: ['React', 'JavaScript', 'React Native', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  Backend: ['PHP', 'Laravel', 'Node.js', 'Python', 'Java', 'REST APIs'],
  'DevOps & Cloud': ['GitHub', 'Firebase', 'MySQL', 'Vite'],
  'Hardware & IoT': ['ESP32', 'Arduino']
};

export default function TechStackPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Tech Stack</h1>
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
