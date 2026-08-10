import React, { useEffect, useState, useMemo } from 'react';
import issueService from '../services/issueService';
import { AlertCircle, Plus, MapPin, Clock, CheckCircle, Search, Filter, Printer, X, IndianRupee } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import ReportIssueModal from '../components/ReportIssueModal';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';


const DUMMY_ISSUES = [
  {
    id: 105,
    buildingName: 'Engineering Block - A',
    description: 'The ramp near Gate 2 entrance of Engineering Block A has a steep gradient that makes it dangerous for wheelchair users, especially during rain when it gets slippery.',
    locationDetails: 'Ground floor, Gate 2 entrance',
    status: 'SUBMITTED',
    adminNotes: '',
    photoUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 106,
    buildingName: 'Management Block',
    description: 'The main door of the Management Block is extremely heavy and does not have an automatic opener. Students using crutches struggle to open it.',
    locationDetails: 'Main entrance, Management Block',
    status: 'SUBMITTED',
    adminNotes: '',
    photoUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 107,
    buildingName: 'Research & Innovation Centre',
    description: 'The parking lot near the Research Centre has no designated accessible parking spots. Wheelchair users have to travel a long distance from regular spots.',
    locationDetails: 'Outdoor parking lot, Research & Innovation Centre',
    status: 'SUBMITTED',
    adminNotes: '',
    photoUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 101,
    buildingName: 'Boys Hostel Block - H1',
    description: 'The main entrance ramp is too steep and lacks side handrails, making it unsafe for wheelchair users.',
    locationDetails: 'Main Entrance Lobby Area',
    status: 'IN_PROGRESS',
    adminNotes: 'Work order has been assigned to maintenance. Handrails installation is scheduled.',
    photoUrl: 'https://images.unsplash.com/photo-1576085898323-218337e3cc44?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: 102,
    buildingName: 'Central Library',
    description: 'Elevator buttons lack Braille markings and tactile indicators for visually impaired students.',
    locationDetails: 'Ground Floor Elevator panel',
    status: 'PENDING',
    adminNotes: 'Awaiting purchase of tactile plates and braille stickers.',
    photoUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 103,
    buildingName: 'Engineering Block - A',
    description: 'Slippery floor tiles near the entrance lobby during rainy weather present a major slipping hazard.',
    locationDetails: 'Block A Entrance Foyer',
    status: 'RESOLVED',
    adminNotes: 'Anti-slip rubber mats have been installed along the entire pathway.',
    photoUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 104,
    buildingName: 'Academic Block - C',
    description: 'Accessible washroom is locked and being used as a storage closet for cleaning supplies.',
    locationDetails: 'Second Floor washroom corridor',
    status: 'RESOLVED',
    adminNotes: 'Supplies cleared. Custodial team instructed to keep it open and functional.',
    photoUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date().toISOString()
  },
  {
    id: 108,
    buildingName: 'Food Court',
    description: 'Tactile warning tiles are missing near the entrance stairs of the Food Court, posing a safety risk for visually impaired students.',
    locationDetails: 'Main entrance stairs, Food Court',
    status: 'IN_PROGRESS',
    adminNotes: 'Tactile paving installation has been requested from contractor.',
    photoUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 109,
    buildingName: 'Science Block Seminar Hall',
    description: 'No hearing loop systems or assistive listening devices are available in the main Seminar Hall for students with hearing loss.',
    locationDetails: 'Seminar Hall - Ground Floor',
    status: 'PENDING',
    adminNotes: 'Hardware team researching budget options for loop induction setup.',
    photoUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 110,
    buildingName: 'Administrative Block',
    description: 'The reception desk is too high (1200mm) and does not have a lower section for wheelchair users to interact with staff.',
    locationDetails: 'Main Reception, Administrative Block',
    status: 'RESOLVED',
    adminNotes: 'Lowered auxiliary counter section has been added to the left of the desk.',
    photoUrl: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 111,
    buildingName: 'Sports Complex Gym',
    description: 'The gym entrance lacks a step-free pathway, requiring students in wheelchairs to ask for manual assistance to enter.',
    locationDetails: 'Gym Entrance, Sports Complex',
    status: 'PENDING',
    adminNotes: 'Awaiting design approval for a portable metal ramp setup.',
    photoUrl: null,
    createdAt: new Date().toISOString()
  }
];

/**
 * Parses structured floor and category labels from the locationDetails string.
 * @param {string} details - The raw locationDetails from the database/API.
 * @returns {object} parsed - An object with floor, category, and trailing details.
 */
