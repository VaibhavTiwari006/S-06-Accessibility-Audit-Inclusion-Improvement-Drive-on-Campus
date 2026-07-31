import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Download, Building2, ClipboardCheck, AlertTriangle, 
  PenTool, Lightbulb, FileText, ShieldCheck, Globe, Users, Laptop, Wrench, Megaphone, CheckCircle2, Target
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { toast } from 'react-toastify';
import dashboardService from '../services/dashboardService';
import reportService from '../services/reportService';
import ScoreCard from '../components/ScoreCard';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadingAdvocacy, setDownloadingAdvocacy] = useState(false);
  const [downloadingFinal, setDownloadingFinal] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await dashboardService.getStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      toast.error('Failed to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      toast.info('Generating PDF Report, please wait...', { autoClose: 2000 });
      
      const blob = await reportService.downloadCampusReport();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'campus-accessibility-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF report.');
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadAdvocacy = async () => {
    try {
      setDownloadingAdvocacy(true);
      toast.info('Generating Advocacy Letter, please wait...', { autoClose: 2000 });
      
      const blob = await reportService.downloadAdvocacyLetter();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'advocacy-letter-roadmap.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Advocacy Letter downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate Advocacy Letter.');
    } finally {
      setDownloadingAdvocacy(false);
    }
  };

  const handleDownloadFinalReport = async () => {
    try {
      setDownloadingFinal(true);
      toast.info('Generating Final Project Report, please wait...', { autoClose: 2500 });
      const blob = await reportService.downloadFinalReport();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'S06-final-project-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Final Project Report downloaded!');
    } catch (error) {
      toast.error('Failed to generate Final Report.');
    } finally {
      setDownloadingFinal(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-textLight">Loading analytics...</div>;
  }

  if (!stats) {
    return <div className="p-8 text-center text-danger">Unable to load data.</div>;
  }

  // Transform Map objects into Recharts-friendly arrays
  const COLORS = ['#0056D2', '#28A745', '#FFC107', '#DC3545', '#6F42C1'];
  
  const transformMapToArray = (mapObj) => {
    if (!mapObj) return [];
    return Object.entries(mapObj).map(([name, value]) => ({ name, value }));
  };

  const auditsData = transformMapToArray(stats.auditsByStatus);
  const reportsData = transformMapToArray(stats.studentReportsByStatus);
  const tasksData = transformMapToArray(stats.maintenanceTasksByStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
            <BarChart3 className="text-primary" /> Analytics & Reports
          </h2>
          <p className="text-textLight mt-1">Campus-wide accessibility metrics and issue tracking.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleDownloadFinalReport}
            isLoading={downloadingFinal}
            icon={FileText}
          >
            Final Project Report
          </Button>
          <Button 
            variant="outline"
            onClick={handleDownloadAdvocacy}
            isLoading={downloadingAdvocacy}
            icon={Download}
          >
            Advocacy Letter
          </Button>
          <Button 
            variant="secondary"
            onClick={handleDownloadPDF}
            isLoading={downloading}
            icon={Download}
          >
            Export PDF Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard 
          title="Overall Compliance" 
          value={`${stats.averageAccessibilityScore.toFixed(1)}%`} 
          colorClass={stats.averageAccessibilityScore >= 80 ? 'text-success bg-success-50' : 'text-primary bg-primary-50'}
          icon={<BarChart3 size={24} />} 
        />
        <ScoreCard 
          title="Total Buildings" 
          value={stats.totalBuildings} 
          colorClass="text-secondary bg-secondary-50" 
          icon={<Building2 size={24} />} 
        />
        <ScoreCard 
          title="Total Audits" 
          value={stats.totalAudits} 
          colorClass="text-primary bg-primary-50" 
          icon={<ClipboardCheck size={24} />} 
        />
        <ScoreCard 
          title="Student Reports" 
          value={stats.totalStudentReports} 
          colorClass="text-danger bg-danger-50" 
          icon={<AlertTriangle size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Audits Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full"
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <h3 className="text-lg font-heading font-bold text-textMain flex items-center gap-2">
                <ClipboardCheck size={20} className="text-primary" /> Audits by Status
              </h3>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
              {auditsData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                    <Pie
                      data={auditsData}
                      cx="50%"
                      cy="43%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={5}
                      dataKey="value"
                      isAnimationActive={true}
                      animationBegin={200}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {auditsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Count']} contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ bottom: 0 }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-textLight">No audit data available</div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Maintenance Tasks Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="h-full"
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <h3 className="text-lg font-heading font-bold text-textMain flex items-center gap-2">
                <PenTool size={20} className="text-secondary" /> Maintenance Tasks Progress
              </h3>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
              {tasksData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tasksData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 500}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 500}} allowDecimals={false} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar 
                      dataKey="value" 
                      name="Tasks" 
                      radius={[6, 6, 0, 0]}
                      isAnimationActive={true}
                      animationBegin={300}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      {tasksData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-textLight">No task data available</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Standards Compliance & Impact Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* RPWD / WCAG Compliance Table */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-heading font-bold text-textMain flex items-center gap-2">
              <ShieldCheck size={20} className="text-primary" /> Standards Compliance
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { standard: 'RPWD Act 2016 – Physical Infrastructure', compliance: 68, color: 'bg-orange-500' },
                { standard: 'WCAG 2.1 AA – Website Accessibility',     compliance: 74, color: 'bg-primary' },
                { standard: 'WCAG 2.1 AA – LMS Accessibility',          compliance: 61, color: 'bg-secondary' },
                { standard: 'RPWD Act 2016 – Washroom Access',          compliance: 55, color: 'bg-danger' },
                { standard: 'RPWD Act 2016 – Emergency Signage',        compliance: 80, color: 'bg-success' },
              ].map((item, index) => (
                <div key={item.standard}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-textLight font-medium">{item.standard}</span>
                    <span className="font-bold text-textMain">{item.compliance}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 relative">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${item.compliance}%` }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{
                        duration: 1.0,
                        ease: [0.16, 1, 0.3, 1], // snappy fast start, smooth finish
                        delay: index * 0.1,
                      }}
                      className={`h-full rounded-full relative overflow-hidden ${item.color}`}
                    >
                      {/* Fast Racing Light Streak */}
                      <motion.div 
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '200%' }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 1.0,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          delay: index * 0.1 + 0.5
                        }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12"
                      />
                    </motion.div>
                  </div>
                </div>
            </div>
            <p className="text-xs text-textLight mt-6 font-medium">Benchmarked against RPWD Act 2016 mandates and WCAG 2.1 AA standards.</p>
          </CardContent>
        </Card>

        {/* Impact Metrics vs Targets */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary">
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-textMain">Impact Metrics vs. Targets</h3>
                <p className="text-xs text-textLight mt-0.5">Physical and digital indicators against inclusion drive goals.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: 'Buildings Audited', target: 10, achieved: stats.totalBuildings ?? 0, met: (stats.totalBuildings ?? 0) >= 10, icon: Building2, color: 'text-primary bg-primary/10 border-primary/20', colorBar: 'bg-primary' },
                { metric: 'Digital Assets Audited', target: 5, achieved: 5, met: true, icon: Laptop, color: 'text-secondary bg-secondary/10 border-secondary/20', colorBar: 'bg-secondary' },
                { metric: 'Students/Staff Engaged', target: 20, achieved: 43, met: true, icon: Users, color: 'text-pink-600 bg-pink-50 border-pink-100', colorBar: 'bg-pink-500' },
                { metric: 'Remediation Items', target: 50, achieved: stats.totalMaintenanceTasks ?? 0, met: (stats.totalMaintenanceTasks ?? 0) >= 50, icon: Wrench, color: 'text-orange-600 bg-orange-50 border-orange-100', colorBar: 'bg-orange-500' },
                { metric: 'Awareness Campaign Reach', target: 300, achieved: 450, met: true, icon: Megaphone, color: 'text-indigo-600 bg-indigo-50 border-indigo-100', colorBar: 'bg-indigo-500' },
              ].map((row, idx) => {
                const IconComponent = row.icon;
                const percentage = Math.min(100, Math.round((row.achieved / row.target) * 100));
                return (
                  <div 
                    key={row.metric}
                    className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:shadow-xs transition-all duration-300 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${row.color}`}>
                          <IconComponent size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-textMain text-sm leading-none mb-1">{row.metric}</h4>
                          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                            Target: ≥{row.target} • Achieved: {row.achieved}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {row.met ? (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                            <CheckCircle2 size={10} /> Met
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
                        <span>Completion Progress</span>
                        <span className={row.met ? 'text-emerald-600' : 'text-amber-600'}>{percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-150 rounded-full overflow-hidden p-0.5 relative">
                        <motion.div
                          initial={{ width: '0%' }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{
                            duration: 1.0,
                            ease: [0.16, 1, 0.3, 1],
                            delay: idx * 0.1,
                          }}
                          className={`h-full rounded-full relative overflow-hidden ${row.colorBar}`}
                        >
                          <motion.div 
                            initial={{ x: '-100%' }}
                            whileInView={{ x: '200%' }}
                            viewport={{ once: false }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              repeatDelay: 1.5,
                              delay: idx * 0.1 + 0.4
                            }}
                            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
