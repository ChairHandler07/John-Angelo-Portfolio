import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import ThemeToggle from '../components/ThemeToggle';
import { useState } from 'react';

export default function MainLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="app-layout">
      <ThemeToggle />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <Chatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(prev => !prev)} />
    </div>
  );
}
