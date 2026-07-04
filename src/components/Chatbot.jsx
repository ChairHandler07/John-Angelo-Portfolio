import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  "What projects have you worked on?",
  "Tell me about your tech stack",
  "What's your experience?",
  "Contact information"
];

export default function Chatbot({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Good day! I'm Angelo's virtual assistant. How may I help you?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setMessages(prev => [...prev, { sender: 'bot', text: 'Thinking...' }]);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are Angelo's AI Assistant representing John Angelo Concepcion, a Computer Engineer and Software Engineer from Manila, Philippines. Answer concisely and professionally based on context below. If unsure, suggest emailing johnangeloconcepcion8@gmail.com.

              EDUCATION: BS Computer Engineering (Graduating 2026).
              ACHIEVEMENT: Ideathon 2025 Finalist.
              TECH STACK: React, JavaScript, TypeScript, Flutter (Frontend); PHP, Laravel, Node.js, Python (Backend); ESP32, C++ (Hardware); Git, AWS, Firebase, MySQL (Tools).
              PROJECTS: IoT LPG Leak Detection System (2025-2026), Airlink Defense System for AFP (2025), Blood Bank Management System (2023).
              EXPERIENCE: Started coding in 2021.`
            },
            { role: "user", content: text }
          ]
        })
      });
      const data = await response.json();
      const aiText = data.choices[0].message.content;
      setMessages(prev => {
        const msgs = prev.slice(0, -1);
        return [...msgs, { sender: 'bot', text: aiText }];
      });
    } catch {
      setMessages(prev => {
        const msgs = prev.slice(0, -1);
        return [...msgs, { sender: 'bot', text: "My AI assistant is momentarily unavailable. Please feel free to email me directly at johnangeloconcepcion8@gmail.com" }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">
          <span className="chat-status-dot"></span>
          Angelo's Assistant
        </div>
        <button className="close-chat" onClick={onToggle}>
          <i className="fa-solid fa-minus"></i>
        </button>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
            {msg.text}
          </div>
        ))}
        {messages.length === 1 && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className="chat-suggestion-chip" onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button onClick={() => handleSend()} disabled={isLoading}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
