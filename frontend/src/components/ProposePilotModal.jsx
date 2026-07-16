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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Lightbulb size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Propose a Pilot Improvement</h2>
              <p className="text-white/70 text-sm">Submit a low-cost accessibility idea</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-textMain mb-1">Title <span className="text-danger">*</span></label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={200}
              placeholder="e.g., Braille signage on Lab doors"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-textMain mb-1">Description <span className="text-danger">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              maxLength={2000}
              placeholder="Describe the problem and your proposed low-cost solution..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-textMain mb-1">
                <MapPin size={13} className="inline mr-1" />Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Block A, Ground Floor"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-textMain mb-1">
                <DollarSign size={13} className="inline mr-1" />Est. Cost (₹)
              </label>
              <input
                name="estimatedCost"
                value={form.estimatedCost}
                onChange={handleChange}
                type="number"
                min="0"
                step="100"
                placeholder="e.g., 2500"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-textMain mb-1">
                <Tag size={13} className="inline mr-1" />Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-white"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-textMain mb-1">
                <BarChart2 size={13} className="inline mr-1" />Impact Level
              </label>
              <select
                name="impactLevel"
                value={form.impactLevel}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-white"
              >
                {IMPACTS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-textLight hover:bg-gray-50 py-2.5 rounded-xl font-medium text-sm transition-all">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? 'Submitting...' : <><Lightbulb size={15} /> Submit Proposal</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProposePilotModal;
