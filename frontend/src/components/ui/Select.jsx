import React from 'react';

const Select = React.forwardRef(({ label, error, options, className = '', id, ...props }, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={space-y-1.5 }>
      {label && <label htmlFor={selectId} className="block text-sm font-semibold text-textMain">{label}</label>}
      <select
        ref={ref}
        id={selectId}
        className={w-full px-4 py-2.5 bg-white border rounded-xl text-sm font-medium text-textMain focus:outline-none focus:ring-2 focus:border-primary transition-all shadow-sm appearance-none }
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-danger font-medium mt-1">{error}</p>}
    </div>
  );
});
Select.displayName = 'Select';
export default Select;
