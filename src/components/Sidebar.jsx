import { NavLink } from 'react-router-dom';
import Typewriter from './Typewriter';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: 'fa-solid fa-house' },
  { path: '/projects', label: 'Projects', icon: 'fa-solid fa-laptop-code' },
  { path: '/experience', label: 'Experience', icon: 'fa-solid fa-briefcase' },
  { path: '/tech-stack', label: 'Stack', icon: 'fa-solid fa-cubes' },
  { path: '/visual-archive', label: 'Archive', icon: 'fa-regular fa-image' },
  { path: '/certification', label: 'Certification', icon: 'fa-solid fa-certificate' },
];

export default function Sidebar({ onToggleChat }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-typewriter-area">
        <Typewriter />
      </div>
      <div className="sidebar-controls">
        <button className="sidebar-chat-btn" onClick={onToggleChat} aria-label="Chat">
          <i className="fa-solid fa-comment-dots"></i>
          <span>Chat</span>
        </button>
        <ThemeToggle />
      </div>
      <div className="sidebar-connect">
        <span className="sidebar-connect-label">Connect</span>
        <a
          href="https://www.linkedin.com/in/john-angelo-concepcion-09051b381"
          target="_blank"
          rel="noreferrer"
          className="sidebar-link sidebar-link-ext"
        >
          <i className="fa-brands fa-linkedin"></i>
          <span>LinkedIn</span>
        </a>
        <a
          href="mailto:johnangeloconcepcion8@gmail.com"
          className="sidebar-link sidebar-link-ext"
        >
          <i className="fa-solid fa-envelope"></i>
          <span>Email</span>
        </a>
        <a
          href="https://github.com/ChairHandler07"
          target="_blank"
          rel="noreferrer"
          className="sidebar-link sidebar-link-ext"
        >
          <i className="fa-brands fa-github"></i>
          <span>GitHub</span>
        </a>
      </div>
    </aside>
  );
}
