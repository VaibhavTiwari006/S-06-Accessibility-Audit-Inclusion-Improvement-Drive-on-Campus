import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Camera, Sparkles, Upload, MapPin, DollarSign, Tag } from 'lucide-react';
import issueService from '../services/issueService';
import buildingService from '../services/buildingService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

/**
 * ReportIssueModal Component
 * 
 * Renders an interactive form for students to report physical accessibility barriers on campus.
 * Supports:
 * - Building selection from seeded buildings API.
 * - Floor and Location Category selection for detailed barrier mapping.
 * - Real-time duplicate detection: cross-references other pending reports matching the same building,
 *   floor, and area category to prevent duplicate tickets by suggesting upvoting.
 * - Interactive drag & drop or click photo evidence uploads.
 */
const parseLocation = (details = '') => {
  const match = details.match(/^\[Floor:\s*([^|]+)\s*\|\s*Type:\s*([^\]]+)\]\s*(.*)$/i);
  if (match) {
    return {
      floor: match[1].trim(),
      category: match[2].trim(),
      rest: match[3].trim()
    };
  }
  
  const lowercase = details.toLowerCase();
  let floor = 'Ground Floor';
  if (lowercase.includes('first') || lowercase.includes('1st') || lowercase.includes('floor 1')) {
    floor = '1st Floor';
  } else if (lowercase.includes('second') || lowercase.includes('2nd') || lowercase.includes('floor 2')) {
    floor = '2nd Floor';
  } else if (lowercase.includes('third') || lowercase.includes('3rd') || lowercase.includes('floor 3')) {
    floor = '3rd Floor';
  } else if (lowercase.includes('fourth') || lowercase.includes('4th') || lowercase.includes('above')) {
    floor = '4th Floor & Above';
  }
  
  let category = 'Other';
  if (lowercase.includes('washroom') || lowercase.includes('toilet') || lowercase.includes('restroom')) {
    category = 'Washroom';
  } else if (lowercase.includes('entrance') || lowercase.includes('gate') || lowercase.includes('foyer') || lowercase.includes('lobby') || lowercase.includes('ramp')) {
    category = 'Entrance';
  } else if (lowercase.includes('hall') || lowercase.includes('classroom') || lowercase.includes('lab') || lowercase.includes('lecture')) {
    category = 'Lecture Hall';
  } else if (lowercase.includes('elevator') || lowercase.includes('lift')) {
    category = 'Elevator';
  } else if (lowercase.includes('corridor') || lowercase.includes('path') || lowercase.includes('walkway') || lowercase.includes('passage')) {
    category = 'Corridor';
  }
  
  return {
    floor,
    category,
    rest: details
  };
};

const BLOCKED_PROFANITIES = [
  'fuck', 'shit', 'asshole', 'bitch', 'bastard', 'cunt', 'dick', 'pussy', 'idiot', 'stupid',
  'saala', 'kamine', 'harami', 'chutiya', 'bhenchod', 'madarchod', 'gandu', 'abuse', 'offensive'
];

const containsProfanity = (text = '') => {
  const lowercase = text.toLowerCase();
  return BLOCKED_PROFANITIES.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lowercase);
  });
};

