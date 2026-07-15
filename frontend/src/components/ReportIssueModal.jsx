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
      await issueService.reportIssue(JSON.stringify(payload));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="bg-danger px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <AlertCircle size={20} /> Report Accessibility Issue
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white"><X size={22} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
            <select name="buildingId" value={form.buildingId} onChange={handle}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-danger/50">
              <option value="">-- Select Building (Optional) --</option>
              {buildings.map(b => <option key={b.id} value={b.id}>{b.buildingName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location Details *</label>
            <input name="locationDetails" value={form.locationDetails} onChange={handle} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-danger/50"
              placeholder="e.g. Ground floor, near main entrance" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea name="description" value={form.description} onChange={handle} required rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-danger/50 resize-none"
              placeholder="Describe the accessibility barrier in detail. What is the problem? Who is affected?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (Optional)</label>
            <input name="photoUrl" value={form.photoUrl} onChange={handle} type="url"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-danger/50"
              placeholder="https://example.com/photo.jpg" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-medium bg-danger text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueModal;
