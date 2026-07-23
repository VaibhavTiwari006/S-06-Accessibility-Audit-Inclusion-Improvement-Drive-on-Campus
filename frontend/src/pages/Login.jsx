import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff, ShieldCheck, UserCheck, Users, Wrench, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';

const ROLE_OPTIONS = [
  {
    role: 'ADMIN',
    title: 'Administrator',
    email: 'admin@campus.edu',
    password: 'admin123',
    icon: ShieldCheck,
    color: 'bg-red-50 text-red-700 border-red-200'
  },
  {
    role: 'AUDITOR',
    title: 'Auditor',
    email: 'auditor@campus.edu',
    password: 'auditor123',
    icon: UserCheck,
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    role: 'STUDENT',
    title: 'Student',
    email: 'student@campus.edu',
    password: 'student123',
    icon: Users,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    role: 'MAINTENANCE',
    title: 'Maintenance',
    email: 'maintenance@campus.edu',
    password: 'maintenance123',
    icon: Wrench,
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  }
];

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialEmail = queryParams.get('email') || 'admin@campus.edu';
  const initialRole = queryParams.get('role') || 'ADMIN';

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const roleObj = ROLE_OPTIONS.find(r => r.role === selectedRole);
    if (roleObj) {
      setEmail(roleObj.email);
      setPassword(roleObj.password);
    }
  }, [selectedRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid credentials. Please check your email & password.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 py-12 px-4">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: "url('/campus_bg.jpg')" }}
      />
      
      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] mix-blend-screen" />

      <div className="relative z-10 w-full max-w-xl animate-fade-in">
        <div className="glass-panel p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-white/20 backdrop-blur-2xl space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/30 animate-float">
              <LogIn size={28} />
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-textMain tracking-tight">
              CU Access Audit Verification
            </h2>
            <p className="text-sm text-textLight font-medium">
              Select your campus role and enter valid credentials to access the Dashboard.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              1. Choose Campus Role:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {ROLE_OPTIONS.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                      isSelected 
                        ? 'bg-primary text-white border-primary shadow-md scale-105' 
                        : 'bg-white/60 hover:bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    <Icon size={18} className="mb-1" />
                    <span>{r.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="animate-scale-in">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}

          {/* Credential Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                2. Verify Credentials:
              </label>
              <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                <span>Default credentials pre-filled for <strong>{selectedRole}</strong></span>
              </p>
            </div>

            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@campus.edu"
            />

            <div className="space-y-1.5 relative">
              <Input
                label="Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
                icon={ArrowRight}
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary shadow-lg"
              >
                Verify & Enter Dashboard
              </Button>
            </div>
          </form>

          <div className="text-center border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500 font-medium">
              Authorized Personnel Only &bull; S-06 Inclusion Project
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
