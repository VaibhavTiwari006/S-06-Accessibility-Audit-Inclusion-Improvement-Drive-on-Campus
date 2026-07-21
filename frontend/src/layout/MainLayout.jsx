import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import QuickReportFAB from '../components/QuickReportFAB';
import PageTransition from '../components/PageTransition';

import { useAccessibility } from '../context/AccessibilityContext';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { distractionFree, speak, textToSpeech } = useAccessibility();

  // Screen Reader (TTS) Hover Logic
  useEffect(() => {
    if (!textToSpeech) return;
    
    let debounceTimer;

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, h1, h2, h3, h4, h5, h6, label, [aria-label], [title], .tts-readable');
      if (target) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const text = target.getAttribute('aria-label') || target.getAttribute('title') || target.innerText;
          if (text && text.trim().length > 0) {
            speak(text.trim());
          }
        }, 600); // 600ms hover delay
      }
    };

    const handleMouseOut = () => {
      clearTimeout(debounceTimer);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(debounceTimer);
    };
  }, [textToSpeech, speak]);

  return (
    <div className={`flex flex-col min-h-screen bg-transparent text-textMain font-sans relative ${distractionFree ? 'bg-white' : ''}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/50">
        Skip to main content
      </a>
      <a href="#sidebar-nav" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 z-[100] bg-secondary text-white px-4 py-2 rounded-lg font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-secondary/50">
        Skip to navigation
      </a>
      {!distractionFree && <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
      <div className={`flex flex-1 relative ${distractionFree ? 'justify-center items-center py-10' : ''}`}>
        {!distractionFree && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
        <main 
          className={`min-w-0 p-4 md:p-8 lg:p-10 w-full ${distractionFree ? 'max-w-3xl flex-none border border-gray-100 shadow-sm rounded-2xl bg-white mx-auto' : 'flex-1'}`}
          id="main-content"
          role="main"
          tabIndex="-1"
        >
          <PageTransition>
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </PageTransition>
        </main>
      </div>
      {!distractionFree && <Footer />}
      
      {/* Universal Floating Action Button */}
      {!distractionFree && <QuickReportFAB />}
    </div>
  );
};

export default MainLayout;
