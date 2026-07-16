import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layout/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import BuildingList from '../pages/BuildingList';
import AuditList from '../pages/AuditList';
import IssueList from '../pages/IssueList';
import Reports from '../pages/Reports';
import Community from '../pages/Community';
import Settings from '../pages/Settings';
import Roadmap from '../pages/Roadmap';

// Placeholder Pages
const NotFound = () => <div className="p-10 text-danger font-semibold">404 - Page Not Found</div>;

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute allowedRoles={['ADMIN', 'MAINTENANCE']}><MainLayout><Roadmap /></MainLayout></ProtectedRoute>} />
        <Route path="/buildings" element={<ProtectedRoute allowedRoles={['ADMIN', 'AUDITOR']}><MainLayout><BuildingList /></MainLayout></ProtectedRoute>} />
        <Route path="/audits" element={<ProtectedRoute allowedRoles={['ADMIN', 'AUDITOR']}><MainLayout><AuditList /></MainLayout></ProtectedRoute>} />
        <Route path="/issues" element={<ProtectedRoute><MainLayout><IssueList /></MainLayout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><MainLayout><Reports /></MainLayout></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><MainLayout><Community /></MainLayout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={['ADMIN']}><MainLayout><Settings /></MainLayout></ProtectedRoute>} />

        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
