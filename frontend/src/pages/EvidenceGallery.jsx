import React, { useState, useEffect } from 'react';
import { Camera, Search, Filter, X, MapPin, User, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import issueService from '../services/issueService';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// Dummy photos fallback since issues might not have real photos in seeded data
const generateDummyPhotos = (issues) => {
  return issues.map((issue, index) => ({
    ...issue,
    photoUrl: issue.photoUrl || `https://picsum.photos/seed/${issue.id || index}/400/${Math.floor(Math.random() * 200 + 300)}`
  }));
};

const EvidenceGallery = () => {
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        setLoading(true);
        // We'll use issues as the source of evidence
        const data = await issueService.getAllIssues();
        const withPhotos = generateDummyPhotos(data.filter(issue => issue.status)); // Filter valid issues
        setEvidenceItems(withPhotos);
      } catch (error) {
        console.error('Failed to fetch evidence', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, []);

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

  const StatusIcon = ({ status }) => {
    if (status === 'RESOLVED') return <CheckCircle size={14} className="text-success" />;
    if (status === 'IN_PROGRESS') return <AlertCircle size={14} className="text-primary" />;
    return <AlertCircle size={14} className="text-warning" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <Camera className="text-primary" size={32} /> Evidence Gallery
          </h2>
          <p className="text-textLight mt-1.5 font-medium">Browse accessibility barriers visually.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="w-full xl:w-64">
            <Input
              icon={Search}
              placeholder="Search evidence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
            {['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  statusFilter === status 
                    ? 'bg-primary text-white' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status === 'ALL' ? 'All' : status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`bg-gray-100 animate-pulse rounded-2xl break-inside-avoid shadow-sm`} style={{ height: `${Math.floor(Math.random() * 150) + 200}px` }}></div>
          ))}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredEvidence.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={item.id}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.photoUrl} 
                  alt={item.description} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white font-bold truncate max-w-[70%]">{item.buildingName}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      item.status === 'RESOLVED' ? 'bg-success text-white' : 
                      item.status === 'IN_PROGRESS' ? 'bg-primary text-white' : 
                      'bg-warning text-white'
                    }`}>
                      {item.status?.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-white/80 text-xs line-clamp-2 mb-2">{item.description}</p>
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

      {/* Empty State */}
      {!loading && filteredEvidence.length === 0 && (
        <div className="text-center py-24 glass-panel rounded-3xl border border-white/60">
          <Camera size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-700 font-extrabold text-xl font-heading mb-2">No evidence found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)}></div>
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/3 bg-black flex items-center justify-center">
                <img 
                  src={selectedImage.photoUrl} 
                  alt={selectedImage.description} 
                  className="max-w-full max-h-[60vh] md:max-h-[90vh] object-contain"
                />
              </div>

              <div className="w-full md:w-1/3 p-6 flex flex-col bg-gray-50 overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-textMain">{selectedImage.buildingName}</h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5"><MapPin size={14}/> {selectedImage.locationDetails}</p>
                  </div>
                </div>

                <Badge variant={getStatusVariant(selectedImage.status)} className="w-fit mb-6">
                  <StatusIcon status={selectedImage.status} /> {selectedImage.status?.replace('_', ' ')}
                </Badge>

                <div className="space-y-4 flex-grow">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>

                  {selectedImage.adminNotes && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Notes</h4>
                      <p className="text-sm text-primary-dark bg-primary/5 p-3 rounded-xl border border-primary/20 leading-relaxed">
                        {selectedImage.adminNotes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-700">{selectedImage.reporterName}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">Reporter</p>
                    </div>
                  </div>
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
