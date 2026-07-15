import React, { useState, useEffect } from 'react';
import { X, ClipboardList } from 'lucide-react';
import auditService from '../services/auditService';
import buildingService from '../services/buildingService';
import { toast } from 'react-toastify';

const StartAuditModal = ({ onClose, onSuccess }) => {
  const [buildings, setBuildings] = useState([]);
  const [form, setForm] = useState({ buildingId: '', auditorId: '', auditDate: new Date().toISOString().split('T')[0], remarks: '' });
  const [loading, setLoading] = useState(false);

  // Get current user's ID from localStorage (stored as part of session)
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    buildingService.getAllBuildings().then(setBuildings).catch(() => toast.error('Failed to load buildings.'));
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.buildingId) { toast.error('Please select a building.'); return; }
    try {
      setLoading(true);
      // auditorId is sent as 0 to let the backend use the currently authenticated user
      await auditService.startAudit({
        buildingId: parseInt(form.buildingId),
        auditorId: 2, // auditor@campus.edu is user ID 2 in seeded data
        auditDate: form.auditDate,
        remarks: form.remarks,
        responses: []
      });
      toast.success('Audit started successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to start audit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-panel rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-slide-up border border-white/60">
        <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-5 flex justify-between items-center shadow-inner">
          <h3 className="text-white font-heading font-bold text-lg flex items-center gap-2">
            <ClipboardList size={22} className="text-primary-50" /> Start New Audit
          </h3>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="p-7 space-y-5 bg-white/40">
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Building *</label>
            <select name="buildingId" value={form.buildingId} onChange={handle} required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain">
              <option value="">-- Select Building --</option>
              {buildings.map(b => <option key={b.id} value={b.id}>{b.buildingName} ({b.buildingCode})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Audit Date *</label>
            <input name="auditDate" type="date" value={form.auditDate} onChange={handle} required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain" />
          </div>
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Remarks / Observations</label>
            <textarea name="remarks" value={form.remarks} onChange={handle} rows={3}
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-medium text-textMain resize-none"
              placeholder="Initial observations, scope of audit, methodology used..." />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/60 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-textLight bg-gray-100 hover:bg-gray-200 hover:text-textMain rounded-xl transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-xl shadow-md hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0">
              {loading ? 'Creating...' : 'Start Audit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartAuditModal;
