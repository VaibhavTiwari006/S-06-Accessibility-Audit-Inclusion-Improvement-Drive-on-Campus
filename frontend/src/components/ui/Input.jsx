import React from 'react';

const Input = React.forwardRef(({ label, error, className = '', id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={space-y-1.5 }>
      {label && <label htmlFor={inputId} className="block text-sm font-semibold text-textMain">{label}</label>}
      <input
        ref={ref}
        id={inputId}
        className={w-full px-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-textMain placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-primary transition-all shadow-sm }
        {...props}
      />
      {error && <p className="text-xs text-danger font-medium mt-1">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;
