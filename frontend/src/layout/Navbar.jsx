import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass-panel text-textMain p-4 flex justify-between items-center z-30 relative sticky top-0 border-b border-white/50">
      <div className="flex items-center gap-3">
        {user && (
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu size={24} className="text-primary" />
          </button>
        )}
        <div className="text-2xl font-heading font-bold flex items-center gap-3">
          <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">CU Access Audit</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-100 rounded-full hidden sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-[10px] font-bold text-success-dark uppercase tracking-wider">Live</span>
          </div>
        </div>
      </div>
      
      {user && (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 hidden sm:flex bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            <User size={16} className="text-primary" />
            <span className="capitalize text-sm font-medium">{user.role}</span>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 hover:bg-danger-50 text-gray-600 hover:text-danger transition-all px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-danger/50"
            aria-label="Log out"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
