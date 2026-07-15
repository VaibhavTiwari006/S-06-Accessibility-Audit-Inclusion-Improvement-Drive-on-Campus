import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Building2, ClipboardList, AlertCircle, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
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
    <aside className="w-64 bg-cards border-r border-gray-200 min-h-[calc(100vh-64px)] hidden md:block">
      <div className="py-4">
        {filteredMenu.map(item => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${isActive ? 'bg-blue-50 text-primary border-r-4 border-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
