import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Camera, Sparkles, Upload } from 'lucide-react';
import issueService from '../services/issueService';
import buildingService from '../services/buildingService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ReportIssueModal = ({ onClose, onSuccess }) => {
  const [buildings, setBuildings] = useState([]);
  const [form, setForm] = useState({ buildingId: '', description: '', locationDetails: '', photoUrl: '' });
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    buildingService.getAllBuildings().then(setBuildings).catch(() => {});
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      setForm(prev => ({ ...prev, photoUrl: localUrl }));
      toast.info(`Photo selected: ${file.name}`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are supported.');
        return;
      }
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      setForm(prev => ({ ...prev, photoUrl: localUrl }));
      toast.info(`Photo dropped: ${file.name}`);
    }
  };

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="relative glass-premium rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-lg mx-4 overflow-hidden border border-white/60">
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
            
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* Interactive Drag & Drop Area */}
            <div 
              onClick={() => !previewUrl && fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`p-4 border-2 border-dashed border-danger/30 bg-danger/5 rounded-2xl text-center space-y-2 ${!previewUrl ? 'cursor-pointer hover:bg-danger/10 transition-colors' : ''}`}
            >
              {previewUrl ? (
                <div className="space-y-3">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="mx-auto h-24 object-cover rounded-xl border border-gray-200 shadow-xs" 
                  />
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-semibold truncate max-w-xs mx-auto">
                      {selectedFile?.name || 'Evidence Image'}
                    </p>
                    {selectedFile && (
                      <p className="text-[9px] text-gray-400">
                        {((selectedFile.size || 0) / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-[10px] font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-2xs"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreviewUrl('');
                        setForm(prev => ({ ...prev, photoUrl: '' }));
                      }}
                      className="px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded-lg text-[10px] font-bold hover:bg-red-100 hover:border-red-200 transition-colors shadow-2xs"
                    >
                      Remove Photo
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Camera size={24} className="mx-auto text-danger" />
                  <p className="text-xs font-bold text-danger">Click to select photo or drag and drop</p>
                  <p className="text-[10px] text-gray-400">Supports PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/60 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-textLight bg-gray-100 hover:bg-gray-200 hover:text-textMain rounded-xl transition-all">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-bold bg-danger text-white rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0">
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ReportIssueModal;
