import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogIn, Eye, EyeOff, ShieldCheck, UserCheck, Users, Wrench, 
  ArrowRight, CheckCircle2, Lock, Sparkles, Map, BarChart3, ChevronLeft, ArrowLeft 
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';

const ROLE_OPTIONS = [
  {
    role: 'ADMIN',
    title: 'Administrator',
    email: 'admin@campus.edu',
    password: 'admin123',
    icon: ShieldCheck,
    badge: 'Full Access',
    color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
    activeColor: 'bg-gradient-to-br from-rose-500 to-red-600 text-white border-transparent shadow-lg shadow-red-500/30 ring-2 ring-red-500/50 ring-offset-2',
    gradient: 'from-rose-500 to-red-600',
    desc: 'System settings, cross-department analytics, user role assignment, and audit report generation.'
  },
  {
    role: 'AUDITOR',
    title: 'Campus Auditor',
    email: 'auditor@campus.edu',
    password: 'auditor123',
    icon: UserCheck,
    badge: 'Audit & Scan',
    color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    activeColor: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/50 ring-offset-2',
    gradient: 'from-blue-500 to-indigo-600',
    desc: 'Physical building audits, WCAG AI code scanner, photo evidence upload, and wheelchair routing.'
  },
  {
    role: 'STUDENT',
    title: 'Student / Staff',
    email: 'student@campus.edu',
    password: 'student123',
    icon: Users,
    badge: 'Report & Quiz',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    activeColor: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-transparent shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-500/50 ring-offset-2',
    gradient: 'from-emerald-500 to-teal-600',
    desc: 'Barrier reporting, 1-tap mobile QR posters, disability awareness videos, and community forum.'
  },
  {
    role: 'MAINTENANCE',
    title: 'Maintenance Engineer',
    email: 'maintenance@campus.edu',
    password: 'maintenance123',
    icon: Wrench,
    badge: '5-Stage Repair',
    color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    activeColor: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-transparent shadow-lg shadow-amber-500/30 ring-2 ring-amber-500/50 ring-offset-2',
    gradient: 'from-amber-500 to-orange-500',
    desc: 'Manage 5-stage repair Kanban board (Reported → Assigned → In Progress → Fixed → Verified).'
  }
];

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialEmail = queryParams.get('email') || 'admin@campus.edu';
  const initialRole = queryParams.get('role') || 'ADMIN';

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const currentRoleObj = ROLE_OPTIONS.find(r => r.role === selectedRole) || ROLE_OPTIONS[0];

  useEffect(() => {
    const roleObj = ROLE_OPTIONS.find(r => r.role === selectedRole);
    if (roleObj) {
      setEmail(roleObj.email);
      setPassword(roleObj.password);
    }
  }, [selectedRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid credentials. Please check your email & password.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Imagery */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25 mix-blend-overlay"
        style={{ backgroundImage: "url('/campus_bg.jpg')" }}
      />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-10 border-b border-white/10 px-6 md:px-12 py-4 flex items-center justify-between backdrop-blur-md bg-slate-900/60">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold font-heading shadow-md group-hover:scale-105 transition-transform">
            CU
          </div>
          <div>
            <span className="text-xl font-heading font-extrabold text-white tracking-tight">
              CU <span className="text-primary">Access</span> Audit
            </span>
          </div>
        </Link>
        <Link to="/" className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-all">
          <ArrowLeft size={14} /> Back to Feature Showcase
        </Link>
      </header>

      {/* Full Page View Grid */}
      <main className="relative z-10 flex-1 w-full px-6 md:px-12 lg:px-16 py-10 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Platform Feature & Role Capabilities Banner */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-800/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-red-300 font-bold text-xs border border-primary/30 uppercase tracking-wider">
                <ShieldCheck size={14} /> Authenticated Portal Gate
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
                  Verification Required to Visit Dashboard
                </h1>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed font-medium">
                  AccessAudit protects campus accessibility data and repair workflows with role-based security. Choose your role on the right to sign in.
                </p>
              </div>

              {/* Active Role Feature Summary */}
              <div className="p-6 bg-slate-900/90 rounded-3xl border border-white/10 space-y-4 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-md">
                    <currentRoleObj.icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-primary tracking-widest">{currentRoleObj.badge}</span>
                    <h3 className="text-xl font-bold text-white font-heading">{currentRoleObj.title} Role</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {currentRoleObj.desc}
                </p>
              </div>
            </div>


          </div>

          {/* Right Column: Role Selector & Auth */}
          <div className="lg:col-span-7 bg-slate-800/70 backdrop-blur-2xl text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col justify-between space-y-8">

            {/* Step label */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/30 border border-primary/50 text-primary text-xs font-extrabold flex items-center justify-center">1</div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-300">Select Your Campus Role</span>
              </div>

              {/* Role Cards — 2 column grid, rich premium look */}
              <div className="grid grid-cols-2 gap-4">
                {ROLE_OPTIONS.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.role;
                  return (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSelectedRole(r.role)}
                      className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                        isSelected
                          ? `border-transparent ring-2 ring-offset-2 ring-offset-slate-800 shadow-2xl`
                          : 'border-white/10 bg-slate-700/50 hover:bg-slate-700 hover:border-white/20 hover:shadow-xl'
                      }`}
                      style={isSelected ? { borderColor: 'transparent' } : {}}
                    >
                      {/* Gradient background when selected */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${r.gradient} transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'}`} />

                      {/* Top accent strip */}
                      {!isSelected && <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${r.gradient} opacity-60`} />}

                      <div className="relative p-5 space-y-4">
                        {/* Icon row */}
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                            isSelected
                              ? 'bg-white/20 text-white scale-110'
                              : 'bg-slate-600/80 text-slate-200 group-hover:scale-105'
                          }`}>
                            <Icon size={22} strokeWidth={1.8} />
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                              <CheckCircle2 size={14} className="text-white" />
                            </div>
                          )}
                        </div>

                        {/* Role label + title */}
                        <div>
                          <span className={`text-[9px] font-extrabold uppercase tracking-widest block mb-1 ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>
                            {r.role}
                          </span>
                          <h4 className={`font-bold text-sm font-heading leading-tight ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                            {r.title}
                          </h4>
                        </div>

                        {/* Badge */}
                        <span className={`inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isSelected ? 'bg-white/20 text-white border-white/30' : 'bg-slate-600/60 text-slate-300 border-white/10'
                        }`}>
                          {r.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="animate-scale-in">
                <Alert variant="danger">{error}</Alert>
              </div>
            )}

            {/* CTA Button */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-extrabold text-base text-white flex items-center justify-center gap-3 bg-gradient-to-r ${currentRoleObj.gradient} shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" /> Signing in...</span>
                ) : (
                  <>
                    <ArrowRight size={18} />
                    Proceed to Dashboard as {currentRoleObj.title}
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <p className="text-xs text-slate-500 font-medium">
                  Authorized Personnel &bull; Chandigarh University S-06 Inclusion Drive
                </p>
              </div>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
