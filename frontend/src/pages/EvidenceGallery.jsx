import React, { useState, useEffect } from 'react';
import { 
  Camera, Search, Filter, X, MapPin, User, CheckCircle, 
  AlertCircle, Sparkles, Upload, Eye, IndianRupee, Clock, ShieldCheck, Plus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import issueService from '../services/issueService';
import { getEvidenceDetails } from '../services/evidenceService';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'react-toastify';

const generateDummyPhotos = (issues) => {
  return issues.map((issue, index) => ({
    ...issue,
    photoUrl: issue.photoUrl || `https://picsum.photos/seed/${issue.id || index}/600/400`
  }));
};

const EvidenceGallery = () => {
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('BEFORE'); // 'BEFORE' or 'AFTER'
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form State
  const [newBuilding, setNewBuilding] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        setLoading(true);
        const data = await issueService.getAllIssues();
        const withPhotos = generateDummyPhotos(data.filter(issue => issue.status));
        setEvidenceItems(withPhotos);
      } catch (error) {
        console.error('Failed to fetch evidence', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, []);

  const handleSelectImage = (item) => {
    const detailed = getEvidenceDetails(item);
    setSelectedImage(detailed);
    setViewMode('BEFORE');
  };

  const handleUploadEvidence = (e) => {
    e.preventDefault();
    if (!newBuilding || !newDescription) {
      toast.error('Please enter building name and description.');
      return;
    }

    const newEvidence = getEvidenceDetails({
      id: Date.now(),
      buildingName: newBuilding,
      description: newDescription,
      status: 'PENDING',
      locationDetails: 'Main Entrance',
      reporterName: 'Current User',
      photoUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800',
    });

    setEvidenceItems([newEvidence, ...evidenceItems]);
    setShowUploadModal(false);
    setNewBuilding('');
    setNewDescription('');
    toast.success('Evidence photo uploaded & AI analyzed!');
  };

  const filteredEvidence = evidenceItems.filter(item => {
    const matchesSearch = item.buildingName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'RESOLVED': return 'success';
      case 'IN_PROGRESS': return 'primary';
      case 'PENDING': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <Camera className="text-primary" size={32} /> Photo Evidence & AI Suggestions
          </h2>
          <p className="text-textLight mt-1.5 font-medium">
            Inspect physical barrier evidence photos with AI visual before/after remediations.
          </p>
        </div>

        <Button
          icon={Upload}
          onClick={() => setShowUploadModal(true)}
          className="shadow-md"
        >
          Upload Photo Evidence
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-72">
          <Input
            icon={Search}
            placeholder="Search evidence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
          {['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === status 
                  ? 'bg-primary text-white shadow-xs' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status === 'ALL' ? 'All' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Masonry */}
      {loading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse rounded-2xl break-inside-avoid shadow-sm h-64"></div>
          ))}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredEvidence.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 bg-white"
                onClick={() => handleSelectImage(item)}
              >
                <img 
                  src={item.photoUrl} 
                  alt={item.description} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />

                <div className="absolute top-3 right-3 z-10">
                  <span className="flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                    <Sparkles size={11} className="text-emerald-400" /> AI Remediation Available
                  </span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white font-bold truncate max-w-[70%] font-heading">{item.buildingName}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      item.status === 'RESOLVED' ? 'bg-success text-white' : 
                      item.status === 'IN_PROGRESS' ? 'bg-primary text-white' : 
                      'bg-warning text-white'
                    }`}>
                      {item.status?.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-white/80 text-xs line-clamp-2 mb-2 font-medium">{item.description}</p>
                  <div className="flex items-center text-white/60 text-[10px] gap-3">
                    <span className="flex items-center gap-1"><MapPin size={10} /> {item.locationDetails || 'N/A'}</span>
                    <span className="flex items-center gap-1"><User size={10} /> {item.reporterName}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Upload Evidence Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowUploadModal(false)}></div>
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-bold font-heading text-textMain flex items-center gap-2">
                  <Upload className="text-primary" size={20} /> Upload Photo Evidence
                </h3>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUploadEvidence} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Building Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Academic Block 3"
                    value={newBuilding}
                    onChange={(e) => setNewBuilding(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-textMain focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Barrier Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the physical accessibility barrier..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-textMain focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="p-4 border-2 border-dashed border-primary/30 bg-primary/5 rounded-2xl text-center space-y-2">
                  <Camera size={24} className="mx-auto text-primary" />
                  <p className="text-xs font-bold text-primary">Click to select photo or drag and drop</p>
                  <p className="text-[10px] text-gray-400">Supports PNG, JPG up to 10MB</p>
                </div>

                <Button type="submit" icon={Sparkles} className="w-full py-3 shadow-md">
                  Upload & Analyze with AI
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Barrier & AI Before/After Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedImage(null)}></div>
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Photo Display Area with Barrier Annotations & Toggle */}
              <div className="w-full lg:w-3/5 bg-black flex flex-col relative justify-center items-center overflow-hidden min-h-[350px]">
                {/* Visual View Mode Selector */}
                <div className="absolute top-4 left-4 z-20 flex bg-black/60 p-1 rounded-xl backdrop-blur-md border border-white/20">
                  <button
                    onClick={() => setViewMode('BEFORE')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'BEFORE' ? 'bg-red-500 text-white shadow-md' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Original Barrier
                  </button>
                  <button
                    onClick={() => setViewMode('AFTER')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      viewMode === 'AFTER' ? 'bg-emerald-500 text-white shadow-md' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Sparkles size={13} /> AI Remediated
                  </button>
                </div>

                <img 
                  src={viewMode === 'BEFORE' ? selectedImage.beforePhotoUrl : selectedImage.afterPhotoUrl} 
                  alt={selectedImage.description} 
                  className="max-w-full max-h-[65vh] object-contain transition-all duration-300"
                />

                {/* Annotated Barrier Pins (Visible in BEFORE Mode) */}
                {viewMode === 'BEFORE' && selectedImage.annotations?.map((ann) => (
                  <div
                    key={ann.id}
                    style={{ top: `${ann.y}%`, left: `${ann.x}%` }}
                    className="absolute z-10 group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-red-500 text-white border-2 border-white shadow-lg flex items-center justify-center text-xs font-extrabold animate-pulse">
                      !
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap shadow-xl">
                      {ann.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar AI Remediation Info Panel */}
              <div className="w-full lg:w-2/5 p-6 flex flex-col bg-gray-50 overflow-y-auto space-y-5">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-textMain">{selectedImage.buildingName}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 font-medium"><MapPin size={14}/> {selectedImage.locationDetails}</p>
                </div>

                {/* AI Architectural Guidance Card */}
                <div className="p-5 bg-gradient-to-br from-white to-emerald-50/40 border border-emerald-200/80 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-800 font-heading">
                    <Sparkles size={18} className="text-emerald-600" />
                    <span>AI Visual Remediation Plan</span>
                  </div>

                  <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                    {selectedImage.aiRemediationSpec.proposedSolution}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-emerald-100 font-semibold">
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-gray-400 block uppercase">Estimated Cost</span>
                      <span className="text-emerald-700 font-bold">{selectedImage.aiRemediationSpec.estimatedCostRange}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-gray-400 block uppercase">Est. Work Time</span>
                      <span className="text-emerald-700 font-bold">{selectedImage.aiRemediationSpec.estimatedTimeDays}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-100/60 rounded-xl text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0" />
                    <span>Standard: {selectedImage.aiRemediationSpec.wcagStandard}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Issue Description</h4>
                  <p className="text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-200 shadow-xs font-medium leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><User size={14} /> {selectedImage.reporterName}</span>
                  <span className="bg-gray-200 text-gray-700 px-2.5 py-1 rounded-md text-[10px] font-bold">
                    {selectedImage.status}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvidenceGallery;
