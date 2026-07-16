import React, { useEffect, useState } from 'react';
import {
  HeartHandshake, Users, Map, Download, CheckCircle,
  Calendar, MessageSquare, Lightbulb, Plus, MapPin,
  DollarSign, ArrowUpCircle, CheckCircle2, Clock, XCircle, ThumbsUp
} from 'lucide-react';
import api from '../services/api';
import pilotService from '../services/pilotService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import ProposePilotModal from '../components/ProposePilotModal';

const statusConfig = {
  PROPOSED:    { label: 'Proposed',    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',  icon: <Clock size={12} /> },
  APPROVED:    { label: 'Approved',    color: 'bg-blue-50 text-blue-700 border-blue-200',        icon: <CheckCircle2 size={12} /> },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: <ArrowUpCircle size={12} /> },
  COMPLETED:   { label: 'Completed',   color: 'bg-green-50 text-green-700 border-green-200',    icon: <CheckCircle size={12} /> },
  REJECTED:    { label: 'Rejected',    color: 'bg-red-50 text-red-700 border-red-200',          icon: <XCircle size={12} /> },
};

const impactColor = {
  HIGH:   'text-red-600 bg-red-50',
  MEDIUM: 'text-orange-600 bg-orange-50',
  LOW:    'text-green-600 bg-green-50',
};

const categoryIcon = {
  RAMP: '🚗', SIGNAGE: '🔤', WASHROOM: '🚻', DIGITAL: '💻', LIGHTING: '💡', OTHER: '🔧',
};

