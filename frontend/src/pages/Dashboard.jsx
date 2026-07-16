import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ScoreCard';
import { Building2, ClipboardList, AlertCircle, CheckCircle, Wrench, Users, Info, HeartHandshake, FileText, IndianRupee } from 'lucide-react';
import dashboardService from '../services/dashboardService';

const DashboardHero = ({ title, subtitle }) => (
  <div className="relative w-full h-48 md:h-56 rounded-3xl overflow-hidden mb-8 shadow-md animate-fade-in">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/campus_bg.jpg')" }}
    ></div>
    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/40 backdrop-blur-[1px]"></div>
    <div className="absolute inset-0 p-8 flex flex-col justify-end">
      <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-2">{title}</h1>
      <p className="text-primary-50 font-medium max-w-xl">{subtitle}</p>
    </div>
  </div>
);

// ─────────────────────────── Admin ────────────────────────────
const AdminDashboard = ({ stats }) => (
  <div className="space-y-6">
    <DashboardHero 
      title="Admin Overview" 
      subtitle="Real-time campus accessibility health summary for Chandigarh University." 
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} />} colorClass="text-primary bg-primary-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} />} colorClass="text-secondary bg-secondary-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <ScoreCard title="Avg. Accessibility" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-success bg-success-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-danger bg-danger-50" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <ScoreCard title="Maintenance Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} />} colorClass="text-primary bg-primary-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <ScoreCard title="Total Users" value={stats?.totalUsers ?? '—'} icon={<Users size={24} />} colorClass="text-secondary bg-secondary-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <ScoreCard title="Est. Remediation Cost" value={stats?.totalEstimatedCost ? `₹${stats.totalEstimatedCost.toLocaleString()}` : '—'} icon={<IndianRupee size={24} />} colorClass="text-danger bg-danger-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <ScoreCard title="Community Campaigns" value={(stats?.totalAwarenessCampaigns || 0) + (stats?.totalFeedbackSessions || 0)} icon={<HeartHandshake size={24} />} colorClass="text-success bg-success-50" />
      </div>
    </div>
  </div>
);

// ─────────────────────────── Auditor ──────────────────────────
const AuditorDashboard = ({ stats }) => (
  <div className="space-y-6">
    <DashboardHero 
      title="Auditor Dashboard" 
      subtitle="Manage your assigned buildings and accessibility audit progress at Chandigarh University." 
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} />} colorClass="text-primary bg-primary-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} />} colorClass="text-secondary bg-secondary-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <ScoreCard title="Avg. Score" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-success bg-success-50" />
      </div>
    </div>
  </div>
);

// ─────────────────────────── Maintenance ──────────────────────
const MaintenanceDashboard = ({ stats }) => (
  <div className="space-y-6">
    <DashboardHero 
      title="Maintenance Dashboard" 
      subtitle="Track assigned repair tasks and facility improvements across the CU campus." 
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ScoreCard title="Total Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} />} colorClass="text-primary bg-primary-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-danger bg-danger-50" />
      </div>
    </div>
  </div>
);

// ─────────────────────────── Student ──────────────────────────
const StudentDashboard = ({ stats }) => (
  <div className="space-y-6">
    <DashboardHero 
      title="CU Student Portal" 
      subtitle="Report accessibility barriers and track your submissions to improve campus accessibility." 
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ScoreCard title="Campus Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-secondary bg-secondary-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ScoreCard title="Avg. Compliance" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-success bg-success-50" />
      </div>
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
        const status = error?.response?.status;
        if (status === 401) throw error; // Let interceptor handle redirect to login
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
    default:            return <div className="text-danger p-8">Unknown Role: {user.role}</div>;
  }
};

export default Dashboard;
