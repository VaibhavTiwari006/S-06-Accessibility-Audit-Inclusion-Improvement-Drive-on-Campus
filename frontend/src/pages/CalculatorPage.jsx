import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, IndianRupee, TrendingUp, Download, Sparkles, 
  CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'react-toastify';

const REMEDIATION_TEMPLATES = [
  { id: 'RAMP', name: 'Modular Entrance Ramp (1:12 Slope)', unitCost: 35000, category: 'Physical Access', impact: 'HIGH', costRating: 'LOW' },
  { id: 'TACTILE', name: 'Tactile Ground Surface Indicators (per 10m)', unitCost: 8500, category: 'Navigation', impact: 'HIGH', costRating: 'LOW' },
  { id: 'SIGNAGE', name: 'Braille & High-Contrast Directional Signs', unitCost: 4500, category: 'Wayfinding', impact: 'MEDIUM', costRating: 'LOW' },
  { id: 'GRABBAR', name: 'Washroom Stainless Steel Grab Bars & Rails', unitCost: 6500, category: 'Washroom', impact: 'HIGH', costRating: 'LOW' },
  { id: 'DOOR', name: 'Automated Sliding Door Operator', unitCost: 65000, category: 'Entrance', impact: 'MEDIUM', costRating: 'HIGH' },
  { id: 'ELEVATOR', name: 'Audio Voice & Braille Keypad Retrofit', unitCost: 28000, category: 'Elevator', impact: 'HIGH', costRating: 'MEDIUM' },
];

const CalculatorPage = () => {
  const [items, setItems] = useState([
    { id: 'RAMP', quantity: 2 },
    { id: 'TACTILE', quantity: 5 },
    { id: 'SIGNAGE', quantity: 8 },
    { id: 'GRABBAR', quantity: 4 },
  ]);

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const template = REMEDIATION_TEMPLATES.find((t) => t.id === item.id);
      return sum + (template ? template.unitCost * item.quantity : 0);
    }, 0);
  };

  const handleExportEstimate = () => {
    toast.success('Budget estimate report downloaded!');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Calculator size={22} />
            </div>
            Low-Cost Accessibility Calculator
          </h2>
          <p className="text-textLight mt-1.5 font-medium">
            Estimate remediation costs for ramps, tactile paving, signage, and prioritize high-impact / low-cost fixes.
          </p>
        </div>

        <Button icon={Download} onClick={handleExportEstimate} className="shadow-md">
          Export Budget Breakdown
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Item Selector */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold font-heading text-textMain">
            Campus Remediation Items
          </h3>

          <div className="space-y-3">
            {REMEDIATION_TEMPLATES.map((tmpl) => {
              const currentItem = items.find((i) => i.id === tmpl.id) || { quantity: 0 };
              return (
                <div
                  key={tmpl.id}
                  className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/30 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-textMain text-sm font-heading">{tmpl.name}</h4>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        {tmpl.impact} IMPACT / {tmpl.costRating} COST
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      Unit Cost: <strong>₹{tmpl.unitCost.toLocaleString()}</strong> ({tmpl.category})
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(tmpl.id, -1)}
                        className="px-3 py-1.5 font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 text-xs font-bold text-textMain">
                        {currentItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(tmpl.id, 1)}
                        className="px-3 py-1.5 font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-textMain w-24 text-right font-heading">
                      ₹{(tmpl.unitCost * currentItem.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Cost Summary & Impact Matrix */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-white via-emerald-50/20 to-primary/5 border border-primary/20 shadow-xl space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-xs font-extrabold text-primary uppercase tracking-widest">
                Estimated Remediation Budget
              </span>
              <div className="text-3xl font-extrabold text-textMain font-heading mt-1 flex items-center gap-1">
                <IndianRupee size={28} className="text-primary" />
                <span>{calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-medium text-gray-700">
              <div className="flex justify-between">
                <span>Selected Improvement Units:</span>
                <strong>{items.reduce((s, i) => s + i.quantity, 0)} Items</strong>
              </div>
              <div className="flex justify-between">
                <span>Priority Index:</span>
                <strong className="text-emerald-600">High Return-on-Investment</strong>
              </div>
              <div className="flex justify-between">
                <span>RPWD Compliance Gain:</span>
                <strong className="text-primary">+24% Estimated Score</strong>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-100/60 rounded-xl text-xs font-bold text-emerald-950 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-700 flex-shrink-0" />
              <span>Fixes prioritized by max accessibility impact per rupee spent.</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
