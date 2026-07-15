import React, { useEffect, useState } from 'react';
import issueService from '../services/issueService';
import { AlertCircle, Plus, MapPin, User, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import ReportIssueModal from '../components/ReportIssueModal';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = await issueService.getAllIssues();
      setIssues(data);
    } catch (error) {
      toast.error('Failed to fetch issues.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIssues(); }, []);

  const statusBadge = (status) => {
    const map = {
      RESOLVED: 'bg-green-100 text-green-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
    };
    return map[status] || 'bg-gray-100 text-gray-600';
  };

  const StatusIcon = ({ status }) => {
    if (status === 'RESOLVED') return <CheckCircle size={14} className="text-success" />;
    if (status === 'IN_PROGRESS') return <Clock size={14} className="text-primary" />;
    return <AlertCircle size={14} className="text-secondary" />;
  };

  return (
    <div className="space-y-6">
      {showModal && <ReportIssueModal onClose={() => setShowModal(false)} onSuccess={fetchIssues} />}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
            <AlertCircle className="text-danger" /> Accessibility Issues
          </h2>
          <p className="text-textLight mt-1">Student-reported accessibility barriers and their resolution status.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
          <Plus size={18} /> Report Issue
        </button>
      </div>

      {loading && (
        <div className="text-center py-16 text-gray-400">Loading issues...</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div key={issue.id} className="bg-cards p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-base text-textMain leading-tight">{issue.buildingName}</h3>
              <span className={`px-2 py-1 flex-shrink-0 flex items-center gap-1 text-[10px] font-bold uppercase rounded-full ${statusBadge(issue.status)}`}>
                <StatusIcon status={issue.status} /> {issue.status?.replace(/_/g, ' ')}
              </span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">{issue.description}</p>

            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin size={14} /> {issue.locationDetails || 'Location not specified'}
            </div>

            {issue.adminNotes && (
              <div className="bg-blue-50 text-blue-700 text-xs p-2 rounded-lg">
                <span className="font-semibold">Admin Notes:</span> {issue.adminNotes}
              </div>
            )}

            <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <User size={12} /> {issue.reporterName}
              </span>
              <button className="text-sm text-primary hover:underline font-medium">View Details</button>
            </div>
          </div>
        ))}
        {issues.length === 0 && !loading && (
          <div className="col-span-3 text-center py-16">
            <CheckCircle size={36} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 font-medium">No issues reported yet.</p>
            <p className="text-gray-300 text-sm mt-1">Click "Report Issue" to submit one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueList;
