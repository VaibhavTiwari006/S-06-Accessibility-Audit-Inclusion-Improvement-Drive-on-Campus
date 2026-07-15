import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-textMain font-sans">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main 
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 w-full"
          id="main-content"
          role="main"
          tabIndex="-1"
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
