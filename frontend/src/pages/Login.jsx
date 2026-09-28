import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck, UserCheck, Users, Wrench,
  ArrowRight, CheckCircle2, ArrowLeft, Zap,
  Mail, Lock, Eye, EyeOff, User, Sparkles, Check
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

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingStatus, setSubmittingStatus] = useState('');

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const currentRole = ROLE_OPTIONS.find(r => r.role === selectedRole) || null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Registration state
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
    // Proactively warm up backend service on Render to eliminate cold-start delay
    api.get('/health').catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedRole) {
      const opt = ROLE_OPTIONS.find(r => r.role === selectedRole);
      if (opt) {
        setEmail(opt.email);
        setPassword(''); // Password must NOT be prefilled - user inputs manually
      }
    } else {
      setEmail('');
      setPassword('');
    }
  }, [selectedRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setSubmittingStatus('Verifying credentials...');

    // If server cold start is taking time, update status message
    const timer = setTimeout(() => {
      setSubmittingStatus('Connecting to cloud server... (waking up instance)');
    }, 2500);

    const result = await login(email, password);
    clearTimeout(timer);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Wrong login credentials, please try again.');
      setIsSubmitting(false);
      setSubmittingStatus('');
    }
  };

  const handleRegister = async (e) => {
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
      setError('Password must meet all complexity requirements (8+ characters, uppercase, lowercase, number).');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match. Please verify your passwords.');
      return;
    }

    setIsSubmitting(true);
    setSubmittingStatus('Creating your account...');

    const timer = setTimeout(() => {
      setSubmittingStatus('Connecting to cloud server... (waking up instance)');
    }, 2500);

    const result = await register(regFullName.trim(), regEmail.trim(), regPassword);
    clearTimeout(timer);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Registration failed. Email may already be registered.');
      setIsSubmitting(false);
      setSubmittingStatus('');
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.05 }}
            className="rounded-3xl overflow-hidden shadow-2xl" 
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.6)' }}
          >

            {/* Top banner strip */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${currentRole ? currentRole.gradient : 'from-gray-300 to-gray-400'} transition-all duration-500`} />

            <div className="p-8 md:p-10 space-y-8">

              {/* Auth Mode Segmented Control */}
              <div className="flex justify-center -mb-2">
                <div className="inline-flex p-1.5 rounded-2xl bg-gray-100/90 border border-gray-200/80 shadow-inner">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setError(''); }}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                      authMode === 'login'
                        ? 'bg-white text-gray-900 shadow-md scale-100'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Demo Role Profiles
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setSelectedRole(null); setError(''); }}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      authMode === 'register'
                        ? 'bg-white text-rose-600 shadow-md scale-100'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Sparkles size={14} className={authMode === 'register' ? 'text-rose-600' : 'text-gray-400'} />
                    <span>Create Personal Account</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-100 text-rose-600">New</span>
                  </button>
                </div>
              </div>

              {authMode === 'register' ? (
                /* ── Create Personal Account Form ── */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 max-w-lg mx-auto"
                >
                  <div className="text-center space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-bold text-[11px] border border-rose-200 uppercase tracking-wider">
                      <Sparkles size={12} /> Student & Staff Self-Registration
                    </div>
                    <h2 className="text-2xl font-heading font-extrabold text-gray-900">
                      Create Your Campus Account
                    </h2>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
                      Register with your email to report physical barriers across 29 campus buildings, monitor repair roadmaps, and propose accessibility improvements.
                    </p>
                  </div>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <form onSubmit={handleRegister} className="space-y-4 bg-white/70 p-6 rounded-2xl border border-gray-100 shadow-sm">
                    {/* Full Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 font-medium transition-shadow shadow-sm"
                        placeholder="Full Name (e.g. Ananya Sharma)"
                        aria-label="Full Name"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 font-medium transition-shadow shadow-sm"
                        placeholder="Email Address (e.g. ananya@campus.edu)"
                        aria-label="Email Address"
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showRegPassword ? "text" : "password"}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 font-medium transition-shadow shadow-sm"
                        placeholder="Password (min 8 chars, uppercase, number)"
                        aria-label="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                        aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                      >
                        {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showRegConfirmPassword ? "text" : "password"}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 font-medium transition-shadow shadow-sm"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                        aria-label={showRegConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showRegConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password Strength Checklist */}
                    <div className="p-3.5 bg-gray-50/90 rounded-xl border border-gray-100 text-xs space-y-2">
                      <p className="font-bold text-gray-600 text-[11px] uppercase tracking-wider">
                        Security Requirements
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <span className={`flex items-center gap-1.5 font-medium ${hasMinLength ? 'text-emerald-600' : 'text-gray-400'}`}>
                          <CheckCircle2 size={13} className={hasMinLength ? 'text-emerald-600' : 'text-gray-300'} /> 8+ Characters
                        </span>
                        <span className={`flex items-center gap-1.5 font-medium ${hasUpper ? 'text-emerald-600' : 'text-gray-400'}`}>
                          <CheckCircle2 size={13} className={hasUpper ? 'text-emerald-600' : 'text-gray-300'} /> Uppercase Letter
                        </span>
                        <span className={`flex items-center gap-1.5 font-medium ${hasLower ? 'text-emerald-600' : 'text-gray-400'}`}>
                          <CheckCircle2 size={13} className={hasLower ? 'text-emerald-600' : 'text-gray-300'} /> Lowercase Letter
                        </span>
                        <span className={`flex items-center gap-1.5 font-medium ${hasDigit ? 'text-emerald-600' : 'text-gray-400'}`}>
                          <CheckCircle2 size={13} className={hasDigit ? 'text-emerald-600' : 'text-gray-300'} /> Number (0-9)
                        </span>
                      </div>
                      {regConfirmPassword && (
                        <p className={`text-[11px] pt-1 font-medium border-t border-gray-200/60 ${passwordsMatch ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !isPasswordValid || !passwordsMatch}
                      className="w-full py-4 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-500 to-red-600 shadow-md hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
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
                      onClick={() => { setAuthMode('login'); setError(''); }}
                      className="text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer hover:underline"
                    >
                      &larr; Already have an account or evaluating? Use Demo Profiles
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── Demo Roles & Sign In View ── */
                <>
                  {/* Header */}
                  <div className="text-center space-y-2 pb-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200 uppercase tracking-wider">
                      <Zap size={11} /> Role-Based Access Portal · Chandigarh University
                    </div>
                    <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900">
                      Select Your Campus Role
                    </h1>
                  </div>

                  {!currentRole ? (
                    <>
                      {/* Role Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {ROLE_OPTIONS.map((r, index) => {
                          const Icon = r.icon;
                          const isSelected = selectedRole === r.role;
                          return (
                            <motion.button
                              initial={{ opacity: 0, y: 30, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ 
                                type: 'spring', 
                                stiffness: 140, 
                                damping: 14, 
                                delay: 0.15 + index * 0.08 
                              }}
                              whileHover={{ 
                                y: -6, 
                                scale: 1.02,
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                              }}
                              whileTap={{ scale: 0.98 }}
                              key={r.role}
                              type="button"
                              onClick={() => { setSelectedRole(r.role); setError(''); }}
                              className="group relative text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden focus:outline-none bg-white/80"
                              style={{
                                borderColor: isSelected ? r.accent : '#e5e7eb',
                              }}
                            >
                              {/* Gradient top strip */}
                              <div className={`h-1.5 w-full bg-gradient-to-r ${r.gradient}`} />

                              <div className="p-8 space-y-6 flex flex-col justify-between h-full min-h-[160px]">
                                {/* Icon + check */}
                                <div className="flex items-start justify-between">
                                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${r.gradient} text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                    <Icon size={24} strokeWidth={1.8} />
                                  </div>
                                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-rose-400 transition-colors" />
                                </div>

                                {/* Title & Badge */}
                                <div className="space-y-3">
                                  <h4 className="font-bold text-base font-heading text-gray-900 leading-tight">{r.title}</h4>
                                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                                    {r.badge}
                                  </span>
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Callout to Create Personal Account */}
                      <div className="text-center pt-2">
                        <p className="text-xs text-gray-500 font-medium">
                          Prefer your own dedicated login?{' '}
                          <button
                            type="button"
                            onClick={() => { setAuthMode('register'); setError(''); }}
                            className="text-rose-600 hover:text-rose-700 font-bold hover:underline cursor-pointer"
                          >
                            Create a Student / Staff Account &rarr;
                          </button>
                        </p>
                      </div>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-center mb-2">
                        <button 
                          onClick={() => { setSelectedRole(null); setError(''); }} 
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm hover:shadow-md text-sm font-bold text-gray-700 hover:text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                        >
                          <ArrowLeft size={16} className="text-gray-400" /> Choose a different role
                        </button>
                      </div>

                      {/* Error */}
                      {error && <Alert variant="danger">{error}</Alert>}

                      {/* CTA & Form */}
                      <form onSubmit={handleSubmit} className="space-y-5 bg-white/60 p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="space-y-4">
                          {/* Email Field */}
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                              <Mail size={18} />
                            </div>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 font-medium transition-shadow shadow-sm"
                              placeholder="Email address"
                              aria-label="Email address"
                            />
                          </div>

                          {/* Password Field */}
                          <div className="space-y-1.5">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                              </div>
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                className="w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 font-medium transition-shadow shadow-sm"
                                placeholder="Enter password"
                                aria-label="Password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 font-medium pl-1 flex items-center gap-1.5">
                              <span>Demo password:</span>
                              <code className="bg-gray-100 text-rose-600 px-1.5 py-0.5 rounded font-mono font-bold text-xs">{currentRole.password}</code>
                            </p>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-4 rounded-2xl font-extrabold text-base text-white flex items-center justify-center gap-3 bg-gradient-to-r ${currentRole.gradient} shadow-lg hover:brightness-105 hover:shadow-xl active:scale-[0.98] transition-all duration-300 disabled:opacity-70`}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full" />
                              {submittingStatus || 'Signing in...'}
                            </span>
                          ) : (
                            <>
                              <ArrowRight size={18} />
                              Sign In as {currentRole.title}
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </>
              )}

              <p className="text-center text-xs text-gray-400 font-medium -mt-4">
                Authorized Personnel &bull; Chandigarh University S-06 Inclusion Drive
              </p>

            </div>
          </motion.div>

        </div>
      </main>

    </div>
  );
};

export default Login;