const parseLocation = (details = '') => {
  const match = details.match(/^\[Floor:\s*([^|]+)\s*\|\s*Type:\s*([^\]]+)\]\s*(.*)$/i);
  if (match) {
    return {
      floor: match[1].trim(),
      category: match[2].trim(),
      rest: match[3].trim()
    };
  }
  
  const lowercase = details.toLowerCase();
  let floor = 'Ground Floor';
  if (lowercase.includes('first') || lowercase.includes('1st') || lowercase.includes('floor 1')) {
    floor = '1st Floor';
  } else if (lowercase.includes('second') || lowercase.includes('2nd') || lowercase.includes('floor 2')) {
    floor = '2nd Floor';
  } else if (lowercase.includes('third') || lowercase.includes('3rd') || lowercase.includes('floor 3')) {
    floor = '3rd Floor';
  } else if (lowercase.includes('fourth') || lowercase.includes('4th') || lowercase.includes('above')) {
    floor = '4th Floor & Above';
  }
  
  let category = 'Other';
  if (lowercase.includes('washroom') || lowercase.includes('toilet') || lowercase.includes('restroom')) {
    category = 'Washroom';
  } else if (lowercase.includes('entrance') || lowercase.includes('gate') || lowercase.includes('foyer') || lowercase.includes('lobby') || lowercase.includes('ramp')) {
    category = 'Entrance';
  } else if (lowercase.includes('hall') || lowercase.includes('classroom') || lowercase.includes('lab') || lowercase.includes('lecture')) {
    category = 'Lecture Hall';
  } else if (lowercase.includes('elevator') || lowercase.includes('lift')) {
    category = 'Elevator';
  } else if (lowercase.includes('corridor') || lowercase.includes('path') || lowercase.includes('walkway') || lowercase.includes('passage')) {
    category = 'Corridor';
  }
  
  return {
    floor,
    category,
    rest: details
  };
};

/**
 * IssueList Page Component
 * Renders role-based campus accessibility issues reported by students.
 * Supports upvoting, sorting, filtration, and specific building/barrier reviews.
 */
