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
    demo: 'Scans 15+ WCAG rules & generates instant JSX/HTML code patches.'
  },
  {
    id: 'map',
    icon: Map,
    badge: 'Interactive Navigation',
    title: 'Wheelchair Route Navigation & Map',
    desc: 'Interactive campus map with color-coded building scores, feature layers (Ramps ♿, Elevators 🛗, Washrooms 🚻), and barrier-free wheelchair routing.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 text-blue-700 border-blue-200',
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
    color: 'border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700'
  },
  {
    role: 'AUDITOR',
    title: 'Campus Auditor',
    email: 'auditor@campus.edu',
    password: 'auditor123',
    icon: UserCheck,
    desc: 'Conduct physical audits, upload photo evidence, calculate wheelchair routes, and evaluate WCAG scores.',
    color: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-700'
  },
  {
    role: 'STUDENT',
    title: 'Student / Staff',
    email: 'student@campus.edu',
    password: 'student123',
    icon: Users,
    desc: 'Report barriers, scan QR codes, take awareness quizzes, and view public campus maps.',
    color: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700'
  },
  {
    role: 'MAINTENANCE',
    title: 'Maintenance Engineer',
    email: 'maintenance@campus.edu',
    password: 'maintenance123',
    icon: Wrench,
    desc: 'Manage the 5-stage repair Kanban board, update issue status, and mark barriers as fixed.',
    color: 'border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-700'
  }
];

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(IMPACTFUL_FEATURES[0]);

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
        <section className="py-12 bg-white border-b border-gray-100 shadow-xs">
          <div className="max-w-7xl mx-auto px-6">
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

        {/* Impactful Features Showcase Section */}
        <section id="impact-features-section" className="py-20 px-6 bg-background">
          <div className="max-w-7xl mx-auto space-y-12">
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
                const isSelected = selectedFeature.id === feat.id;
                return (
                  <motion.div
                    key={feat.id}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedFeature(feat)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-white border-primary shadow-soft-lg ring-2 ring-primary/20' 
                        : 'bg-white/80 border-gray-200/80 hover:border-gray-300 hover:bg-white shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs bg-gradient-to-br ${feat.color} text-white`}>
                          <Icon size={22} />
                        </div>
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md border ${feat.bgColor}`}>
                          {feat.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-textMain text-base font-heading mb-2">{feat.title}</h3>
                      <p className="text-xs text-textLight leading-relaxed">{feat.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-primary">
                      <span>{isSelected ? 'Currently Selected' : 'View Demo'}</span>
                      <ChevronRight size={14} className={isSelected ? 'translate-x-1' : ''} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Feature Live Preview Box */}
            <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-soft-lg space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-br ${selectedFeature.color}`}>
                    <selectedFeature.icon size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{selectedFeature.badge} Feature</span>
                    <h3 className="text-2xl font-extrabold text-textMain font-heading">{selectedFeature.title}</h3>
                  </div>
                </div>
                <Button variant="primary" icon={LogIn} onClick={scrollToRoles}>
                  Try Feature via Role Login
                </Button>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-medium text-slate-700 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block mb-1">Impact Summary:</strong>
                  {selectedFeature.demo}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Role Selector & Credential Authentication Section */}
        <section id="role-selector-section" className="py-20 px-6 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto space-y-12">
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
                    className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${r.color} shadow-sm hover:shadow-soft-lg`}
                    onClick={() => handleSelectRole(r)}
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs">
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-80">{r.role}</span>
                        <h3 className="text-xl font-bold font-heading">{r.title}</h3>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed font-medium">{r.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-current/10 space-y-3">
                      <div className="text-[11px] font-mono opacity-80 space-y-0.5">
                        <p>Login: <strong>{r.email}</strong></p>
                        <p>Pass: <strong>{r.password}</strong></p>
                      </div>
                      <Button size="sm" fullWidth className="bg-white text-textMain hover:bg-gray-100 font-bold shadow-xs">
                        Sign In as {r.title}
                      </Button>
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
