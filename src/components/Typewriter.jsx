import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

const IDLE_PHRASES = [
  'Typing test'
];

const SENTENCES = [
  'The quick brown fox jumps over the lazy dog',
  'Building scalable solutions across the entire tech stack',
  'From IoT hardware to cloud-backed web applications',
  'A dedicated engineer with a passion for code',
  'System integration and embedded systems development',
  'Typing fast is a superpower for every developer',
  'Practice makes perfect keep typing every day',
  'Debugging is twice as hard as writing the code',
  'Simplicity is the soul of efficiency in engineering',
  'First solve the problem then write the code',
  'Code is like humor when you have to explain it its bad',
  'The best error message is the one that never shows up',
  'Any fool can write code that a computer can understand',
  'Good programmers write code that humans can understand',
  'Programs must be written for people to read',
  'Measuring programming progress by lines of code is like measuring aircraft building by weight',
  'Walking on water and developing software from a specification are easy if both are frozen',
  'Controlling complexity is the essence of computer programming',
  'The cheapest fastest and most reliable components are those that arent there',
  'Always code as if the guy who ends up maintaining your code is a violent psychopath who knows where you live',
];

let usedIndices = [];

function pickSentence() {
  const available = SENTENCES.filter((_, i) => !usedIndices.includes(i));
  if (available.length === 0) usedIndices = [];
  const pool = available.length > 0 ? available : SENTENCES;
  const idx = Math.floor(Math.random() * pool.length);
  const originalIdx = SENTENCES.indexOf(pool[idx]);
  usedIndices.push(originalIdx);
  return pool[idx];
}

export default function Typewriter() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const [showTest, setShowTest] = useState(false);
  const [sentence, setSentence] = useState('');
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const startTest = useCallback(() => {
    setSentence(pickSentence());
    setTyped('');
    setStartTime(null);
    setElapsed(0);
    setHasStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setShowTest(true);
  }, []);

  const backToIdle = useCallback(() => {
    setShowTest(false);
    setTyped('');
    setSentence('');
    setElapsed(0);
    setFinished(false);
    clearInterval(timerRef.current);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      backToIdle();
      return;
    }
    if (finished) return;
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      if (!hasStarted) {
        setHasStarted(true);
        const now = Date.now();
        setStartTime(now);
        timerRef.current = setInterval(() => {
          setElapsed(Date.now() - now);
        }, 50);
      }
      setTyped(prev => {
        const next = prev + e.key;
        if (next.length >= sentence.length) {
          const end = Date.now();
          clearInterval(timerRef.current);
          const totalMs = end - (startTime || end);
          const mins = totalMs / 60000;
          const words = sentence.split(' ').length;
          const calculatedWpm = Math.round(words / mins);
          let correct = 0;
          for (let i = 0; i < sentence.length && i < next.length; i++) {
            if (next[i] === sentence[i]) correct++;
          }
          const acc = Math.round((correct / sentence.length) * 100);
          setWpm(calculatedWpm);
          setAccuracy(acc);
          setFinished(true);
          setElapsed(totalMs);
          return next;
        }
        return next;
      });
    }
    if (e.key === 'Backspace') {
      setTyped(prev => prev.slice(0, -1));
    }
  }, [hasStarted, startTime, sentence, finished, backToIdle]);

  useEffect(() => {
    if (showTest && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTest]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // ── idle typewriter animation ──
  useEffect(() => {
    if (showTest) return;
    const phrase = IDLE_PHRASES[phraseIndex];
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
      timeout = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex(prev => (prev + 1) % IDLE_PHRASES.length);
      }, 50);
    }

    return () => clearTimeout(timeout);
  }, [showTest, charIndex, deleting, phraseIndex]);

  return (
    <>
      <div className="sidebar-typewriter" style={{ cursor: 'pointer' }} onClick={startTest} title="Click for typing test">
        <span className="typewriter-prompt">&gt;</span>
        <span className="typewriter-text">{text}</span>
        <span className="typewriter-cursor">&#9612;</span>
      </div>

      {showTest && createPortal(
        <div className="typing-test-overlay" onClick={backToIdle}>
          <div className="typing-test-modal" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown} tabIndex={0} ref={inputRef}>
            <div className="typing-test-header">
              <span className="typing-test-label">typing test</span>
              <button className="typing-test-close" onClick={backToIdle} aria-label="Close">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {finished ? (
              <div className="typing-test-results">
                <div className="typing-test-result-stat">
                  <span className="result-value">{wpm}</span>
                  <span className="result-label">wpm</span>
                </div>
                <div className="typing-test-result-stat">
                  <span className="result-value">{(elapsed / 1000).toFixed(1)}s</span>
                  <span className="result-label">time</span>
                </div>
                <div className="typing-test-result-stat">
                  <span className="result-value">{accuracy}%</span>
                  <span className="result-label">accuracy</span>
                </div>
                <button className="typing-test-retry" onClick={startTest}>
                  <i className="fa-solid fa-rotate-right"></i> try again
                </button>
              </div>
            ) : (
              <>
                <div className="typing-test-sentence">
                  {sentence.split('').map((char, i) => {
                    let cls = '';
                    if (i < typed.length) cls = typed[i] === char ? 'char-correct' : 'char-wrong';
                    if (i === typed.length) cls += ' char-current';
                    return <span key={i} className={cls}>{char}</span>;
                  })}
                </div>

                {hasStarted ? (
                  <div className="typing-test-info">
                    <span className="typing-test-timer">{(elapsed / 1000).toFixed(1)}s</span>
                    <span className="typing-test-progress">{typed.length}/{sentence.length}</span>
                  </div>
                ) : (
                  <div className="typing-test-hint">start typing to begin</div>
                )}

                <div className="typing-test-esc-hint">esc to cancel</div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}