import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Building2, ChevronRight } from 'lucide-react';
import buildingService from '../services/buildingService';
import { useNavigate } from 'react-router-dom';

const InclusionLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const buildings = await buildingService.getAllBuildings();
        // Sort by accessibility score descending and take top 5
        const topBuildings = buildings
          .sort((a, b) => (b.accessibilityScore || 0) - (a.accessibilityScore || 0))
          .slice(0, 5);
        setLeaders(topBuildings);
      } catch (err) {
        console.error('Failed to fetch leaderboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-100 rounded-xl h-64 w-full"></div>;

  return (
    <div className="glass-panel p-6 rounded-2xl shadow-sm border border-gray-100 mt-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-6 relative">
        <div>
          <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
            <Trophy className="text-amber-500" size={24} /> Inclusion Leaderboard
          </h3>
          <p className="text-sm text-textLight mt-1">Top accessible campus buildings</p>
        </div>
        <button 
          onClick={() => navigate('/buildings')}
          className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {leaders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No building data available yet.</p>
        ) : (
          leaders.map((building, index) => (
            <div 
              key={building.id} 
              className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                index === 0 ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200' :
                index === 1 ? 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200' :
                index === 2 ? 'bg-gradient-to-r from-orange-50/50 to-amber-50/50 border-orange-200/50' :
                'bg-white border-gray-100'
              }`}
              onClick={() => navigate(`/buildings/${building.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${
                  index === 0 ? 'bg-amber-100 text-amber-600' :
                  index === 1 ? 'bg-slate-200 text-slate-600' :
                  index === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {index === 0 ? <Trophy size={18} /> : index === 1 ? <Medal size={18} /> : index === 2 ? <Medal size={18} /> : `#${index + 1}`}
                </div>
                <div>
                  <h4 className="font-bold text-textMain">{building.buildingName}</h4>
                  <p className="text-xs text-textLight flex items-center gap-1 mt-0.5">
                    <Building2 size={12} /> {building.buildingCode}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xl font-extrabold ${
                  (building.accessibilityScore || 0) >= 80 ? 'text-emerald-600' : 
                  (building.accessibilityScore || 0) >= 50 ? 'text-amber-600' : 
                  'text-red-600'
                }`}>
                  {(building.accessibilityScore || 0).toFixed(1)}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InclusionLeaderboard;
