import React, { useState, useEffect } from 'react';
import { BarChart3, Download, Building2, ClipboardCheck, AlertTriangle, PenTool } from 'lucide-react';
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
        <button 
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          <Download size={18} /> {downloading ? 'Generating...' : 'Export PDF Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard 
          title="Overall Compliance" 
          value={`${stats.averageAccessibilityScore.toFixed(1)}%`} 
          colorClass={stats.averageAccessibilityScore >= 80 ? 'text-success bg-green-50' : 'text-primary bg-blue-50'}
          icon={<BarChart3 size={24} />} 
        />
        <ScoreCard 
          title="Total Buildings" 
          value={stats.totalBuildings} 
          colorClass="text-secondary bg-yellow-50" 
          icon={<Building2 size={24} />} 
        />
        <ScoreCard 
          title="Total Audits" 
          value={stats.totalAudits} 
          colorClass="text-primary bg-blue-50" 
          icon={<ClipboardCheck size={24} />} 
        />
        <ScoreCard 
          title="Student Reports" 
          value={stats.totalStudentReports} 
          colorClass="text-danger bg-red-50" 
          icon={<AlertTriangle size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Audits Pie Chart */}
        <div className="bg-cards p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
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
        <div className="bg-cards p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
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
    </div>
  );
};

export default Reports;
