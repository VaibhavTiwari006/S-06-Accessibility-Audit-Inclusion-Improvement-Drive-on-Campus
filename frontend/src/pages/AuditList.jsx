import React, { useEffect, useState } from 'react';
import auditService from '../services/auditService';
import { ClipboardList, Play, FileText } from 'lucide-react';

const AuditList = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const data = await auditService.getAllAudits();
        setAudits(data);
      } catch (error) {
        console.error("Failed to fetch audits", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudits();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
          <ClipboardList /> Accessibility Audits
        </h2>
        <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
          <Play size={18} /> Start New Audit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audits.map((audit) => (
          <div key={audit.id} className="bg-cards p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden">
            {/* Status indicator line */}
            <div className={`absolute top-0 left-0 w-full h-1 ${audit.status === 'COMPLETED' ? 'bg-success' : 'bg-secondary'}`}></div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-textMain">{audit.buildingName}</h3>
                <p className="text-sm text-gray-500">Auditor: {audit.auditor}</p>
                <p className="text-sm text-gray-500">Date: {audit.date}</p>
              </div>
              <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${audit.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {audit.status.replace('_', ' ')}
              </span>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Compliance Score</span>
                <p className="text-2xl font-bold text-textMain">{audit.score || '---'}</p>
              </div>
              <button className="flex items-center gap-2 text-primary hover:text-blue-800 font-medium bg-blue-50 px-3 py-2 rounded">
                <FileText size={18} /> {audit.status === 'COMPLETED' ? 'View Report' : 'Continue'}
              </button>
            </div>
          </div>
        ))}
        {audits.length === 0 && !loading && (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500">
            No audits found. Click "Start New Audit" to begin.
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditList;
