import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  ACCESSIBILITY_FEATURE_TYPES, 
  getBuildingCoordinates, 
  getBuildingScore, 
  getBuildingMetadata 
} from '../services/mapService';

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
      const coords = buildings.map((b, idx) => getBuildingCoordinates(b, idx));
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 17 });
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
  const defaultCenter = [30.7702, 76.5755];

  const filteredFeatures = features.filter((f) => visibleFeatureTypes.includes(f.type));

  return (
    <div className={`w-full h-[500px] rounded-2xl overflow-hidden border border-white/60 shadow-soft relative z-0 ${className}`}>
      <MapContainer 
        center={defaultCenter} 
        zoom={16} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
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
              color: '#059669',
              weight: 5,
              opacity: 0.9,
              dashArray: '8, 8',
            }}
          />
        )}

        {/* Building Markers */}
        {buildings.map((building, index) => {
          const [lat, lng] = getBuildingCoordinates(building, index);
          const meta = getBuildingMetadata(building);
          const score = getBuildingScore(building);

          let markerBg = 'bg-emerald-600';
          let markerRing = 'ring-emerald-400/60';
          let scoreTextClass = 'text-emerald-700';

          if (score >= 80) {
            markerBg = 'bg-emerald-600';
            markerRing = 'ring-emerald-400/60';
            scoreTextClass = 'text-emerald-700';
          } else if (score >= 60) {
            markerBg = 'bg-amber-500';
            markerRing = 'ring-amber-300/60';
            scoreTextClass = 'text-amber-700';
          } else if (score >= 50) {
            markerBg = 'bg-orange-500';
            markerRing = 'ring-orange-300/60';
            scoreTextClass = 'text-orange-700';
          } else {
            markerBg = 'bg-rose-600';
            markerRing = 'ring-rose-400/60';
            scoreTextClass = 'text-rose-700';
          }

          const displayCode = building.buildingCode || meta.code || 'BLD';

          const customIcon = L.divIcon({
            className: 'custom-building-marker',
            html: `
              <div class="group relative flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 hover:z-50">
                <div class="px-1.5 py-0.5 mb-0.5 rounded-md bg-gray-900/90 text-white font-extrabold text-[10px] tracking-tight shadow-md border border-white/20 whitespace-nowrap">
                  ${displayCode}
                </div>
                <div class="w-8 h-8 rounded-full ${markerBg} border-2 border-white shadow-lg ring-2 ${markerRing} flex items-center justify-center text-white font-extrabold text-[11px]">
                  ${Math.round(score)}%
                </div>
              </div>
            `,
            iconSize: [40, 52],
            iconAnchor: [20, 48],
            popupAnchor: [0, -44],
          });

          const buildingStatus = building.status || meta.status || 'ACTIVE';

          return (
            <Marker 
              key={`building-${building.id || index}`} 
              position={[lat, lng]} 
              icon={customIcon}
              zIndexOffset={Math.round(score)}
            >
              <Popup className="custom-popup rounded-2xl overflow-hidden border-0 shadow-2xl">
                <div className="p-2 min-w-[220px]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-xs">
                      {displayCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      buildingStatus === 'APPROVED' || buildingStatus === 'ACTIVE' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : buildingStatus === 'IN_PROGRESS' 
                        ? 'bg-blue-100 text-blue-800'
                        : buildingStatus === 'REJECTED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {buildingStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold font-heading text-base text-gray-900 leading-tight">
                    {building.buildingName || meta.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 font-medium">
                    {building.location || meta.sector}
                  </p>

                  <div className="bg-gray-50 rounded-xl p-3 mb-2.5 border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        RPWD 2016 Score
                      </span>
                      <span className={`text-sm font-extrabold ${scoreTextClass}`}>
                        {score.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : score >= 50 ? 'bg-orange-500' : 'bg-rose-500'
                        }`} 
                        style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-500 flex items-center justify-between pt-1 border-t border-gray-100">
                    <span>Auditor: <strong className="text-gray-800 font-semibold">Vaibhav Tiwari</strong></span>
                    <span>{building.numberOfFloors || 5} Floors</span>
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
            html: `<div class="w-7 h-7 rounded-full bg-white border-2 border-[${typeConfig.color}] shadow-md flex items-center justify-center text-xs hover:scale-110 transition-transform">${typeConfig.icon}</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });

          return (
            <Marker key={feat.id} position={[feat.lat, feat.lng]} icon={featureIcon}>
              <Popup>
                <div className="p-1 max-w-xs">
                  <div className="flex items-center gap-1.5 font-bold text-gray-900 text-sm mb-1">
                    <span>{typeConfig.icon}</span>
                    <span>{feat.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{feat.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <MapBounds buildings={buildings} activeRoute={activeRoute} />
      </MapContainer>
    </div>
  );
};

export default CampusMap;

