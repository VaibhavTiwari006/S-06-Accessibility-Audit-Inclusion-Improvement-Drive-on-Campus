import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { Map, Maximize, Minimize } from 'lucide-react';
import buildingService from '../services/buildingService';
import { toast } from 'react-toastify';
import LeafletMap from '../components/CampusMap'; // The Leaflet component

const CampusMap = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const data = await buildingService.getAllBuildings();
        setBuildings(data);
      } catch (error) {
        toast.error('Failed to fetch buildings for the map.');
      } finally {
        setLoading(false);
      }
    };
    fetchBuildings();
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <PageTransition>
      <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <div className={`flex items-center justify-between mb-6 ${isFullscreen ? 'p-6 pb-0' : ''}`}>
          <div>
            <h1 className="text-2xl font-bold font-heading text-textMain flex items-center gap-2">
              <Map className="text-primary" size={24} />
              Interactive Campus Map
            </h1>
            <p className="text-textLight text-sm mt-1">
              Explore the campus layout, building locations, and accessibility scores.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-cards p-1.5 rounded-xl border border-gray-100 shadow-sm">
            <button 
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-50 rounded-lg text-textLight hover:text-textMain transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>

        <div className={`relative bg-cards border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex-1 ${isFullscreen ? 'm-6 mb-10' : 'min-h-[600px] h-[calc(100vh-250px)]'}`}>
          {loading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50">
               <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
               <p className="mt-4 text-gray-500 font-medium">Loading Map Data...</p>
             </div>
          ) : (
             <div className="absolute inset-0">
                <LeafletMap buildings={buildings} className="!h-full !border-none !rounded-none" />
             </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default CampusMap;
