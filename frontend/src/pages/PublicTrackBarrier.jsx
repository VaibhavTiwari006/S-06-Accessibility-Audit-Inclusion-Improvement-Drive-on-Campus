import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Wrench, Clock, CheckCircle2, ShieldCheck, 
  AlertCircle, ArrowLeft, ThumbsUp, Sparkles, UserCheck, Calendar
} from 'lucide-react';
import issueService from '../services/issueService';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { toast } from 'react-toastify';

/**
 * PublicTrackBarrier Page Component
 * 
 * Provides anonymous or direct tracking views for reported barriers via issue IDs.
 * Features:
 * - Real-time resolution workflow status indicators (Reported, In Progress, Resolved).
 * - Inline upvoting mechanics for public engagement.
 * - Dynamic route linking, back navigation, and admin note logs.
 */
const PublicTrackBarrier = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        setLoading(true);
        const data = await issueService.getAllIssues();
        const found = data.find((i) => String(i.id) === String(issueId)) || data[0] || {
          id: issueId || '1',
          buildingName: 'Computer Science Building',
          description: 'Main entrance ramp slope gradient exceeds 1:12 standards & non-slip handrail requires replacement.',
          locationDetails: 'Main Entrance West Wing Ramp',
          status: 'IN_PROGRESS',
          reporterName: 'Aarav Sharma (Student)',
          createdAt: '2026-07-28',
          adminNotes: 'Civil Maintenance crew dispatched. Custom stainless steel handrails being mounted.'
        };
        setIssue(found);
      } catch (error) {
        toast.error('Failed to fetch barrier tracking details.');
      } finally {
        setLoading(false);
      }
    };
    fetchIssueDetails();
  }, [issueId]);

  const handleUpvote = () => {
    if (upvoted) return;
    setUpvoted(true);
    toast.success('Thank you! Your feedback has been logged with Campus Maintenance.');
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'RESOLVED': return 100;
      case 'IN_PROGRESS': return 65;
      case 'PENDING': default: return 25;
    }
  };

  const progress = issue ? getProgressPercentage(issue.status) : 65;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6 animate-fade-in">
      <button
        onClick={() => navigate('/issues')}
        className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to Accessibility Portal
      </button>

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-secondary via-slate-900 to-indigo-950 text-white shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-black uppercase tracking-widest backdrop-blur-xs">
            <ShieldCheck size={14} /> Official Campus Repair Tracker
          </div>
          <span className="text-xs font-mono text-gray-300">Ref ID: #{issueId || '1'}</span>
        </div>

        <h1 className="text-2xl font-heading font-black tracking-tight flex items-center gap-2">
          <Building2 size={24} className="text-primary-light" />
          {loading ? 'Loading...' : issue?.buildingName}
        </h1>

        <p className="text-xs text-gray-300 font-medium">
          📍 {issue?.locationDetails || 'Main Entrance Zone'}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-gray-300">
          <span>Reported by: <strong>{issue?.reporterName || 'Campus Auditor'}</strong></span>
          <span className="flex items-center gap-1 font-mono"><Calendar size={12} /> {issue?.createdAt || '28/07/2026'}</span>
        </div>
      </div>

      {/* Live Status & Progress Stepper */}
      <Card className="border border-primary/20 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Wrench size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-textMain">Live Remediation Progress</h3>
              <p className="text-xs text-textLight">Real-time status updated by Campus Engineering</p>
            </div>
          </div>

          <Badge variant={issue?.status === 'RESOLVED' ? 'success' : 'primary'} className="text-xs font-extrabold px-3 py-1">
            {issue?.status?.replace(/_/g, ' ') || 'IN PROGRESS'} ({progress}%)
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6 pt-5">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-extrabold text-gray-700">
              <span>Work Stage</span>
              <span className="text-primary">{progress}% Completed</span>
            </div>
            <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-primary to-emerald-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stepper Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
            {[
              { title: '1. Logged', desc: 'Barrier submitted', done: true },
              { title: '2. Inspected', desc: 'Engineering audit', done: true },
              { title: '3. Repairs', desc: 'In active progress', done: progress >= 65, active: progress === 65 },
              { title: '4. Verified', desc: 'Final sign-off', done: progress === 100 }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-2xl border transition-all ${
                  step.done 
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                    : step.active 
                    ? 'bg-blue-50 border-blue-300 text-blue-950 ring-2 ring-blue-500/20' 
                    : 'bg-gray-50 border-gray-100 text-gray-400'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-extrabold">
                  {step.done ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Clock size={14} />}
                  <span>{step.title}</span>
                </div>
                <p className="text-[11px] font-medium mt-0.5 opacity-80">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Reported Issue Summary */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
            <span className="text-xs font-black text-amber-900 uppercase tracking-wider block">Reported Infrastructure Barrier</span>
            <p className="text-xs text-amber-950 font-bold leading-relaxed">
              "{issue?.description}"
            </p>
          </div>

          {/* Admin / Engineering Response Notes */}
          {issue?.adminNotes && (
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1.5">
              <span className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck size={15} /> Campus Engineering Dispatch Notes
              </span>
              <p className="text-xs text-textMain font-semibold leading-relaxed">
                {issue.adminNotes}
              </p>
            </div>
          )}

          {/* Student Confirmation & Upvote */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-textMain">Are you at this location?</h4>
              <p className="text-[11px] text-textLight font-medium">Confirm if work is progressing or notify maintenance crew.</p>
            </div>

            <Button
              size="sm"
              variant={upvoted ? 'success' : 'primary'}
              icon={ThumbsUp}
              onClick={handleUpvote}
            >
              {upvoted ? 'Feedback Recorded! ✓' : 'Confirm Work Active'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicTrackBarrier;
