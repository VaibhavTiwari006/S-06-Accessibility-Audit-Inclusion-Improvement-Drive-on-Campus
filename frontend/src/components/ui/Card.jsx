import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseClasses = "bg-cards rounded-2xl shadow-sm border border-gray-100 overflow-hidden";
  const hoverClasses = hover ? "transition-all hover:shadow-md hover:-translate-y-1" : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, children, className = '' }) => (
  <div className={`p-6 border-b border-gray-50 flex justify-between items-start ${className}`}>
    {children ? children : (
      <>
        <div>
          {title && <h3 className="text-lg font-heading font-bold text-textMain">{title}</h3>}
          {subtitle && <p className="text-sm text-textLight mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </>
    )}
  </div>
);

export const CardContent = ({ children, className = '', noPadding = false }) => (
  <div className={`${noPadding ? '' : 'p-6'} ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-gray-50 bg-gray-50/30 ${className}`}>
    {children}
  </div>
);

export const AnimatedCard = motion(Card);
