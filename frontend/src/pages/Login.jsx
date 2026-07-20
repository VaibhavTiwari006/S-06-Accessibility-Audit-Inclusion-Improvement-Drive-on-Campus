import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[30s] ease-linear hover:scale-110 opacity-40 mix-blend-overlay"
        style={{ 
          backgroundImage: "url('/campus_bg.jpg')",
          animation: "pulseSlow 20s infinite alternate" 
        }}
      />
      
      {/* Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] mix-blend-screen" />

      <div className="relative z-10 w-full max-w-md px-4 sm:px-0 animate-fade-in">
        <div className="glass-panel p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-white/20 backdrop-blur-2xl">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white mb-6 shadow-lg shadow-primary/30 animate-float">
              <LogIn size={28} />
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-textMain tracking-tight">CU Access Audit</h2>
            <p className="mt-3 text-sm text-textLight font-medium">
              Chandigarh University Accessibility Portal
            </p>
          </div>
          
          {error && (
            <div className="mb-6 animate-scale-in">
              <Alert variant="danger">{error}</Alert>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
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

            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
              >
                Sign In to Portal
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
             <p className="text-xs text-gray-500 font-medium">
               Authorized Personnel Only &bull; S-06 Project
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
