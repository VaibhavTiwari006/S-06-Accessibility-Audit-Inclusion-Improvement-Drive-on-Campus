import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] ease-linear hover:scale-110"
        style={{ 
          backgroundImage: "url('/campus_bg.jpg')",
          animation: "pulseSlow 20s infinite alternate" 
        }}
      ></div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in animate-slide-up">
        <div className="glass-panel p-8 rounded-3xl shadow-soft-lg mx-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 shadow-inner">
              <LogIn size={32} />
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-textMain tracking-tight">CU Access Audit</h2>
            <p className="mt-2 text-sm text-textLight font-medium">
              Chandigarh University Accessibility Portal
            </p>
          </div>
          
          {error && (
            <div className="mb-6 bg-danger-50 border-l-4 border-danger p-4 flex items-start gap-3 rounded-r-xl shadow-sm">
              <AlertCircle className="text-danger flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-danger-dark font-semibold" role="alert">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-textMain mb-1">Email Address</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-textMain"
                  placeholder="admin@campus.edu"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-textMain mb-1">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-textMain"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white tracking-wide ${isSubmitting ? 'bg-primary-light cursor-not-allowed' : 'bg-primary hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'} transition-all duration-200`}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In to Portal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
