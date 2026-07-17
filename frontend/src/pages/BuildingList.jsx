import React, { useEffect, useState } from 'react';
import buildingService from '../services/buildingService';
import { Building2, Plus, MapPin, Layers } from 'lucide-react';
import { toast } from 'react-toastify';
import AddBuildingModal from '../components/AddBuildingModal';
import CampusMap from '../components/CampusMap';

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

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
      ACTIVE: 'bg-success-50 text-success-dark',
      UNDER_MAINTENANCE: 'bg-secondary-50 text-secondary-dark',
      INACTIVE: 'bg-gray-100 text-gray-500',
    };
    return map[status] || 'bg-primary-50 text-primary-dark';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {showModal && <AddBuildingModal onClose={() => setShowModal(false)} onSuccess={fetchBuildings} />}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <Building2 className="text-primary" size={32} /> Campus Buildings
          </h2>
          <p className="text-textLight mt-1.5 font-medium">Manage and audit physical accessibility infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              List View
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${viewMode === 'map' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <MapPin size={14} /> Map
            </button>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Building
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="animate-slide-up">
          <CampusMap buildings={buildings} />
        </div>
      ) : (

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/50 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Building</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Floors</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-transparent">
            {loading && [...Array(3)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-10 w-48 skeleton"></div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-6 w-16 skeleton"></div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-6 w-32 skeleton"></div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-6 w-12 skeleton"></div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-6 w-24 skeleton rounded-full"></div></td>
                <td className="px-6 py-4 whitespace-nowrap text-right"><div className="h-6 w-10 skeleton ml-auto"></div></td>
              </tr>
            ))}
            {buildings.map((building) => (
              <tr key={building.id} className="hover:bg-white/60 transition-all duration-200 group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-primary/10">
                      <Building2 size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-textMain font-heading">{building.buildingName}</div>
                      <div className="text-xs text-textLight font-medium">{building.description || 'No description'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-mono bg-gray-100 text-gray-700 rounded">
                    {building.buildingCode}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {building.location}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Layers size={14} /> {building.numberOfFloors}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${statusBadge(building.status)}`}>
                    {building.status?.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-blue-900 font-medium hover:underline">View</button>
                </td>
              </tr>
            ))}
            {buildings.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center">
                  <Building2 size={36} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-400 font-medium">No buildings found.</p>
                  <p className="text-gray-300 text-sm mt-1">Click "Add Building" to get started.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default BuildingList;
