import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auditService from '../services/auditService';
import { ClipboardList, Play, FileText, Calendar, User } from 'lucide-react';
import { accessibleToast as toast } from '../utils/accessibleToast';
import StartAuditModal from '../components/StartAuditModal';
import TextToSpeech from '../components/TextToSpeech';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const AuditList = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
      {showModal && <StartAuditModal onClose={() => setShowModal(false)} onSuccess={fetchAudits} />}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-textMain flex items-center gap-2">
            <ClipboardList className="text-primary" /> Accessibility Audits
          </h2>
          <p className="text-textLight mt-1 font-medium">All campus building audits and compliance scores.</p>
        </div>
        <Button onClick={() => setShowModal(true)} icon={Play}>
          Start New Audit
        </Button>
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
                  onClick={() => audit.status === 'APPROVED' ? navigate('/reports') : toast.info('Audit continuation feature coming soon.')}
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
    </div>
  );
};

export default AuditList;
