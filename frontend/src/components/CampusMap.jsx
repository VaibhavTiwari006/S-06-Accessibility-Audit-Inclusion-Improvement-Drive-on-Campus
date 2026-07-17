import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// A component to automatically fit bounds when buildings change
const MapBounds = ({ buildings }) => {
  const map = useMap();
  
  useEffect(() => {
    if (buildings.length > 0) {
      const bounds = L.latLngBounds(buildings.map(b => [b.lat || 30.7699, b.lng || 76.5754]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [buildings, map]);

  return null;
};

const CampusMap = ({ buildings }) => {
  // Chandigarh University approximate coordinates
  const defaultCenter = [30.7699, 76.5754];

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-white/60 shadow-soft relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={16} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {buildings.map((building) => (
          building.lat && building.lng ? (
            <Marker key={building.id} position={[building.lat, building.lng]}>
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold font-heading text-lg">{building.buildingName}</h3>
                  <p className="text-xs text-gray-500 mb-2">Code: {building.buildingCode}</p>
                  
                  <div className="flex items-center justify-between text-sm mt-3 border-t pt-2 border-gray-100">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      building.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' :
                      building.status === 'UNDER_MAINTENANCE' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {building.status?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
        
        <MapBounds buildings={buildings.filter(b => b.lat && b.lng)} />
      </MapContainer>
    </div>
  );
};

export default CampusMap;