const IssueList = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const getUpvotesCount = (issueId) => {
    const stored = localStorage.getItem(`upvotes-count-${issueId}`);
    if (stored) return parseInt(stored);
    const defaultSeed = (issueId % 7) + 1; 
    localStorage.setItem(`upvotes-count-${issueId}`, defaultSeed.toString());
    return defaultSeed;
  };

  const isUpvoted = (issueId) => {
    return localStorage.getItem(`upvoted-issue-${issueId}`) === 'true';
  };

  const handleUpvote = (issueId) => {
    const key = `upvoted-issue-${issueId}`;
    const alreadyUpvoted = localStorage.getItem(key) === 'true';
    const currentCount = getUpvotesCount(issueId);

    if (alreadyUpvoted) {
      localStorage.removeItem(key);
      localStorage.setItem(`upvotes-count-${issueId}`, Math.max(1, currentCount - 1).toString());
      toast.info('Upvote removed.');
    } else {
      localStorage.setItem(key, 'true');
      localStorage.setItem(`upvotes-count-${issueId}`, (currentCount + 1).toString());
      toast.success('Thank you! Issue upvoted to increase resolution priority.');
    }
    setIssues(prev => [...prev]);
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = user?.role === 'STUDENT' 
        ? await issueService.getMyIssues() 
        : await issueService.getAllIssues();
      
      const combined = [];
      if (Array.isArray(data)) {
        combined.push(...data);
      }
      
      // Filter out duplicate IDs if any, then append dummy issues
      const existingIds = new Set(combined.map(item => item.id));
      DUMMY_ISSUES.forEach(dummy => {
        if (!existingIds.has(dummy.id)) {
          combined.push(dummy);
        }
      });

      setIssues(combined);
    } catch (error) {
      console.warn('Failed to fetch issues, falling back to dummy data', error);
      setIssues(DUMMY_ISSUES);
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

                  {/* Categorization Badges */}
                  {(() => {
                    const parsed = parseLocation(issue.locationDetails);
                    return (
                      <div className="space-y-2 mb-4">
                        {parsed.floor && (
                          <div className="flex gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-lg bg-red-50 text-red-700 text-[10px] font-extrabold border border-red-100">{parsed.floor}</span>
                            <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-extrabold border border-indigo-100">{parsed.category}</span>
                          </div>
                        )}
                        <div className="text-sm font-medium text-textLight flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <div className="bg-white p-1.5 rounded-lg shadow-sm text-gray-400"><MapPin size={14} /></div> 
                          <span className="truncate">{parsed.rest || 'Location not specified'}</span>
                        </div>
                      </div>
                    );
                  })()}

                  {issue.adminNotes && (
                    <div className="mt-4 bg-primary/5 border border-primary/20 text-primary-dark text-xs p-3 rounded-xl shadow-inner">
                      <span className="font-extrabold flex items-center gap-1 mb-1"><AlertCircle size={12}/> Admin Notes:</span> 
                      {issue.adminNotes}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center gap-2">
                  <div>
                    {issue.status !== 'RESOLVED' && issue.status !== 'COMPLETED' && issue.status !== 'FIXED' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(issue.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                          isUpvoted(issue.id)
                            ? 'bg-amber-500 text-white shadow-2xs hover:bg-amber-600'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
                        }`}
                      >
                        👍 {isUpvoted(issue.id) ? 'Upvoted' : 'Upvote'} ({getUpvotesCount(issue.id)})
                      </button>
                    )}
                  </div>
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
            className="fixed inset-0 z-[100] flex items-center justify-center pt-20 pb-6 px-4 bg-black/50 backdrop-blur-xs"
          >
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedIssue(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-start p-6 border-b border-gray-100 flex-shrink-0">
                <div className="space-y-1">
                  <h3 className="text-xl font-heading font-extrabold text-textMain">{selectedIssue.buildingName}</h3>
                  <div className="pt-0.5">
                    <Badge variant={getStatusVariant(selectedIssue.status)}>
                      <StatusIcon status={selectedIssue.status} /> {selectedIssue.status?.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedIssue(null)}
                  className="text-gray-400 hover:text-textMain font-bold text-lg p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">{selectedIssue.description}</p>
                
                 {(() => {
                   const parsed = parseLocation(selectedIssue.locationDetails);
                   return (
                     <div className="space-y-2">
                       {parsed.floor && (
                         <div className="flex gap-1.5 flex-wrap">
                           <span className="px-2 py-0.5 rounded-lg bg-red-50 text-red-700 text-[10px] font-extrabold border border-red-100">{parsed.floor}</span>
                           <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-extrabold border border-indigo-100">{parsed.category}</span>
                         </div>
                       )}
                       <div className="text-sm font-medium text-gray-600 flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                         <div className="bg-white p-1.5 rounded-lg shadow-xs"><MapPin size={16} className="text-gray-400" /></div>
                         <span>{parsed.rest || 'Location not specified'}</span>
                       </div>
                     </div>
                   );
                 })()}

                {selectedIssue.photoUrl && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attached Evidence</p>
                    <img src={selectedIssue.photoUrl} alt="Evidence" className="w-full h-48 object-cover rounded-xl shadow-xs border border-gray-100" />
                  </div>
                )}

                {/* Real-time Resolution Stepper */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Live Resolution Progress:</span>
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                    <div 
                      className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500" 
                      style={{
                        width: selectedIssue.status === 'RESOLVED' ? '100%' : selectedIssue.status === 'IN_PROGRESS' ? '50%' : '0%'
                      }}
                    />

                    {/* Stage 1: Reported */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">✓</div>
                      <span className="text-[9px] font-bold text-gray-500 mt-1">Reported</span>
                    </div>

                    {/* Stage 2: In Progress */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs ${selectedIssue.status === 'IN_PROGRESS' || selectedIssue.status === 'RESOLVED' ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                        {selectedIssue.status === 'IN_PROGRESS' || selectedIssue.status === 'RESOLVED' ? '✓' : '2'}
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 mt-1">In Repair</span>
                    </div>

                    {/* Stage 3: Resolved */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs ${selectedIssue.status === 'RESOLVED' ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                        {selectedIssue.status === 'RESOLVED' ? '✓' : '3'}
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 mt-1">Fixed</span>
                    </div>
                  </div>
                </div>

                {selectedIssue.adminNotes && (
                  <div className="bg-primary/5 text-primary-dark p-4 rounded-xl text-sm border border-primary/20">
                    <span className="font-extrabold flex items-center gap-1.5 mb-1.5 uppercase text-[10px] tracking-wider"><AlertCircle size={14}/> Admin Response</span>
                    {selectedIssue.adminNotes}
                  </div>
                )}
              </div>

              {/* Fixed Footer */}
              <div className="flex justify-end items-center p-6 border-t border-gray-100 flex-shrink-0 bg-gray-50/50 gap-2">
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