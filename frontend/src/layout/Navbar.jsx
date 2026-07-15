import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold flex items-center gap-2">
        <span>AccessAudit</span>
        <span className="text-sm bg-secondary text-primary px-2 py-1 rounded font-semibold ml-2">CUSOC</span>
      </div>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span className="capitalize">{user.role}</span>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-1 hover:text-red-200 transition-colors bg-white/10 px-3 py-1 rounded"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
