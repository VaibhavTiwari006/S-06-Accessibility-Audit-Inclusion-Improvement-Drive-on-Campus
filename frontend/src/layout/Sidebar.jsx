import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Building2, ClipboardList, AlertCircle, BarChart3, Settings, HeartHandshake, Map, ChevronRight } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard',  path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'AUDITOR', 'STUDENT', 'MAINTENANCE'] },
  { name: 'Roadmap',    path: '/roadmap',   icon: Map,             roles: ['ADMIN', 'MAINTENANCE'] },
  { name: 'Buildings',  path: '/buildings', icon: Building2,       roles: ['ADMIN', 'AUDITOR'] },
  { name: 'Audits',     path: '/audits',    icon: ClipboardList,   roles: ['ADMIN', 'AUDITOR'] },
  { name: 'Issues',     path: '/issues',    icon: AlertCircle,     roles: ['ADMIN', 'STUDENT', 'MAINTENANCE'] },
  { name: 'Community',  path: '/community', icon: HeartHandshake,  roles: ['ADMIN', 'STUDENT', 'AUDITOR', 'MAINTENANCE'] },
  { name: 'Reports',    path: '/reports',   icon: BarChart3,       roles: ['ADMIN'] },
  { name: 'Settings',   path: '/settings',  icon: Settings,        roles: ['ADMIN'] },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filtered = menuItems.filter(item => item.roles.includes(user.role?.toUpperCase()));
  const mainItems = filtered.filter(i => i.name !== 'Settings');
  const bottomItems = filtered.filter(i => i.name === 'Settings');

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`w-60 flex flex-col glass border-r border-white/50 h-[calc(100vh-64px)] fixed md:static top-16 left-0 z-40 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        aria-label="Sidebar Navigation"
      >
        {/* Main nav items */}
        <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 pb-2">Navigation</p>
          {mainItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'} />
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight size={14} className="text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: settings */}
        {bottomItems.length > 0 && (
          <div className="py-4 px-3 border-t border-gray-100 space-y-0.5">
            {bottomItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* User info strip */}
        <div className="mx-3 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.fullName?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-800 truncate">{user.fullName?.split(' ')[0]}</p>
              <p className="text-[10px] text-gray-500 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
