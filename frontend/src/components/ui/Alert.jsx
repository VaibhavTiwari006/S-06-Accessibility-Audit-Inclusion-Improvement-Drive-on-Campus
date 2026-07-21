import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: AlertCircle,
};

const styles = {
  info: 'bg-primary/5 text-primary border-primary/20',
  success: 'bg-success/5 text-success-dark border-success/20',
  warning: 'bg-warning/5 text-warning-dark border-warning/20',
  danger: 'bg-danger/5 text-danger-dark border-danger/20',
};

const Alert = ({ variant = 'info', title, children, className = '' }) => {
  const Icon = icons[variant];
  return (
    <div className={`p-4 rounded-xl border flex gap-3 ${styles[variant]} ${className}`} role="alert">
      {Icon && <Icon className="shrink-0 mt-0.5" size={20} />}
      <div>
        {title && <h5 className="font-bold mb-1">{title}</h5>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
};
export default Alert;
