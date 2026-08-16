import React, { useEffect, useState } from 'react';
import { Calendar, User, Clock, ShieldCheck, X } from 'lucide-react';
import buildingService from '../services/buildingService';
import { toast } from 'react-toastify';
import Button from './ui/Button';

const AuditSchedulerModal = ({ onClose, onSuccess }) => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    buildingId: '',
    frequency: 'Annual',
    startDate: '',
    complianceTarget: 'AA Standard',
    auditorName: 'Auditor User (auditor@campus.edu)'
  });

  useEffect(() => {
    buildingService.getAllBuildings()
      .then(setBuildings)
      .catch(() => toast.error('Failed to load buildings directory.'));
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.buildingId || !form.startDate) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const selectedBuilding = buildings.find(b => b.id === parseInt(form.buildingId));
      
      const newSchedule = {
        id: Date.now(),
        buildingId: parseInt(form.buildingId),
        buildingName: selectedBuilding ? selectedBuilding.buildingName : 'Unknown Building',
        frequency: form.frequency,
        startDate: form.startDate,
        complianceTarget: form.complianceTarget,
        auditorName: form.auditorName,
        status: 'SCHEDULED'
      };

      const existingSchedules = JSON.parse(localStorage.getItem('scheduled-annual-audits') || '[]');
      localStorage.setItem('scheduled-annual-audits', JSON.stringify([...existingSchedules, newSchedule]));
      
      toast.success(`Success: Recurring ${form.frequency} audit scheduled for ${selectedBuilding?.buildingName}!`);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error('Failed to schedule audit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-premium rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-md mx-4 overflow-hidden border border-white/60 bg-white">
        <div className="bg-gradient-to-r from-danger to-red-800 px-6 py-5 flex justify-between items-center shadow-inner">
          <h3 className="text-white font-heading font-bold text-lg flex items-center gap-2">
            <Clock size={22} className="text-red-100" /> Schedule Recurring Audit
          </h3>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all"><X size={20} /></button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Target Building *</label>
            <select
              name="buildingId"
              value={form.buildingId}
              onChange={handle}
              required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain"
            >
              <option value="">-- Select Building --</option>
              {buildings.map(b => <option key={b.id} value={b.id}>{b.buildingName}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Frequency *</label>
              <select
                name="frequency"
                value={form.frequency}
                onChange={handle}
                required
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain"
              >
                <option value="Annual">Annual</option>
                <option value="Bi-Annual">Bi-Annual</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handle}
                required
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Compliance Target Target *</label>
            <select
              name="complianceTarget"
              value={form.complianceTarget}
              onChange={handle}
              required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain"
            >
              <option value="A Standard">A Standard (Basic)</option>
              <option value="AA Standard">AA Standard (WCAG 2.1 / RPWD Act)</option>
              <option value="AAA Standard">AAA Standard (Gold Standard)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Assigned Auditor *</label>
            <select
              name="auditorName"
              value={form.auditorName}
              onChange={handle}
              required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain"
            >
              <option value="Auditor User (auditor@campus.edu)">Auditor User (auditor@campus.edu)</option>
              <option value="Admin User (admin@campus.edu)">Admin User (admin@campus.edu)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-textLight bg-gray-100 hover:bg-gray-200 hover:text-textMain rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-bold bg-danger text-white rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {loading ? 'Scheduling...' : 'Schedule Audit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuditSchedulerModal;
