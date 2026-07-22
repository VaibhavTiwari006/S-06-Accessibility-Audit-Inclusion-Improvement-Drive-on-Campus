import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layout/MainLayout';

// Lazy loaded pages for performance optimization (Quarter II/III requirement)
const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const BuildingList = lazy(() => import('../pages/BuildingList'));
const AuditList = lazy(() => import('../pages/AuditList'));
const IssueList = lazy(() => import('../pages/IssueList'));
const EvidenceGallery = lazy(() => import('../pages/EvidenceGallery'));
const Reports = lazy(() => import('../pages/Reports'));
const Community = lazy(() => import('../pages/Community'));
const Settings = lazy(() => import('../pages/Settings'));
const Roadmap = lazy(() => import('../pages/Roadmap'));
const AccessibilityPreferences = lazy(() => import('../pages/AccessibilityPreferences'));
const CampusMap = lazy(() => import('../pages/CampusMap'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-8">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20 rounded-full border-[3px] border-dashed border-primary/30"
        />
        {/* Inner solid spinning arc */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-14 h-14 rounded-full border-t-[3px] border-r-[3px] border-primary"
        />
        {/* Center pulsing core */}
        <motion.div
          animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"
        />
      </div>
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-1.5"
      >
        <span className="text-xs font-black text-primary tracking-[0.3em] uppercase">Loading</span>
        <span className="flex gap-0.5">
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-primary rounded-full"></motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="w-1 h-1 bg-primary rounded-full"></motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="w-1 h-1 bg-primary rounded-full"></motion.span>
        </span>
      </motion.div>
    </div>
  </div>
);

// Placeholder Pages
const NotFound = () => <div className="p-10 text-danger font-semibold text-center mt-20 text-xl">404 - Page Not Found</div>;

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute allowedRoles={['ADMIN', 'MAINTENANCE']}><MainLayout><Roadmap /></MainLayout></ProtectedRoute>} />
        <Route path="/buildings" element={<ProtectedRoute allowedRoles={['ADMIN', 'AUDITOR']}><MainLayout><BuildingList /></MainLayout></ProtectedRoute>} />
        <Route path="/audits" element={<ProtectedRoute allowedRoles={['ADMIN', 'AUDITOR']}><MainLayout><AuditList /></MainLayout></ProtectedRoute>} />
        <Route path="/issues" element={<ProtectedRoute><MainLayout><IssueList /></MainLayout></ProtectedRoute>} />
        <Route path="/evidence" element={<ProtectedRoute allowedRoles={['ADMIN', 'AUDITOR', 'MAINTENANCE']}><MainLayout><EvidenceGallery /></MainLayout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><MainLayout><Reports /></MainLayout></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><MainLayout><Community /></MainLayout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={['ADMIN']}><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
        <Route path="/accessibility" element={<ProtectedRoute><MainLayout><AccessibilityPreferences /></MainLayout></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><MainLayout><CampusMap /></MainLayout></ProtectedRoute>} />

        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
