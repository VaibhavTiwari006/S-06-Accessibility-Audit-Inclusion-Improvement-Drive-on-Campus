import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import issueService from '../services/issueService';
import buildingService from '../services/buildingService';
import { toast } from 'react-toastify';

const ReportIssueModal = ({ onClose, onSuccess }) => {
  const [buildings, setBuildings] = useState([]);
  const [form, setForm] = useState({ buildingId: '', description: '', locationDetails: '', photoUrl: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buildingService.getAllBuildings().then(setBuildings).catch(() => {});
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        buildingId: form.buildingId ? parseInt(form.buildingId) : null,
        description: form.description,
        locationDetails: form.locationDetails,
        photoUrl: form.photoUrl || null
      };
      await issueService.reportIssue(payload);
      toast.success('Issue reported successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to report issue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-panel rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-slide-up border border-white/60">
        <div className="bg-gradient-to-r from-danger to-red-800 px-6 py-5 flex justify-between items-center shadow-inner">
          <h3 className="text-white font-heading font-bold text-lg flex items-center gap-2">
            <AlertCircle size={22} className="text-red-100" /> Report Accessibility Issue
          </h3>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="p-7 space-y-5 bg-white/40">
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Building *</label>
            <select name="buildingId" value={form.buildingId} onChange={handle} required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain">
              <option value="">-- Select Building --</option>
              {buildings.map(b => <option key={b.id} value={b.id}>{b.buildingName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Location Details *</label>
            <input name="locationDetails" value={form.locationDetails} onChange={handle} required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain"
              placeholder="e.g. Ground floor, near main entrance" />
          </div>
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Description *</label>
            <textarea name="description" value={form.description} onChange={handle} required rows={4}
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain resize-none"
              placeholder="Describe the accessibility barrier in detail. What is the problem? Who is affected?" />
          </div>
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Photo Evidence (Optional)</label>
            <input type="file" accept="image/*" onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setForm({ ...form, photoUrl: "https://picsum.photos/800/600" });
                toast.info("Photo selected! (Mock upload applied)");
              }
            }}
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 transition-all font-medium text-textMain file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-danger/10 file:text-danger hover:file:bg-danger/20"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/60 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-textLight bg-gray-100 hover:bg-gray-200 hover:text-textMain rounded-xl transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-bold bg-danger text-white rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0">
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueModal;
