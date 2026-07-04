import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import { useState } from 'react';

export default function MainLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar onToggleChat={() => setIsChatOpen(prev => !prev)} />
      <main className="main-content">
        <div className="portfolio-wrapper">
          <Outlet />
        </div>
      </main>
      <Chatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(prev => !prev)} />
    </div>
  );
}
