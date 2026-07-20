import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  rounded = 'full',
  icon: Icon,
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center font-semibold transition-colors';
  
  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
    success: 'bg-success/10 text-success-dark border border-success/20',
    warning: 'bg-warning/10 text-warning-dark border border-warning/20',
    danger: 'bg-danger/10 text-danger-dark border border-danger/20',
    gray: 'bg-gray-100 text-gray-700 border border-gray-200',
    outline: 'bg-transparent text-gray-700 border border-gray-300',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };
  
  const roundedStyles = {
    full: 'rounded-full',
    md: 'rounded-md',
    lg: 'rounded-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedStyles[rounded]} ${className}`;

  return (
    <span className={classes}>
      {Icon && <Icon size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />}
      {children}
    </span>
  );
};

export default Badge;
