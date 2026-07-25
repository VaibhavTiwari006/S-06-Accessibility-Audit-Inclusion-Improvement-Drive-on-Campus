import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck, UserCheck, Users, Wrench,
  ArrowRight, CheckCircle2, ArrowLeft, Zap,
  Building2, BarChart3, Map, Award
} from 'lucide-react';
import Alert from '../components/ui/Alert';

const ROLE_OPTIONS = [
  {
    role: 'ADMIN',
    title: 'Administrator',
    email: 'admin@campus.edu',
    password: 'admin123',
    icon: ShieldCheck,
    badge: 'Full Access',
    gradient: 'from-rose-500 to-red-600',
    soft: '#fff1f2',
    accent: '#e11d48',
    features: ['Department Analytics', 'System Settings', 'User Management', 'Audit Reports'],
    desc: 'Full administrative control over the campus accessibility platform.'
  },
  {
    role: 'AUDITOR',
    title: 'Campus Auditor',
    email: 'auditor@campus.edu',
    password: 'auditor123',
    icon: UserCheck,
    badge: 'Audit & Scan',
    gradient: 'from-violet-500 to-purple-600',
    soft: '#f5f3ff',
    accent: '#7c3aed',
    features: ['Physical Building Audits', 'WCAG AI Scanner', 'Photo Evidence Upload', 'Wheelchair Routing'],
    desc: 'Conduct comprehensive accessibility audits across all campus buildings.'
  },
  {
    role: 'STUDENT',
    title: 'Student / Staff',
    email: 'student@campus.edu',
    password: 'student123',
    icon: Users,
    badge: 'Report & Learn',
    gradient: 'from-emerald-500 to-teal-600',
    soft: '#ecfdf5',
    accent: '#059669',
    features: ['Barrier Reporting', 'QR Code Scan', 'Awareness Quiz', 'Campus Map'],
    desc: 'Report barriers, take quizzes and explore the accessible campus map.'
  },
  {
    role: 'MAINTENANCE',
    title: 'Maintenance Engineer',
    email: 'maintenance@campus.edu',
    password: 'maintenance123',
    icon: Wrench,
    badge: '5-Stage Repair',
    gradient: 'from-amber-500 to-orange-500',
    soft: '#fffbeb',
    accent: '#d97706',
    features: ['Kanban Repair Board', 'Task Assignment', 'Progress Tracking', 'Barrier Verification'],
    desc: 'Manage the full repair lifecycle from report to completion.'
  }
];

