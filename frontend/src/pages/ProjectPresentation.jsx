import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Award, ShieldCheck, Map, Wrench, 
  BarChart3, CheckCircle2, Lock, Users, ArrowRight, ExternalLink,
  BookOpen, Sparkles, Building2, HelpCircle, Layers, Home, Eye,
  Maximize, Minimize, Compass, ClipboardCheck, AlertTriangle, FileText
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import api from '../services/api';

const SLIDES = [
  {
    id: 1,
    category: 'Project Showcase & Overview',
    title: 'S-06: Accessibility Audit & Inclusion Improvement Drive',
    subtitle: 'CUSoC 2026 Grand Final Evaluation • C Square Club, Chandigarh University',
    content: (
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm border border-primary/20 uppercase tracking-widest shadow-sm"
        >
          <Award size={18} /> CUSoC 2026 Final Demonstration • Track S-06
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-slate-900 tracking-tight leading-tight"
        >
          Empowering Universal Campus Accessibility <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-600 to-red-500">
            Through Empirical Audits & Intelligent Systems
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed font-medium"
        >
          A production-grade full-stack accessibility platform bridging in-situ physical research across 29 Chandigarh University buildings with automated RPWD compliance scoring, interactive geospatial maps, and maintenance remediation.
        </motion.p>

        {/* Solo Author & Institution Showcase Cards */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 text-left"
        >
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sole Contributor & Researcher</p>
            <p className="text-xl font-extrabold text-slate-900 font-heading">Vaibhav Tiwari</p>
            <p className="text-xs text-primary font-semibold mt-1">Conceived, Researched & Built Solo</p>
            <p className="text-[11px] text-slate-600 mt-1">100% Individual Authorship & Engineering</p>
          </div>
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Host Organization</p>
            <p className="text-xl font-extrabold text-slate-900 font-heading">C Square Club &bull; CUSoC</p>
            <p className="text-xs text-slate-700 font-semibold mt-1">Chandigarh University, Gharuan, Mohali</p>
            <p className="text-[11px] text-slate-600 mt-1">QS World Rank #575 &bull; NIRF Ranked #19</p>
          </div>
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Production Architecture</p>
            <p className="text-xl font-extrabold text-emerald-600 font-heading">Live Multi-Cloud Deployed</p>
            <p className="text-xs text-slate-700 font-semibold mt-1">Vercel CDN &bull; Render API &bull; Neon DB</p>
            <p className="text-[11px] text-slate-600 mt-1">Zero-Cost Production-Hardened Cloud</p>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 2,
    category: 'The Problem & Statutory Imperative',
    title: 'The Campus Accessibility Challenge',
    subtitle: 'Bridging the Statutory Mandate of RPWD Act 2016 with University Ground Reality',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-3xl bg-white border border-rose-200/80 shadow-sm flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-primary font-bold text-xs border border-rose-200 mb-3">
              <Lock size={14} /> Statutory Legal Mandate
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
              RPWD Act 2016 & Harmonised Guidelines
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Section 45 of the <strong>Rights of Persons with Disabilities (RPWD) Act, 2016</strong> and the <strong>CPWD Harmonised Guidelines (2021)</strong> legally mandate universal accessibility across all public educational institutions.
            </p>
          </div>
          
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs text-slate-800 space-y-2">
            <p className="font-bold text-rose-900 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-rose-600" /> Mandatory Compliance Areas:
            </p>
            <ul className="space-y-1 list-disc list-inside text-slate-700">
              <li>Step-free building approaches and standardized 1:12 ramp gradients</li>
              <li>Tactile ground surface indicators (TGSI) for blind students</li>
              <li>Accessible washrooms with grab bars and outward-swinging doors</li>
              <li>Multi-story elevator access with bilingual voice announcement</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-sm flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-xs border border-amber-200 mb-3">
              <HelpCircle size={14} /> Empirical Ground Reality
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
              Barriers Identified Across Academic Blocks
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Before this platform, university accessibility auditing faced severe structural and operational hurdles:
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-start gap-2.5">
              <span className="font-bold text-amber-800">•</span>
              <span><strong>Fragmented Data:</strong> No centralized digital repository of campus accessibility audits or barrier logs.</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-start gap-2.5">
              <span className="font-bold text-amber-800">•</span>
              <span><strong>Hidden Bottlenecks:</strong> Multi-story wings lacking elevator access, steep entrance ramps, and missing tactile markers.</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-start gap-2.5">
              <span className="font-bold text-amber-800">•</span>
              <span><strong>No Student Channel:</strong> Students with disabilities lacked a fast, geotagged way to report hurdles from their phones.</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-start gap-2.5">
              <span className="font-bold text-amber-800">•</span>
              <span><strong>Unassigned Repairs:</strong> Facilities teams lacked a structured Kanban workflow to resolve barriers systematically.</span>
            </div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 3,
    category: 'Empirical Field Research',
    title: 'Solo On-Ground Physical Campus Audit Drive',
    subtitle: 'In-Situ Fieldwork by Vaibhav Tiwari Across 29 Chandigarh University Academic Buildings',
    content: (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4"
          >
            <h4 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <CheckCircle2 size={20} className="text-primary" /> Hands-On Field Research & Physical Measurements
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Rather than using simulated numbers, all measurements were conducted manually in-situ across 29 academic buildings:
            </p>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-900 mb-1">Standard Steel Tape Measurements</p>
                <p className="text-slate-600">Doorway clear openings (&ge;900mm), corridor pathways (&ge;1500mm), step risers (&le;150mm), and grab bar heights (750mm & 900mm).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-900 mb-1">Rise & Run Slope Calculations (&Delta;h / &Delta;d)</p>
                <p className="text-slate-600">Calculated precise ramp slope ratios against the statutory 1:12 (8.33%) limit defined in CPWD Harmonised Guidelines.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-900 mb-1">In-Situ Photo Defect Documentation</p>
                <p className="text-slate-600">Captured high-resolution photographs of physical barriers, missing handrails, and threshold step obstacles.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4"
          >
            <h4 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <Layers size={20} className="text-primary" /> Discovered Barriers by Severity Classification
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Physical defects cataloged across campus categorized by urgency and impact on independent mobility:
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-900">
                <p className="font-bold flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span> Tier 1 - Critical (Immediate Hazard)
                </p>
                <p className="text-rose-800 text-[11px]">Multi-story wings lacking lifts (Block DD), steep entrance ramps steeper than 1:9, inward-swinging washroom doors.</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900">
                <p className="font-bold flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span> Tier 2 - High (Severe Inconvenience)
                </p>
                <p className="text-amber-800 text-[11px]">Elevators lacking braille control plates or auditory voice announcements; floor threshold transitions &gt; 25mm.</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-900">
                <p className="font-bold flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> Tier 3 - Medium (Partial Barrier)
                </p>
                <p className="text-blue-800 text-[11px]">Missing tactile warning pavers at top and bottom stair landings, high drinking water coolers lacking wheelchair approach.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                <p className="font-bold flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span> Tier 4 - Low (Maintenance Deficit)
                </p>
                <p className="text-slate-700 text-[11px]">Faded accessible parking bay demarcations, signage glare, or minor paint maintenance needs.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    category: 'Engineering Architecture',
    title: 'Clean Full-Stack Architecture & Security Hardening',
    subtitle: 'Spring Boot 3.4.1 (Java 21) • React 18 & Vite • PostgreSQL 16 • Multi-Cloud Production',
    content: (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-base mb-3 border border-emerald-100">API</div>
            <h4 className="font-extrabold text-slate-900 text-base mb-1 font-heading">Spring Boot 3.4.1 + Java 21</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clean 3-tier REST architecture: Controllers, Service abstraction, Repository layer, DTO validation, and unified exception handling.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-base mb-3 border border-blue-100">UI</div>
            <h4 className="font-extrabold text-slate-900 text-base mb-1 font-heading">React 18 + Vite + Tailwind</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accessible design system built with Radix UI primitives, Framer Motion fluid animations, Leaflet geospatial mapping, and WCAG AA contrast.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-base mb-3 border border-purple-100">DB</div>
            <h4 className="font-extrabold text-slate-900 text-base mb-1 font-heading">PostgreSQL 16 on Neon</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Normalized 3NF relational schema with 12 entities, composite indexes, foreign key constraints, automated seeder, and connection pooling.
            </p>
          </motion.div>
        </div>

        {/* Security Highlight Box */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-3xl bg-slate-900 text-white shadow-lg space-y-3"
        >
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck size={18} /> Multi-Layer Cybersecurity Architecture
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-300 pt-1">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <p className="font-bold text-white mb-0.5">IP Rate Limiting</p>
              <p className="text-[11px] text-slate-400">Sliding-window IP request throttling to prevent DoS attacks</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <p className="font-bold text-white mb-0.5">Brute Force Guard</p>
              <p className="text-[11px] text-slate-400">5-attempt failed login threshold with progressive lockout</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <p className="font-bold text-white mb-0.5">XSS Sanitization</p>
              <p className="text-[11px] text-slate-400">HTML character filtering and sanitization on all text inputs</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <p className="font-bold text-white mb-0.5">Security Headers</p>
              <p className="text-[11px] text-slate-400">Strict CSP, HSTS, X-Frame-Options DENY, nosniff</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 5,
    category: 'Role-Based Workflows',
    title: '4-Role Unified Operational Model',
    subtitle: 'Tailored Workflows for Administrator, Campus Auditor, Student, and Maintenance Roles',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs">ADMINISTRATOR</span>
            <span className="text-xs text-slate-500 font-mono">admin@campus.edu</span>
          </div>
          <h4 className="text-base font-extrabold text-slate-900 font-heading">Campus Intelligence & Department Radar</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Monitor real-time compliance indices across all 29 facilities, benchmark department performance, manage building records, configure user permissions, and export official PDF reports.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">CAMPUS AUDITOR</span>
            <span className="text-xs text-slate-500 font-mono">auditor@campus.edu</span>
          </div>
          <h4 className="text-base font-extrabold text-slate-900 font-heading">Digitized 42-Parameter Audit Conductor</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conduct standardized in-situ inspections with grouped category score sliders, save in-progress drafts, input comments, and submit for automated weighted compliance calculation with confetti feedback.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">STUDENT / STAFF</span>
            <span className="text-xs text-slate-500 font-mono">student@campus.edu</span>
          </div>
          <h4 className="text-base font-extrabold text-slate-900 font-heading">Participatory Barrier Reporting & Awareness</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Report physical barriers with photo evidence in under 60 seconds, track resolution progress via public QR codes without logging in, vote on community proposals, and take awareness quizzes.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">MAINTENANCE ENGINEER</span>
            <span className="text-xs text-slate-500 font-mono">maintenance@campus.edu</span>
          </div>
          <h4 className="text-base font-extrabold text-slate-900 font-heading">5-Stage Remediation Kanban Roadmap</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Action items transition seamlessly across 5 lifecycle stages: Reported &rarr; Assigned &rarr; In Progress &rarr; Fixed &rarr; Verified, ensuring zero unaddressed accessibility deficiencies.
          </p>
        </motion.div>
      </div>
    )
  },
  {
    id: 6,
    category: 'Documentation Standards Compliance',
    title: 'CUSoC Documentation Standards Checklist',
    subtitle: '100% Compliance with Section 4 of CUSoC Contributor Guidelines',
    content: (
      <div className="max-w-5xl mx-auto space-y-5">
        <p className="text-sm text-slate-700 text-center font-medium max-w-2xl mx-auto">
          Every required document mandated under the CUSoC Documentation Standards is authored, versioned, and hyperlinked in the repository:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
              <span className="font-extrabold text-slate-900">README.md</span>
            </div>
            <span className="text-slate-600 font-medium">Overview, live access links & demo guides</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
              <span className="font-extrabold text-slate-900">Installation Guide</span>
            </div>
            <span className="text-slate-600 font-medium">`docs/INSTALLATION.md` (Local & Docker)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
              <span className="font-extrabold text-slate-900">User Guide</span>
            </div>
            <span className="text-slate-600 font-medium">`docs/USER_GUIDE.md` (Role workflows)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
              <span className="font-extrabold text-slate-900">API Documentation</span>
            </div>
            <span className="text-slate-600 font-medium">`docs/API_DOCUMENTATION.md` (38 REST endpoints)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
              <span className="font-extrabold text-slate-900">Architecture Diagram</span>
            </div>
            <span className="text-slate-600 font-medium">`docs/architecture/system-architecture.md`</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
              <span className="font-extrabold text-slate-900">Database Schema</span>
            </div>
            <span className="text-slate-600 font-medium">`docs/architecture/DATABASE_SCHEMA.md`</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
              <span className="font-extrabold text-slate-900">Testing Report</span>
            </div>
            <span className="text-slate-600 font-medium">`docs/TESTING_REPORT.md` (JUnit & coverage)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">&check;</span>
              <span className="font-extrabold text-slate-900">Change Log</span>
            </div>
            <span className="text-slate-600 font-medium">`CHANGELOG.md` (Semantic versioning)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center text-xs text-primary font-bold">
          ⭐ Additional Deliverables: `docs/VPAT_ACCESSIBILITY_CONFORMANCE.md` • `docs/Campus_Accessibility_Audit_Survey.xlsx` • `docs/CAMPUS_INCLUSION_POLICY_RECOMMENDATIONS.md`
        </div>
      </div>
    )
  },
  {
    id: 7,
    category: 'Evaluation & Live Platform Access',
    title: 'Ready for Live Evaluation & Demonstration',
    subtitle: 'Production-Hardened, Fully Tested, and Ready for Review by the CUSoC Panel',
    content: (
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="p-8 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-2xl text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider">
            <Award size={16} /> Evaluation Ready: Complete CUSoC Deliverable Suite
          </div>
          <h3 className="text-3xl sm:text-4xl font-heading font-black">
            Experience the Live Web Application
          </h3>
          <p className="text-sm sm:text-base text-white/95 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore the 29 campus building benchmarks, conduct live audits, test wheelchair navigation routing, or review the 5-stage maintenance roadmap.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl mx-auto text-left">
            <Link to="/login" className="block">
              <div className="p-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-50 transition-all shadow-md active:scale-98">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm font-heading">Sign In / Demo Roles</span>
                  <ArrowRight size={18} className="text-primary" />
                </div>
                <p className="text-[11px] text-slate-600 mt-1">Pre-configured 1-click login for all 4 roles</p>
              </div>
            </Link>

            <Link to="/map" className="block">
              <div className="p-4 rounded-2xl bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-all shadow-md active:scale-98">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm font-heading">Interactive Campus Map</span>
                  <Map size={18} className="text-white" />
                </div>
                <p className="text-[11px] text-white/80 mt-1">29 building pins & accessible routing</p>
              </div>
            </Link>

            <Link to="/audits" className="block">
              <div className="p-4 rounded-2xl bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-all shadow-md active:scale-98">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm font-heading">Audit Conductor</span>
                  <ClipboardCheck size={18} className="text-white" />
                </div>
                <p className="text-[11px] text-white/80 mt-1">42-parameter checklist with autosave</p>
              </div>
            </Link>

            <Link to="/dashboard" className="block">
              <div className="p-4 rounded-2xl bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-all shadow-md active:scale-98">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm font-heading">Executive Dashboard</span>
                  <BarChart3 size={18} className="text-white" />
                </div>
                <p className="text-[11px] text-white/80 mt-1">Real-time compliance analytics & charts</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }
];

const ProjectPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    // Proactively warm up backend service on Render
    api.get('/health').catch(() => {});
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          navigate('/');
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-text">
      {/* Top Presentation Bar */}
      <header className="glass sticky top-0 z-50 border-b border-slate-200/80 px-6 py-3.5 flex justify-between items-center backdrop-blur-md bg-white/85">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white font-black font-heading hover:scale-105 transition-transform shadow-md shadow-primary/20">
            CU
          </Link>
          <div>
            <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
              CUSoC '26 <span className="text-primary font-black">Evaluation Deck</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 font-semibold">
              &bull; S-06 Accessibility Drive
            </span>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-primary shadow-sm' 
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Slide ${index + 1}: ${slide.category}`}
            />
          ))}
          <span className="ml-3 text-xs font-bold text-slate-600 font-mono">
            {currentSlide + 1} / {SLIDES.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="xs" 
            icon={isFullscreen ? Minimize : Maximize}
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex border-slate-200 hover:bg-slate-100 text-slate-700"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? 'Exit Full' : 'Fullscreen'}
          </Button>

          <Link to="/">
            <Button variant="secondary" size="xs" icon={Home} className="bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800">
              Exit Deck
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Slide Content Canvas */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-8 max-w-7xl w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col space-y-6"
          >
            {/* Slide Header */}
            <div className="text-center space-y-1.5 max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                {SLIDES[currentSlide].category}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 tracking-tight">
                {SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {SLIDES[currentSlide].subtitle}
              </p>
            </div>

            {/* Slide Body */}
            <div className="py-2 w-full">
              {SLIDES[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Dock */}
      <footer className="glass sticky bottom-0 z-50 border-t border-slate-200/80 px-6 py-3.5 flex justify-between items-center backdrop-blur-md bg-white/85">
        <Button 
          variant="secondary" 
          size="sm" 
          icon={ChevronLeft} 
          onClick={handlePrev} 
          disabled={currentSlide === 0}
          className="bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
        >
          Previous
        </Button>

        <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-2">
          <span>Navigate with</span>
          <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">Left</kbd>
          <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">Right</kbd>
          <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">Space</kbd>
          <span>&bull;</span>
          <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">F</kbd>
          <span>Fullscreen</span>
        </div>

        {currentSlide < SLIDES.length - 1 ? (
          <Button 
            variant="primary" 
            size="sm" 
            icon={ChevronRight} 
            iconPosition="right" 
            onClick={handleNext}
          >
            Next Slide
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Go to Live Platform (Login)
            </Button>
          </Link>
        )}
      </footer>
    </div>
  );
};

export default ProjectPresentation;
