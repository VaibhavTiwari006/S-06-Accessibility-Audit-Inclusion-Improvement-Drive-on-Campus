import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Map, Users, BarChart3, ChevronRight, 
  Sparkles, QrCode, BookOpen, Calculator, Wrench, Camera, CheckCircle2, 
  UserCheck, Lock, LogIn, Award, Building2, HelpCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const IMPACTFUL_FEATURES = [
  {
    id: 'scanner',
    icon: Sparkles,
    badge: 'AI Powered',
    title: 'AI Web Accessibility Scanner',
    desc: 'Scans web components against WCAG 2.1 AA standards, identifies color contrast and alt-text issues, and provides 1-click copyable AI code fixes.',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50 text-amber-700 border-amber-200',
    hoverRing: 'hover:ring-amber-200',
    demo: 'Scans 15+ WCAG rules & generates instant JSX/HTML code patches.'
  },
  {
    id: 'map',
    icon: Map,
    badge: 'Interactive Navigation',
    title: 'Wheelchair Route Navigation & Map',
    desc: 'Interactive campus map with color-coded building scores, feature layers (Ramps, Elevators, Washrooms), and barrier-free wheelchair routing.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 text-blue-700 border-blue-200',
    hoverRing: 'hover:ring-blue-200',
    demo: 'Calculates shortest barrier-free path with step-by-step turn directions.'
  },
  {
    id: 'evidence',
    icon: Camera,
    badge: 'Visual Simulator',
    title: 'Photo Evidence & AI Transformation',
    desc: 'Upload physical barrier photos, place interactive annotation pins, and view AI visual before/after transformation concepts with RPWD cost specs.',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    hoverRing: 'hover:ring-emerald-200',
    demo: 'Interactive slider comparing barrier photo vs. AI remediated ramp design.'
  },
  {
    id: 'dashboard',
    icon: BarChart3,
    badge: 'Analytics',
    title: 'Departmental Compliance Breakdown',
    desc: 'Compare accessibility scores across CSE, UIC, CBS, and UIPS departments with growth rate trends and executive report generation.',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50 text-purple-700 border-purple-200',
    hoverRing: 'hover:ring-purple-200',
    demo: 'Cross-departmental compliance radar & quarterly progress tracking.'
  },
  {
    id: 'qr',
    icon: QrCode,
    badge: 'Mobile 1-Tap',
    title: 'QR Code Instant Reporting System',
    desc: 'Printable QR posters for campus buildings enabling students and visitors to report barriers instantly via mobile scan without logging in.',
    color: 'from-rose-500 to-red-600',
    bgColor: 'bg-rose-50 text-rose-700 border-rose-200',
    hoverRing: 'hover:ring-rose-200',
    demo: 'Generates building-specific poster QR codes with instant mobile form sync.'
  },
  {
    id: 'workflow',
    icon: Wrench,
    badge: 'Kanban Board',
    title: '5-Stage Maintenance Workflow',
    desc: 'Track physical repair tasks from initial report to assignment, work in progress, fix completion, and auditor verification.',
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50 text-orange-700 border-orange-200',
    hoverRing: 'hover:ring-orange-200',
    demo: '5-Column Kanban board: Reported → Assigned → In Progress → Fixed → Verified.'
  },
  {
    id: 'awareness',
    icon: BookOpen,
    badge: 'Educational',
    title: 'Inclusive Awareness & Quiz Portal',
    desc: 'Disability etiquette guidelines, WCAG 2.1 educational video modules, and an interactive compliance quiz to foster campus inclusion.',
    color: 'from-sky-500 to-blue-600',
    bgColor: 'bg-sky-50 text-sky-700 border-sky-200',
    hoverRing: 'hover:ring-sky-200',
    demo: 'Interactive quiz with instant answer feedback and etiquette cards.'
  },
  {
    id: 'calculator',
    icon: Calculator,
    badge: 'ROI Budgeting',
    title: 'Low-Cost Improvement Calculator',
    desc: 'Itemize costs for ramps, tactile paving, signage, and grab bars while ranking fixes by maximum accessibility impact per rupee spent.',
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50 text-teal-700 border-teal-200',
    hoverRing: 'hover:ring-teal-200',
    demo: 'Impact vs. Cost matrix maximizing score improvement per budget.'
  }
];

