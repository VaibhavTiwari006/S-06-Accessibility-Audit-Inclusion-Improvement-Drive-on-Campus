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
const AIScanner = lazy(() => import('../pages/AIScanner'));
const QRCodeManager = lazy(() => import('../pages/QRCodeManager'));
const InstantQRReport = lazy(() => import('../pages/InstantQRReport'));
const AwarenessPage = lazy(() => import('../pages/AwarenessPage'));
const CalculatorPage = lazy(() => import('../pages/CalculatorPage'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] bg-transparent">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg shadow-primary/5 border border-gray-100/80 backdrop-blur-sm">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20"
        >
          <span className="text-white font-bold text-lg font-heading tracking-tight">CU</span>
        </motion.div>
        
        {/* Subtle spinning ring around the logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-2xl border border-transparent border-t-primary/30 border-r-primary/10"
        />
      </div>
      
      <div className="flex flex-col items-center gap-3">
        <motion.p 
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm font-semibold text-textLight tracking-wide"
        >
          Loading Workspace
        </motion.p>
        
        {/* Sleek sleek premium loading bar */}
        <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            animate={{ 
              x: ['-100%', '100%'],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className="w-1/2 h-full bg-primary rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          />
        </div>
      </div>
    </motion.div>
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
        <Route path="/scanner" element={<ProtectedRoute><MainLayout><AIScanner /></MainLayout></ProtectedRoute>} />
        <Route path="/qr-code" element={<ProtectedRoute><MainLayout><QRCodeManager /></MainLayout></ProtectedRoute>} />
        <Route path="/qr-report/:buildingId" element={<ProtectedRoute><MainLayout><InstantQRReport /></MainLayout></ProtectedRoute>} />
        <Route path="/awareness" element={<ProtectedRoute><MainLayout><AwarenessPage /></MainLayout></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><MainLayout><CalculatorPage /></MainLayout></ProtectedRoute>} />

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
