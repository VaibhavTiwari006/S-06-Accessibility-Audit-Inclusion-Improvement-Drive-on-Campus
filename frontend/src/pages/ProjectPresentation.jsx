import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Award, ShieldCheck, Map, Wrench, 
  BarChart3, CheckCircle2, Lock, Users, ArrowRight, ExternalLink,
  BookOpen, Sparkles, Building2, HelpCircle, Layers, Home, Eye
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';

const SLIDES = [
  {
    id: 1,
    category: 'Project Showcase & Overview',
    title: 'S-06: Accessibility Audit & Inclusion Drive',
    subtitle: 'CUSoC 2026 Grand Final Evaluation • C Square Club, Chandigarh University',
    content: (
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20 uppercase tracking-widest">
          <Award size={16} /> CUSoC 2026 Final Demonstration • Track S-06
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-textMain tracking-tight leading-tight">
          Empowering Universal Campus Accessibility <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-primary-light">
            Through Empirical Audits & Intelligent Systems
          </span>
        </h1>

        <p className="text-lg text-textLight max-w-2xl leading-relaxed">
          An enterprise full-stack platform bridging on-ground physical accessibility research across 29 university buildings with automated RPWD compliance scoring, interactive maps, and maintenance remediation.
        </p>

        {/* Solo Author & Institution Card */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-textLight uppercase tracking-wider mb-1">Sole Contributor & Researcher</p>
            <p className="text-lg font-bold text-textMain">Vaibhav Tiwari</p>
            <p className="text-xs text-primary font-medium mt-1">Research, Fieldwork & Full-Stack Engineering</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-textLight uppercase tracking-wider mb-1">Host Organization</p>
            <p className="text-lg font-bold text-textMain">C Square Club &bull; CUSoC</p>
            <p className="text-xs text-textLight mt-1">Chandigarh University (QS #575 &bull; NIRF #19)</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-textLight uppercase tracking-wider mb-1">Deployment Status</p>
            <p className="text-lg font-bold text-emerald-600">Production Ready & Deployed</p>
            <p className="text-xs text-emerald-700 font-medium mt-1">Render Cloud &bull; Vercel CDN &bull; Neon DB</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    category: 'The Problem & Statutory Imperative',
    title: 'The Campus Accessibility Challenge',
    subtitle: 'Bridging the Statutory Mandate of RPWD Act 2016 with Campus Reality',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100">
            <h3 className="font-bold text-primary flex items-center gap-2 mb-1">
              <Lock size={18} /> Statutory RPWD Act 2016 Mandate
            </h3>
            <p className="text-sm text-textMain leading-relaxed">
              Section 45 of the Rights of Persons with Disabilities Act, 2016 establishes mandatory accessibility of all public educational infrastructure. Failure to comply restricts equal participation in higher education.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-1">
              <HelpCircle size={18} /> The Ground Reality on Campus
            </h3>
            <ul className="text-sm text-amber-950 space-y-1.5 list-disc list-inside">
              <li>Fragmented, paper-based or non-existent accessibility records.</li>
              <li>Hidden architectural barriers (steep ramps, inaccessible upper floors).</li>
              <li>No real-time channel for students with disabilities to report hurdles.</li>
              <li>Maintenance teams lack prioritized, engineering-grade blueprints.</li>
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl space-y-4">
          <p className="text-xs font-bold text-primary-light uppercase tracking-wider">AccessAudit Solution Blueprint</p>
          <h4 className="text-2xl font-bold font-heading">Closing the Institutional Loop</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            AccessAudit transforms subjective complaints into an evidence-based institutional operating system:
          </p>
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">1</span>
              <span><strong>Ground Audit:</strong> 42-parameter standardized inspection</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">2</span>
              <span><strong>Automated Scoring:</strong> Instant building RPWD compliance %</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">3</span>
              <span><strong>Actionable Remediation:</strong> 5-stage maintenance roadmap</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    category: 'Empirical Field Research',
    title: 'Solo On-Ground Physical Campus Audit',
    subtitle: '29 Buildings Surveyed • 1,218 Checkpoints • 187 Discrete Barriers Documented',
    content: (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-primary font-heading">29</p>
            <p className="text-xs font-bold text-textLight uppercase tracking-wider mt-1">Buildings Audited</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-emerald-600 font-heading">1,218</p>
            <p className="text-xs font-bold text-textLight uppercase tracking-wider mt-1">Checkpoints Evaluated</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-amber-600 font-heading">187</p>
            <p className="text-xs font-bold text-textLight uppercase tracking-wider mt-1">Barriers Identified</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600 font-heading">68.2%</p>
            <p className="text-xs font-bold text-textLight uppercase tracking-wider mt-1">Campus RPWD Index</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
            <h4 className="font-bold text-textMain flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary" /> Genuine Manual Fieldwork Toolchain
            </h4>
            <ul className="text-xs text-textLight space-y-2">
              <li><strong>Steel Measuring Tapes:</strong> Door widths (&ge;900mm), corridor clear paths (&ge;1500mm), step risers (&le;150mm), grab rails (750/900mm).</li>
              <li><strong>Rise & Run Slope Calculations:</strong> Measured vertical height and horizontal distance to compute exact slope ratios (&le;1:12).</li>
              <li><strong>In-Situ Photo Defect Logging:</strong> Captured photographic evidence of barrier locations with wing/floor tags.</li>
              <li><strong>Direct Peer Consultations:</strong> Real feedback from campus peers navigating mobility and sensory hurdles.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
            <h4 className="font-bold text-textMain flex items-center gap-2">
              <Layers size={18} className="text-primary" /> Discovered Barriers by Severity
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 rounded-lg bg-red-50 text-red-800">
                <span className="font-bold">🔴 24 Critical (Tier 1)</span>
                <span>Upper floors lacking lifts (Block DD), steep entrance ramps</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-amber-50 text-amber-800">
                <span className="font-bold">🟠 61 High (Tier 2)</span>
                <span>Lifts lacking braille/audio units, inward-swinging WC doors</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-blue-50 text-blue-800">
                <span className="font-bold">🟡 73 Medium (Tier 3)</span>
                <span>Missing tactile warning pavers at stairs, high water coolers</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 text-gray-700">
                <span className="font-bold">🟢 29 Low (Tier 4)</span>
                <span>Worn parking bay paint, signage reflections</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    category: 'Engineering Architecture',
    title: 'Enterprise Full-Stack Architecture',
    subtitle: 'Spring Boot 3.4.1 (Java 21) • React 18 & Vite • PostgreSQL 16 • Multi-Layer Security',
    content: (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold mb-3">API</div>
            <h4 className="font-bold text-textMain text-sm mb-1">Spring Boot 3.4.1 + Java 21</h4>
            <p className="text-xs text-textLight leading-relaxed">
              RESTful architecture with DTO validation, service layer abstraction, Spring Data JPA, and JWT role-based access control.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3">UI</div>
            <h4 className="font-bold text-textMain text-sm mb-1">React 18 + Vite + Tailwind</h4>
            <p className="text-xs text-textLight leading-relaxed">
              Fast responsive SPA, Framer Motion spring physics, Radix UI accessible primitives, and WCAG AA contrast compliance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-3">DB</div>
            <h4 className="font-bold text-textMain text-sm mb-1">PostgreSQL 16 Relational</h4>
            <p className="text-xs text-textLight leading-relaxed">
              Normalized schema modeling 29 buildings, 42-parameter checklists, audits, issues, proposals, and automated seed migrations.
            </p>
          </div>
        </div>

        {/* Security Highlight Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-gray-900 to-slate-900 text-white shadow-md">
          <div className="flex items-center gap-2 mb-2 text-primary-light font-bold text-xs uppercase tracking-wider">
            <ShieldCheck size={16} /> Multi-Layer Cybersecurity Architecture
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-300 pt-1">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <p className="font-bold text-white mb-0.5">Rate Limiting</p>
              <p className="text-[11px] text-gray-400">Sliding-window IP request throttling</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <p className="font-bold text-white mb-0.5">Brute Force Guard</p>
              <p className="text-[11px] text-gray-400">5-attempt threshold with progressive lock</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <p className="font-bold text-white mb-0.5">XSS Sanitization</p>
              <p className="text-[11px] text-gray-400">Client & server-side HTML tag cleaning</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <p className="font-bold text-white mb-0.5">Security Headers</p>
              <p className="text-[11px] text-gray-400">Strict CSP, HSTS, X-Frame-Options DENY</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    category: 'Role-Based Workflows',
    title: '4-Role Unified Operating Model',
    subtitle: 'Purpose-Built Interfaces for Admin, Auditor, Student, and Maintenance Roles',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="primary">ADMIN</Badge>
            <span className="text-xs text-textLight font-mono">admin@campus.edu</span>
          </div>
          <h4 className="font-bold text-textMain">Executive Intelligence & Comparisons</h4>
          <p className="text-xs text-textLight leading-relaxed">
            Monitor real-time compliance indices across all 29 facilities, benchmark department performance (CSE vs. UIC vs. CBS), manage user roles, and export audit PDF reports.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="info">AUDITOR</Badge>
            <span className="text-xs text-textLight font-mono">auditor@campus.edu</span>
          </div>
          <h4 className="font-bold text-textMain">Interactive 42-Parameter Audit Conductor</h4>
          <p className="text-xs text-textLight leading-relaxed">
            Conduct step-by-step physical inspections with grouped category sliders, save in-progress drafts, input comments, and submit for automated compliance calculation with confetti celebration.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="warning">STUDENT / STAFF</Badge>
            <span className="text-xs text-textLight font-mono">student@campus.edu</span>
          </div>
          <h4 className="font-bold text-textMain">Participatory Barrier Reporting & Awareness</h4>
          <p className="text-xs text-textLight leading-relaxed">
            Report physical barriers with photo evidence in under 60 seconds, track resolution progress via public QR codes (`/track/:id`), participate in community voting, and take interactive etiquette quizzes.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="success">MAINTENANCE</Badge>
            <span className="text-xs text-textLight font-mono">maintenance@campus.edu</span>
          </div>
          <h4 className="font-bold text-textMain">5-Stage Remediation Kanban Roadmap</h4>
          <p className="text-xs text-textLight leading-relaxed">
            Action items transition seamlessly across 5 lifecycle stages: Reported &rarr; Assigned &rarr; In Progress &rarr; Fixed &rarr; Verified, ensuring zero unaddressed accessibility deficiencies.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    category: 'Interactive Map & Geospatial Features',
    title: 'Interactive Campus Accessibility Map',
    subtitle: 'Real Coordinates for 29 Buildings • Dynamic Compliance Markers • Step-Free Route Planner',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-5xl mx-auto">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-1">
              <Map size={18} /> Real Geospatial Campus Placement
            </h4>
            <p className="text-xs text-blue-950 leading-relaxed">
              Every building marker is mapped to actual spatial campus clusters (North Complex, Central Ring, South-West Zone, East Extension, Academic Complex).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-1">
              <CheckCircle2 size={18} /> Dynamic RPWD Compliance Badges
            </h4>
            <p className="text-xs text-emerald-950 leading-relaxed">
              Markers dynamically reflect empirical audit scores with color-coded pills (Green &ge;75% Compliant, Yellow 50–74% Partial, Red &lt;50% Critical).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
            <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-1">
              <Sparkles size={18} /> Step-Free Wheelchair Routing Engine
            </h4>
            <p className="text-xs text-purple-950 leading-relaxed">
              Calculates navigation paths prioritizing verified ramps, accessible entry porticos, and elevator corridors over stairwells.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xl flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Map size={32} />
          </div>
          <h4 className="text-xl font-bold font-heading text-textMain">Live Campus Navigation</h4>
          <p className="text-xs text-textLight leading-relaxed max-w-sm">
            Experience the interactive map directly inside the running application with full layer toggles for ramps, elevators, and accessible washrooms.
          </p>
          <Link to="/map">
            <Button variant="primary" icon={ExternalLink}>
              Launch Interactive Campus Map
            </Button>
          </Link>
        </div>
      </div>
    )
  },
  {
    id: 7,
    category: 'Documentation Standards Compliance',
    title: 'CUSoC Documentation Standards Checklist',
    subtitle: '100% Compliance with Section 4 of CUSoC Contributor Guidelines',
    content: (
      <div className="max-w-5xl mx-auto space-y-4">
        <p className="text-sm text-textLight text-center mb-2">
          Every single document mandated under the CUSoC Documentation Standards is published, versioned, and hyperlinked in the repository:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">&check;</span>
              <span className="font-bold text-textMain">README.md</span>
            </div>
            <span className="text-textLight">Comprehensive overview & benchmarks</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">&check;</span>
              <span className="font-bold text-textMain">Installation Guide</span>
            </div>
            <span className="text-textLight">`docs/INSTALLATION.md` (Local & Docker)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">&check;</span>
              <span className="font-bold text-textMain">User Guide</span>
            </div>
            <span className="text-textLight">`docs/USER_GUIDE.md` (4 user roles)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">&check;</span>
              <span className="font-bold text-textMain">API Documentation</span>
            </div>
            <span className="text-textLight">`docs/API_DOCUMENTATION.md` (REST & Swagger)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">&check;</span>
              <span className="font-bold text-textMain">Architecture Diagram</span>
            </div>
            <span className="text-textLight">`docs/architecture/system-architecture.md`</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">&check;</span>
              <span className="font-bold text-textMain">Database Schema</span>
            </div>
            <span className="text-textLight">`docs/architecture/DATABASE_SCHEMA.md`</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">&check;</span>
              <span className="font-bold text-textMain">Testing Report</span>
            </div>
            <span className="text-textLight">`docs/TESTING_REPORT.md` (JUnit & coverage)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">&check;</span>
              <span className="font-bold text-textMain">Change Log</span>
            </div>
            <span className="text-textLight">`CHANGELOG.md` (Semantic versioning)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center text-xs text-primary font-bold">
          ⭐ Bonus Deliverables: `docs/CUSOC_FINAL_EVALUATION.md` • `docs/Campus_Accessibility_Audit_Survey.xlsx` • `docs/DEPLOYMENT.md` • `SECURITY.md`
        </div>
      </div>
    )
  },
  {
    id: 8,
    category: 'Requirements & Milestone Verification',
    title: 'CUSoC Deliverable & Verification Matrix',
    subtitle: 'Comprehensive Fulfillment of Foundation, Product Engineering & Production Milestones',
    content: (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-xs font-bold text-textLight uppercase">Engineering Velocity</p>
            <p className="text-xl font-bold text-primary my-1">640+ Commits</p>
            <p className="text-[11px] text-textLight">Granular Git history & CI/CD pipeline</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-xs font-bold text-textLight uppercase">Product Engineering</p>
            <p className="text-xl font-bold text-primary my-1">Full-Stack Core</p>
            <p className="text-[11px] text-textLight">Spring Boot 3, Neon DB, React 18 & RBAC</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-xs font-bold text-textLight uppercase">Quarterly Milestones</p>
            <p className="text-xl font-bold text-primary my-1">Q1 • Q2 • Q3</p>
            <p className="text-[11px] text-textLight">Statutory audit, platform & deployment</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-xs font-bold text-textLight uppercase">Ground Research</p>
            <p className="text-xl font-bold text-primary my-1">29 Buildings</p>
            <p className="text-[11px] text-textLight">1,218 checkpoints & 187 barriers audited</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-xs font-bold text-textLight uppercase">Authorship & Viva</p>
            <p className="text-xl font-bold text-primary my-1">100% Solo</p>
            <p className="text-[11px] text-textLight">Authentic field research & full codebase</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider">
            <Award size={14} /> Evaluation Ready: Complete CUSoC Deliverable Suite
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
            Ready for Live Evaluation & Demonstration
          </h3>
          <p className="text-sm text-white/90 max-w-2xl mx-auto leading-relaxed">
            All code is fully tested, containerized with Docker, covered by CI/CD, and live in this deployment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg font-bold" icon={ArrowRight}>
                Launch Dashboard Demo
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="secondary" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20" icon={Map}>
                Explore Campus Map
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
];

const ProjectPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col font-sans select-none">
      {/* Top Presentation Bar */}
      <header className="glass sticky top-0 z-50 border-b border-gray-100/50 px-6 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold font-heading hover:scale-105 transition-transform">
            CU
          </Link>
          <div>
            <span className="font-heading font-bold text-sm tracking-tight text-textMain">
              CUSoC '26 <span className="text-primary">Evaluation Deck</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-textLight font-medium">
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
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-7 bg-primary' 
                  : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
              title={`Slide ${index + 1}: ${slide.category}`}
            />
          ))}
          <span className="ml-3 text-xs font-bold text-textLight font-mono">
            {currentSlide + 1} / {SLIDES.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="secondary" size="xs" icon={Home}>
              Exit Deck
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Slide Content Canvas */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8 max-w-6xl w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex flex-col space-y-6"
          >
            {/* Slide Header */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                {SLIDES[currentSlide].category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-textMain tracking-tight">
                {SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-textLight font-medium">
                {SLIDES[currentSlide].subtitle}
              </p>
            </div>

            {/* Slide Body */}
            <div className="py-2">
              {SLIDES[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Dock */}
      <footer className="glass sticky bottom-0 z-50 border-t border-gray-100/50 px-6 py-3.5 flex justify-between items-center">
        <Button 
          variant="secondary" 
          size="sm" 
          icon={ChevronLeft} 
          onClick={handlePrev} 
          disabled={currentSlide === 0}
        >
          Previous
        </Button>

        <div className="text-xs text-textLight hidden sm:block">
          Use <kbd className="px-2 py-0.5 rounded bg-gray-100 border text-gray-700 font-mono text-[11px]">Left</kbd> and <kbd className="px-2 py-0.5 rounded bg-gray-100 border text-gray-700 font-mono text-[11px]">Right</kbd> arrow keys to navigate
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
          <Link to="/dashboard">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              Explore Live Demo
            </Button>
          </Link>
        )}
      </footer>
    </div>
  );
};

export default ProjectPresentation;
