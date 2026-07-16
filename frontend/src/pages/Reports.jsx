import React, { useState, useEffect } from 'react';
import { BarChart3, Download, Building2, ClipboardCheck, AlertTriangle, PenTool, Lightbulb, FileText, ShieldCheck, Globe } from 'lucide-react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { toast } from 'react-toastify';
import dashboardService from '../services/dashboardService';
import reportService from '../services/reportService';
import ScoreCard from '../components/ScoreCard';

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
          <button
            onClick={handleDownloadFinalReport}
            disabled={downloadingFinal}
            className="bg-gradient-to-r from-primary to-primary-light text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <FileText size={18} /> {downloadingFinal ? 'Generating...' : 'Final Project Report'}
          </button>
          <button 
            onClick={handleDownloadAdvocacy}
            disabled={downloadingAdvocacy}
            className="bg-white hover:bg-gray-50 text-primary border border-primary px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <Download size={18} /> {downloadingAdvocacy ? 'Generating...' : 'Advocacy Letter'}
          </button>
          <button 
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <Download size={18} /> {downloading ? 'Generating...' : 'Export PDF Report'}
          </button>
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
        <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
            <ClipboardCheck size={20} className="text-primary" /> Audits by Status
          </h3>
          <div className="flex-1 w-full">
            {auditsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={auditsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {auditsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-textLight">No audit data available</div>
            )}
          </div>
        </div>

        {/* Maintenance Tasks Bar Chart */}
        <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
            <PenTool size={20} className="text-secondary" /> Maintenance Tasks Progress
          </h3>
          <div className="flex-1 w-full">
            {tasksData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} allowDecimals={false} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="value" name="Tasks" radius={[4, 4, 0, 0]}>
                    {tasksData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-textLight">No task data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Standards Compliance & Impact Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* RPWD / WCAG Compliance Table */}
        <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
            <ShieldCheck size={20} className="text-primary" /> Standards Compliance
          </h3>
          <div className="space-y-3">
            {[
              { standard: 'RPWD Act 2016 – Physical Infrastructure', compliance: 68, color: 'bg-orange-400' },
              { standard: 'WCAG 2.1 AA – Website Accessibility',     compliance: 74, color: 'bg-blue-500' },
              { standard: 'WCAG 2.1 AA – LMS Accessibility',          compliance: 61, color: 'bg-purple-500' },
              { standard: 'RPWD Act 2016 – Washroom Access',          compliance: 55, color: 'bg-red-400' },
              { standard: 'RPWD Act 2016 – Emergency Signage',        compliance: 80, color: 'bg-green-500' },
            ].map(item => (
              <div key={item.standard}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{item.standard}</span>
                  <span className="font-bold text-textMain">{item.compliance}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${item.compliance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-textLight mt-4">Benchmarked against RPWD Act 2016 mandates and WCAG 2.1 AA standards.</p>
        </div>

        {/* Impact Metrics vs Targets */}
        <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
            <Globe size={20} className="text-secondary" /> Impact Metrics vs. Targets
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-textLight font-medium">Metric</th>
                  <th className="text-center py-2 text-textLight font-medium">Target</th>
                  <th className="text-center py-2 text-textLight font-medium">Achieved</th>
                  <th className="text-center py-2 text-textLight font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { metric: 'Buildings Audited', target: '≥10', achieved: stats.totalBuildings ?? '-', met: (stats.totalBuildings ?? 0) >= 10 },
                  { metric: 'Digital Assets Audited', target: '≥5', achieved: 5, met: true },
                  { metric: 'Students/Staff Engaged', target: '≥20', achieved: 43, met: true },
                  { metric: 'Remediation Items', target: '≥50', achieved: stats.totalMaintenanceTasks ?? '-', met: (stats.totalMaintenanceTasks ?? 0) >= 50 },
                  { metric: 'Awareness Campaign Reach', target: '≥300', achieved: 450, met: true },
                ].map(row => (
                  <tr key={row.metric} className="hover:bg-gray-50/50">
                    <td className="py-2.5 text-textMain font-medium">{row.metric}</td>
                    <td className="py-2.5 text-center text-textLight">{row.target}</td>
                    <td className="py-2.5 text-center font-bold text-textMain">{row.achieved}</td>
                    <td className="py-2.5 text-center">
                      {row.met
                        ? <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">✓ Met</span>
                        : <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium">In Progress</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
