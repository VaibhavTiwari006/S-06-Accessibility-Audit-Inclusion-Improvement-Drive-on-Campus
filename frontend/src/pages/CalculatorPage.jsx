import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, IndianRupee, TrendingUp, Download, Sparkles, 
  CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
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
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 'RAMP', quantity: 2 },
    { id: 'TACTILE', quantity: 5 },
    { id: 'SIGNAGE', quantity: 8 },
    { id: 'GRABBAR', quantity: 4 },
    { id: 'DOOR', quantity: 0 },
    { id: 'ELEVATOR', quantity: 0 },
  ]);

  // Ramp Simulator State
  const [rampRatio, setRampRatio] = useState(12);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  const rampAngle = Math.atan(1 / rampRatio) * (180 / Math.PI);
  const wedgeHeight = (200 / rampRatio) * 1.5; // Scaled up slightly for clear visibility

  const wheelchairX = 250 - 200 * simProgress;
  const wheelchairY = (110 - wedgeHeight) + wedgeHeight * simProgress;

  const rampColor = rampRatio < 12 ? '#EF4444' : rampRatio <= 14 ? '#F59E0B' : '#10B981';

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimProgress(0);
    let current = 0;
    const duration = 1500; // 1.5 seconds
    const intervalTime = 30; // 30ms ticks
    const steps = duration / intervalTime;
    const increment = 1 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 1) {
        clearInterval(timer);
        setSimProgress(1);
        setIsSimulating(false);
      } else {
        setSimProgress(current);
      }
    }, intervalTime);
  };

  const updateQuantity = (id, delta) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (!exists) {
        return [...prev, { id, quantity: Math.max(0, delta) }];
      }
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const template = REMEDIATION_TEMPLATES.find((t) => t.id === item.id);
      return sum + (template ? template.unitCost * item.quantity : 0);
    }, 0);
  };

  const handleExportEstimate = () => {
    const selectedItems = items.filter(item => item.quantity > 0);
    
    if (selectedItems.length === 0) {
      toast.warning('No items selected in the calculator to export!');
      return;
    }

    setIsExportModalOpen(true);
  };

  const exportCSV = () => {
    const selectedItems = items.filter(item => item.quantity > 0);
    const headers = ['Item ID', 'Description', 'Category', 'Impact Level', 'Cost Level', 'Unit Cost (INR)', 'Quantity', 'Subtotal (INR)'];
    const rows = selectedItems.map(item => {
      const template = REMEDIATION_TEMPLATES.find(t => t.id === item.id);
      if (!template) return null;
      return [
        template.id,
        `"${template.name}"`,
        template.category,
        template.impact,
        template.costRating,
        template.unitCost,
        item.quantity,
        template.unitCost * item.quantity
      ];
    }).filter(Boolean);

    const totalBudget = calculateTotal();
    rows.push(['TOTAL', '"Total Estimated Budget"', '', '', '', '', '', totalBudget]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Accessibility_Budget_Estimate_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExportModalOpen(false);
    toast.success('CSV spreadsheet downloaded successfully!');
  };

  const exportPDF = () => {
    const selectedItems = items.filter(item => item.quantity > 0);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Pop-up blocker prevented generating PDF. Please allow popups for this site.');
      return;
    }

    const totalBudget = calculateTotal();
    const totalItems = items.reduce((s, i) => s + i.quantity, 0);

    const htmlRows = selectedItems.map(item => {
      const template = REMEDIATION_TEMPLATES.find(t => t.id === item.id);
      if (!template) return '';
      return `
        <tr>
          <td><strong>${template.name}</strong><br/><small>${template.category}</small></td>
          <td style="text-align: center;"><span style="padding: 2px 8px; font-size: 11px; border-radius: 4px; background: #ecfdf5; color: #047857; font-weight: bold;">${template.impact}</span></td>
          <td style="text-align: right;">₹${template.unitCost.toLocaleString()}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right; font-weight: bold;">₹${(template.unitCost * item.quantity).toLocaleString()}</td>
        </tr>
      `;
    }).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Accessibility Budget Estimate Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #1f2937; line-height: 1.5; padding: 40px; }
            .header { border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 24px; font-weight: 800; color: #111827; margin: 0; }
            .meta { font-size: 13px; color: #6b7280; text-align: right; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background-color: #f9fafb; border-bottom: 2px solid #e5e7eb; padding: 12px; font-weight: bold; text-align: left; font-size: 13px; color: #4b5563; }
            td { border-bottom: 1px solid #e5e7eb; padding: 12px; font-size: 13px; }
            .total-section { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
            .total-title { font-size: 14px; font-weight: bold; color: #047857; margin: 0; }
            .total-val { font-size: 24px; font-weight: 800; color: #065f46; margin: 0; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">Accessibility Remediation Estimate</h1>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #4b5563;">Official Campus Infrastructure Improvement Plan</p>
            </div>
            <div class="meta">
              Date: ${new Date().toLocaleDateString()}<br/>
              Status: Draft Budget Proposal
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Remediation Item</th>
                <th style="text-align: center;">Priority Impact</th>
                <th style="text-align: right;">Unit Cost</th>
                <th style="text-align: center;">Quantity</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${htmlRows}
            </tbody>
          </table>

          <div class="total-section">
            <div>
              <p class="total-title">TOTAL PROPOSED REMEDIATION BUDGET</p>
              <p style="margin: 2px 0 0 0; color: #065f46; font-size: 13px;">Selected Units: ${totalItems} improvement items</p>
            </div>
            <div class="total-val">₹${totalBudget.toLocaleString()}</div>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    setIsExportModalOpen(false);
    toast.success('Budget estimate PDF generated successfully!');
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

          {/* Ramp Simulator Card */}
          <Card className="p-6 bg-white border border-gray-100 shadow-xl space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="font-bold text-textMain text-sm font-heading flex items-center gap-2">
                <Sparkles size={16} className="text-primary animate-pulse" />
                Interactive Ramp Simulator
              </h3>
              <p className="text-[11px] text-gray-400 font-medium">Verify safe slopes for physical access design.</p>
            </div>

            <div className="space-y-4">
              {/* Slope Ratio Control */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                  <span>Slope Ratio (1 : X)</span>
                  <span className="text-primary">1 : {rampRatio}</span>
                </div>
                <input 
                  type="range" 
                  min="6" 
                  max="20" 
                  step="1"
                  value={rampRatio} 
                  onChange={(e) => {
                    setRampRatio(parseInt(e.target.value));
                    setIsSimulating(false);
                    setSimProgress(0);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Ramp Angle</span>
                  <span className="text-sm font-extrabold text-gray-700">{rampAngle.toFixed(1)}°</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Safety Status</span>
                  <span className={`text-xs font-black uppercase tracking-wider block mt-0.5 ${
                    rampRatio < 12 ? 'text-red-600' : rampRatio <= 14 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {rampRatio < 12 ? '❌ Dangerous' : rampRatio <= 14 ? '⚠️ Borderline' : '✅ Safe'}
                  </span>
                </div>
              </div>

              {/* Virtual Ramp Drawing (SVG) */}
              <div className="h-32 bg-slate-900 rounded-2xl relative overflow-hidden flex items-end p-4 border border-slate-800 shadow-inner">
                {/* SVG for Ramp Vector */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  {/* Ground Level line */}
                  <line x1="0" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="2" />
                  
                  {/* Wedge (Ramp) */}
                  <polygon 
                    points={`30,110 30,110 270,${110 - wedgeHeight} 270,110`} 
                    fill={rampColor} 
                    className="opacity-20 transition-all duration-300"
                  />
                  <line 
                    x1="30" 
                    y1="110" 
                    x2="270" 
                    y2={110 - wedgeHeight} 
                    stroke={rampColor} 
                    strokeWidth="3" 
                    className="transition-all duration-300"
                  />

                  {/* Wheelchair Avatar */}
                  <g 
                    transform={`translate(${wheelchairX}, ${wheelchairY}) rotate(${-rampAngle})`}
                    className="transition-all duration-100"
                  >
                    {/* Wheelchair Circle Wheel */}
                    <circle cx="0" cy="0" r="8" stroke="#f8fafc" strokeWidth="2" fill="none" />
                    <circle cx="0" cy="0" r="3" fill="#f8fafc" />
                    {/* Seat and back */}
                    <path d="M-5,-11 L-5,-3 L6,-3" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    {/* Passenger head */}
                    <circle cx="-1" cy="-16" r="3" fill="#f8fafc" />
                  </g>
                </svg>

                {/* Crash/Success Label */}
                {simProgress === 1 && (
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider animate-bounce shadow-md ${
                    rampRatio < 12 ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {rampRatio < 12 ? '💥 Tipped over!' : '🎉 Safe descent!'}
                  </div>
                )}
              </div>

              {/* Simulator Action Button */}
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSimulating 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20'
                }`}
              >
                {isSimulating ? 'Simulating descent...' : 'Simulate Wheelchair Descent'}
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Export Format Selector Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Select Export Format"
        maxWidth="max-w-md"
      >
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-500 font-medium">
            Choose how you would like to download your campus accessibility budget breakdown:
          </p>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                CSV
              </div>
              <div>
                <h4 className="font-bold text-textMain text-sm">Spreadsheet (CSV)</h4>
                <p className="text-xs text-gray-500">Perfect for Microsoft Excel or Google Sheets.</p>
              </div>
            </button>

            <button
              onClick={exportPDF}
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                PDF
              </div>
              <div>
                <h4 className="font-bold text-textMain text-sm">Printable Document (PDF)</h4>
                <p className="text-xs text-gray-500">Clean, formatted proposal document ready to print.</p>
              </div>
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setIsExportModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalculatorPage;
