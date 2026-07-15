import React from 'react';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ScoreCard';
import { Building2, ClipboardList, AlertCircle, CheckCircle } from 'lucide-react';

const AdminDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-textMain">Admin Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ScoreCard title="Total Buildings" value="15" icon={<Building2 size={24} />} colorClass="text-primary bg-blue-50" />
      <ScoreCard title="Total Audits" value="42" icon={<ClipboardList size={24} />} colorClass="text-secondary bg-yellow-50" />
      <ScoreCard title="Accessibility Score" value="76%" icon={<CheckCircle size={24} />} colorClass="text-success bg-green-50" />
      <ScoreCard title="Pending Issues" value="12" icon={<AlertCircle size={24} />} colorClass="text-danger bg-red-50" />
    </div>
  </div>
);

const AuditorDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-textMain">Auditor Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ScoreCard title="Assigned Buildings" value="4" icon={<Building2 size={24} />} />
      <ScoreCard title="Pending Audits" value="2" icon={<ClipboardList size={24} />} colorClass="text-secondary bg-yellow-50" />
      <ScoreCard title="Completed Audits" value="18" icon={<CheckCircle size={24} />} colorClass="text-success bg-green-50" />
    </div>
  </div>
);

const MaintenanceDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-textMain">Maintenance Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ScoreCard title="Assigned Repairs" value="8" icon={<AlertCircle size={24} />} colorClass="text-danger bg-red-50" />
      <ScoreCard title="Completed Repairs" value="34" icon={<CheckCircle size={24} />} colorClass="text-success bg-green-50" />
    </div>
  </div>
);

const StudentDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-textMain">Student Portal</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ScoreCard title="My Reports" value="3" icon={<AlertCircle size={24} />} colorClass="text-secondary bg-yellow-50" />
      <ScoreCard title="Resolved Issues" value="1" icon={<CheckCircle size={24} />} colorClass="text-success bg-green-50" />
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  switch (user.role?.toUpperCase()) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'AUDITOR':
      return <AuditorDashboard />;
    case 'MAINTENANCE':
      return <MaintenanceDashboard />;
    case 'STUDENT':
      return <StudentDashboard />;
    default:
      return <div className="text-red-500">Unknown Role</div>;
  }
};

export default Dashboard;