const ROLES = [
  {
    role: 'ADMIN',
    title: 'Administrator',
    email: 'admin@campus.edu',
    password: 'admin123',
    icon: ShieldCheck,
    desc: 'Full administrative access, department comparisons, system settings, and user management.',
    gradient: 'from-rose-500 to-red-600',
    bgLight: 'bg-rose-50 text-rose-700 border-rose-100',
    hoverRing: 'hover:ring-rose-200'
  },
  {
    role: 'AUDITOR',
    title: 'Campus Auditor',
    email: 'auditor@campus.edu',
    password: 'auditor123',
    icon: UserCheck,
    desc: 'Conduct physical audits, upload photo evidence, calculate wheelchair routes, and evaluate WCAG scores.',
    gradient: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50 text-blue-700 border-blue-100',
    hoverRing: 'hover:ring-blue-200'
  },
  {
    role: 'STUDENT',
    title: 'Student / Staff',
    email: 'student@campus.edu',
    password: 'student123',
    icon: Users,
    desc: 'Report barriers, scan QR codes, take awareness quizzes, and view public campus maps.',
    gradient: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    hoverRing: 'hover:ring-emerald-200'
  },
  {
    role: 'MAINTENANCE',
    title: 'Maintenance Engineer',
    email: 'maintenance@campus.edu',
    password: 'maintenance123',
    icon: Wrench,
    desc: 'Manage the 5-stage repair Kanban board, update issue status, and mark barriers as fixed.',
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 text-amber-700 border-amber-100',
    hoverRing: 'hover:ring-amber-200'
  }
];

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollToRoles = () => {
    document.getElementById('role-selector-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectRole = (roleItem) => {
    navigate(`/login?email=${encodeURIComponent(roleItem.email)}&role=${roleItem.role}`);
  };

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col font-sans">
      {/* Top Header Navbar */}
      <nav className="glass sticky top-0 z-50 border-b border-gray-100/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-white font-bold font-heading">CU</span>
          </div>
          <div>
            <span className="text-xl font-heading font-bold text-textMain tracking-tight">
              CU <span className="text-primary">Access</span> Audit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard">
              <Button variant="primary" icon={ArrowRight}>Enter Dashboard ({user.role})</Button>
            </Link>
          ) : (
            <Button variant="primary" icon={LogIn} onClick={scrollToRoles}>
              Select Role & Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 px-6 overflow-hidden flex flex-col items-center text-center bg-gradient-to-b from-white via-red-50/20 to-background border-b border-gray-100">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs mb-6 border border-primary/20 uppercase tracking-wider">
              <ShieldCheck size={14} /> Chandigarh University &bull; Inclusion Improvement Drive
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-secondary tracking-tight leading-tight mb-6">
              Building Inclusive Campuses <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-primary-light">
                Through Intelligent Accessibility
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-textLight mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Explore how AccessAudit evaluates WCAG compliance, plans wheelchair routes, tracks maintenance workflows, and empowers the campus community.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="px-8 shadow-lg" icon={ArrowRight} onClick={scrollToRoles}>
                Select Campus Role & Sign In
              </Button>
              <Button variant="secondary" size="lg" className="px-8" icon={Sparkles} onClick={() => document.getElementById('impact-features-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore 8 Impactful Features
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Live Platform Stats */}
        <section className="py-10 bg-white">
          <div className="w-full px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
              <div className="text-center px-4">
                <p className="text-4xl font-heading font-extrabold text-primary mb-1">45+</p>
                <p className="text-xs font-bold text-textLight uppercase tracking-wider">Buildings Audited</p>
              </div>
              <div className="text-center px-4">
                <p className="text-4xl font-heading font-extrabold text-emerald-600 mb-1">1,200+</p>
                <p className="text-xs font-bold text-textLight uppercase tracking-wider">Barriers Resolved</p>
              </div>
              <div className="text-center px-4">
                <p className="text-4xl font-heading font-extrabold text-blue-600 mb-1">150+</p>
                <p className="text-xs font-bold text-textLight uppercase tracking-wider">Active Auditors</p>
              </div>
              <div className="text-center px-4">
                <p className="text-4xl font-heading font-extrabold text-indigo-600 mb-1">92%</p>
                <p className="text-xs font-bold text-textLight uppercase tracking-wider">RPWD Compliance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Role Selector & Credential Authentication Section */}
        <section id="role-selector-section" className="pt-6 pb-20 px-6 md:px-12 lg:px-16 bg-white">
          <div className="w-full space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Authentication Required
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-secondary">
                Select Your Campus Role to Proceed
              </h2>
              <p className="text-textLight text-base font-medium">
                Access to the AccessAudit dashboard requires role-based authentication. Choose your role below to test with sample credentials.
              </p>
            </div>

            {/* Role Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROLES.map((r) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.role}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className={`group relative p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between bg-white border-gray-100 shadow-sm hover:shadow-xl ${r.hoverRing} hover:ring-4`}
                    onClick={() => handleSelectRole(r)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl -z-10" />
                    
                    <div className="space-y-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br ${r.gradient} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={26} />
                      </div>
                      <div>
                        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border ${r.bgLight}`}>
                          {r.role}
                        </span>
                        <h3 className="text-xl font-bold font-heading mt-3 mb-1 text-gray-900 group-hover:text-primary transition-colors">{r.title}</h3>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">{r.desc}</p>
                    </div>

                    <div className="mt-8">
                      <div className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300 ${r.bgLight} group-hover:shadow-md`}>
                        Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impactful Features Showcase Section */}
        <section id="impact-features-section" className="py-20 px-6 md:px-12 lg:px-16 bg-background">
          <div className="w-full space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Platform Demonstrations
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-secondary">
                8 Impactful Features of AccessAudit
              </h2>
              <p className="text-textLight text-base font-medium">
                Click any feature below to inspect how it transforms accessibility management on campus.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {IMPACTFUL_FEATURES.map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className={`group relative p-6 rounded-3xl border transition-all flex flex-col justify-between bg-white border-gray-100 shadow-sm hover:shadow-xl ${feat.hoverRing} hover:ring-4`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl -z-10" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br ${feat.color} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={26} />
                        </div>
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md border ${feat.bgColor}`}>
                          {feat.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-xl font-heading mb-2">{feat.title}</h3>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                    </div>

                    <div className="mt-8">
                      <button 
                        onClick={() => navigate('/login')}
                        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300 ${feat.bgColor} hover:shadow-md cursor-pointer`}
                      >
                        View Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 bg-white">
        <p>© 2026 Chandigarh University. Accessibility Audit & Inclusion Improvement Drive (S-06).</p>
      </footer>
    </div>
  );
};

export default Landing;
