import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
