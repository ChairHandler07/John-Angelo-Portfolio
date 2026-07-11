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

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

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
  const [elapsed, setElapsed] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [pressedKey, setPressedKey] = useState('');

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const audioCtxRef = useRef(null);

  const finishTest = useCallback((val) => {
    clearInterval(timerRef.current);
    const totalMs = Date.now() - (startTimeRef.current || Date.now());
    const mins = totalMs / 60000;
    const words = sentence.split(' ').length;
    const calculatedWpm = Math.round(words / mins);
    let correct = 0;
    const norm = (s) => s.normalize('NFC').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\u00A0/g, ' ');
    const ns = norm(sentence);
    const nv = norm(val);
    for (let i = 0; i < ns.length && i < nv.length; i++) {
      if (nv[i] === ns[i]) correct++;
    }
    const acc = Math.round((correct / ns.length) * 100);
    setWpm(calculatedWpm);
    setAccuracy(acc);
    setFinished(true);
    setElapsed(totalMs);
  }, [sentence]);

  const startTest = useCallback(() => {
    setSentence(pickSentence());
    setTyped('');
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

  const playClick = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 1000;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) { /* ignore */ }
  }, []);

  const processInput = useCallback((val) => {
    if (finished) return;
    val = val.slice(0, sentence.length);

    if (!hasStarted && val.length > 0) {
      setHasStarted(true);
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTimeRef.current);
      }, 50);
    }

    setTyped(val);

    if (val.length >= sentence.length) {
      finishTest(val);
    }
  }, [hasStarted, sentence, finished, finishTest]);

  const handleChange = useCallback((e) => {
    processInput(e.target.value);
  }, [processInput]);

  const pressTimerRef = useRef(null);

  const handleKeyClick = useCallback((key) => {
    if (finished) return;
    let newTyped;
    if (key === 'Backspace') {
      newTyped = typed.slice(0, -1);
    } else {
      newTyped = typed + key;
    }
    processInput(newTyped);
    if (inputRef.current) {
      inputRef.current.value = newTyped;
    }
    playClick();
    setPressedKey(key);
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = setTimeout(() => setPressedKey(''), 120);
  }, [finished, typed, processInput, playClick]);

  useEffect(() => {
    return () => clearTimeout(pressTimerRef.current);
  }, []);

  useEffect(() => {
    if (showTest && inputRef.current && !isTouchDevice) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showTest]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!showTest) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        backToIdle();
        return;
      }
      if (finished) return;

      let key = e.key;
      if (key === ' ') key = ' ';
      else if (key.length === 1) key = key.toLowerCase();
      else return;

      setPressedKey(key);
      playClick();
    };

    const handleKeyUp = () => {
      setPressedKey('');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [showTest, finished, backToIdle, playClick]);

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
          <div className="typing-test-modal" onClick={() => { if (!finished && !isTouchDevice) inputRef.current?.focus(); }}>
            <input
              ref={inputRef}
              type="text"
              className="typing-test-input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              inputMode="text"
              data-form-type="other"
              value={typed}
              onChange={handleChange}
              onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
            />

            <div className="typing-test-header">
              <span className="typing-test-label">typing test</span>
              <button className="typing-test-close" onClick={(e) => { e.stopPropagation(); backToIdle(); }} aria-label="Close">
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
                <button className="typing-test-retry" onClick={(e) => { e.stopPropagation(); startTest(); }}>
                  <i className="fa-solid fa-rotate-right"></i> try again
                </button>
              </div>
            ) : (
              <>
                <div className="typing-test-sentence" onClick={() => { if (!isTouchDevice) inputRef.current?.focus(); }}>
                  {sentence.split('').map((char, i) => {
                    let cls = '';
                    if (i < typed.length) cls = typed[i] === char ? 'char-correct' : 'char-wrong';
                    if (i === typed.length) cls += ' char-current';
                    return <span key={i} className={cls}>{char}</span>;
                  })}
                </div>

                <div className="typing-keyboard">
                  {KEYBOARD_ROWS.map((row, ri) => (
                    <div key={ri} className="typing-keyboard-row">
                      {row.map((key) => (
                        <span
                          key={key}
                          className={`typing-key${pressedKey === key ? ' pressed' : ''}`}
                          onPointerDown={(e) => { e.preventDefault(); handleKeyClick(key); }}
                        >
                          {key}
                        </span>
                      ))}
                      {ri === 2 && (
                        <span
                          className={`typing-key typing-key-bksp${pressedKey === 'Backspace' ? ' pressed' : ''}`}
                          onPointerDown={(e) => { e.preventDefault(); handleKeyClick('Backspace'); }}
                        >
                          ⌫
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="typing-keyboard-row">
                    <span
                      className={`typing-key typing-key-space${pressedKey === ' ' ? ' pressed' : ''}`}
                      onPointerDown={(e) => { e.preventDefault(); handleKeyClick(' '); }}
                    />
                  </div>
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