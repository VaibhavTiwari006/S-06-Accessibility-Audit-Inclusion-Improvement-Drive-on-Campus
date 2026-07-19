import React, { useEffect, useState, useMemo } from 'react';
import buildingService from '../services/buildingService';
import { Building2, Plus, MapPin, Layers, Search, Filter, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import AddBuildingModal from '../components/AddBuildingModal';
import CampusMap from '../components/CampusMap';

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const data = await buildingService.getAllBuildings();
      setBuildings(data);
    } catch (error) {
      toast.error('Failed to fetch buildings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBuildings(); }, []);

  const statusBadge = (status) => {
    const map = {
      ACTIVE: 'bg-success-50 text-success-dark border border-success-100',
      UNDER_MAINTENANCE: 'bg-secondary-50 text-secondary-dark border border-secondary-100',
      INACTIVE: 'bg-gray-100 text-gray-500 border border-gray-200',
    };
    return map[status] || 'bg-primary-50 text-primary-dark border border-primary-100';
  };

  const filteredBuildings = useMemo(() => {
    return buildings.filter(b => {
      const matchesSearch = b.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.buildingCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [buildings, searchTerm, statusFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatePresence>
        {showModal && <AddBuildingModal onClose={() => setShowModal(false)} onSuccess={fetchBuildings} />}
      </AnimatePresence>
      
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <Building2 className="text-primary" size={32} /> Campus Buildings
          </h2>
          <p className="text-textLight mt-1.5 font-medium">Manage and audit physical accessibility infrastructure.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow xl:flex-grow-0 xl:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search buildings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-sm font-medium placeholder-gray-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={"flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-sm rounded-xl text-sm font-semibold transition-all hover:bg-white " + (statusFilter !== 'ALL' ? 'text-primary' : 'text-gray-600')}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">{statusFilter === 'ALL' ? 'All Status' : statusFilter.replace(/_/g, ' ')}</span>
            </button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl border border-white/60 rounded-xl shadow-xl z-20 py-2"
                >
                  {['ALL', 'ACTIVE', 'UNDER_MAINTENANCE', 'INACTIVE'].map(status => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }}
                      className={"w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/5 " + (statusFilter === status ? 'text-primary bg-primary/5' : 'text-gray-700')}
                    >
                      {status === 'ALL' ? 'All Statuses' : status.replace(/_/g, ' ')}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View Toggles */}
          <div className="flex bg-white/70 backdrop-blur-md rounded-xl border border-white/40 p-1 shadow-soft-sm">
            <button 
              onClick={() => setViewMode('list')}
              className={"px-3 py-1.5 rounded-lg text-sm font-semibold transition-all " + (viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-white/50')}
            >
              List View
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={"px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 " + (viewMode === 'map' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-white/50')}
            >
              <MapPin size={14} /> Map
            </button>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 shadow-soft-md shadow-primary/30">
            <Plus size={18} /> Add Building
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-2 rounded-3xl overflow-hidden">
          <CampusMap buildings={filteredBuildings} />
        </motion.div>
      ) : (

      <div className="glass-panel rounded-2xl overflow-hidden shadow-soft-xl border border-white/60">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/80 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Building</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Floors</th>
                <th className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-extrabold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            
            {loading ? (
              <tbody className="divide-y divide-gray-50 bg-transparent">
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-5 whitespace-nowrap"><div className="h-10 w-48 skeleton rounded-xl"></div></td>
                    <td className="px-6 py-5 whitespace-nowrap"><div className="h-6 w-16 skeleton rounded-md"></div></td>
                    <td className="px-6 py-5 whitespace-nowrap"><div className="h-6 w-32 skeleton rounded-md"></div></td>
                    <td className="px-6 py-5 whitespace-nowrap"><div className="h-6 w-12 skeleton rounded-md"></div></td>
                    <td className="px-6 py-5 whitespace-nowrap"><div className="h-6 w-24 skeleton rounded-full"></div></td>
                    <td className="px-6 py-5 whitespace-nowrap text-right"><div className="h-8 w-20 skeleton rounded-lg ml-auto"></div></td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <motion.tbody 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="divide-y divide-gray-50/50 bg-transparent"
              >
                {filteredBuildings.map((building) => (
                  <motion.tr 
                    variants={itemVariants}
                    key={building.id} 
                    className="hover:bg-white/80 transition-all duration-300 group"
                  >
                    <td className="px-6 py-5 min-w-[300px] whitespace-normal">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-soft-md group-hover:shadow-primary/20 transition-all duration-300 border border-primary/20 flex-shrink-0">
                          <Building2 size={20} className="text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-textMain font-heading group-hover:text-primary transition-colors">{building.buildingName}</div>
                          <div className="text-xs text-textLight font-medium mt-1 leading-relaxed max-w-sm">{building.description || 'No description provided'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-mono font-semibold bg-gray-100/80 text-gray-700 rounded-lg border border-gray-200/50">
                        {building.buildingCode}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-xs text-gray-500">
                      <span className="flex items-center gap-1.5 font-medium"><MapPin size={14} className="text-gray-400" /> {building.location}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-xs text-gray-500">
                      <span className="flex items-center gap-1.5 font-medium"><Layers size={14} className="text-gray-400" /> {building.numberOfFloors} floors</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 flex items-center w-max text-xs font-bold rounded-full ${statusBadge(building.status)}`}>
                        <span className={"w-1.5 h-1.5 rounded-full mr-1.5 " + (building.status === 'ACTIVE' ? 'bg-success' : building.status === 'UNDER_MAINTENANCE' ? 'bg-secondary' : 'bg-gray-400')}></span>
                        {building.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <button className="px-4 py-1.5 rounded-lg text-primary bg-primary/5 hover:bg-primary/10 transition-colors font-semibold border border-primary/10">View Details</button>
                    </td>
                  </motion.tr>
                ))}
                
                {filteredBuildings.length === 0 && (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="bg-white/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white shadow-soft-sm">
                        <Search size={32} className="text-gray-300" />
                      </div>
                      <p className="text-gray-600 font-bold text-lg">No buildings found</p>
                      <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
                        {buildings.length === 0 
                          ? "Your campus currently has no buildings added to the system. Click 'Add Building' to get started."
                          : "No buildings match your current search and filter criteria. Try adjusting your filters."}
                      </p>
                      {buildings.length > 0 && (
                        <button 
                          onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
                          className="mt-4 text-primary font-semibold hover:underline text-sm"
                        >
                          Clear all filters
                        </button>
                      )}
                    </td>
                  </motion.tr>
                )}
              </motion.tbody>
            )}
          </table>
        </div>
      </div>
      )}
    </div>
  );
};

export default BuildingList;