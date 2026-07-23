import React, { useEffect, useState, useMemo } from 'react';
import issueService from '../services/issueService';
import { AlertCircle, Plus, MapPin, User, Clock, CheckCircle, Search, Filter, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import ReportIssueModal from '../components/ReportIssueModal';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

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

  const getStatusVariant = (status) => {
    switch (status) {
      case 'RESOLVED': return 'success';
      case 'IN_PROGRESS': return 'primary';
      case 'PENDING': return 'warning';
      default: return 'secondary';
    }
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
          <div className="w-full xl:w-64">
            <Input
              icon={Search}
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Button 
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              icon={Filter}
            >
              {statusFilter === 'ALL' ? 'All Status' : statusFilter.replace(/_/g, ' ')}
            </Button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2"
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
            <Button icon={Plus} onClick={() => setShowModal(true)}>
              Report Issue
            </Button>
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
            <Card 
              key={issue.id} 
              className="flex flex-col justify-between group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="pt-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="font-heading font-extrabold text-lg text-textMain leading-tight group-hover:text-primary transition-colors">{issue.buildingName}</h3>
                    <Badge variant={getStatusVariant(issue.status)}>
                      <StatusIcon status={issue.status} /> {issue.status?.replace(/_/g, ' ')}
                    </Badge>
                  </div>

                  <p className="text-sm text-textLight mb-4 leading-relaxed">{issue.description}</p>

                  <div className="text-sm font-medium text-textLight flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="bg-white p-1.5 rounded-lg shadow-sm text-gray-400"><MapPin size={14} /></div> 
                    {issue.locationDetails || 'Location not specified'}
                  </div>

                  {issue.adminNotes && (
                    <div className="mt-4 bg-primary/5 border border-primary/20 text-primary-dark text-xs p-3 rounded-xl shadow-inner">
                      <span className="font-extrabold flex items-center gap-1 mb-1"><AlertCircle size={12}/> Admin Notes:</span> 
                      {issue.adminNotes}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-lg">
                    <User size={12} className="text-gray-400" /> {issue.reporterName}
                  </span>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                <Button 
                  onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
                  className="mt-6"
                >
                  Clear all filters
                </Button>
              ) : (
                user?.role === 'STUDENT' && (
                  <Button 
                    onClick={() => setShowModal(true)}
                    className="mt-6"
                    icon={Plus}
                  >
                    Report an Issue
                  </Button>
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
                <Badge variant={getStatusVariant(selectedIssue.status)}>
                  <StatusIcon status={selectedIssue.status} /> {selectedIssue.status?.replace(/_/g, ' ')}
                </Badge>
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

              {/* Real-time Resolution Stepper */}
              <div className="mb-5 p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Live Resolution Progress:</span>
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500" 
                    style={{
                      width: selectedIssue.status === 'RESOLVED' ? '100%' : selectedIssue.status === 'IN_PROGRESS' ? '60%' : '20%'
                    }}
                  />

                  {/* Stage 1: Reported */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">✓</div>
                    <span className="text-[10px] font-bold text-gray-600 mt-1">Reported</span>
                  </div>

                  {/* Stage 2: In Progress */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${selectedIssue.status === 'IN_PROGRESS' || selectedIssue.status === 'RESOLVED' ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                      {selectedIssue.status === 'IN_PROGRESS' || selectedIssue.status === 'RESOLVED' ? '✓' : '2'}
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 mt-1">In Repair</span>
                  </div>

                  {/* Stage 3: Resolved */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${selectedIssue.status === 'RESOLVED' ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                      {selectedIssue.status === 'RESOLVED' ? '✓' : '3'}
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 mt-1">Fixed</span>
                  </div>
                </div>
              </div>

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
                <Button variant="secondary" onClick={() => setSelectedIssue(null)}>
                  Close Details
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IssueList;