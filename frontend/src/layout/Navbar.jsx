import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, Bell, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const roleColors = {
  ADMIN: 'bg-red-50 text-red-700 border-red-100',
  AUDITOR: 'bg-blue-50 text-blue-700 border-blue-100',
  STUDENT: 'bg-green-50 text-green-700 border-green-100',
  MAINTENANCE: 'bg-orange-50 text-orange-700 border-orange-100',
};

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roleColor = roleColors[user?.role?.toUpperCase()] || 'bg-gray-50 text-gray-700 border-gray-100';
  const initial = user?.fullName?.charAt(0)?.toUpperCase() || '?';

  return (
    <nav className="glass-premium sticky top-0 z-50 shadow-sm border-b-0">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left: Hamburger + Brand */}
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-xl hover:bg-primary/5 text-gray-500 hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Toggle navigation menu"
            >
              <Menu size={22} />
            </button>
          )}

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            {/* Logo icon */}
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm font-heading">CU</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-heading font-bold text-textMain">
                CU <span className="text-primary">Access</span> Audit
              </span>
            </div>
          </Link>

          {/* Live badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Live</span>
          </div>
        </div>

        {/* Right: actions */}
        {user && (
          <div className="flex items-center gap-2">
            {/* Role badge */}
            <span className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${roleColor}`}>
              {user.role}
            </span>

            {/* Settings shortcut - admin only */}
            {user.role?.toUpperCase() === 'ADMIN' && (
              <button
                onClick={() => navigate('/settings')}
                className="p-2 rounded-xl text-gray-500 hover:text-primary hover:bg-primary/5 transition-all"
                title="Settings"
              >
                <Settings size={18} />
              </button>
            )}

            {/* User avatar / menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {initial}
                </div>
                <span className="hidden md:block text-sm font-medium text-textMain max-w-[120px] truncate">
                  {user.fullName?.split(' ')[0]}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 glass-panel rounded-2xl shadow-soft-lg p-1.5 border border-white/70 animate-scale-in z-50">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-semibold text-textMain truncate">{user.fullName}</p>
                    <p className="text-xs text-textLight truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setShowUserMenu(false); logout(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 font-medium transition-all"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {showUserMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
      )}
    </nav>
  );
};

export default Navbar;
