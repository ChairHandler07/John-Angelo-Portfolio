import { useState, useCallback } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  const handleToggle = useCallback(() => {
    const nextDark = !document.documentElement.classList.contains('dark');

    document.documentElement.classList.add('theme-blending');

    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(nextDark);

    setTimeout(() => {
      document.documentElement.classList.remove('theme-blending');
    }, 550);
  }, []);

  return (
    <button
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
