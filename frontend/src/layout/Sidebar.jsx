import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Building2, ClipboardList, AlertCircle, BarChart3, Settings, HeartHandshake, Map, ChevronRight, Sparkles, QrCode } from 'lucide-react';
import Avatar from '../components/ui/Avatar';

const menuItems = [
  { name: 'Dashboard',  path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'AUDITOR', 'STUDENT', 'MAINTENANCE'] },
  { name: 'AI Scanner', path: '/scanner',   icon: Sparkles,        roles: ['ADMIN', 'AUDITOR', 'STUDENT', 'MAINTENANCE'] },
  { name: 'QR Feedback', path: '/qr-code',  icon: QrCode,          roles: ['ADMIN', 'AUDITOR', 'STUDENT', 'MAINTENANCE'] },
  { name: 'Roadmap',    path: '/roadmap',   icon: Map,             roles: ['ADMIN', 'MAINTENANCE'] },
  { name: 'Buildings',  path: '/buildings', icon: Building2,       roles: ['ADMIN', 'AUDITOR'] },
  { name: 'Audits',     path: '/audits',    icon: ClipboardList,   roles: ['ADMIN', 'AUDITOR'] },
  { name: 'Issues',     path: '/issues',    icon: AlertCircle,     roles: ['ADMIN', 'STUDENT', 'MAINTENANCE'] },
  { name: 'Evidence',   path: '/evidence',  icon: Map,             roles: ['ADMIN', 'AUDITOR', 'MAINTENANCE'] },
  { name: 'Community',  path: '/community', icon: HeartHandshake,  roles: ['ADMIN', 'STUDENT', 'AUDITOR', 'MAINTENANCE'] },
  { name: 'Reports',    path: '/reports',   icon: BarChart3,       roles: ['ADMIN', 'STUDENT'] },
  { name: 'Settings',   path: '/settings',  icon: Settings,        roles: ['ADMIN'] },
  { name: 'Accessibility', path: '/accessibility', icon: Settings, roles: ['ADMIN', 'STUDENT', 'AUDITOR', 'MAINTENANCE'] },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filtered = menuItems.filter(item => item.roles.includes(user.role?.toUpperCase()));
  const mainItems = filtered.filter(i => i.name !== 'Settings' && i.name !== 'Accessibility');
  const bottomItems = filtered.filter(i => i.name === 'Settings' || i.name === 'Accessibility');

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
        id="sidebar-nav"
        className={`w-64 flex flex-col bg-cards border-r border-gray-100 h-[calc(100vh-64px)] fixed md:static top-16 left-0 z-40 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        aria-label="Sidebar Navigation"
      >
        {/* Main nav items */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2 pb-3">Navigation</p>
          {mainItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'} />
                <span className="flex-1">{item.name}</span>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />}
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'} />
                  <span>{item.name}</span>
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />}
                </Link>
              );
            })}
          </div>
        )}

        {/* User info strip */}
        <div className="mx-4 mb-6 p-3 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm flex items-center gap-3">
          <Avatar name={user.fullName} size="md" />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate leading-tight">{user.fullName?.split(' ')[0]}</p>
            <p className="text-xs font-semibold text-primary truncate mt-0.5">{user.role}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
