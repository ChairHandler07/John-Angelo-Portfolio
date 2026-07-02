import { useState, useRef, useCallback } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const toggleRef = useRef(null);
  const busy = useRef(false);

  const handleToggle = useCallback(() => {
    if (busy.current) return;
    busy.current = true;

    const btn = toggleRef.current;
    if (!btn) { busy.current = false; return; }

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const diag = Math.ceil(Math.hypot(
      Math.max(window.innerWidth - cx, cx),
      Math.max(window.innerHeight - cy, cy)
    ));

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
      border-radius: 0;
      opacity: 0.22;
      transition: none;
    `;
    document.body.appendChild(overlay);

    const nextDark = !document.body.classList.contains('dark-mode');
    overlay.style.background = nextDark ? '#0f1115' : '#ffffff';
    overlay.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;

    document.body.classList.add('theme-blending');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = `clip-path 0.6s cubic-bezier(0.65, 0, 0.35, 1)`;
        overlay.style.clipPath = `circle(${diag}px at ${cx}px ${cy}px)`;
      });
    });

    if (nextDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(nextDark);

    setTimeout(() => {
      overlay.style.transition = 'opacity 0.25s ease';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        document.body.classList.remove('theme-blending');
        busy.current = false;
      }, 300);
    }, 650);
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
