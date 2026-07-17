import React, { useState } from 'react';
import { X, Lightbulb, MapPin, DollarSign, Tag, BarChart2 } from 'lucide-react';
import { toast } from 'react-toastify';
import pilotService from '../services/pilotService';

const CATEGORIES = ['RAMP', 'SIGNAGE', 'WASHROOM', 'DIGITAL', 'LIGHTING', 'OTHER'];
const IMPACTS = ['LOW', 'MEDIUM', 'HIGH'];

const ProposePilotModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    estimatedCost: '',
    impactLevel: 'MEDIUM',
    category: 'OTHER',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Title and description are required.');
      return;
    }
    try {
      setSubmitting(true);
      await pilotService.propose({
        ...form,
        estimatedCost: form.estimatedCost ? parseFloat(form.estimatedCost) : null,
      });
      toast.success('Pilot proposal submitted successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error('Failed to submit proposal. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-panel rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-slide-up border border-white/60">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-5 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-xl shadow-sm">
              <Lightbulb size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-heading font-bold text-lg leading-tight">Propose a Pilot</h2>
              <p className="text-white/80 text-xs font-medium mt-0.5">Submit a low-cost accessibility idea</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-7 space-y-5 bg-white/40">
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Title <span className="text-danger">*</span></label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={200}
              placeholder="e.g., Braille signage on Lab doors"
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Description <span className="text-danger">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              maxLength={2000}
              placeholder="Describe the problem and your proposed low-cost solution..."
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">
                <MapPin size={13} className="inline mr-1 text-primary" />Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Block A, Ground"
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">
                <DollarSign size={13} className="inline mr-1 text-success" />Est. Cost (₹)
              </label>
              <input
                name="estimatedCost"
                value={form.estimatedCost}
                onChange={handleChange}
                type="number"
                min="0"
                step="100"
                placeholder="e.g., 2500"
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">
                <Tag size={13} className="inline mr-1 text-secondary" />Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">
                <BarChart2 size={13} className="inline mr-1 text-purple-500" />Impact Level
              </label>
              <select
                name="impactLevel"
                value={form.impactLevel}
                onChange={handleChange}
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain"
              >
                {IMPACTS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/60 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-textLight bg-gray-100 hover:bg-gray-200 hover:text-textMain rounded-xl transition-all">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center gap-2"
            >
              {submitting ? 'Submitting...' : <><Lightbulb size={16} /> Submit Proposal</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProposePilotModal;
