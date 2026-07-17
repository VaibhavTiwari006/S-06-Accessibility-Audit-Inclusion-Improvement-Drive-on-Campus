import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ScoreCard';
import { Building2, ClipboardList, AlertCircle, CheckCircle, Wrench, Users, Info, HeartHandshake, FileText, IndianRupee } from 'lucide-react';
import dashboardService from '../services/dashboardService';
import InclusionLeaderboard from '../components/InclusionLeaderboard';
import AccessibilityTrendsChart from '../components/AccessibilityTrendsChart';

const DashboardHero = ({ title, subtitle, bgClass = 'from-primary-dark/90 to-primary/60' }) => (
  <div className="relative w-full h-48 md:h-56 rounded-[2rem] overflow-hidden mb-8 shadow-soft-lg animate-fade-in group">
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
      style={{ backgroundImage: "url('/campus_bg.jpg')" }}
    ></div>
    <div className={`absolute inset-0 bg-gradient-to-r ${bgClass} backdrop-blur-[2px]`}></div>
    <div className="absolute inset-0 p-8 flex flex-col justify-end">
      <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-2 drop-shadow-md">{title}</h1>
      <p className="text-white/90 font-medium max-w-xl text-sm md:text-base">{subtitle}</p>
    </div>
  </div>
);

// ─────────────────────────── Admin ────────────────────────────
const AdminDashboard = ({ stats, navigate }) => (
  <div className="page-container" role="region" aria-label="Admin Dashboard">
    <DashboardHero 
      title="Admin Overview" 
      subtitle="Real-time campus accessibility health summary for Chandigarh University." 
      bgClass="from-slate-900/90 to-primary/80"
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="group" aria-label="Key Performance Indicators">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} aria-hidden="true" />} colorClass="text-indigo-600 bg-indigo-50" onClick={() => navigate('/buildings')} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} aria-hidden="true" />} colorClass="text-amber-600 bg-amber-50" onClick={() => navigate('/audits')} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <ScoreCard title="Avg. Accessibility" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} aria-hidden="true" />} colorClass="text-emerald-600 bg-emerald-50" onClick={() => navigate('/reports')} trend={2.4} trendLabel="vs last month" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} aria-hidden="true" />} colorClass="text-rose-600 bg-rose-50" onClick={() => navigate('/issues')} trend={-5} trendLabel="fewer issues" />
      </div>
    </div>
    
    <h3 className="text-xl font-heading font-bold text-textMain mt-8 mb-4" id="ops-community-heading">Operations & Community</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="group" aria-labelledby="ops-community-heading">
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <ScoreCard title="Maintenance Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} aria-hidden="true" />} colorClass="text-blue-600 bg-blue-50" onClick={() => navigate('/roadmap')} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <ScoreCard title="Total Users" value={stats?.totalUsers ?? '—'} icon={<Users size={24} aria-hidden="true" />} colorClass="text-purple-600 bg-purple-50" />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <ScoreCard title="Est. Remediation" value={stats?.totalEstimatedCost ? `₹${(stats.totalEstimatedCost/1000).toFixed(1)}k` : '—'} icon={<IndianRupee size={24} aria-hidden="true" />} colorClass="text-orange-600 bg-orange-50" onClick={() => navigate('/reports')} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <ScoreCard title="Community Events" value={(stats?.totalAwarenessCampaigns || 0) + (stats?.totalFeedbackSessions || 0)} icon={<HeartHandshake size={24} aria-hidden="true" />} colorClass="text-teal-600 bg-teal-50" onClick={() => navigate('/community')} />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="animate-slide-up" style={{ animationDelay: '0.9s' }}>
        <AccessibilityTrendsChart />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '1.0s' }}>
        <InclusionLeaderboard />
      </div>
    </div>
  </div>
);

// ─────────────────────────── Auditor ──────────────────────────
const AuditorDashboard = ({ stats, navigate }) => (
  <div className="page-container">
    <DashboardHero 
      title="Auditor Dashboard" 
      subtitle="Manage your assigned buildings and accessibility audit progress at Chandigarh University." 
      bgClass="from-blue-900/90 to-blue-600/60"
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} />} colorClass="text-blue-600 bg-blue-50" onClick={() => navigate('/buildings')} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} />} colorClass="text-amber-600 bg-amber-50" onClick={() => navigate('/audits')} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <ScoreCard title="Avg. Score" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-emerald-600 bg-emerald-50" />
      </div>
    </div>
  </div>
);

// ─────────────────────────── Maintenance ──────────────────────
const MaintenanceDashboard = ({ stats, navigate }) => (
  <div className="page-container">
    <DashboardHero 
      title="Maintenance Dashboard" 
      subtitle="Track assigned repair tasks and facility improvements across the CU campus." 
      bgClass="from-orange-900/90 to-orange-500/60"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ScoreCard title="Total Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} />} colorClass="text-orange-600 bg-orange-50" onClick={() => navigate('/roadmap')} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-rose-600 bg-rose-50" onClick={() => navigate('/issues')} />
      </div>
    </div>
  </div>
);

// ─────────────────────────── Student ──────────────────────────
const StudentDashboard = ({ stats, navigate }) => (
  <div className="page-container">
    <DashboardHero 
      title="CU Student Portal" 
      subtitle="Report accessibility barriers and track your submissions to improve campus accessibility." 
      bgClass="from-emerald-900/90 to-emerald-500/60"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <ScoreCard title="Campus Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-amber-600 bg-amber-50" onClick={() => navigate('/issues')} />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ScoreCard title="Avg. Compliance" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-emerald-600 bg-emerald-50" />
      </div>
    </div>
  </div>
);

// ─────────────────────────── Main ─────────────────────────────
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardService.getStats();
        if (res.success) setStats(res.data);
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) throw error; 
        console.warn('Could not load dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (!user) return null;
  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  const role = user.role?.toUpperCase();
  const props = { stats, navigate };

  switch (role) {
    case 'ADMIN':       return <AdminDashboard {...props} />;
    case 'AUDITOR':     return <AuditorDashboard {...props} />;
    case 'MAINTENANCE': return <MaintenanceDashboard {...props} />;
    case 'STUDENT':     return <StudentDashboard {...props} />;
    default:            return <div className="text-red-500 p-8 glass-panel rounded-xl">Unknown Role: {user.role}</div>;
  }
};

export default Dashboard;
