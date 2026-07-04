const ACHIEVEMENTS = [
  {
    title: 'Ideathon 2025 Finalist',
    description: 'Recognized as a finalist in the Ideathon 2025 competition for innovative project development.',
    link: 'https://www.facebook.com/share/p/17ud3a6m6D/?mibextid=wwXIfr',
  },
];

export default function AchievementsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">achievements</h1>
        <p className="page-subtitle">Hackathons, competitions, and notable recognitions.</p>
      </div>

      <div className="certs-grid">
        {ACHIEVEMENTS.map((a) => (
          <a key={a.title} href={a.link} target="_blank" rel="noreferrer" className="cert-card" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem', opacity: 0.6 }}>
              <i className="fa-solid fa-trophy"></i>
            </div>
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <span className="home-link" style={{ gap: 4 }}>View Post <i className="fa-solid fa-arrow-right"></i></span>
          </a>
        ))}
      </div>
    </div>
  );
}
