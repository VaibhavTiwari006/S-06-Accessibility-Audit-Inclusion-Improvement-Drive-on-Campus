import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layout/MainLayout';
import Login from '../pages/Login';

// Placeholder Pages
const Dashboard = () => <div className="p-10 text-xl font-semibold">Welcome to Dashboard</div>;
const NotFound = () => <div className="p-10 text-danger font-semibold">404 - Page Not Found</div>;

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />

        
        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
