import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auditService from '../services/auditService';
import { ClipboardList, Play, FileText, Calendar, User, Clock, Trash2, ShieldCheck } from 'lucide-react';
import { accessibleToast as toast } from '../utils/accessibleToast';
import StartAuditModal from '../components/StartAuditModal';
import AuditSchedulerModal from '../components/AuditSchedulerModal';
import TextToSpeech from '../components/TextToSpeech';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/ui/Badge';

/**
 * AuditList Page Component
 * 
 * Manages active campus facility accessibility audits:
 * - Displays active audit files, details, and completions progress.
 * - Restricts audit creation permission logic to ADMIN and AUDITOR roles.
 * - Links to details reports or interactive audit conduct pages.
 */
const AuditList = () => {
  const { user } = useAuth();
  const [audits, setAudits] = useState([]);
  const [scheduledAudits, setScheduledAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const navigate = useNavigate();

  const canCreateAudit = user?.role === 'ADMIN' || user?.role === 'AUDITOR';

  const fetchScheduledAudits = () => {
    try {
      const data = JSON.parse(localStorage.getItem('scheduled-annual-audits') || '[]');
      setScheduledAudits(data);
    } catch {
      setScheduledAudits([]);
    }
  };

  const deleteSchedule = (id) => {
    try {
      const existing = JSON.parse(localStorage.getItem('scheduled-annual-audits') || '[]');
      const filtered = existing.filter(item => item.id !== id);
      localStorage.setItem('scheduled-annual-audits', JSON.stringify(filtered));
      setScheduledAudits(filtered);
      toast.success('Scheduled audit cancelled.');
    } catch {
      toast.error('Failed to cancel scheduled audit.');
    }
  };

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

  useEffect(() => { 
    fetchAudits(); 
    fetchScheduledAudits();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'APPROVED': return 'success';
      case 'IN_PROGRESS': return 'primary';
      case 'PENDING': return 'warning';
      case 'REJECTED': return 'danger';
      default: return 'secondary';
    }
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
      {canCreateAudit && showModal && <StartAuditModal onClose={() => setShowModal(false)} onSuccess={fetchAudits} />}
      {canCreateAudit && showScheduler && <AuditSchedulerModal onClose={() => setShowScheduler(false)} onSuccess={fetchScheduledAudits} />}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-textMain flex items-center gap-2">
            <ClipboardList className="text-primary" /> Accessibility Audits
          </h2>
          <p className="text-textLight mt-1 font-medium">All campus building audits and compliance scores.</p>
        </div>
        {canCreateAudit && (
          <div className="flex items-center gap-2.5">
            <Button onClick={() => setShowScheduler(true)} variant="outline" icon={Clock} className="border-gray-250 hover:bg-gray-50 text-gray-700">
              Schedule Audit
            </Button>
            <Button onClick={() => setShowModal(true)} icon={Play}>
              Start New Audit
            </Button>
          </div>
        )}
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
          <Card key={audit.id} className="relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-1 ${topBarColor(audit.status)}`}></div>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-heading font-bold text-textMain group-hover:text-primary transition-colors">{audit.buildingName}</h3>
                  <p className="text-sm text-textLight flex items-center gap-1.5 mt-1 font-medium">
                    <User size={14} className="text-gray-400" /> {audit.auditorName}
                  </p>
                  <p className="text-sm text-textLight flex items-center gap-1.5 mt-0.5 font-medium">
                    <Calendar size={14} className="text-gray-400" /> {audit.auditDate}
                  </p>
                </div>
                <Badge variant={getStatusVariant(audit.status)}>
                  {audit.status?.replace(/_/g, ' ')}
                </Badge>
              </div>

              <div className="mt-2 flex justify-between items-center">
                <div>
                  <span className="text-xs text-textLight font-semibold uppercase tracking-wider">Compliance Score</span>
                  <p className={`text-2xl font-bold ${audit.overallAccessibilityScore >= 80 ? 'text-success-dark' : audit.overallAccessibilityScore >= 50 ? 'text-warning-dark' : 'text-danger-dark'}`}>
                    {audit.overallAccessibilityScore ? `${audit.overallAccessibilityScore.toFixed(1)}%` : '—'}
                  </p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => audit.status === 'APPROVED' ? navigate('/reports') : navigate(`/audits/${audit.id}/conduct`)}
                  icon={FileText}
                >
                  {audit.status === 'APPROVED' ? 'View Report' : 'Continue'}
                </Button>
              </div>

              {audit.remarks && (
                <div className="flex items-start justify-between gap-2 border-t border-gray-100 pt-4 mt-2">
                  <p className="text-sm text-textLight italic font-medium bg-gray-50 p-3 rounded-lg border border-gray-100 w-full">"{audit.remarks}"</p>
                  <div className="flex-shrink-0 mt-1">
                    <TextToSpeech text={`Audit remarks for ${audit.buildingName}: ${audit.remarks}`} ariaLabel={`Read remarks for ${audit.buildingName}`} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {audits.length === 0 && !loading && (
          <div className="col-span-2 text-center py-16">
            <ClipboardList size={36} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 font-medium">No audits found.</p>
            <p className="text-gray-300 text-sm mt-1">Click "Start New Audit" to begin.</p>
          </div>
        )}
      </div>

      {/* Scheduled recurring audits dashboard section */}
      {scheduledAudits.length > 0 && (
        <div className="pt-6 border-t border-gray-150 space-y-4">
          <div>
            <h3 className="text-lg font-heading font-bold text-textMain flex items-center gap-2">
              <Clock className="text-danger" size={20} /> Upcoming Scheduled Audits
            </h3>
            <p className="text-xs text-textLight mt-0.5 font-medium">Upcoming annual and bi-annual compliance audit tasks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledAudits.map((item) => (
              <Card key={item.id} className="relative border border-gray-100 hover:border-gray-200 transition-all bg-white/60">
                <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-textMain text-sm truncate">{item.buildingName}</h4>
                      <Badge variant="warning" className="text-[9px] uppercase font-bold px-1.5 py-0.5">{item.frequency}</Badge>
                    </div>
                    <p className="text-[11px] text-textLight font-semibold mt-1 flex items-center gap-1">
                      <Calendar size={12} className="text-gray-400" /> Start Date: {item.startDate}
                    </p>
                    <p className="text-[11px] text-textLight font-semibold mt-0.5 flex items-center gap-1">
                      <User size={12} className="text-gray-400" /> Assigned: {item.auditorName?.split(' ')[0]}
                    </p>
                    <p className="text-[11px] text-textLight font-semibold mt-0.5 flex items-center gap-1">
                      <ShieldCheck size={12} className="text-gray-400" /> Target: {item.complianceTarget}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-50/40">
                    <span className="text-[9px] text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded font-extrabold uppercase">Pending Start</span>
                    {canCreateAudit && (
                      <button
                        type="button"
                        onClick={() => deleteSchedule(item.id)}
                        className="text-gray-400 hover:text-danger p-1 rounded transition-colors"
                        title="Cancel Scheduled Audit"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditList;
