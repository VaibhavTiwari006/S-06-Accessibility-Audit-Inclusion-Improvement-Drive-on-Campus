import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AccessibilityProvider } from './context/AccessibilityContext.jsx'

// Auto-recovery for stale asset chunk loading failures
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && (
    event.reason.name === 'ChunkLoadError' ||
    event.reason.message?.includes('Failed to fetch dynamically imported module') ||
    event.reason.message?.includes('Importing a module script failed')
  )) {
    const hasReloaded = sessionStorage.getItem('chunk_reload_key');
    if (!hasReloaded) {
      sessionStorage.setItem('chunk_reload_key', 'true');
      window.location.reload();
    }
  }
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (error?.message?.includes('Failed to fetch') || error?.name === 'ChunkLoadError') {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
          <div className="glass-panel p-8 rounded-3xl max-w-md border border-white/10 space-y-4">
            <h2 className="text-2xl font-bold font-heading">Updating Application...</h2>
            <p className="text-sm text-slate-300">A new version of AccessAudit was deployed. Refreshing your workspace...</p>
            <button 
              onClick={() => { sessionStorage.clear(); window.location.reload(); }}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all"
            >
              Refresh Workspace
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <AccessibilityProvider>
          <App />
        </AccessibilityProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
