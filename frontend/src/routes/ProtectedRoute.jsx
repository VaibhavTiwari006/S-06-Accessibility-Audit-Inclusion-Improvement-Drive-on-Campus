import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, isTokenValid, clearSession } from '../context/AuthContext';
import { ShieldAlert, ArrowRight, LogIn } from 'lucide-react';
import Button from '../components/ui/Button';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole') || user?.role;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Strict Token & Session Verification — kick out if missing or expired
  if (!token || !user || !isTokenValid(token)) {
    clearSession();
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Role Authorization Check — show explicit access denied screen instead of silent redirect
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 border border-red-200 flex items-center justify-center mb-4 shadow-sm">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-2xl font-bold text-textMain font-heading">Restricted Access</h2>
        <p className="text-textLight text-sm mt-2 leading-relaxed">
          Your current active role (<span className="font-bold text-primary">{userRole || 'GUEST'}</span>) does not have authorization to view this workflow.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <Button
            variant="primary"
            onClick={() => window.location.href = '/dashboard'}
            icon={ArrowRight}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="secondary"
            onClick={logout}
            icon={LogIn}
          >
            Switch Role
          </Button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
