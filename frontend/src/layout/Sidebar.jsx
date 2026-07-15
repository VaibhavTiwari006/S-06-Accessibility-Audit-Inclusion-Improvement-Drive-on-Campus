import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Building2, ClipboardList, AlertCircle, BarChart3, Settings } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['ADMIN', 'AUDITOR', 'STUDENT', 'MAINTENANCE'] },
    { name: 'Buildings', path: '/buildings', icon: <Building2 size={20} />, roles: ['ADMIN', 'AUDITOR'] },
    { name: 'Audits', path: '/audits', icon: <ClipboardList size={20} />, roles: ['ADMIN', 'AUDITOR'] },
    { name: 'Issues', path: '/issues', icon: <AlertCircle size={20} />, roles: ['ADMIN', 'STUDENT', 'MAINTENANCE'] },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} />, roles: ['ADMIN'] },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} />, roles: ['ADMIN'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role?.toUpperCase()));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`w-64 bg-cards border-r border-gray-200 h-[calc(100vh-64px)] fixed md:static top-16 left-0 z-20 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto shadow-lg md:shadow-none`}
        aria-label="Sidebar Navigation"
      >
        <div className="py-4 flex flex-col gap-1">
          {filteredMenu.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 transition-colors focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-inset focus:ring-primary ${isActive ? 'bg-blue-50 text-primary border-r-4 border-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary border-r-4 border-transparent'}`}
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
