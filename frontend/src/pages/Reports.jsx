import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import ScoreCard from '../components/ScoreCard';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
          <BarChart3 /> Analytics & Reports
        </h2>
        <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
          <Download size={18} /> Export PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard title="Overall Compliance" value="82%" colorClass="text-success bg-green-50" icon={<BarChart3 size={24} />} />
        <ScoreCard title="Audited Buildings" value="15/20" colorClass="text-primary bg-blue-50" icon={<BarChart3 size={24} />} />
        <ScoreCard title="Open Issues" value="4" colorClass="text-danger bg-red-50" icon={<BarChart3 size={24} />} />
        <ScoreCard title="Resolved Issues" value="28" colorClass="text-secondary bg-yellow-50" icon={<BarChart3 size={24} />} />
      </div>

      <div className="bg-cards p-6 rounded-xl shadow-sm border border-gray-100 mt-6 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-500">Analytics charts (Recharts) will be rendered here showing compliance trends over time.</p>
      </div>
    </div>
  );
};

export default Reports;
