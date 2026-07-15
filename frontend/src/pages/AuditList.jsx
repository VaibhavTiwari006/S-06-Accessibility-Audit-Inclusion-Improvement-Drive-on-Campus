import React, { useEffect, useState } from 'react';
import auditService from '../services/auditService';
import { ClipboardList, Play, FileText, Calendar, User } from 'lucide-react';
import { toast } from 'react-toastify';
import StartAuditModal from '../components/StartAuditModal';

const AuditList = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchAudits = async () => {
    try {
      setLoading(true);
      const data = await auditService.getAllAudits();
      setAudits(data);
    } catch (error) {
      toast.error('Failed to fetch audits.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAudits(); }, []);

  const statusColor = (status) => {
    const map = {
      APPROVED: 'bg-success-50 text-success-dark',
      IN_PROGRESS: 'bg-primary-50 text-primary-dark',
      PENDING: 'bg-secondary-50 text-secondary-dark',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return map[status] || 'bg-gray-100 text-gray-600';
  };

  const topBarColor = (status) => {
    const map = {
      APPROVED: 'bg-success',
      IN_PROGRESS: 'bg-primary',
      PENDING: 'bg-secondary',
      REJECTED: 'bg-danger',
    };
    return map[status] || 'bg-gray-300';
  };

  return (
    <div className="space-y-6">
      {showModal && <StartAuditModal onClose={() => setShowModal(false)} onSuccess={fetchAudits} />}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
            <ClipboardList className="text-primary" /> Accessibility Audits
          </h2>
          <p className="text-textLight mt-1">All campus building audits and compliance scores.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
          <Play size={18} /> Start New Audit
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="h-6 w-1/2 skeleton"></div>
                <div className="h-6 w-1/4 skeleton rounded-full"></div>
              </div>
              <div className="h-4 w-1/3 skeleton"></div>
              <div className="h-4 w-1/3 skeleton"></div>
              <div className="mt-2 flex justify-between">
                <div>
                  <div className="h-3 w-16 skeleton mb-1"></div>
                  <div className="h-8 w-12 skeleton"></div>
                </div>
                <div className="h-10 w-24 skeleton rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {audits.map((audit) => (
          <div key={audit.id} className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${topBarColor(audit.status)}`}></div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-textMain">{audit.buildingName}</h3>
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <User size={13} /> {audit.auditorName}
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-0.5">
                  <Calendar size={13} /> {audit.auditDate}
                </p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor(audit.status)}`}>
                {audit.status?.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-400">Compliance Score</span>
                <p className={`text-2xl font-bold ${audit.overallAccessibilityScore >= 80 ? 'text-success' : audit.overallAccessibilityScore >= 50 ? 'text-secondary' : 'text-danger'}`}>
                  {audit.overallAccessibilityScore ? `${audit.overallAccessibilityScore.toFixed(1)}%` : '—'}
                </p>
              </div>
              <button className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium bg-primary-50 hover:bg-primary-50 px-3 py-2 rounded-lg transition-colors">
                <FileText size={16} /> {audit.status === 'APPROVED' ? 'View Report' : 'Continue'}
              </button>
            </div>

            {audit.remarks && (
              <p className="text-xs text-gray-400 border-t border-gray-100 pt-3 italic">"{audit.remarks}"</p>
            )}
          </div>
        ))}
        {audits.length === 0 && !loading && (
          <div className="col-span-2 text-center py-16">
            <ClipboardList size={36} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 font-medium">No audits found.</p>
            <p className="text-gray-300 text-sm mt-1">Click "Start New Audit" to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditList;
