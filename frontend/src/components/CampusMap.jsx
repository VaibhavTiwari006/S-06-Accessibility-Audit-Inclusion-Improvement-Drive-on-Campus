import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ACCESSIBILITY_FEATURE_TYPES } from '../services/mapService';

// Fix for default leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Auto-fit bounds component
const MapBounds = ({ buildings, activeRoute }) => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (activeRoute?.pathCoordinates?.length > 0) {
      const bounds = L.latLngBounds(activeRoute.pathCoordinates);
      map.fitBounds(bounds, { padding: [60, 60] });
    } else if (buildings.length > 0) {
      const bounds = L.latLngBounds(buildings.map(b => [b.lat || 30.7699, b.lng || 76.5754]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [buildings, activeRoute, map]);

  return null;
};

const CampusMap = ({ 
  buildings = [], 
  features = [], 
  activeRoute = null, 
  visibleFeatureTypes = [],
  className = "" 
}) => {
  const defaultCenter = [30.7699, 76.5754];

  const filteredFeatures = features.filter((f) => visibleFeatureTypes.includes(f.type));

  return (
    <div className={`w-full h-[400px] rounded-2xl overflow-hidden border border-white/60 shadow-soft relative z-0 ${className}`}>
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

        {/* Wheelchair Navigation Route Polyline */}
        {activeRoute?.pathCoordinates && (
          <Polyline
            positions={activeRoute.pathCoordinates}
            pathOptions={{
              color: '#10B981',
              weight: 6,
              opacity: 0.85,
              dashArray: '8, 8',
            }}
          />
        )}

        {/* Building Markers */}
        {buildings.map((building, index) => {
          const lat = building.lat || defaultCenter[0] + (Math.sin(building.id || index) * 0.005);
          const lng = building.lng || defaultCenter[1] + (Math.cos(building.id || index) * 0.005);
          const mockScore = building.overallAccessibilityScore || (50 + ((building.id || index) * 17) % 50);

          let markerColor = 'bg-gray-400';
          let ringColor = 'ring-gray-400/50';

          if (mockScore >= 80) {
            markerColor = 'bg-success';
            ringColor = 'ring-success/50';
          } else if (mockScore >= 50) {
            markerColor = 'bg-warning';
            ringColor = 'ring-warning/50';
          } else {
            markerColor = 'bg-danger';
            ringColor = 'ring-danger/50';
          }

          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="w-8 h-8 rounded-full ${markerColor} border-2 border-white shadow-lg ring-4 ${ringColor} flex items-center justify-center text-white font-bold text-xs">${Math.round(mockScore)}</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          return (
            <Marker key={`building-${building.id || index}`} position={[lat, lng]} icon={customIcon}>
              <Popup className="custom-popup rounded-xl overflow-hidden border-0 shadow-xl">
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold font-heading text-lg text-textMain">{building.buildingName}</h3>
                  <p className="text-xs text-textLight mb-3 font-medium">Code: {building.buildingCode}</p>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Access Score</span>
                      <span className={`text-sm font-bold ${mockScore >= 80 ? 'text-success-dark' : mockScore >= 50 ? 'text-warning-dark' : 'text-danger-dark'}`}>
                        {Math.round(mockScore)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${mockScore >= 80 ? 'bg-success' : mockScore >= 50 ? 'bg-warning' : 'bg-danger'}`} 
                        style={{ width: `${mockScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t border-gray-100">
                    <span className="text-gray-500 font-medium text-xs">Status:</span>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      building.status === 'ACTIVE' ? 'bg-success/10 text-success-dark' :
                      building.status === 'UNDER_MAINTENANCE' ? 'bg-warning/10 text-warning-dark' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {building.status?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Feature Markers (Ramps, Elevators, Washrooms, etc.) */}
        {filteredFeatures.map((feat) => {
          const typeConfig = ACCESSIBILITY_FEATURE_TYPES[feat.type] || ACCESSIBILITY_FEATURE_TYPES.RAMP;

          const featureIcon = L.divIcon({
            className: 'feature-marker',
            html: `<div class="w-7 h-7 rounded-full bg-white border-2 border-[${typeConfig.color}] shadow-md flex items-center justify-center text-xs">${typeConfig.icon}</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });

          return (
            <Marker key={feat.id} position={[feat.lat, feat.lng]} icon={featureIcon}>
              <Popup>
                <div className="p-1 max-w-xs">
                  <div className="flex items-center gap-1.5 font-bold text-textMain text-sm mb-1">
                    <span>{typeConfig.icon}</span>
                    <span>{feat.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{feat.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <MapBounds buildings={buildings.filter(b => b.lat && b.lng)} activeRoute={activeRoute} />
      </MapContainer>
    </div>
  );
};

export default CampusMap;
