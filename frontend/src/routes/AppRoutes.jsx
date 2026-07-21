import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-textLight">Loading module...</p>
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
