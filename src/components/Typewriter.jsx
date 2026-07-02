import { useState, useEffect } from 'react';

const PHRASES = [
  'console.log("Hello, World!");',
  'npm run build',
  'git push origin main',
  'const app = express();',
  'Hello, World!',
  'while(alive) { code(); }',
  'import React from "react";',
  'docker compose up',
];

export default function Typewriter() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIndex];
    let timeout;

    if (!deleting && charIndex < phrase.length) {
      timeout = setTimeout(() => {
        setText(phrase.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 60 + Math.random() * 40);
    } else if (!deleting && charIndex === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(phrase.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 30 + Math.random() * 20);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex(prev => (prev + 1) % PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <div className="sidebar-typewriter">
      <span className="typewriter-prompt">&gt;</span>
      <span className="typewriter-text">{text}</span>
      <span className="typewriter-cursor">&#9612;</span>
    </div>
  );
}
