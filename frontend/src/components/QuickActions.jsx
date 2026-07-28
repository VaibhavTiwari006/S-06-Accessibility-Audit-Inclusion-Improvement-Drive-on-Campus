import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardContent } from './ui/Card';
import { 
  PlusCircle, Map, FileText, Settings, ShieldAlert, Sparkles, 
  Wrench, BookOpen, Building2, ChevronRight, Zap 
} from 'lucide-react';
import { motion } from 'framer-motion';

const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();

  const getActions = () => {
    switch (role) {
      case 'ADMIN':
        return [
          { label: 'View Audits', desc: 'Inspect campus compliance logs', icon: PlusCircle, path: '/audits', iconBg: 'bg-rose-500 text-white', hoverBorder: 'hover:border-rose-200' },
          { label: 'Campus Buildings', desc: 'Manage facility infrastructure', icon: Building2, path: '/buildings', iconBg: 'bg-blue-600 text-white', hoverBorder: 'hover:border-blue-200' },
          { label: 'Generate Reports', desc: 'Export executive analytics', icon: FileText, path: '/reports', iconBg: 'bg-amber-500 text-white', hoverBorder: 'hover:border-amber-200' },
          { label: 'System Settings', desc: 'Configure access controls', icon: Settings, path: '/settings', iconBg: 'bg-purple-600 text-white', hoverBorder: 'hover:border-purple-200' },
        ];
      case 'AUDITOR':
        return [
          { label: 'Campus Audits', desc: 'Conduct physical inspections', icon: PlusCircle, path: '/audits', iconBg: 'bg-rose-500 text-white', hoverBorder: 'hover:border-rose-200' },
          { label: 'Building List', desc: 'Check WCAG compliance scores', icon: Building2, path: '/buildings', iconBg: 'bg-blue-600 text-white', hoverBorder: 'hover:border-blue-200' },
          { label: 'AI Web Scanner', desc: 'Scan code & contrast alt-text', icon: Sparkles, path: '/scanner', iconBg: 'bg-amber-500 text-white', hoverBorder: 'hover:border-amber-200' },
          { label: 'Campus Map', desc: 'Wheelchair barrier-free routing', icon: Map, path: '/map', iconBg: 'bg-emerald-600 text-white', hoverBorder: 'hover:border-emerald-200' },
        ];
      case 'MAINTENANCE':
        return [
          { label: 'Repair Roadmap', desc: 'Manage 5-stage Kanban board', icon: Wrench, path: '/roadmap', iconBg: 'bg-orange-500 text-white', hoverBorder: 'hover:border-orange-200' },
          { label: 'Reported Barriers', desc: 'Review & mark fixed issues', icon: ShieldAlert, path: '/issues', iconBg: 'bg-rose-500 text-white', hoverBorder: 'hover:border-rose-200' },
          { label: 'Evidence Gallery', desc: 'Inspect photos & RPWD specs', icon: Map, path: '/evidence', iconBg: 'bg-indigo-600 text-white', hoverBorder: 'hover:border-indigo-200' },
          { label: 'Campus Map', desc: 'Interactive facility layer map', icon: Map, path: '/map', iconBg: 'bg-emerald-600 text-white', hoverBorder: 'hover:border-emerald-200' },
        ];
      case 'STUDENT':
      default:
        return [
          { label: 'Track My Issues', desc: 'View reported barrier status', icon: ShieldAlert, path: '/issues', iconBg: 'bg-amber-500 text-white', hoverBorder: 'hover:border-amber-200' },
          { label: 'Report Barrier', desc: 'Scan QR posters & report', icon: PlusCircle, path: '/issues', iconBg: 'bg-rose-500 text-white', hoverBorder: 'hover:border-rose-200' },
          { label: 'Campus Map', desc: 'Find ramps & accessible washrooms', icon: Map, path: '/map', iconBg: 'bg-emerald-600 text-white', hoverBorder: 'hover:border-emerald-200' },
          { label: 'Awareness Quiz', desc: 'Take campus inclusion quiz', icon: BookOpen, path: '/awareness', iconBg: 'bg-blue-600 text-white', hoverBorder: 'hover:border-blue-200' },
        ];
    }
  };

  const actions = getActions();

  return (
    <Card className="h-full shadow-sm border border-gray-100 flex flex-col justify-between">
      <CardHeader className="pb-3 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
            <Zap size={22} className="fill-amber-500" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-textMain">Quick Actions</h3>
            <p className="text-xs text-textLight font-medium">One-click shortcuts to primary tools</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.div 
              key={i}
              onClick={() => navigate(action.path)}
              whileHover={{ x: 4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className={`group p-3.5 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50/80 cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 shadow-2xs ${action.hoverBorder}`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-xl ${action.iconBg} shadow-xs flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-extrabold text-textMain group-hover:text-primary transition-colors leading-tight truncate">
                    {action.label}
                  </h4>
                  <p className="text-xs font-medium text-textLight mt-0.5 truncate">
                    {action.desc}
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-primary/10 text-gray-400 group-hover:text-primary flex items-center justify-center flex-shrink-0 transition-colors">
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
