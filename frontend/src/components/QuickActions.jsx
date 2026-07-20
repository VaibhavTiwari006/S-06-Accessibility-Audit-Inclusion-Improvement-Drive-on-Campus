import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './ui/Card';
import { PlusCircle, Search, Map, FileText, Settings, ShieldAlert } from 'lucide-react';
import Button from './ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: 'New Audit', icon: PlusCircle, path: '/audits/new', color: 'text-primary bg-primary/10 hover:bg-primary/20' },
    { label: 'Report Issue', icon: ShieldAlert, path: '/issues/new', color: 'text-danger-dark bg-danger/10 hover:bg-danger/20' },
    { label: 'Campus Map', icon: Map, path: '/buildings', color: 'text-success-dark bg-success/10 hover:bg-success/20' },
    { label: 'Generate Report', icon: FileText, path: '/reports', color: 'text-warning-dark bg-warning/10 hover:bg-warning/20' },
  ];

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
              <action.icon size={28} className="mb-3" />
              <span className="text-sm font-semibold text-center">{action.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