const Community = () => {
  const { user } = useAuth();
  const [feedbackSessions, setFeedbackSessions] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pledged, setPledged] = useState(false);
  const [showPilotModal, setShowPilotModal] = useState(false);
  const [updatingPilot, setUpdatingPilot] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [feedbackRes, campaignRes, pilotRes] = await Promise.all([
        api.get('/feedback-sessions'),
        api.get('/awareness-campaigns'),
        pilotService.getAll(),
      ]);
      setFeedbackSessions(feedbackRes.data.data || []);
      setCampaigns(campaignRes.data.data || []);
      setPilots(pilotRes);
    } catch (error) {
      toast.error('Failed to load community data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handlePledge = () => {
    setPledged(true);
    toast.success('Thank you for pledging to be an Accessibility Ally! 🎉');
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingPilot(id);
    try {
      await pilotService.updateStatus(id, newStatus, null);
      toast.success(`Status updated to ${newStatus}`);
      fetchData();
    } catch {
      toast.error('Failed to update status.');
    } finally {
      setUpdatingPilot(null);
    }
  };

  const handleUpvote = async (id) => {
    if (!user) {
      toast.info('Please log in to upvote.');
      return;
    }
    
    // Optimistic UI update
    setPilots(prev => prev.map(p => {
      if (p.id === id) {
        const isUpvoting = !p.hasUpvoted;
        return {
          ...p,
          hasUpvoted: isUpvoting,
          upvotes: isUpvoting ? p.upvotes + 1 : p.upvotes - 1
        };
      }
      return p;
    }));

    try {
      await pilotService.toggleUpvote(id);
    } catch (error) {
      toast.error('Failed to register upvote');
      // Revert on error
      fetchData();
    }
  };

  const isAdmin = user?.role === 'ADMIN';
  const isStudent = user?.role === 'STUDENT';

  const pilotStats = {
    total: pilots.length,
    approved: pilots.filter(p => p.status === 'APPROVED').length,
    completed: pilots.filter(p => p.status === 'COMPLETED').length,
    inProgress: pilots.filter(p => p.status === 'IN_PROGRESS').length,
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
            <HeartHandshake className="text-primary" /> Community & Resources
          </h2>
          <p className="text-textLight mt-1">Join the movement for an inclusive campus environment.</p>
        </div>
        {isStudent && (
          <button
            onClick={() => setShowPilotModal(true)}
            className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={18} /> Propose Pilot
          </button>
        )}
      </div>

      {showPilotModal && (
        <ProposePilotModal onClose={() => setShowPilotModal(false)} onSuccess={fetchData} />
      )}

      {/* Pilot Improvements Section */}
      <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-textMain flex items-center gap-2">
            <Lightbulb className="text-yellow-500" /> Pilot Accessibility Improvements
          </h3>
          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-primary-50 text-primary rounded-full font-medium">{pilotStats.total} Total</span>
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">{pilotStats.completed} Done</span>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium hidden sm:inline">{pilotStats.inProgress} Active</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-100 p-4 space-y-2">
                <div className="h-4 w-3/4 skeleton" /><div className="h-3 w-full skeleton" /><div className="h-3 w-1/2 skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pilots.map(pilot => {
              const sc = statusConfig[pilot.status] || statusConfig.PROPOSED;
              return (
                <div key={pilot.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all bg-white relative group">
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <div className="flex gap-3 w-full">
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <button 
                          onClick={() => handleUpvote(pilot.id)}
                          className={`flex flex-col items-center p-1.5 rounded-lg transition-all ${
                            pilot.hasUpvoted 
                              ? 'text-primary bg-primary-50 scale-110' 
                              : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                          }`}
                          title="Upvote this proposal"
                        >
                          <ThumbsUp size={18} className={pilot.hasUpvoted ? 'fill-primary' : ''} />
                          <span className={`text-[10px] font-bold ${pilot.hasUpvoted ? 'text-primary' : 'text-gray-500'}`}>
                            {pilot.upvotes || 0}
                          </span>
                        </button>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-textMain leading-tight">{categoryIcon[pilot.category] || '📌'} {pilot.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2" title={pilot.description}>{pilot.description}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${sc.color} flex-shrink-0`}>
                      {sc.icon}
                      <span className="text-[10px] font-bold tracking-wide uppercase">{sc.label}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      {pilot.location && (
                        <span className="flex items-center gap-1"><MapPin size={11} />{pilot.location}</span>
                      )}
                      {pilot.estimatedCost != null && (
                        <span className="flex items-center gap-1"><DollarSign size={11} />₹{pilot.estimatedCost?.toLocaleString()}</span>
                      )}
                    </div>
                    {pilot.impactLevel && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${impactColor[pilot.impactLevel] || 'bg-gray-100 text-gray-600'}`}>
                        {pilot.impactLevel} Impact
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-400 border-t border-gray-100 pt-2 flex items-center justify-between">
                    <span>Proposed by <strong className="text-gray-600">{pilot.proposerName}</strong></span>
                    {pilot.adminNotes && (
                      <span className="text-blue-500 cursor-pointer hover:underline" title={pilot.adminNotes}>Admin note ℹ️</span>
                    )}
                  </div>

                  {/* Admin Status Controls */}
                  {isAdmin && pilot.status === 'PROPOSED' && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleStatusUpdate(pilot.id, 'APPROVED')}
                        disabled={updatingPilot === pilot.id}
                        className="flex-1 text-xs bg-green-50 hover:bg-green-100 text-green-700 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(pilot.id, 'REJECTED')}
                        disabled={updatingPilot === pilot.id}
                        className="flex-1 text-xs bg-red-50 hover:bg-red-100 text-red-700 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  )}
                  {isAdmin && pilot.status === 'APPROVED' && (
                    <button
                      onClick={() => handleStatusUpdate(pilot.id, 'IN_PROGRESS')}
                      disabled={updatingPilot === pilot.id}
                      className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 py-1.5 rounded-lg font-medium transition-colors"
                    >
                      Mark In Progress
                    </button>
                  )}
                  {isAdmin && pilot.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => handleStatusUpdate(pilot.id, 'COMPLETED')}
                      disabled={updatingPilot === pilot.id}
                      className="text-xs bg-green-50 hover:bg-green-100 text-green-700 py-1.5 rounded-lg font-medium transition-colors"
                    >
                      ✓ Mark Completed
                    </button>
                  )}
                </div>
              );
            })}
            {pilots.length === 0 && (
              <div className="col-span-2 text-center py-10 text-gray-400">
                <Lightbulb size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="font-medium">No pilot proposals yet.</p>
                {isStudent && <p className="text-sm mt-1">Be the first to propose an improvement!</p>}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Awareness Campaigns */}
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
              <Users className="text-secondary" /> Awareness Campaigns
            </h3>
            {loading ? (
              <div className="text-textLight">Loading campaigns...</div>
            ) : (
              <div className="space-y-4">
                {campaigns.map(camp => (
                  <div key={camp.id} className="p-4 border border-gray-100 rounded-lg flex justify-between items-center bg-white/50 hover:shadow-sm transition-shadow">
                    <div>
                      <h4 className="font-medium text-textMain">{camp.campaignName}</h4>
                      <p className="text-sm text-textLight flex items-center gap-1 mt-1">
                        <Calendar size={14} /> {new Date(camp.campaignDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{camp.description}</p>
                    </div>
                    <div className="text-right flex flex-col items-end ml-4 flex-shrink-0">
                      <span className="text-xs text-textLight">Reach</span>
                      <span className="font-bold text-primary text-2xl">{camp.reachCount}</span>
                      <span className="text-xs text-textLight">students</span>
                    </div>
                  </div>
                ))}
                {campaigns.length === 0 && <p className="text-textLight text-sm">No campaigns found.</p>}
              </div>
            )}
          </div>

          {/* Feedback Sessions */}
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
              <MessageSquare className="text-success" /> Participatory Feedback Sessions
            </h3>
            {loading ? (
              <div className="text-textLight">Loading sessions...</div>
            ) : (
              <div className="space-y-4">
                {feedbackSessions.map(session => (
                  <div key={session.id} className="p-4 border border-gray-100 rounded-lg bg-white/50 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-textMain">{session.title}</h4>
                      <span className="bg-success-50 text-success-dark text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2">
                        {session.participantsCount} Participants
                      </span>
                    </div>
                    <p className="text-sm text-textLight flex items-center gap-1 mb-2">
                      <Calendar size={14} /> {new Date(session.sessionDate).toLocaleDateString()}
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 italic border-l-4 border-success/30">
                      "{session.feedbackSummary}"
                    </div>
                  </div>
                ))}
                {feedbackSessions.length === 0 && <p className="text-textLight text-sm">No feedback sessions found.</p>}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Disability Ally Pledge */}
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="text-lg font-semibold text-textMain mb-2 flex items-center gap-2">
              <HeartHandshake className="text-primary" /> Disability Ally Network
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Take the pledge to support an inclusive environment and proactively advocate for accessibility at Chandigarh University.
            </p>
            {pledged ? (
              <div className="bg-success/10 text-success-dark p-3 rounded-lg flex items-center gap-2 text-sm font-medium">
                <CheckCircle size={16} /> You are an Ally! 🎉
              </div>
            ) : (
              <button
                onClick={handlePledge}
                className="w-full bg-primary hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Sign the Pledge
              </button>
            )}
          </div>

          {/* Impact Summary */}
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-primary" /> Pilot Impact
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Total Proposals', value: pilotStats.total, color: 'bg-primary' },
                { label: 'Approved', value: pilotStats.approved, color: 'bg-blue-500' },
                { label: 'In Progress', value: pilotStats.inProgress, color: 'bg-purple-500' },
                { label: 'Completed', value: pilotStats.completed, color: 'bg-green-500' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stat.color}`}
                        style={{ width: `${pilotStats.total > 0 ? (stat.value / pilotStats.total) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="font-bold text-textMain w-4 text-right text-sm">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
              <Map className="text-secondary" /> Resources
            </h3>
            <div
              className="p-4 border border-gray-100 rounded-lg bg-white/50 hover:border-primary/30 transition-colors group cursor-pointer"
              onClick={() => toast.info('Tactile Campus Map download initiated...')}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-textMain text-sm">Tactile Campus Map</h4>
                  <p className="text-xs text-textLight mt-1">High-contrast, screen-reader friendly PDF map of CU.</p>
                </div>
                <Download size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
            <div
              className="p-4 border border-gray-100 rounded-lg bg-white/50 hover:border-primary/30 transition-colors group cursor-pointer mt-3"
              onClick={() => toast.info('WCAG 2.1 Checklist download initiated...')}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-textMain text-sm">WCAG 2.1 AA Checklist</h4>
                  <p className="text-xs text-textLight mt-1">Digital accessibility audit checklist for websites & LMS.</p>
                </div>
                <Download size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
