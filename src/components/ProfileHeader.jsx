export default function ProfileHeader() {
  return (
    <header className="hero-section">
      <div className="hero-image">
        <img src="/Formal.png" alt="John Angelo Concepcion" />
      </div>
      <div className="hero-content">
        <div className="hero-top">
          <h1 className="hero-name">
            John Angelo Concepcion
          </h1>
          <p className="hero-location">
            <i className="fa-solid fa-location-dot"></i> Manila, Philippines
          </p>
          <p className="hero-title">Software Engineer &middot; Computer Engineer</p>
        </div>
        <p className="hero-bio">
          A dedicated Computer Engineer with a foundation in system integration, embedded systems,
          and full-stack development. Passionate about building scalable solutions across the entire
          tech stack — from IoT hardware to cloud-backed web applications.
        </p>
        <div className="hero-badge-row">
          <a
            href="https://www.facebook.com/share/p/17ud3a6m6D/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
            className="champion-badge"
          >
            <i className="fa-solid fa-trophy"></i>
            Ideathon 2025 Finalist
            <i className="fa-solid fa-chevron-right badge-arrow"></i>
          </a>
        </div>
        <div className="hero-actions">
          <a href="mailto:johnangeloconcepcion8@gmail.com" className="btn-primary">
            <i className="fa-regular fa-envelope"></i> Email
          </a>
          <a
            href="https://www.linkedin.com/in/john-angelo-concepcion-09051b381"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            <i className="fa-brands fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
