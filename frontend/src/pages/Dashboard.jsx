import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ScoreCard from '../components/ScoreCard';
import { Building2, ClipboardList, AlertCircle, CheckCircle, Wrench, Users, Info, HeartHandshake, FileText, IndianRupee, Trophy, BookOpen } from 'lucide-react';
import dashboardService from '../services/dashboardService';
import InclusionLeaderboard from '../components/InclusionLeaderboard';
import AccessibilityTrendsChart from '../components/AccessibilityTrendsChart';
import QuickActions from '../components/QuickActions';
import RecentAuditsTable from '../components/RecentAuditsTable';
import DepartmentComparison from '../components/DepartmentComparison';

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
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }} 
    animate={{ opacity: 1, scale: 1 }} 
    transition={{ duration: 0.4, ease: 'easeOut' }} 
    className="relative w-full rounded-2xl overflow-hidden mb-6 p-6 md:p-8 shadow-sm group border border-white/10"
  >
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
      style={{ backgroundImage: "url('/campus_bg.jpg')" }}
    ></div>
    <div className={`absolute inset-0 ${bgClass}`}></div>
    <div className="relative z-10 flex flex-col justify-start">
      <h1 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tight mb-2 drop-shadow-xs">{title}</h1>
      <p className="text-white/95 font-bold max-w-2xl text-sm md:text-base leading-snug drop-shadow-xs">{subtitle}</p>
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
        <ScoreCard title="Total Buildings" value={stats?.totalBuildings ?? '—'} icon={<Building2 size={24} aria-hidden="true" />} colorClass="text-accent bg-accent/10" onClick={() => navigate('/buildings')} bgImage="/campus_bg.jpg" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Total Audits" value={stats?.totalAudits ?? '—'} icon={<ClipboardList size={24} aria-hidden="true" />} colorClass="text-warning-dark bg-warning/10" onClick={() => navigate('/audits')} bgImage="/card_audits.jpg" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Avg. Accessibility" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} aria-hidden="true" />} colorClass="text-success-dark bg-success/10" onClick={() => navigate('/reports')} trend={2.4} trendLabel="vs last month" bgImage="/card_accessibility.jpg" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Student Reports" value={stats?.totalStudentReports ?? '—'} icon={<AlertCircle size={24} aria-hidden="true" />} colorClass="text-danger-dark bg-danger/10" onClick={() => navigate('/issues')} trend={-5} trendLabel="fewer issues" bgImage="/card_reports.jpg" />
      </motion.div>
    </motion.div>
    
    <motion.h3 variants={itemVariants} className="text-xl font-heading font-bold text-textMain mt-12 mb-6" id="ops-community-heading">Operations & Community</motion.h3>
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="group" aria-labelledby="ops-community-heading">
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Maintenance Tasks" value={stats?.totalMaintenanceTasks ?? '—'} icon={<Wrench size={24} aria-hidden="true" />} colorClass="text-gray-700 bg-gray-100" onClick={() => navigate('/roadmap')} bgImage="/card_maintenance.jpg" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Total Users" value={stats?.totalUsers ?? '—'} icon={<Users size={24} aria-hidden="true" />} colorClass="text-purple-700 bg-purple-100" bgImage="/card_users.jpg" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Est. Remediation" value={stats?.totalEstimatedCost ? `₹${(stats.totalEstimatedCost/1000).toFixed(1)}k` : '—'} icon={<IndianRupee size={24} aria-hidden="true" />} colorClass="text-emerald-700 bg-emerald-100" onClick={() => navigate('/reports')} bgImage="/card_remediation.jpg" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Community Events" value={(stats?.totalAwarenessCampaigns || 0) + (stats?.totalFeedbackSessions || 0)} icon={<HeartHandshake size={24} aria-hidden="true" />} colorClass="text-pink-700 bg-pink-100" onClick={() => navigate('/community')} bgImage="/card_community.jpg" />
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

    <motion.div className="mt-6">
      <DepartmentComparison />
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
        <ScoreCard title="Avg. Score" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '—'} icon={<CheckCircle size={24} />} colorClass="text-emerald-600 bg-emerald-50" onClick={() => navigate('/reports')} />
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

