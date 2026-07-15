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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <ClipboardList size={20} /> Start New Audit
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white"><X size={22} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Building *</label>
            <select name="buildingId" value={form.buildingId} onChange={handle} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">-- Select Building --</option>
              {buildings.map(b => <option key={b.id} value={b.id}>{b.buildingName} ({b.buildingCode})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audit Date *</label>
            <input name="auditDate" type="date" value={form.auditDate} onChange={handle} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remarks / Observations</label>
            <textarea name="remarks" value={form.remarks} onChange={handle} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder="Initial observations, scope of audit, methodology used..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Creating...' : 'Start Audit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartAuditModal;
