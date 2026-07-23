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
    activeColor: 'bg-primary text-white border-primary shadow-lg',
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
    activeColor: 'bg-blue-600 text-white border-blue-600 shadow-lg',
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
    activeColor: 'bg-emerald-600 text-white border-emerald-600 shadow-lg',
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
    activeColor: 'bg-amber-600 text-white border-amber-600 shadow-lg',
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

            {/* Quick Demo Logins Note */}
            <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-300 font-medium flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                Demo mode active! Selecting any role card automatically populates valid credentials so you can explore full features immediately.
              </span>
            </div>
          </div>

          {/* Right Column: Full Page Width Role Selector & Credential Form */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-200 flex flex-col justify-between space-y-8">
            
            {/* Role Cards Full Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                1. Select Your Campus Role:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROLE_OPTIONS.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.role;
                  return (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSelectedRole(r.role)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                        isSelected 
                          ? r.activeColor
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon size={20} />
                        {isSelected && <CheckCircle2 size={16} />}
                      </div>
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest opacity-80 block">{r.role}</span>
                        <h4 className="font-bold text-xs font-heading truncate">{r.title}</h4>
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

            {/* Credential Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                  2. Verify Credentials for {currentRoleObj.title}:
                </label>
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-600 font-semibold flex items-center justify-between">
                  <span>Pre-filled Account: <strong>{email}</strong></span>
                  <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border">Password: {password}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@campus.edu"
                />

                <div className="space-y-1.5 relative">
                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                  icon={ArrowRight}
                  className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-lg text-base py-4"
                >
                  Verify Credentials & Enter Dashboard
                </Button>
              </div>
            </form>

            <div className="text-center border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-500 font-medium">
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
