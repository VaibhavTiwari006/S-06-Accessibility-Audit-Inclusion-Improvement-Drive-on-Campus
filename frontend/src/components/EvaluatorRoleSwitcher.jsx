import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, UserCheck, Users, Wrench, Zap, Check, X, ArrowRight, Loader2 
} from 'lucide-react';

const EVALUATOR_ROLES = [
  {
    role: 'ADMIN',
    title: 'Administrator',
    email: 'admin@campus.edu',
    password: 'admin123',
    icon: ShieldCheck,
    badge: 'Full Executive Access',
    color: 'from-rose-500 to-red-600',
    borderColor: 'border-red-200 dark:border-red-900/50',
    activeBg: 'bg-red-50/80 dark:bg-red-950/30',
    desc: 'Department compliance radar, building registry CRUD, audit approval, and system settings.',
    permissions: ['Department Analytics', 'Building CRUD', 'Audit Approval', 'User Management']
  },
  {
    role: 'AUDITOR',
    title: 'Lead Auditor (Vaibhav Tiwari)',
    email: 'auditor@campus.edu',
    password: 'auditor123',
    icon: UserCheck,
    badge: 'Field Audit Suite',
    color: 'from-violet-500 to-purple-600',
    borderColor: 'border-purple-200 dark:border-purple-900/50',
    activeBg: 'bg-purple-50/80 dark:bg-purple-950/30',
    desc: '42-parameter in-situ audit conductor, evidence gallery review, and statutory compliance scoring.',
    permissions: ['Conduct Audits', 'Checklist Scoring', 'Evidence Inspection', 'Wheelchair Maps']
  },
  {
    role: 'STUDENT',
    title: 'Student / Staff',
    email: 'student@campus.edu',
    password: 'student123',
    icon: Users,
    badge: 'Participatory Inclusion',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-200 dark:border-emerald-900/50',
    activeBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
    desc: 'Crowdsourced barrier reporting, community proposal voting, and barrier-free campus navigation.',
    permissions: ['Report Barriers', 'Community Voting', 'Campus Navigation', 'Awareness Quizzes']
  },
  {
    role: 'MAINTENANCE',
    title: 'Maintenance Engineer',
    email: 'maintenance@campus.edu',
    password: 'maintenance123',
    icon: Wrench,
    badge: '5-Stage Remediation',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200 dark:border-amber-900/50',
    activeBg: 'bg-amber-50/80 dark:bg-amber-950/30',
    desc: 'Kanban repair lifecycle: Reported → Assigned → In Progress → Fixed → Verified.',
    permissions: ['Kanban Board', 'Status Transitions', 'Remediation Costs', 'Repair Logs']
  }
];

export default function EvaluatorRoleSwitcher({ isOpen, onClose }) {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [switchingRole, setSwitchingRole] = useState(null);

  if (!isOpen) return null;

  const handleRoleSelect = async (roleObj) => {
    if (user?.email === roleObj.email) {
      toast.info(`Already logged in as ${roleObj.title}.`);
      onClose();
      return;
    }

    setSwitchingRole(roleObj.role);
    try {
      const res = await login(roleObj.email, roleObj.password);
      if (res.success) {
        toast.success(`⚡ Switched to ${roleObj.title} (Evaluator Mode)`);
        onClose();
        navigate('/dashboard');
      } else {
        toast.error(res.message || 'Failed to switch role.');
      }
    } catch (err) {
      toast.error('Error switching role. Please try again.');
    } finally {
      setSwitchingRole(null);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-6 overflow-hidden z-10"
        >
          {/* Top Banner */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                <Zap size={20} className="fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    CUSoC Evaluator Role Switcher
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    1-Click Switch
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Seamlessly inspect AccessAudit across all 4 RBAC role perspectives without manual logout.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Role Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
            {EVALUATOR_ROLES.map((r) => {
              const Icon = r.icon;
              const isCurrent = user?.role?.toUpperCase() === r.role;
              const isSwitching = switchingRole === r.role;

              return (
                <div
                  key={r.role}
                  onClick={() => !isSwitching && handleRoleSelect(r)}
                  className={`group relative p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isCurrent 
                      ? `${r.activeBg} ${r.borderColor} ring-2 ring-primary/20 shadow-md`
                      : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {/* Active Indicator Badge */}
                  {isCurrent && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                      <Check size={10} strokeWidth={3} /> Active
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                        {r.title}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">
                        {r.email}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                    {r.desc}
                  </p>

                  {/* Capabilities Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {r.permissions.slice(0, 2).map((perm, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800">
                        {perm}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-[11px] font-semibold text-primary group-hover:underline flex items-center gap-1">
                      {isSwitching ? (
                        <>
                          <Loader2 size={12} className="animate-spin" /> Switching session...
                        </>
                      ) : isCurrent ? (
                        'Current Active Role'
                      ) : (
                        <>Switch to this role <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Authentication: High-Security HMAC-SHA256 JWT</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">CUSoC '26 Evaluation Suite</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
