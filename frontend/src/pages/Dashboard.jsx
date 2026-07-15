import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ScoreCard';
import { Building2, ClipboardList, AlertCircle, CheckCircle, Wrench, Users } from 'lucide-react';
import dashboardService from '../services/dashboardService';
import { toast } from 'react-toastify';

// ─────────────────────────── Admin ────────────────────────────
const AdminDashboard = ({ stats }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-textMain">Admin Overview</h2>
      <p className="text-textLight mt-1">Real-time campus accessibility health summary.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} />} colorClass="text-primary bg-blue-50" />
      <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} />} colorClass="text-secondary bg-yellow-50" />
      <ScoreCard title="Avg. Accessibility" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-success bg-green-50" />
      <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-danger bg-red-50" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
      <ScoreCard title="Maintenance Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} />} colorClass="text-primary bg-blue-50" />
      <ScoreCard title="Total Users" value={stats?.totalUsers ?? '—'} icon={<Users size={24} />} colorClass="text-secondary bg-yellow-50" />
    </div>
  </div>
);

// ─────────────────────────── Auditor ──────────────────────────
const AuditorDashboard = ({ stats }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-textMain">Auditor Dashboard</h2>
      <p className="text-textLight mt-1">Your assigned buildings and audit progress.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} />} colorClass="text-primary bg-blue-50" />
      <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} />} colorClass="text-secondary bg-yellow-50" />
      <ScoreCard title="Avg. Score" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-success bg-green-50" />
    </div>
  </div>
);

// ─────────────────────────── Maintenance ──────────────────────
const MaintenanceDashboard = ({ stats }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-textMain">Maintenance Dashboard</h2>
      <p className="text-textLight mt-1">Assigned repair tasks and completion status.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ScoreCard title="Total Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} />} colorClass="text-primary bg-blue-50" />
      <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-danger bg-red-50" />
    </div>
  </div>
);

// ─────────────────────────── Student ──────────────────────────
const StudentDashboard = ({ stats }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-textMain">Student Portal</h2>
      <p className="text-textLight mt-1">Report accessibility barriers and track your submissions.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ScoreCard title="Campus Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-secondary bg-yellow-50" />
      <ScoreCard title="Avg. Compliance" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-success bg-green-50" />
    </div>
  </div>
);

// ─────────────────────────── Main ─────────────────────────────
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardService.getStats();
        if (res.success) setStats(res.data);
      } catch (error) {
        // Non-admin roles may get 403 — silently ignore, show empty cards
        console.warn('Could not load dashboard stats', error);
      }
    };
    fetchStats();
  }, []);

  if (!user) return <div className="p-10 text-textLight">Loading...</div>;

  const role = user.role?.toUpperCase();
  const props = { stats };

  switch (role) {
    case 'ADMIN':       return <AdminDashboard {...props} />;
    case 'AUDITOR':     return <AuditorDashboard {...props} />;
    case 'MAINTENANCE': return <MaintenanceDashboard {...props} />;
    case 'STUDENT':     return <StudentDashboard {...props} />;
    default:            return <div className="text-red-500 p-8">Unknown Role: {user.role}</div>;
  }
};

export default Dashboard;
