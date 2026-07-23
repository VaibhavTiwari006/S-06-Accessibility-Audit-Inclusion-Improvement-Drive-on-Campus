import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardContent } from './ui/Card';
import { 
  PlusCircle, Map, FileText, Settings, ShieldAlert, Sparkles, 
  Wrench, BookOpen, Calculator, Building2 
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();

  const getActions = () => {
    switch (role) {
      case 'ADMIN':
        return [
          { label: 'View Audits', icon: PlusCircle, path: '/audits', color: 'text-primary bg-primary/10 hover:bg-primary/20' },
          { label: 'Campus Buildings', icon: Building2, path: '/buildings', color: 'text-[#3B82F6] bg-blue-500/10 hover:bg-blue-500/20' },
          { label: 'Generate Reports', icon: FileText, path: '/reports', color: 'text-amber-600 bg-amber-500/10 hover:bg-amber-500/20' },
          { label: 'System Settings', icon: Settings, path: '/settings', color: 'text-purple-600 bg-purple-500/10 hover:bg-purple-500/20' },
        ];
      case 'AUDITOR':
        return [
          { label: 'Campus Audits', icon: PlusCircle, path: '/audits', color: 'text-primary bg-primary/10 hover:bg-primary/20' },
          { label: 'Building List', icon: Building2, path: '/buildings', color: 'text-[#3B82F6] bg-blue-500/10 hover:bg-blue-500/20' },
          { label: 'AI Scanner', icon: Sparkles, path: '/scanner', color: 'text-amber-600 bg-amber-500/10 hover:bg-amber-500/20' },
          { label: 'Campus Map', icon: Map, path: '/map', color: 'text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20' },
        ];
      case 'MAINTENANCE':
        return [
          { label: 'Repair Roadmap', icon: Wrench, path: '/roadmap', color: 'text-orange-600 bg-orange-500/10 hover:bg-orange-500/20' },
          { label: 'Reported Barriers', icon: ShieldAlert, path: '/issues', color: 'text-rose-600 bg-rose-500/10 hover:bg-rose-500/20' },
          { label: 'Evidence Gallery', icon: Map, path: '/evidence', color: 'text-indigo-600 bg-indigo-500/10 hover:bg-indigo-500/20' },
          { label: 'Campus Map', icon: Map, path: '/map', color: 'text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20' },
        ];
      case 'STUDENT':
      default:
        return [
          { label: 'Report Barrier', icon: ShieldAlert, path: '/issues', color: 'text-rose-600 bg-rose-500/10 hover:bg-rose-500/20' },
          { label: 'Campus Map', icon: Map, path: '/map', color: 'text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20' },
          { label: 'Awareness Quiz', icon: BookOpen, path: '/awareness', color: 'text-[#3B82F6] bg-blue-500/10 hover:bg-blue-500/20' },
          { label: 'Cost Calculator', icon: Calculator, path: '/calculator', color: 'text-teal-600 bg-teal-500/10 hover:bg-teal-500/20' },
        ];
    }
  };

  const actions = getActions();

  return (
    <Card className="h-full mt-6">
      <CardHeader>
        <h3 className="text-xl font-heading font-bold text-textMain">Quick Actions</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, i) => (
            <div 
              key={i}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${action.color}`}
            >
              <action.icon size={26} className="mb-2" />
              <span className="text-xs font-bold text-center">{action.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
