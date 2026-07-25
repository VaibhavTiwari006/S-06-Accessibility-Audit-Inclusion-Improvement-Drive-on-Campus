import React, { useState, useEffect } from 'react';
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
    light: 'bg-rose-50 text-rose-600 border-rose-200',
    ring: 'ring-rose-400',
    soft: '#fff1f2',
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
    light: 'bg-violet-50 text-violet-600 border-violet-200',
    ring: 'ring-violet-400',
    soft: '#f5f3ff',
    accent: '#7c3aed',
    desc: 'Physical audits, WCAG scanner & wheelchair routing.'
  },
  {
    role: 'STUDENT',
    title: 'Student / Staff',
    email: 'student@campus.edu',
    password: 'student123',
    icon: Users,
    badge: 'Report & Quiz',
    gradient: 'from-emerald-500 to-teal-600',
    light: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    ring: 'ring-emerald-400',
    soft: '#ecfdf5',
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
    light: 'bg-amber-50 text-amber-600 border-amber-200',
    ring: 'ring-amber-400',
    soft: '#fffbeb',
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
    <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #fafafa 50%, #f5f3ff 100%)' }}>

      {/* Navbar */}
      <header className="px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-bold font-heading shadow-sm group-hover:scale-105 transition-transform">
            CU
          </div>
          <span className="text-xl font-heading font-extrabold text-gray-900 tracking-tight">
            CU <span className="text-rose-600">Access</span> Audit
          </span>
        </Link>
        <Link to="/" className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all">
          <ArrowLeft size={13} /> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl">

          {/* Page heading */}
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200 uppercase tracking-wider mb-2">
              <Zap size={12} /> Role-Based Access Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-900">
              Select Your Campus Role
            </h1>
            <p className="text-gray-400 text-sm font-medium max-w-md mx-auto">
              Choose your role below to sign in with sample credentials and explore the AccessAudit platform.
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                      ? `0 8px 30px -4px ${r.accent}30, 0 0 0 3px ${r.accent}20`
                      : '0 1px 4px rgba(0,0,0,0.05)',
                    transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${r.gradient}`} />

                  <div className="p-5 space-y-4">
                    {/* Icon */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 text-white bg-gradient-to-br ${r.gradient} shadow-md`}
                        style={{ transform: isSelected ? 'scale(1.1) rotate(3deg)' : 'scale(1)' }}
                      >
                        <Icon size={22} strokeWidth={1.8} />
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: r.accent }}>
                          <CheckCircle2 size={14} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Role name + Title */}
                    <div>
                      <span
                        className="text-[9px] font-extrabold uppercase tracking-widest block mb-1"
                        style={{ color: isSelected ? r.accent : '#9ca3af' }}
                      >
                        {r.role}
                      </span>
                      <h4 className="font-bold text-sm font-heading text-gray-800 leading-tight group-hover:text-gray-900">
                        {r.title}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-gray-400 leading-relaxed hidden md:block">{r.desc}</p>

                    {/* Badge */}
                    <span
                      className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                      style={{
                        background: isSelected ? r.soft : '#f9fafb',
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
            <div className="mb-4 animate-bounce-once">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}

          {/* CTA + Footer */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl font-extrabold text-base text-white flex items-center justify-center gap-3 bg-gradient-to-r ${currentRole.gradient} shadow-lg hover:shadow-xl hover:brightness-105 active:scale-[0.98] transition-all duration-300 disabled:opacity-70`}
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

            <p className="text-center text-xs text-gray-400 font-medium pt-1">
              Authorized Personnel &bull; Chandigarh University S-06 Inclusion Drive
            </p>
          </form>

        </div>
      </main>
    </div>
  );
};

export default Login;