const STATS = [
  { icon: Building2, value: '45+', label: 'Buildings Audited', color: '#e11d48' },
  { icon: BarChart3, value: '92%', label: 'RPWD Compliance', color: '#7c3aed' },
  { icon: Map, value: '1,200+', label: 'Barriers Resolved', color: '#059669' },
  { icon: Award, value: '150+', label: 'Active Auditors', color: '#d97706' },
];

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'ADMIN';

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const currentRole = ROLE_OPTIONS.find(r => r.role === selectedRole) || ROLE_OPTIONS[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await login(currentRole.email, currentRole.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid credentials.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-hidden" style={{ background: 'linear-gradient(145deg, #fff5f5 0%, #fafafa 60%, #f5f3ff 100%)' }}>

      {/* Decorative blobs */}
      <div className="fixed top-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #fecdd3 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #ede9fe 0%, transparent 70%)' }} />

      {/* Navbar */}
      <header className="relative z-10 px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-100 bg-white/70 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold font-heading shadow-sm group-hover:scale-105 transition-transform">
            CU
          </div>
          <span className="text-xl font-heading font-extrabold text-gray-900 tracking-tight">
            CU <span className="text-rose-600">Access</span> Audit
          </span>
        </Link>
        <Link to="/" className="text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all">
          <ArrowLeft size={13} /> Back to Home
        </Link>
      </header>

      {/* Main Split Layout */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-5">

        {/* ─── LEFT PANEL ─── */}
        <div className="hidden lg:flex lg:col-span-2 flex-col justify-between p-10 xl:p-14" style={{ background: 'linear-gradient(160deg, #1a0a0f 0%, #2d0a1e 50%, #1e0a2e 100%)' }}>
          
          {/* Brand block */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{ background: 'rgba(225,29,72,0.15)', color: '#fb7185', borderColor: 'rgba(225,29,72,0.3)' }}>
              <Zap size={11} /> Authenticated Portal Gate
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl xl:text-4xl font-heading font-extrabold text-white leading-tight">
                Secure Access to Campus Accessibility Hub
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                AccessAudit uses role-based authentication to protect campus data. Select your role and enter to begin your session.
              </p>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="p-4 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.color + '25' }}>
                        <Icon size={14} style={{ color: s.color }} />
                      </div>
                    </div>
                    <p className="text-xl font-extrabold text-white font-heading">{s.value}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected role preview */}
          <div className="space-y-4">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Currently Selected</p>
            <div className="p-5 rounded-2xl border flex items-start gap-4" style={{ background: currentRole.accent + '18', borderColor: currentRole.accent + '40' }}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${currentRole.gradient} text-white shadow-lg`}>
                <currentRole.icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest" style={{ color: currentRole.accent }}>{currentRole.badge}</span>
                <h3 className="font-bold text-white font-heading text-base mt-0.5">{currentRole.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{currentRole.desc}</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-600 font-medium text-center">
              Chandigarh University · S-06 Inclusion Drive · RPWD 2016
            </p>
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div className="lg:col-span-3 flex flex-col justify-center p-6 md:p-10 xl:p-14 overflow-y-auto">

          {/* Heading */}
          <div className="mb-8 space-y-1">
            <h2 className="text-2xl font-heading font-extrabold text-gray-900">Choose Your Role</h2>
            <p className="text-sm text-gray-400 font-medium">Click a role card below, then proceed to your dashboard.</p>
          </div>

          {/* Role Cards — 2-col grid, tall cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {ROLE_OPTIONS.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => { setSelectedRole(r.role); setError(''); }}
                  className="group relative text-left rounded-3xl border-2 transition-all duration-300 overflow-hidden focus:outline-none"
                  style={{
                    borderColor: isSelected ? r.accent : '#e5e7eb',
                    background: isSelected ? r.soft : '#ffffff',
                    boxShadow: isSelected
                      ? `0 12px 40px -8px ${r.accent}40`
                      : '0 1px 6px rgba(0,0,0,0.05)',
                    transform: isSelected ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Gradient top bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${r.gradient}`} />

                  <div className="p-6 space-y-5">
                    {/* Icon + check */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${r.gradient} text-white shadow-md transition-all duration-300`}
                        style={{ transform: isSelected ? 'scale(1.12) rotate(4deg)' : 'scale(1) rotate(0deg)' }}
                      >
                        <Icon size={24} strokeWidth={1.8} />
                      </div>
                      {isSelected ? (
                        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: r.accent }}>
                          <CheckCircle2 size={15} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full border-2 border-gray-200" />
                      )}
                    </div>

                    {/* Role + title */}
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest block mb-1" style={{ color: isSelected ? r.accent : '#9ca3af' }}>
                        {r.role}
                      </span>
                      <h4 className="font-bold text-base font-heading text-gray-900 leading-tight">{r.title}</h4>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-1.5">
                      {r.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: isSelected ? r.accent : '#d1d5db' }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Badge */}
                    <span
                      className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{
                        background: isSelected ? r.accent + '18' : '#f9fafb',
                        color: isSelected ? r.accent : '#6b7280',
                        borderColor: isSelected ? r.accent + '40' : '#e5e7eb'
                      }}
                    >
                      {r.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}

          {/* CTA */}
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl font-extrabold text-base text-white flex items-center justify-center gap-3 bg-gradient-to-r ${currentRole.gradient} shadow-lg hover:brightness-105 hover:shadow-xl active:scale-[0.98] transition-all duration-300 disabled:opacity-70`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                  Signing in...
                </span>
              ) : (
                <>
                  <ArrowRight size={18} />
                  Proceed as {currentRole.title}
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 font-medium mt-4">
            Authorized Personnel &bull; Chandigarh University S-06 Inclusion Drive
          </p>

        </div>
      </main>
    </div>
  );
};

export default Login;
