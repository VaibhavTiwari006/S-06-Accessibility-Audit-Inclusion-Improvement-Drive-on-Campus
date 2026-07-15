import React, { useEffect, useState } from 'react';
import buildingService from '../services/buildingService';
import { Building2, Plus, MapPin } from 'lucide-react';

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await buildingService.getAllBuildings();
        setBuildings(data);
      } catch (error) {
        console.error("Failed to fetch buildings", error);
      } finally {
        setLoading(false);
      }
    };
    
    // For now we mock the data since backend might not be running yet, but we use the service above.
    // If we want real data, just call fetchBuildings(). Let's mock fallback just in case:
    fetchBuildings().catch(() => {
      setBuildings([
        { id: 1, name: 'Academic Block A', type: 'ACADEMIC', address: 'North Campus', status: 'AUDIT_PENDING' },
        { id: 2, name: 'Hostel 1', type: 'RESIDENTIAL', address: 'South Campus', status: 'AUDIT_COMPLETED' },
      ]);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
          <Building2 /> Buildings Management
        </h2>
        <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add Building
        </button>
      </div>

      <div className="bg-cards rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Building Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {buildings.map((building) => (
              <tr key={building.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{building.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {building.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1">
                  <MapPin size={16} /> {building.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${building.status === 'AUDIT_COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {building.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href={`/buildings/${building.id}`} className="text-primary hover:text-blue-900">View</a>
                </td>
              </tr>
            ))}
            {buildings.length === 0 && !loading && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No buildings found. Click "Add Building" to get started.
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
