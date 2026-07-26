import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardContent } from './ui/Card';
import { 
  PlusCircle, Map, FileText, Settings, ShieldAlert, Sparkles, 
  Wrench, BookOpen, Building2, ArrowRight, Zap 
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
          { label: 'View Audits', desc: 'Inspect campus logs', icon: PlusCircle, path: '/audits', bg: 'from-rose-500/10 to-red-500/10 border-rose-200/60 text-primary', iconBg: 'bg-primary text-white' },
          { label: 'Buildings', desc: 'Manage facilities', icon: Building2, path: '/buildings', bg: 'from-blue-500/10 to-indigo-500/10 border-blue-200/60 text-blue-600', iconBg: 'bg-blue-600 text-white' },
          { label: 'Reports', desc: 'Export analytics', icon: FileText, path: '/reports', bg: 'from-amber-500/10 to-orange-500/10 border-amber-200/60 text-amber-600', iconBg: 'bg-amber-600 text-white' },
          { label: 'System Settings', desc: 'Access controls', icon: Settings, path: '/settings', bg: 'from-purple-500/10 to-violet-500/10 border-purple-200/60 text-purple-600', iconBg: 'bg-purple-600 text-white' },
        ];
      case 'AUDITOR':
        return [
          { label: 'Campus Audits', desc: 'Conduct inspection', icon: PlusCircle, path: '/audits', bg: 'from-rose-500/10 to-red-500/10 border-rose-200/60 text-primary', iconBg: 'bg-primary text-white' },
          { label: 'Building List', desc: 'Check WCAG scores', icon: Building2, path: '/buildings', bg: 'from-blue-500/10 to-indigo-500/10 border-blue-200/60 text-blue-600', iconBg: 'bg-blue-600 text-white' },
          { label: 'AI Scanner', desc: 'Scan code & alt-text', icon: Sparkles, path: '/scanner', bg: 'from-amber-500/10 to-orange-500/10 border-amber-200/60 text-amber-600', iconBg: 'bg-amber-600 text-white' },
          { label: 'Campus Map', desc: 'Barrier-free routes', icon: Map, path: '/map', bg: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/60 text-emerald-600', iconBg: 'bg-emerald-600 text-white' },
        ];
      case 'MAINTENANCE':
        return [
          { label: 'Repair Roadmap', desc: 'Kanban board', icon: Wrench, path: '/roadmap', bg: 'from-orange-500/10 to-amber-500/10 border-orange-200/60 text-orange-600', iconBg: 'bg-orange-600 text-white' },
          { label: 'Reported Issues', desc: 'Review barriers', icon: ShieldAlert, path: '/issues', bg: 'from-rose-500/10 to-red-500/10 border-rose-200/60 text-rose-600', iconBg: 'bg-rose-600 text-white' },
          { label: 'Evidence Gallery', desc: 'Photo proof & RPWD', icon: Map, path: '/evidence', bg: 'from-indigo-500/10 to-purple-500/10 border-indigo-200/60 text-indigo-600', iconBg: 'bg-indigo-600 text-white' },
          { label: 'Campus Map', desc: 'Interactive view', icon: Map, path: '/map', bg: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/60 text-emerald-600', iconBg: 'bg-emerald-600 text-white' },
        ];
      case 'STUDENT':
      default:
        return [
          { label: 'Track My Issues', desc: 'Report status', icon: ShieldAlert, path: '/issues', bg: 'from-amber-500/10 to-orange-500/10 border-amber-200/60 text-amber-600', iconBg: 'bg-amber-600 text-white' },
          { label: 'Report Barrier', desc: 'Scan QR & submit', icon: PlusCircle, path: '/issues', bg: 'from-rose-500/10 to-red-500/10 border-rose-200/60 text-rose-600', iconBg: 'bg-rose-600 text-white' },
          { label: 'Campus Map', desc: 'Ramps & washrooms', icon: Map, path: '/map', bg: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/60 text-emerald-600', iconBg: 'bg-emerald-600 text-white' },
          { label: 'Awareness Quiz', desc: 'Take inclusion quiz', icon: BookOpen, path: '/awareness', bg: 'from-blue-500/10 to-indigo-500/10 border-blue-200/60 text-blue-600', iconBg: 'bg-blue-600 text-white' },
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
      
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-3.5">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.div 
                key={i}
                onClick={() => navigate(action.path)}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className={`group relative p-4 rounded-2xl border bg-gradient-to-br ${action.bg} cursor-pointer transition-shadow duration-200 hover:shadow-md flex flex-col justify-between select-none overflow-hidden`}
              >
                {/* Floating Top Right Arrow */}
                <div className="absolute top-3 right-3 text-gray-400 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowRight size={15} />
                </div>

                <div className={`w-10 h-10 rounded-xl ${action.iconBg} shadow-xs flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={20} />
                </div>

                <div>
                  <h4 className="text-sm font-extrabold text-textMain group-hover:text-primary transition-colors leading-tight">
                    {action.label}
                  </h4>
                  <p className="text-[11px] font-semibold text-textLight mt-0.5 opacity-80 group-hover:opacity-100">
                    {action.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
