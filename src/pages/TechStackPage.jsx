const STACK = {
  Frontend: ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'Prettier'],
  Backend: ['PHP', 'Laravel', 'Node.js', 'Python', 'Java', 'Express.js', 'Firebase', 'MySQL', 'MongoDB', 'PostgreSQL'],
  'AI & Machine Learning': ['TensorFlow', 'OpenCV', 'Hugging Face', 'Gemini', 'Claude Code'],
  'DevOps & Cloud': ['GitHub'],
  'Hardware & IoT': ['ESP32', 'Arduino'],
};

export default function TechStackPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Tech Stack</h1>
        <p className="page-subtitle">Technologies and tools I work with across the development</p>
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
