import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md z-20 relative">
      <div className="flex items-center gap-3">
        {user && (
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
          >
            <Menu size={24} />
          </button>
        )}
        <div className="text-xl font-bold flex items-center gap-2">
          <span>AccessAudit</span>
          <span className="text-sm bg-secondary text-primary px-2 py-1 rounded font-semibold ml-2 hidden sm:inline-block">CUSOC</span>
        </div>
      </div>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hidden sm:flex">
            <User size={18} />
            <span className="capitalize">{user.role}</span>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-1 hover:text-red-200 transition-colors bg-white/10 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Log out"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
