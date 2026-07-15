import React, { useEffect, useState } from 'react';
import buildingService from '../services/buildingService';
import { Building2, Plus, MapPin, Layers } from 'lucide-react';
import { toast } from 'react-toastify';
import AddBuildingModal from '../components/AddBuildingModal';

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
      ACTIVE: 'bg-green-100 text-green-800',
      UNDER_MAINTENANCE: 'bg-yellow-100 text-yellow-800',
      INACTIVE: 'bg-gray-100 text-gray-500',
    };
    return map[status] || 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      {showModal && <AddBuildingModal onClose={() => setShowModal(false)} onSuccess={fetchBuildings} />}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
            <Building2 className="text-primary" /> Buildings Management
          </h2>
          <p className="text-textLight mt-1">All campus buildings and their accessibility status.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
          <Plus size={18} /> Add Building
        </button>
      </div>

      <div className="bg-cards rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Building</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Floors</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-400">Loading buildings...</td>
              </tr>
            )}
            {buildings.map((building) => (
              <tr key={building.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Building2 size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{building.buildingName}</div>
                      <div className="text-xs text-gray-400">{building.description || 'No description'}</div>
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
    </div>
  );
};

export default BuildingList;
