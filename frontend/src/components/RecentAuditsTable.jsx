import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './ui/Card';
import { ClipboardList, ChevronRight, Clock, ArrowUpRight, Filter, ShieldAlert, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { useAuth } from '../context/AuthContext';
import auditService from '../services/auditService';
import { motion, AnimatePresence } from 'framer-motion';

const RecentAuditsTable = () => {
  const { user } = useAuth();
  const [audits, setAudits] = useState([]);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'EXCELLENT' | 'NEEDS_REVIEW'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const canViewAudits = user?.role === 'ADMIN' || user?.role === 'AUDITOR';

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const res = await auditService.getAllAudits();
        if (Array.isArray(res)) {
          // Sort by date descending and take top 6
          setAudits(res.sort((a, b) => new Date(b.auditDate) - new Date(a.auditDate)).slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to fetch recent audits', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAudits();
  }, []);

  const filteredAudits = audits.filter(audit => {
    const score = audit.overallAccessibilityScore ?? 0;
    if (filter === 'EXCELLENT') return score >= 70;
    if (filter === 'NEEDS_REVIEW') return score < 70;
    return true;
  });

  const getAvatarColor = (name = '') => {
    const colors = ['bg-rose-500', 'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-blue-500'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-100 rounded-2xl h-72 w-full"></div>;
  }

  return (
    <Card className="h-full shadow-sm border border-gray-100">
      <CardHeader className="pb-3 flex-wrap gap-3 items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <ClipboardList size={22} />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
              Recent Audits
            </h3>
            <p className="text-xs text-textLight font-medium">Inspected building scores and compliance records</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl border border-gray-200/50 text-xs font-bold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'ALL' ? 'bg-white text-gray-900 shadow-2xs font-extrabold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All ({audits.length})
            </button>
            <button
              onClick={() => setFilter('EXCELLENT')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'EXCELLENT' ? 'bg-emerald-500 text-white shadow-2xs font-extrabold' : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              Good (70%+)
            </button>
            <button
              onClick={() => setFilter('NEEDS_REVIEW')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'NEEDS_REVIEW' ? 'bg-rose-500 text-white shadow-2xs font-extrabold' : 'text-gray-500 hover:text-rose-600'
              }`}
            >
              Review (&lt;70%)
            </button>
          </div>

          {canViewAudits && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/audits')} 
              className="text-primary hover:text-primary-dark font-bold text-xs gap-1"
            >
              View All <ChevronRight size={14} />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-2.5">
        {filteredAudits.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p className="text-sm font-semibold">No audits match this filter.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout">
              {filteredAudits.map((audit, idx) => {
                const score = audit.overallAccessibilityScore ?? 0;
                const auditorName = audit.auditorName || 'Auditor';
                const initial = auditorName.charAt(0).toUpperCase();
                const avatarBg = getAvatarColor(auditorName);

                return (
                  <motion.div
                    key={audit.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    onClick={() => {
                      if (canViewAudits) {
                        if (audit.status === 'APPROVED') {
                          navigate('/reports');
                        } else {
                          navigate(`/audits/${audit.id}/conduct`);
                        }
                      }
                    }}
                    className={`group relative p-3.5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      canViewAudits ? 'cursor-pointer hover:bg-gray-50/90 hover:border-gray-200 hover:shadow-xs' : ''
                    } bg-white border-gray-100`}
                  >
                    {/* Left Accent Bar on Hover */}
                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* Building Info */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl ${avatarBg} text-white font-extrabold text-xs flex items-center justify-center shadow-2xs flex-shrink-0`}>
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-textMain text-sm truncate group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {audit.buildingName || 'Unknown Building'}
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-primary" />
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-textLight mt-0.5">
                          <span className="font-semibold text-gray-700">{auditorName}</span>
                          <span className="text-gray-300">•</span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock size={12} />
                            {new Date(audit.auditDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Score & Mini Progress Bar */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                      {/* Mini Visual Score Bar */}
                      <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden hidden md:block">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>

                      <div className="text-right flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                          score >= 80 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                          score >= 50 ? 'text-amber-700 bg-amber-50 border-amber-200' :
                          'text-rose-700 bg-rose-50 border-rose-200'
                        }`}>
                          {score.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAuditsTable;
