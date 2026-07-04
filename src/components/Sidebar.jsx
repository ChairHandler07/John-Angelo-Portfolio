import { useState, useEffect } from 'react';
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
  { path: '/achievements', label: 'Hackathon', icon: 'fa-solid fa-trophy' },
];

export default function Sidebar({ onToggleChat }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return (
    <>
      <aside className={`sidebar${isOpen ? ' open' : ''}`}>
        <button
          className="sidebar-toggle"
          onClick={toggle}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
              onClick={close}
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
          <button className="sidebar-chat-btn" onClick={() => { onToggleChat(); close(); }} aria-label="Chat">
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
            onClick={close}
          >
            <i className="fa-brands fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:johnangeloconcepcion8@gmail.com"
            className="sidebar-link sidebar-link-ext"
            onClick={close}
          >
            <i className="fa-solid fa-envelope"></i>
            <span>Email</span>
          </a>
          <a
            href="https://github.com/ChairHandler07"
            target="_blank"
            rel="noreferrer"
            className="sidebar-link sidebar-link-ext"
            onClick={close}
          >
            <i className="fa-brands fa-github"></i>
            <span>GitHub</span>
          </a>
        </div>
      </aside>
      {isOpen && <div className="sidebar-overlay" onClick={close} />}
    </>
  );
}
