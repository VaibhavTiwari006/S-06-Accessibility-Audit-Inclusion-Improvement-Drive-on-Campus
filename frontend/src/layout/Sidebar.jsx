import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Building2, ClipboardList, AlertCircle, BarChart3, Settings, HeartHandshake } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['ADMIN', 'AUDITOR', 'STUDENT', 'MAINTENANCE'] },
    { name: 'Buildings', path: '/buildings', icon: <Building2 size={20} />, roles: ['ADMIN', 'AUDITOR'] },
    { name: 'Audits', path: '/audits', icon: <ClipboardList size={20} />, roles: ['ADMIN', 'AUDITOR'] },
    { name: 'Issues', path: '/issues', icon: <AlertCircle size={20} />, roles: ['ADMIN', 'STUDENT', 'MAINTENANCE'] },
    { name: 'Community', path: '/community', icon: <HeartHandshake size={20} />, roles: ['ADMIN', 'STUDENT', 'AUDITOR', 'MAINTENANCE'] },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} />, roles: ['ADMIN'] },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} />, roles: ['ADMIN'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role?.toUpperCase()));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-textMain/40 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`w-64 glass shadow-glass h-[calc(100vh-73px)] fixed md:static top-[73px] left-0 z-40 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto`}
        aria-label="Sidebar Navigation"
      >
        <div className="py-6 px-4 flex flex-col gap-2">
          {filteredMenu.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/20 font-medium translate-x-1' 
                    : 'text-textLight hover:bg-primary/5 hover:text-primary hover:translate-x-1 font-medium'
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
