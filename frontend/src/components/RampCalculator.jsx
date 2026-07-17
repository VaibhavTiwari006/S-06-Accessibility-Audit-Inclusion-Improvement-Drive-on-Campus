import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const RampCalculator = () => {
  const [rise, setRise] = useState('');
  const [ratio, setRatio] = useState(12); // standard 1:12 ratio

  const calculateRun = () => {
    if (!rise) return 0;
    return (parseFloat(rise) * ratio).toFixed(2);
  };

  return (
    <div className="bg-white/80 p-5 rounded-xl border border-gray-100 shadow-sm mt-4">
      <h4 className="font-bold text-textMain flex items-center gap-2 mb-4">
        <Calculator size={18} className="text-primary" /> Ramp Slope Calculator
      </h4>
      <div className="space-y-4">
        <div>
          <label htmlFor="rise" className="block text-xs font-semibold text-textLight uppercase mb-1">Rise (Height) in inches</label>
          <input
            id="rise"
            type="number"
            value={rise}
            onChange={(e) => setRise(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm"
            placeholder="e.g. 10"
          />
        </div>
        <div>
          <label htmlFor="ratio" className="block text-xs font-semibold text-textLight uppercase mb-1">Target Ratio (1:X)</label>
          <select
            id="ratio"
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm"
          >
            <option value={12}>1:12 (ADA Standard)</option>
            <option value={16}>1:16 (More Accessible)</option>
            <option value={20}>1:20 (Extremely Accessible)</option>
          </select>
        </div>
        <div className="pt-3 border-t border-gray-100">
          <p className="text-sm text-textLight">Required Run (Length):</p>
          <p className="text-2xl font-bold text-primary">{calculateRun()} inches</p>
          <p className="text-xs text-gray-400 mt-1">({(calculateRun() / 12).toFixed(2)} feet)</p>
        </div>
      </div>
    </div>
  );
};

export default RampCalculator;
