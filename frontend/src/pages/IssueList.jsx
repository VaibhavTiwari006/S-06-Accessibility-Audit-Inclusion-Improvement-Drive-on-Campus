import React, { useEffect, useState } from 'react';
import issueService from '../services/issueService';
import { AlertCircle, Plus, MapPin } from 'lucide-react';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await issueService.getAllIssues();
        setIssues(data);
      } catch (error) {
        console.error("Failed to fetch issues", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
          <AlertCircle /> Accessibility Issues
        </h2>
        <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
          <Plus size={18} /> Report Issue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div key={issue.id} className="bg-cards p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-lg text-textMain leading-tight">{issue.title}</h3>
              <span className={`px-2 py-1 flex-shrink-0 text-[10px] font-bold uppercase rounded-full ${issue.status === 'RESOLVED' ? 'bg-success text-white' : 'bg-secondary text-yellow-900'}`}>
                {issue.status}
              </span>
            </div>
            
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin size={16} /> {issue.location}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400">Reported by: {issue.reportedBy}</span>
              <button className="text-sm text-primary hover:underline font-medium">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueList;