// ─────────────────────────── Student ──────────────────────────
const StudentDashboard = ({ stats, navigate }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full">
    <DashboardHero 
      title="CU Student & Staff Inclusion Portal" 
      subtitle="Report campus barriers, track resolution progress in real time, and explore accessible navigation maps." 
      bgClass="bg-gradient-to-r from-success via-emerald-600 to-teal-700"
    />
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Track My Issues" value={stats?.totalStudentReports ?? '0'} icon={<AlertCircle size={24} />} colorClass="text-amber-600 bg-amber-500/10" onClick={() => navigate('/issues')} trend={0} trendLabel="Click to track status" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Campus Accessibility" value={stats ? `${stats.averageAccessibilityScore.toFixed(1)}%` : '92%'} icon={<CheckCircle size={24} />} colorClass="text-emerald-600 bg-emerald-500/10" />
      </motion.div>
      <motion.div variants={itemVariants} className="h-full">
        <ScoreCard title="Remediated Barriers" value={stats?.totalMaintenanceTasks ? `${stats.totalMaintenanceTasks}` : '1,200+'} icon={<Wrench size={24} />} colorClass="text-blue-600 bg-blue-500/10" onClick={() => navigate('/community')} />
      </motion.div>
    </motion.div>

    <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <motion.div variants={itemVariants} className="lg:col-span-1 h-full">
        <QuickActions />
      </motion.div>

      {/* Student Issue Tracker Quick Card */}
      <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-gray-100/60 shadow-soft-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-heading font-extrabold text-textMain flex items-center gap-2">
              <AlertCircle className="text-amber-500" size={24} /> Live Issue Status Tracker
            </h3>
            <button 
              onClick={() => navigate('/issues')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              View Full Tracker &rarr;
            </button>
          </div>
          <p className="text-sm text-textLight mb-6">
            Track the status of physical barrier reports submitted by you and fellow students across campus buildings.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Submitted</span>
              <span className="text-2xl font-extrabold text-amber-800 font-heading">3 Active</span>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">In Progress</span>
              <span className="text-2xl font-extrabold text-blue-800 font-heading">2 Assigned</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Resolved</span>
              <span className="text-2xl font-extrabold text-emerald-800 font-heading">14 Fixed</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Have you noticed a new barrier on campus?</span>
          <button 
            onClick={() => navigate('/issues')}
            className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:bg-primary-dark transition-colors"
          >
            Report & Track New Barrier
          </button>
        </div>
      </motion.div>
    </motion.div>

    {/* Gamified Quiz Challenge & Daily Fact section */}
    <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Quiz Invite Banner */}
      <motion.div variants={itemVariants} className="lg:col-span-2 bg-gradient-to-br from-indigo-500 to-primary rounded-3xl p-6 text-white border border-indigo-400/20 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-heading font-extrabold flex items-center gap-2">
              <Trophy className="text-amber-300 animate-pulse" size={24} /> Inclusion Quiz Challenge
            </h3>
            <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-bold uppercase">Rank #5</span>
          </div>
          <p className="text-xs text-indigo-100 mt-2 leading-relaxed max-w-xl">
            Test your knowledge of disability rights, WCAG accessibility specifications, and help build a more inclusive campus community! Win points and climb the rankings.
          </p>
        </div>
        <div className="pt-4 border-t border-indigo-400/30 flex items-center justify-between mt-4">
          <span className="text-[10px] text-indigo-200 font-semibold">Weekly challenge is active</span>
          <button 
            onClick={() => navigate('/quiz')}
            className="px-5 py-2 bg-white text-primary rounded-xl text-xs font-black shadow-md hover:bg-indigo-50 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            Start Quiz &rarr;
          </button>
        </div>
      </motion.div>

      {/* Daily Knowledge Snippet */}
      <motion.div variants={itemVariants} className="lg:col-span-1 glass-panel border border-gray-150 p-6 rounded-3xl shadow-soft-sm flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <BookOpen size={16} /> Daily Knowledge
          </div>
          <h4 className="font-extrabold text-sm text-textMain">Tactile Walkways</h4>
          <p className="text-xs text-textLight mt-2 leading-relaxed">
            Yellow blister-pattern paving alerts visually impaired individuals of hazard zones and stairs, while strip tile patterns guide them along a safe route.
          </p>
        </div>
        <div className="pt-4 border-t border-gray-100 mt-4 flex justify-between items-center text-[10px] text-textLight font-medium">
          <span>Refreshes Daily</span>
          <span className="text-primary hover:underline cursor-pointer font-bold" onClick={() => navigate('/quiz')}>More Facts &rarr;</span>
        </div>
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
