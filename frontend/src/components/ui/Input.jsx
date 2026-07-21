import React from 'react';

const Input = React.forwardRef(({ label, error, className = '', id, icon: Icon, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label htmlFor={inputId} className="block text-sm font-semibold text-textMain">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon size={16} className="text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} pr-4 py-2.5 bg-cards border rounded-xl text-sm font-medium text-textMain placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-primary transition-all shadow-sm ${error ? 'border-danger focus:border-danger ring-danger/20' : 'border-gray-200'}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-danger font-medium mt-1">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;
