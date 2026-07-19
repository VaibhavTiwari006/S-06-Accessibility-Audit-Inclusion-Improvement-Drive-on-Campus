import React, { useEffect, useState, useMemo } from 'react';
import issueService from '../services/issueService';
import { AlertCircle, Plus, MapPin, User, Clock, CheckCircle, Search, Filter, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import ReportIssueModal from '../components/ReportIssueModal';
import { useAuth } from '../context/AuthContext';

const IssueList = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = user?.role === 'STUDENT' 
        ? await issueService.getMyIssues() 
        : await issueService.getAllIssues();
      setIssues(data);
    } catch (error) {
      toast.error('Failed to fetch issues.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIssues(); }, [user?.role]);

  const statusBadge = (status) => {
    const map = {
      RESOLVED: 'bg-success-50 text-success-dark border border-success-100',
      IN_PROGRESS: 'bg-primary-50 text-primary-dark border border-primary-100',
      PENDING: 'bg-secondary-50 text-secondary-dark border border-secondary-100',
    };
    return map[status] || 'bg-gray-100 text-gray-600 border border-gray-200';
  };

  const StatusIcon = ({ status }) => {
    if (status === 'RESOLVED') return <CheckCircle size={14} className="text-success" />;
    if (status === 'IN_PROGRESS') return <Clock size={14} className="text-primary" />;
    return <AlertCircle size={14} className="text-secondary" />;
  };

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchesSearch = issue.buildingName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            issue.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            issue.locationDetails?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [issues, searchTerm, statusFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatePresence>
        {showModal && <ReportIssueModal onClose={() => setShowModal(false)} onSuccess={fetchIssues} />}
      </AnimatePresence>
      
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <AlertCircle className="text-danger" size={32} /> Accessibility Issues
          </h2>
          <p className="text-textLight mt-1.5 font-medium">Student-reported accessibility barriers and resolution status.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow xl:flex-grow-0 xl:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-sm font-medium placeholder-gray-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={"flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-sm rounded-xl text-sm font-semibold transition-all hover:bg-white " + (statusFilter !== 'ALL' ? 'text-primary' : 'text-gray-600')}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">{statusFilter === 'ALL' ? 'All Status' : statusFilter.replace(/_/g, ' ')}</span>
            </button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl border border-white/60 rounded-xl shadow-xl z-20 py-2"
                >
                  {['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED'].map(status => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }}
                      className={"w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/5 " + (statusFilter === status ? 'text-primary bg-primary/5' : 'text-gray-700')}
                    >
                      {status === 'ALL' ? 'All Statuses' : status.replace(/_/g, ' ')}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user?.role === 'STUDENT' && (
            <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 shadow-soft-md shadow-primary/30">
              <Plus size={18} /> Report Issue
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-white/60 shadow-soft-sm">
              <div className="flex justify-between">
                <div className="h-6 w-1/2 skeleton rounded-md"></div>
                <div className="h-6 w-24 skeleton rounded-full"></div>
              </div>
              <div className="space-y-2 mt-2">
                <div className="h-4 w-full skeleton rounded-md"></div>
                <div className="h-4 w-5/6 skeleton rounded-md"></div>
                <div className="h-4 w-4/6 skeleton rounded-md"></div>
              </div>
              <div className="mt-4 flex justify-between pt-4 border-t border-gray-100">
                <div className="h-4 w-1/3 skeleton rounded-md"></div>
                <div className="h-4 w-20 skeleton rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredIssues.map((issue) => (
            <motion.div 
              variants={itemVariants}
              key={issue.id} 
              className="glass-premium p-6 flex flex-col justify-between rounded-2xl group hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="font-heading font-extrabold text-lg text-textMain leading-tight group-hover:text-primary transition-colors">{issue.buildingName}</h3>
                  <span className={`px-2.5 py-1 flex-shrink-0 flex items-center gap-1.5 text-[10px] font-extrabold uppercase rounded-full ${statusBadge(issue.status)}`}>
                    <StatusIcon status={issue.status} /> {issue.status?.replace(/_/g, ' ')}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{issue.description}</p>

                <div className="text-sm font-medium text-gray-500 flex items-center gap-2 bg-white/50 p-2.5 rounded-xl border border-white/40 shadow-sm">
                  <div className="bg-gray-100 p-1.5 rounded-lg text-gray-500"><MapPin size={14} /></div> 
                  {issue.locationDetails || 'Location not specified'}
                </div>

                {issue.adminNotes && (
                  <div className="mt-4 bg-primary/5 border border-primary/20 text-primary-dark text-xs p-3 rounded-xl shadow-inner">
                    <span className="font-extrabold flex items-center gap-1 mb-1"><AlertCircle size={12}/> Admin Notes:</span> 
                    {issue.adminNotes}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100/80 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-lg">
                  <User size={12} className="text-gray-400" /> {issue.reporterName}
                </span>
                <button 
                  onClick={() => setSelectedIssue(issue)}
                  className="text-sm text-primary font-bold hover:text-blue-800 transition-colors flex items-center gap-1 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
          
          {filteredIssues.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-24 glass-panel rounded-3xl border border-white/60">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-soft-sm">
                <CheckCircle size={36} className="text-success/50" />
              </div>
              <p className="text-gray-700 font-extrabold text-xl font-heading mb-2">No issues found</p>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                {issues.length === 0 
                  ? "Great news! There are currently no accessibility issues reported in the system."
                  : "No issues match your current search and filter criteria."}
              </p>
              {issues.length > 0 ? (
                <button 
                  onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
                  className="mt-6 btn-primary"
                >
                  Clear all filters
                </button>
              ) : (
                user?.role === 'STUDENT' && (
                  <button 
                    onClick={() => setShowModal(true)}
                    className="mt-6 btn-primary inline-flex items-center gap-2"
                  >
                    <Plus size={16} /> Report an Issue
                  </button>
                )
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {selectedIssue && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4"
          >
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSelectedIssue(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative glass-premium rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/60 p-7"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-heading font-extrabold text-textMain pr-4">{selectedIssue.buildingName}</h3>
                <span className={`px-2.5 py-1 flex-shrink-0 flex items-center gap-1.5 text-[10px] font-extrabold uppercase rounded-full ${statusBadge(selectedIssue.status)}`}>
                  <StatusIcon status={selectedIssue.status} /> {selectedIssue.status?.replace(/_/g, ' ')}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 mb-5 leading-relaxed bg-white/40 p-4 rounded-xl border border-white/50">{selectedIssue.description}</p>
              
              <div className="text-sm font-medium text-gray-500 mb-5 flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                <div className="bg-white p-1.5 rounded-lg shadow-sm"><MapPin size={16} className="text-gray-400" /></div>
                {selectedIssue.locationDetails || 'Location not specified'}
              </div>

              {selectedIssue.photoUrl && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Attached Evidence</p>
                  <img src={selectedIssue.photoUrl} alt="Evidence" className="w-full h-48 object-cover rounded-xl shadow-soft-sm border border-gray-100" />
                </div>
              )}

              {selectedIssue.adminNotes && (
                <div className="bg-primary/5 text-primary-dark p-4 rounded-xl text-sm mb-5 border border-primary/20">
                  <span className="font-extrabold flex items-center gap-1.5 mb-1.5 uppercase text-[10px] tracking-wider"><AlertCircle size={14}/> Admin Response</span>
                  {selectedIssue.adminNotes}
                </div>
              )}

              <div className="flex justify-between items-center pt-5 border-t border-gray-100 mt-2">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider bg-gray-50 px-3 py-1.5 rounded-lg">
                  <User size={12} className="text-gray-400" /> {selectedIssue.reporterName}
                </span>
                <button onClick={() => setSelectedIssue(null)} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors shadow-sm">
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IssueList;