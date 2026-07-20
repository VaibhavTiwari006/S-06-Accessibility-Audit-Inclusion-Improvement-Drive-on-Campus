import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ScoreCard';
import { Building2, ClipboardList, AlertCircle, CheckCircle, Wrench, Users, Info, HeartHandshake, FileText, IndianRupee } from 'lucide-react';
import dashboardService from '../services/dashboardService';
import InclusionLeaderboard from '../components/InclusionLeaderboard';
import AccessibilityTrendsChart from '../components/AccessibilityTrendsChart';
import QuickActions from '../components/QuickActions';
import RecentAuditsTable from '../components/RecentAuditsTable';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const DashboardHero = ({ title, subtitle, bgClass = 'bg-primary' }) => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="relative w-full h-48 md:h-56 rounded-3xl overflow-hidden mb-8 shadow-sm group">
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"
      style={{ backgroundImage: "url('/campus_bg.jpg')" }}
    ></div>
    <div className={`absolute inset-0 ${bgClass}`}></div>
    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
      <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-2">{title}</h1>
      <p className="text-white/90 font-medium max-w-xl text-sm md:text-base">{subtitle}</p>
    </div>
  </motion.div>
);

// ─────────────────────────── Admin ────────────────────────────
const AdminDashboard = ({ stats, navigate }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full" role="region" aria-label="Admin Dashboard">
    <DashboardHero 
      title="Admin Overview" 
      subtitle="Real-time campus accessibility health summary for Chandigarh University." 
      bgClass="bg-gradient-to-r from-secondary to-primary/90"
    />
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="group" aria-label="Key Performance Indicators">
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} aria-hidden="true" />} colorClass="text-accent bg-accent/10" onClick={() => navigate('/buildings')} />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} aria-hidden="true" />} colorClass="text-warning-dark bg-warning/10" onClick={() => navigate('/audits')} />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Avg. Accessibility" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} aria-hidden="true" />} colorClass="text-success-dark bg-success/10" onClick={() => navigate('/reports')} trend={2.4} trendLabel="vs last month" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} aria-hidden="true" />} colorClass="text-danger-dark bg-danger/10" onClick={() => navigate('/issues')} trend={-5} trendLabel="fewer issues" />
      </motion.div>
    </motion.div>
    
    <motion.h3 variants={itemVariants} className="text-xl font-heading font-bold text-textMain mt-12 mb-6" id="ops-community-heading">Operations & Community</motion.h3>
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="group" aria-labelledby="ops-community-heading">
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Maintenance Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} aria-hidden="true" />} colorClass="text-gray-700 bg-gray-100" onClick={() => navigate('/roadmap')} />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Total Users" value={stats?.totalUsers ?? '—'} icon={<Users size={24} aria-hidden="true" />} colorClass="text-purple-700 bg-purple-100" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Est. Remediation" value={stats?.totalEstimatedCost ? `₹${(stats.totalEstimatedCost/1000).toFixed(1)}k` : '—'} icon={<IndianRupee size={24} aria-hidden="true" />} colorClass="text-emerald-700 bg-emerald-100" onClick={() => navigate('/reports')} />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Community Events" value={(stats?.totalAwarenessCampaigns || 0) + (stats?.totalFeedbackSessions || 0)} icon={<HeartHandshake size={24} aria-hidden="true" />} colorClass="text-pink-700 bg-pink-100" onClick={() => navigate('/community')} />
      </motion.div>
    </motion.div>

    <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <motion.div variants={itemVariants} className="h-full">
        <AccessibilityTrendsChart />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <InclusionLeaderboard />
      </motion.div>
    </motion.div>

    <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <motion.div variants={itemVariants} className="lg:col-span-1 h-full">
        <QuickActions />
      </motion.div>
      <motion.div variants={itemVariants} className="lg:col-span-2 h-full">
        <RecentAuditsTable />
      </motion.div>
    </motion.div>
  </motion.div>
);

// ─────────────────────────── Auditor ──────────────────────────
const AuditorDashboard = ({ stats, navigate }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full">
    <DashboardHero 
      title="Auditor Dashboard" 
      subtitle="Manage your assigned buildings and accessibility audit progress at Chandigarh University." 
      bgClass="bg-gradient-to-r from-accent to-accent/80"
    />
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} />} colorClass="text-blue-600 bg-blue-50" onClick={() => navigate('/buildings')} />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} />} colorClass="text-amber-600 bg-amber-50" onClick={() => navigate('/audits')} />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Avg. Score" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-emerald-600 bg-emerald-50" />
      </motion.div>
    </motion.div>
  </motion.div>
);

// ─────────────────────────── Maintenance ──────────────────────
const MaintenanceDashboard = ({ stats, navigate }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full">
    <DashboardHero 
      title="Maintenance Dashboard" 
      subtitle="Track assigned repair tasks and facility improvements across the CU campus." 
      bgClass="bg-gradient-to-r from-warning to-warning-dark"
    />
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Total Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} />} colorClass="text-orange-600 bg-orange-50" onClick={() => navigate('/roadmap')} />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-rose-600 bg-rose-50" onClick={() => navigate('/issues')} />
      </motion.div>
    </motion.div>
  </motion.div>
);

// ─────────────────────────── Student ──────────────────────────
const StudentDashboard = ({ stats, navigate }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full">
    <DashboardHero 
      title="CU Student Portal" 
      subtitle="Report accessibility barriers and track your submissions to improve campus accessibility." 
      bgClass="bg-gradient-to-r from-success to-success-dark"
    />
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Campus Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} />} colorClass="text-amber-600 bg-amber-50" onClick={() => navigate('/issues')} />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Avg. Compliance" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-emerald-600 bg-emerald-50" />
      </motion.div>
    </motion.div>
  </motion.div>
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
