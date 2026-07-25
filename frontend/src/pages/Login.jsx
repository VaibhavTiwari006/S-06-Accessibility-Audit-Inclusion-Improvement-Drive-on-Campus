import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck, UserCheck, Users, Wrench,
  ArrowRight, CheckCircle2, ArrowLeft, Zap
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
    soft: 'rgba(255,241,242,0.95)',
    accent: '#e11d48',
    desc: 'System settings, department analytics & user management.'
  },
  {
    role: 'AUDITOR',
    title: 'Campus Auditor',
    email: 'auditor@campus.edu',
    password: 'auditor123',
    icon: UserCheck,
    badge: 'Audit & Scan',
    gradient: 'from-violet-500 to-purple-600',
    soft: 'rgba(245,243,255,0.95)',
    accent: '#7c3aed',
    desc: 'Physical audits, WCAG scanner & wheelchair routing.'
  },
  {
    role: 'STUDENT',
    title: 'Student / Staff',
    email: 'student@campus.edu',
    password: 'student123',
    icon: Users,
    badge: 'Report & Learn',
    gradient: 'from-emerald-500 to-teal-600',
    soft: 'rgba(236,253,245,0.95)',
    accent: '#059669',
    desc: 'Barrier reporting, QR posters & awareness quizzes.'
  },
  {
    role: 'MAINTENANCE',
    title: 'Maintenance Engineer',
    email: 'maintenance@campus.edu',
    password: 'maintenance123',
    icon: Wrench,
    badge: '5-Stage Repair',
    gradient: 'from-amber-500 to-orange-500',
    soft: 'rgba(255,251,235,0.95)',
    accent: '#d97706',
    desc: 'Kanban repair board from report to verification.'
  }
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
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden">

      {/* ── Campus Background with Ken Burns zoom animation ── */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1)    translateX(0)     translateY(0); }
          50%  { transform: scale(1.08) translateX(-1%)   translateY(-1%); }
          100% { transform: scale(1)    translateX(0)     translateY(0); }
        }
        .campus-bg {
          animation: kenburns 20s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/campus_bg.jpg"
          alt="Chandigarh University Campus"
          className="campus-bg w-full h-full object-cover object-center"
        />
        {/* Multi-layer overlay for depth and readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)' }} />
        {/* Subtle color tint matching CU brand red */}
        <div className="absolute inset-0" style={{ background: 'rgba(120,0,20,0.15)' }} />
      </div>

      {/* ── Navbar ── */}
      <header className="relative z-10 px-6 md:px-12 py-4 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold font-heading shadow-md group-hover:scale-105 transition-transform">
            CU
          </div>
          <span className="text-xl font-heading font-extrabold text-white tracking-tight drop-shadow">
            CU <span className="text-rose-400">Access</span> Audit
          </span>
        </Link>
        <Link to="/" className="text-xs font-bold text-white flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 border border-transparent px-4 py-2 rounded-xl transition-all shadow-md">
          <ArrowLeft size={13} /> Back to Home
        </Link>
      </header>

      {/* ── Main Content ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl">

          {/* Frosted glass container */}
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.6)' }}>

            {/* Top banner strip */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${currentRole.gradient} transition-all duration-500`} />

            <div className="p-8 md:p-10 space-y-8">

              {/* Header */}
              <div className="text-center space-y-2 pb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200 uppercase tracking-wider">
                  <Zap size={11} /> Role-Based Access Portal · Chandigarh University
                </div>
                <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900">
                  Select Your Campus Role
                </h1>
              </div>

              {/* Role Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {ROLE_OPTIONS.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.role;
                  return (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => { setSelectedRole(r.role); setError(''); }}
                      className="group relative text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden focus:outline-none"
                      style={{
                        borderColor: isSelected ? r.accent : '#e5e7eb',
                        background: isSelected ? r.soft : 'rgba(249,250,251,0.8)',
                        boxShadow: isSelected ? `0 8px 30px -6px ${r.accent}50` : '0 1px 4px rgba(0,0,0,0.05)',
                        transform: isSelected ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                      }}
                    >
                      {/* Gradient top strip */}
                      <div className={`h-1.5 w-full bg-gradient-to-r ${r.gradient}`} />

                      <div className="p-8 space-y-6 flex flex-col justify-between h-full min-h-[160px]">
                        {/* Icon + check */}
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${r.gradient} text-white shadow-md transition-all duration-300`}
                            style={{ transform: isSelected ? 'scale(1.1) rotate(3deg)' : 'scale(1)' }}
                          >
                            <Icon size={24} strokeWidth={1.8} />
                          </div>
                          {isSelected ? (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: r.accent }}>
                              <CheckCircle2 size={14} className="text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                          )}
                        </div>

                        {/* Title & Badge */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-base font-heading text-gray-900 leading-tight">{r.title}</h4>
                          <span
                            className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full border"
                            style={{
                              background: isSelected ? r.accent + '18' : '#f3f4f6',
                              color: isSelected ? r.accent : '#6b7280',
                              borderColor: isSelected ? r.accent + '40' : '#e5e7eb'
                            }}
                          >
                            {r.badge}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Error */}
              {error && <Alert variant="danger">{error}</Alert>}

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
                      Proceed to Dashboard as {currentRole.title}
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 font-medium -mt-4">
                Authorized Personnel &bull; Chandigarh University S-06 Inclusion Drive
              </p>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default Login;
