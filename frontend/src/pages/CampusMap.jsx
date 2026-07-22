import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { 
  Map, Maximize, Minimize, Navigation, CheckCircle2, 
  Layers, Clock, Compass, ArrowRight, RotateCcw 
} from 'lucide-react';
import buildingService from '../services/buildingService';
import { 
  ACCESSIBILITY_FEATURE_TYPES, 
  getCampusFeatures, 
  calculateWheelchairRoute 
} from '../services/mapService';
import { toast } from 'react-toastify';
import LeafletMap from '../components/CampusMap';
import Button from '../components/ui/Button';

const CampusMapPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map Feature Layer Toggles
  const [visibleFeatureTypes, setVisibleFeatureTypes] = useState([
    'RAMP', 'ELEVATOR', 'WASHROOM', 'PARKING'
  ]);

  // Wheelchair Navigation State
  const [startBuildingId, setStartBuildingId] = useState('');
  const [endBuildingId, setEndBuildingId] = useState('');
  const [activeRoute, setActiveRoute] = useState(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const data = await buildingService.getAllBuildings();
        setBuildings(data);

        if (data.length >= 2) {
          setStartBuildingId(String(data[0].id));
          setEndBuildingId(String(data[1].id));
        }
      } catch (error) {
        toast.error('Failed to fetch campus buildings.');
      } finally {
        setLoading(false);
      }
    };
    fetchBuildings();
  }, []);

  const toggleFeatureLayer = (typeId) => {
    setVisibleFeatureTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleCalculateRoute = () => {
    if (!startBuildingId || !endBuildingId) {
      toast.error('Please select both Origin and Destination buildings.');
      return;
    }
    if (startBuildingId === endBuildingId) {
      toast.error('Origin and Destination buildings must be different.');
      return;
    }

    const startB = buildings.find((b) => String(b.id) === String(startBuildingId));
    const endB = buildings.find((b) => String(b.id) === String(endBuildingId));

    const route = calculateWheelchairRoute(startB, endB);
    setActiveRoute(route);
    toast.success(`Wheelchair route calculated: ~${route.estimatedMinutes} mins`);
  };

  const handleClearRoute = () => {
    setActiveRoute(null);
  };

  const campusFeatures = getCampusFeatures(buildings);

  return (
    <PageTransition>
      <div className={`flex flex-col gap-6 ${isFullscreen ? 'fixed inset-0 z-[100] bg-background p-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading text-textMain flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <Map size={22} />
              </div>
              Interactive Campus Accessibility Map
            </h1>
            <p className="text-textLight text-sm mt-1.5 font-medium">
              Explore barrier-free routes, ramps, elevators, and color-coded building accessibility scores.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-textMain transition-all shadow-xs"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>

        {/* Accessibility Feature Layer Toggles */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 flex items-center gap-1.5">
            <Layers size={14} className="text-primary" /> Feature Layers:
          </span>
          {Object.values(ACCESSIBILITY_FEATURE_TYPES).map((feat) => {
            const isVisible = visibleFeatureTypes.includes(feat.id);
            return (
              <button
                key={feat.id}
                onClick={() => toggleFeatureLayer(feat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isVisible
                    ? 'bg-primary/10 text-primary border border-primary/30 shadow-xs'
                    : 'bg-gray-50 text-gray-400 border border-gray-100 hover:text-gray-600'
                }`}
              >
                <span>{feat.icon}</span>
                <span>{feat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Wheelchair Planner + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Wheelchair Navigation & Route Planner Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-base font-bold font-heading text-textMain border-b border-gray-100 pb-3">
                <Navigation className="text-primary" size={20} />
                <span>Wheelchair Route Navigation</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Start Building (Origin)
                  </label>
                  <select
                    value={startBuildingId}
                    onChange={(e) => setStartBuildingId(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-textMain focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {buildings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.buildingName} ({b.buildingCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Destination Building
                  </label>
                  <select
                    value={endBuildingId}
                    onChange={(e) => setEndBuildingId(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-textMain focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {buildings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.buildingName} ({b.buildingCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleCalculateRoute}
                    icon={Compass}
                    className="flex-1 shadow-md"
                  >
                    Find Route
                  </Button>
                  {activeRoute && (
                    <button
                      onClick={handleClearRoute}
                      className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all"
                      title="Clear Route"
                    >
                      <RotateCcw size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Calculated Route Details */}
              {activeRoute && (
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                      Barrier-Free Path
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full shadow-xs">
                      <Clock size={12} /> ~{activeRoute.estimatedMinutes} mins
                    </span>
                  </div>

                  <div className="text-xs text-emerald-950 font-semibold space-y-1">
                    <p>Distance: <strong>{activeRoute.distanceMeters} meters</strong></p>
                    <p>Gradient: <strong>{activeRoute.slopeGrading}</strong></p>
                  </div>

                  <div className="pt-2 border-t border-emerald-200/60 space-y-1.5">
                    <p className="text-[11px] font-bold text-emerald-800 uppercase">Directions:</p>
                    {activeRoute.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-emerald-900 font-medium">
                        <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Score Color Legend */}
            <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Accessibility Score Legend
              </span>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-success ring-2 ring-success/30"></span>
                  <span className="text-textMain">High Accessibility (≥ 80%)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-warning ring-2 ring-warning/30"></span>
                  <span className="text-textMain">Moderate Accessibility (50 - 79%)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-danger ring-2 ring-danger/30"></span>
                  <span className="text-textMain">High Barriers (&lt; 50%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaflet Map Display */}
          <div className="lg:col-span-2 relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm min-h-[500px] h-[calc(100vh-280px)]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 font-medium">Loading Map Data...</p>
              </div>
            ) : (
              <div className="absolute inset-0">
                <LeafletMap
                  buildings={buildings}
                  features={campusFeatures}
                  activeRoute={activeRoute}
                  visibleFeatureTypes={visibleFeatureTypes}
                  className="!h-full !border-none !rounded-none"
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default CampusMapPage;