const ReportIssueModal = ({ onClose, onSuccess }) => {
  const [buildings, setBuildings] = useState([]);
  const [existingIssues, setExistingIssues] = useState([]);
  const [form, setForm] = useState({ 
    buildingId: '', 
    description: '', 
    locationDetails: '', 
    photoUrl: '',
    floor: 'Ground Floor',
    locationCategory: 'Entrance'
  });
  const [loading, setLoading] = useState(false);
  const [isDifferentConfirmed, setIsDifferentConfirmed] = useState(false);
  const [profanityWarning, setProfanityWarning] = useState('');

  // Reset confirmation checkbox on category/floor/building change
  useEffect(() => {
    setIsDifferentConfirmed(false);
  }, [form.buildingId, form.floor, form.locationCategory]);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    buildingService.getAllBuildings().then(setBuildings).catch(() => {});
    issueService.getAllIssues().then(setExistingIssues).catch(() => {});
  }, []);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'description' || name === 'locationDetails') {
      const otherValue = name === 'description' ? form.locationDetails : form.description;
      if (containsProfanity(value) || containsProfanity(otherValue)) {
        setProfanityWarning('Blocked language detected: Please keep comments constructive and respectful.');
      } else {
        setProfanityWarning('');
      }
    }
  };

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

  // Find duplicates matching current building, floor, and category
  const duplicates = existingIssues.filter(issue => {
    const sameBuilding = (issue.building?.id === parseInt(form.buildingId)) || (issue.buildingId === parseInt(form.buildingId));
    const parsed = parseLocation(issue.locationDetails);
    const sameFloor = parsed.floor === form.floor;
    const sameCategory = parsed.category === form.locationCategory;
    const isNotResolved = issue.status !== 'COMPLETED' && issue.status !== 'RESOLVED' && issue.status !== 'FIXED';
    return sameBuilding && sameFloor && sameCategory && isNotResolved;
  });

  const handleUpvote = (issueId) => {
    const storageKey = `upvoted-issue-${issueId}`;
    const alreadyUpvoted = localStorage.getItem(storageKey) === 'true';
    
    if (alreadyUpvoted) {
      localStorage.removeItem(storageKey);
      const currentCount = parseInt(localStorage.getItem(`upvotes-count-${issueId}`) || '1');
      localStorage.setItem(`upvotes-count-${issueId}`, Math.max(1, currentCount - 1).toString());
      toast.info('Upvote removed.');
    } else {
      localStorage.setItem(storageKey, 'true');
      const currentCount = parseInt(localStorage.getItem(`upvotes-count-${issueId}`) || '1');
      localStorage.setItem(`upvotes-count-${issueId}`, (currentCount + 1).toString());
      toast.success('Thank you! Issue upvoted to increase resolution priority.');
    }
    
    onSuccess();
    onClose();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (containsProfanity(form.description) || containsProfanity(form.locationDetails)) {
      toast.error('Blocked language detected: Your submission contains inappropriate words.');
      return;
    }
    try {
      setLoading(true);
      const payload = {
        buildingId: form.buildingId ? parseInt(form.buildingId) : null,
        description: form.description,
        locationDetails: `[Floor: ${form.floor} | Type: ${form.locationCategory}] ${form.locationDetails}`,
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
        <form onSubmit={submit} className="p-7 space-y-4 max-h-[80vh] overflow-y-auto bg-white/40">
          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Building *</label>
            <select name="buildingId" value={form.buildingId} onChange={handle} required
              className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain">
              <option value="">-- Select Building --</option>
              {buildings.map(b => <option key={b.id} value={b.id}>{b.buildingName}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Floor *</label>
              <select name="floor" value={form.floor} onChange={handle} required
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain">
                <option value="Ground Floor">Ground Floor</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floor">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor & Above">4th Floor & Above</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Area Type *</label>
              <select name="locationCategory" value={form.locationCategory} onChange={handle} required
                className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain">
                <option value="Entrance">Entrance</option>
                <option value="Washroom">Washroom</option>
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Elevator">Elevator</option>
                <option value="Corridor">Corridor</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Potential duplicates warning */}
          {form.buildingId && duplicates.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-3">
              <div className="flex gap-2 text-amber-800">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Potential Duplicate Complaints Detected</h4>
                  <p className="text-[11px] text-amber-700 font-medium mt-0.5 leading-relaxed">
                    Other students have already reported accessibility barriers on this floor and area. If one of these matches your issue, please upvote it to increase its priority!
                  </p>
                </div>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {duplicates.map((issue) => {
                  const issueId = issue.id;
                  const upvoteKey = `upvoted-issue-${issueId}`;
                  const isUpvoted = localStorage.getItem(upvoteKey) === 'true';
                  const upvotesCount = parseInt(localStorage.getItem(`upvotes-count-${issueId}`) || '1');

                  return (
                    <div key={issueId} className="bg-white p-3 rounded-xl border border-amber-100 flex items-center justify-between gap-3 shadow-2xs">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-700 line-clamp-1 leading-snug">{issue.description}</p>
                        <span className="text-[9px] text-gray-400 font-mono mt-0.5 block">Report #{issueId} • Status: {issue.status}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleUpvote(issueId)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition-all ${
                          isUpvoted 
                            ? 'bg-amber-500 text-white shadow-2xs hover:bg-amber-600' 
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-250'
                        }`}
                      >
                        👍 {isUpvoted ? 'Upvoted' : 'Upvote'} ({upvotesCount})
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {/* Force confirmation checkbox */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-amber-250/30">
                <input
                  type="checkbox"
                  id="confirmDifferent"
                  checked={isDifferentConfirmed}
                  onChange={(e) => setIsDifferentConfirmed(e.target.checked)}
                  className="mt-0.5 rounded border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer h-4 w-4"
                />
                <label htmlFor="confirmDifferent" className="text-xs font-semibold text-amber-800 cursor-pointer select-none leading-tight">
                  My issue is different from the existing reported issues listed above.
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Specific Location details *</label>
            <input name="locationDetails" value={form.locationDetails} onChange={handle} required
              className="w-full bg-white/70 border border-gray-205 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain"
              placeholder="e.g. near classroom 204 or main lobby" />
          </div>

          <div>
            <label className="block text-xs font-bold text-textMain uppercase tracking-wider mb-1.5">Detailed Description *</label>
            <textarea name="description" value={form.description} onChange={handle} required rows={3}
              className={`w-full bg-white/70 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all font-medium resize-none ${
                profanityWarning 
                  ? 'border-red-300 focus:ring-red-400 focus:border-red-500 text-red-900' 
                  : 'border-gray-205 focus:ring-danger/40 focus:border-danger'
              }`}
              placeholder="Describe the accessibility barrier in detail. What is the problem? Who is affected?" />
            {profanityWarning && (
              <p className="text-[11px] text-red-650 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle size={12} /> {profanityWarning}
              </p>
            )}
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
            <button 
              type="submit" 
              disabled={loading || !!profanityWarning || (form.buildingId && duplicates.length > 0 && !isDifferentConfirmed)} 
              className="px-6 py-2.5 text-sm font-bold bg-danger text-white rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ReportIssueModal;
