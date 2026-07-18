import React, { useState } from 'react';
import { X, Building2 } from 'lucide-react';
import buildingService from '../services/buildingService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AddBuildingModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    buildingName: '', buildingCode: '', description: '',
    location: '', numberOfFloors: 1, status: 'ACTIVE'
  });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await buildingService.createBuilding({ ...form, numberOfFloors: parseInt(form.numberOfFloors) });
      toast.success('Building added successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add building.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="relative glass-premium rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-lg mx-4 overflow-hidden border border-white/60">
        <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-5 flex justify-between items-center shadow-inner">
          <h3 className="text-white font-heading font-bold text-lg flex items-center gap-2">
            <Building2 size={22} className="text-primary-50" /> Add New Building
          </h3>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={submit} className="p-7 space-y-5 bg-white/40">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Building Name *</label>
              <input name="buildingName" value={form.buildingName} onChange={handle} required
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain" placeholder="e.g. Main Academic Block" />
            </div>
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Building Code *</label>
              <input name="buildingCode" value={form.buildingCode} onChange={handle} required
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain" placeholder="e.g. MAB01" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Location *</label>
            <input name="location" value={form.location} onChange={handle} required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain" placeholder="e.g. Central Campus, Block A" />
          </div>
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Description</label>
            <textarea name="description" value={form.description} onChange={handle} rows={2}
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain resize-none" placeholder="Brief description of the building..." />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Number of Floors *</label>
              <input name="numberOfFloors" type="number" min="1" value={form.numberOfFloors} onChange={handle} required
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain" />
            </div>
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Status *</label>
              <select name="status" value={form.status} onChange={handle}
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain">
                <option value="ACTIVE">Active</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/60 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-textLight bg-gray-100 hover:bg-gray-200 hover:text-textMain rounded-xl transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0">
              {loading ? 'Saving...' : 'Add Building'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddBuildingModal;
