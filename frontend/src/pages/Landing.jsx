import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Map, Users, BarChart3, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Landing = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    { icon: Map, title: 'Campus Mapping', desc: 'Detailed accessibility maps of all campus buildings and facilities.' },
    { icon: ShieldCheck, title: 'WCAG 2.1 AA', desc: 'Strict adherence to global accessibility standards and compliance.' },
    { icon: Users, title: 'Community Driven', desc: 'Empowering students and staff to report issues and track resolutions.' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Comprehensive dashboards for administrators to prioritize improvements.' }
  ];

  const stats = [
    { label: 'Buildings Audited', value: '45+' },
    { label: 'Issues Resolved', value: '1,200+' },
    { label: 'Active Auditors', value: '150+' },
    { label: 'Accessibility Score', value: '92%' }
  ];

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col font-sans">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 border-b border-gray-100/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-white font-bold font-heading">CU</span>
          </div>
          <div>
            <span className="text-xl font-heading font-bold text-textMain tracking-tight">
              CU <span className="text-primary">Access</span> Audit
            </span>
          </div>
        </div>
        <div>
          <Link to="/login">
            <Button variant="primary" icon={ArrowRight}>Login to Dashboard</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative pt-20 pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
              <ShieldCheck size={16} /> Enterprise Accessibility Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-secondary tracking-tight leading-tight mb-8">
              Building an Inclusive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Campus For Everyone
              </span>
            </h1>
            <p className="text-xl text-textLight mb-10 max-w-2xl mx-auto leading-relaxed">
              Chandigarh University's premier platform for tracking, auditing, and improving accessibility across all campus facilities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="px-8" icon={ChevronRight}>Start Auditing</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 bg-white/50 backdrop-blur-sm">View Public Map</Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center px-4"
                >
                  <p className="text-4xl font-heading font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm font-semibold text-textLight uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-background relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">Enterprise Grade Capabilities</h2>
              <p className="text-textLight text-lg">Designed for scale, built for inclusion. Everything you need to manage a massive infrastructure audit program.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card hover className="h-full bg-white/50 backdrop-blur-sm">
                    <CardContent className="pt-8">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                        <feat.icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-textMain mb-3">{feat.title}</h3>
                      <p className="text-textLight leading-relaxed">{feat.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
