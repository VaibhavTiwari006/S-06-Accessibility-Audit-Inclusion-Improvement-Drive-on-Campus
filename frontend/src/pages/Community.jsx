import React, { useEffect, useState } from 'react';
import { HeartHandshake, Users, Map, Download, CheckCircle, Calendar, MessageSquare } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-toastify';

const Community = () => {
  const [feedbackSessions, setFeedbackSessions] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pledged, setPledged] = useState(false);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const [feedbackRes, campaignRes] = await Promise.all([
          api.get('/feedback-sessions'),
          api.get('/awareness-campaigns')
        ]);
        setFeedbackSessions(feedbackRes.data.data || []);
        setCampaigns(campaignRes.data.data || []);
      } catch (error) {
        toast.error('Failed to load community data');
      } finally {
        setLoading(false);
      }
    };
    fetchCommunityData();
  }, []);

  const handlePledge = () => {
    setPledged(true);
    toast.success('Thank you for pledging to be an Accessibility Ally!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
          <HeartHandshake className="text-primary" /> Community & Resources
        </h2>
        <p className="text-textLight mt-1">Join the movement for an inclusive campus environment.</p>
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
                  <div key={camp.id} className="p-4 border border-gray-100 rounded-lg flex justify-between items-center bg-white/50">
                    <div>
                      <h4 className="font-medium text-textMain">{camp.campaignName}</h4>
                      <p className="text-sm text-textLight flex items-center gap-1 mt-1">
                        <Calendar size={14} /> {new Date(camp.campaignDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{camp.description}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs text-textLight">Reach</span>
                      <span className="font-bold text-primary text-xl">{camp.reachCount}</span>
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
                  <div key={session.id} className="p-4 border border-gray-100 rounded-lg bg-white/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-textMain">{session.title}</h4>
                      <span className="bg-success-50 text-success-dark text-xs px-2 py-1 rounded-full font-medium">
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

        {/* Sidebar Area */}
        <div className="space-y-6">
          
          {/* Disability Ally Network Pledge */}
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="text-lg font-semibold text-textMain mb-2 flex items-center gap-2">
              <HeartHandshake className="text-primary" /> Disability Ally Network
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Take the pledge to support an inclusive environment and proactively advocate for accessibility at Chandigarh University.
            </p>
            {pledged ? (
              <div className="bg-success/10 text-success-dark p-3 rounded-lg flex items-center gap-2 text-sm font-medium">
                <CheckCircle size={16} /> You are an Ally!
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

          {/* Downloadable Resources (Tactile Map) */}
          <div className="glass-panel p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-textMain mb-4 flex items-center gap-2">
              <Map className="text-secondary" /> Resources
            </h3>
            
            <div className="p-4 border border-gray-100 rounded-lg bg-white/50 hover:border-primary/30 transition-colors group cursor-pointer" onClick={() => toast.info('Map download initiated...')}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-textMain text-sm">Tactile Campus Map</h4>
                  <p className="text-xs text-textLight mt-1">High-contrast, screen-reader friendly PDF map of CU.</p>
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
