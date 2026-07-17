import React, { useState } from 'react';
import { MessageSquarePlus, X, Send } from 'lucide-react';
import { accessibleToast as toast } from '../utils/accessibleToast';

const QuickReportFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reportText, setReportText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Accessibility barrier reported! Maintenance has been notified.');
      setReportText('');
      setIsOpen(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-soft-lg hover:bg-primary-dark transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/30 ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        aria-label="Quick Report Accessibility Barrier"
      >
        <MessageSquarePlus size={24} />
      </button>

      {/* Pop-up Form */}
      <div 
        className={`absolute bottom-0 right-0 w-80 bg-white rounded-2xl shadow-soft-lg border border-gray-100 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        <div className="bg-primary p-4 rounded-t-2xl flex justify-between items-center text-white">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageSquarePlus size={18} /> Quick Report
          </h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <p className="text-xs text-textLight mb-3">Encountered a broken elevator, blocked ramp, or missing sign? Report it immediately.</p>
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="Describe the barrier and location..."
            className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none mb-3"
            required
            aria-label="Describe the barrier"
          ></textarea>
          <button 
            type="submit"
            disabled={!reportText.trim()}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl flex justify-center items-center gap-2 transition-colors"
          >
            <Send size={16} /> Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickReportFAB;
