import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import QuickReportFAB from '../components/QuickReportFAB';

import { useAccessibility } from '../context/AccessibilityContext';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { distractionFree } = useAccessibility();

  return (
    <div className={`flex flex-col min-h-screen bg-transparent text-textMain font-sans relative ${distractionFree ? 'bg-white' : ''}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/50">
        Skip to main content
      </a>
      <a href="#sidebar-nav" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 z-[100] bg-secondary text-white px-4 py-2 rounded-lg font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-secondary/50">
        Skip to navigation
      </a>
      {!distractionFree && <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
      <div className={`flex flex-1 overflow-hidden relative ${distractionFree ? 'justify-center items-center py-10' : ''}`}>
        {!distractionFree && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
        <main 
          className={`overflow-auto min-w-0 p-4 md:p-6 lg:p-8 w-full ${distractionFree ? 'max-w-3xl flex-none border border-gray-100 shadow-sm rounded-2xl bg-white' : 'flex-1'}`}
          id="main-content"
          role="main"
          tabIndex="-1"
        >
          {children}
        </main>
      </div>
      {!distractionFree && <Footer />}
      
      {/* Universal Floating Action Button */}
      {!distractionFree && <QuickReportFAB />}
    </div>
  );
};

export default MainLayout;
