import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck, UserCheck, Users, Wrench,
  ArrowRight, CheckCircle2, ArrowLeft, Zap,
  Mail, Lock, Eye, EyeOff, User, Sparkles, Check,
  LogIn, UserPlus, KeyRound
} from 'lucide-react';
import Alert from '../components/ui/Alert';
import api from '../services/api';

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
    desc: 'Physical audits, evidence gallery & wheelchair routing.'
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
    desc: 'Barrier reporting, feedback forum & awareness quizzes.'
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
  const initialRole = queryParams.get('role') || null;
  const initialMode = queryParams.get('mode') === 'register' ? 'register' : 'login';

  const [authMode, setAuthMode] = useState(initialMode); // 'login' | 'register' | 'demo'
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingStatus, setSubmittingStatus] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Login form state (works for both custom registered accounts AND demo accounts)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Registration form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Live password validation
  const hasMinLength = regPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(regPassword);
  const hasLower = /[a-z]/.test(regPassword);
  const hasDigit = /[0-9]/.test(regPassword);
  const passwordsMatch = regPassword.length > 0 && regPassword === regConfirmPassword;
  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasDigit;

  useEffect(() => {
    // Warm up backend service on Render to eliminate cold-start delay
    api.get('/health').catch(() => {});
  }, []);

  const handleQuickFillRole = (opt) => {
    setSelectedRole(opt.role);
    setEmail(opt.email);
    setPassword(opt.password);
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setSubmittingStatus('Verifying credentials...');

    const timer = setTimeout(() => {
      setSubmittingStatus('Connecting to cloud server... (waking up instance)');
    }, 2500);

    const result = await login(email.trim(), password);
    clearTimeout(timer);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid email or password. Please check your credentials and try again.');
      setIsSubmitting(false);
      setSubmittingStatus('');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!regFullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!isPasswordValid) {
      setError('Password must meet complexity requirements (8+ chars, uppercase, lowercase, number).');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match. Please verify your passwords.');
      return;
    }

    setIsSubmitting(true);
    setSubmittingStatus('Creating your account in cloud database...');

    const timer = setTimeout(() => {
      setSubmittingStatus('Connecting to cloud server... (waking up instance)');
    }, 2500);

    const result = await register(regFullName.trim(), regEmail.trim(), regPassword);
    clearTimeout(timer);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Registration failed. This email may already be registered.');
      setIsSubmitting(false);
      setSubmittingStatus('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-slate-900">

      {/* ── Background with subtle zoom animation ── */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1)    translateX(0)     translateY(0); }
          50%  { transform: scale(1.06) translateX(-1%)   translateY(-1%); }
          100% { transform: scale(1)    translateX(0)     translateY(0); }
        }
        .campus-bg {
          animation: kenburns 22s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/campus_bg.jpg"
          alt="Chandigarh University Campus"
          className="campus-bg w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90" />
      </div>

      {/* ── Navbar ── */}
      <header className="relative z-10 px-6 md:px-12 py-4 flex items-center justify-between border-b border-white/10 bg-slate-950/40 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white font-black font-heading shadow-md group-hover:scale-105 transition-transform">
            CU
          </div>
          <span className="text-xl font-heading font-extrabold text-white tracking-tight drop-shadow">
            Access<span className="text-rose-400">Audit</span>
          </span>
        </Link>
        <Link to="/" className="text-xs font-bold text-white flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl transition-all shadow-sm">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </header>

      {/* ── Main Content Container ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">

          {/* Frosted glass card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="rounded-3xl overflow-hidden shadow-2xl bg-white/95 backdrop-blur-2xl border border-white/60"
          >
            {/* Top color indicator strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-rose-500 to-amber-500" />

            <div className="p-6 sm:p-10 space-y-6">

              {/* Segmented Auth Mode Switcher */}
              <div className="flex justify-center">
                <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setError(''); }}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      authMode === 'login'
                        ? 'bg-white text-slate-900 shadow-md scale-100'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LogIn size={15} className={authMode === 'login' ? 'text-primary' : 'text-slate-400'} />
                    <span>Sign In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setError(''); }}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      authMode === 'register'
                        ? 'bg-white text-rose-600 shadow-md scale-100'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <UserPlus size={15} className={authMode === 'register' ? 'text-rose-600' : 'text-slate-400'} />
                    <span>Create Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setAuthMode('demo'); setError(''); }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      authMode === 'demo'
                        ? 'bg-white text-violet-700 shadow-md scale-100'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Zap size={15} className={authMode === 'demo' ? 'text-violet-600' : 'text-slate-400'} />
                    <span className="hidden sm:inline">Role Cards</span>
                    <span className="sm:hidden">Roles</span>
                  </button>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  MODE 1: DIRECT SIGN IN (FOR REGISTERED & DEMO USERS)
                 ───────────────────────────────────────────────────────────── */}
              {authMode === 'login' && (
                <motion.div
                  key="login-mode"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 max-w-lg mx-auto"
                >
                  <div className="text-center space-y-1.5">
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
                      Sign In to AccessAudit
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Enter your personal account credentials or click a demo role below
                    </p>
                  </div>

                  {error && <Alert variant="danger">{error}</Alert>}

                  {/* 1-Click Demo Quick Fill Toolbar */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
                        <KeyRound size={13} className="text-primary" /> Instant Demo Quick-Fill:
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">1-Click Auto-Fill</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {ROLE_OPTIONS.map((opt) => (
                        <button
                          key={opt.role}
                          type="button"
                          onClick={() => handleQuickFillRole(opt)}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                            selectedRole === opt.role && email === opt.email
                              ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                          title={`Click to fill ${opt.title} (${opt.email})`}
                        >
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span>{opt.role}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sign In Form */}
                  <form onSubmit={handleLoginSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
                    {/* Email Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setSelectedRole(null); }}
                          required
                          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium transition-shadow text-sm"
                          placeholder="name@campus.edu or your registered email"
                          aria-label="Email address"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700 block">Password</label>
                        {selectedRole && (
                          <span className="text-[11px] text-slate-500">
                            Demo pass: <code className="font-mono font-bold text-rose-600 bg-rose-50 px-1 rounded">{ROLE_OPTIONS.find(r => r.role === selectedRole)?.password}</code>
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock size={18} />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium transition-shadow text-sm"
                          placeholder="Enter your password"
                          aria-label="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-rose-600 shadow-md hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                          {submittingStatus || 'Signing in...'}
                        </span>
                      ) : (
                        <>
                          <LogIn size={18} />
                          Sign In to Dashboard
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-center space-y-2 pt-1">
                    <p className="text-xs text-slate-600 font-medium">
                      Don't have an account yet?{' '}
                      <button
                        type="button"
                        onClick={() => { setAuthMode('register'); setError(''); }}
                        className="text-primary hover:text-rose-700 font-bold hover:underline cursor-pointer"
                      >
                        Create Personal Account &rarr;
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  MODE 2: CREATE PERSONAL ACCOUNT (SELF-REGISTRATION)
                 ───────────────────────────────────────────────────────────── */}
              {authMode === 'register' && (
                <motion.div
                  key="register-mode"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 max-w-lg mx-auto"
                >
                  <div className="text-center space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-bold text-[11px] border border-rose-200 uppercase tracking-wider">
                      <Sparkles size={12} /> Student & Staff Self-Registration
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
                      Create Your Campus Account
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Your data is securely stored in our cloud PostgreSQL database. Once created, you can sign in anytime with your email and password.
                    </p>
                  </div>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <form onSubmit={handleRegisterSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium transition-shadow text-sm"
                          placeholder="e.g. Vaibhav Sharma"
                          aria-label="Full Name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium transition-shadow text-sm"
                          placeholder="e.g. vaibhav@campus.edu or personal email"
                          aria-label="Email Address"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock size={18} />
                        </div>
                        <input
                          type={showRegPassword ? "text" : "password"}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                          className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium transition-shadow text-sm"
                          placeholder="Create a strong password"
                          aria-label="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                          {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Password Complexity Checklist */}
                    {regPassword.length > 0 && (
                      <div className="grid grid-cols-2 gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px]">
                        <span className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                          <Check size={12} className={hasMinLength ? 'text-emerald-600' : 'text-slate-300'} /> 8+ Characters
                        </span>
                        <span className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                          <Check size={12} className={hasUpper ? 'text-emerald-600' : 'text-slate-300'} /> Uppercase letter
                        </span>
                        <span className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                          <Check size={12} className={hasLower ? 'text-emerald-600' : 'text-slate-300'} /> Lowercase letter
                        </span>
                        <span className={`flex items-center gap-1.5 ${hasDigit ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                          <Check size={12} className={hasDigit ? 'text-emerald-600' : 'text-slate-300'} /> Number (0-9)
                        </span>
                      </div>
                    )}

                    {/* Confirm Password */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Confirm Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock size={18} />
                        </div>
                        <input
                          type={showRegConfirmPassword ? "text" : "password"}
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                          className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium transition-shadow text-sm"
                          placeholder="Re-type your password"
                          aria-label="Confirm Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                          {showRegConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Submit Registration Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-rose-600 shadow-md hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                          {submittingStatus || 'Creating Account...'}
                        </span>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Create Account & Sign In
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        if (regEmail) setEmail(regEmail);
                        setError('');
                      }}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer hover:underline"
                    >
                      &larr; Already have an account? Sign In directly
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  MODE 3: VISUAL DEMO ROLE CARDS
                 ───────────────────────────────────────────────────────────── */}
              {authMode === 'demo' && (
                <motion.div
                  key="demo-mode"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 font-bold text-[11px] border border-violet-200 uppercase tracking-wider">
                      <Zap size={12} /> CUSoC Evaluator Role Showcase
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
                      Explore All 4 Platform Roles
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
                      Click any role card below to load that role into the Sign In form with 1-click convenience
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ROLE_OPTIONS.map((r, index) => {
                      const Icon = r.icon;
                      return (
                        <motion.button
                          key={r.role}
                          type="button"
                          onClick={() => {
                            handleQuickFillRole(r);
                            setAuthMode('login');
                          }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative text-left rounded-2xl border border-slate-200/90 hover:border-primary/50 transition-all duration-200 overflow-hidden focus:outline-none bg-white shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
                        >
                          <div className={`h-1.5 w-full bg-gradient-to-r ${r.gradient}`} />

                          <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${r.gradient} text-white shadow-sm`}>
                                <Icon size={22} />
                              </div>
                              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                {r.badge}
                              </span>
                            </div>

                            <div className="space-y-1.5">
                              <h4 className="font-extrabold text-base font-heading text-slate-900">{r.title}</h4>
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">{r.desc}</p>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-primary font-bold">
                              <span>Load & Sign In</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Data Storage Notice Footer */}
              <div className="text-center pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-600 font-medium">
                  🔒 Data securely stored in cloud PostgreSQL on <strong>Neon Serverless</strong> &bull; Authenticated via BCrypt & stateless JWT
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

    </div>
  );
};

export default Login;
