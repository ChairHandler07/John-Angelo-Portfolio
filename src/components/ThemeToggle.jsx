import { useState, useRef, useCallback } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const toggleRef = useRef(null);
  const busy = useRef(false);

  const handleToggle = useCallback(() => {
    if (busy.current) return;
    busy.current = true;

    const nextDark = !document.body.classList.contains('dark-mode');

    document.body.classList.add('theme-blending');

    if (nextDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(nextDark);

    setTimeout(() => {
      document.body.classList.remove('theme-blending');
      busy.current = false;
    }, 550);
  }, []);

  return (
    <button
      ref={toggleRef}
      className={`theme-switch-btn ${isDark ? 'dark' : 'light'}`}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <div className="theme-switch-track">
        <div className="theme-switch-thumb">
          <i className={`fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}`}></i>
        </div>
      </div>
    </button>
  );
}
