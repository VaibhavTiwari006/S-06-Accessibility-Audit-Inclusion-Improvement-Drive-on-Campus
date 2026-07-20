import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Building2, ChevronRight } from 'lucide-react';
import buildingService from '../services/buildingService';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './ui/Card';
import Button from './ui/Button';

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
    <Card className="h-full relative overflow-hidden mt-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
              <Trophy className="text-amber-500 animate-pulse-slow" size={24} /> Inclusion Leaderboard
            </h3>
            <p className="text-sm text-textLight mt-1">Top accessible campus buildings</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/buildings')} 
            className="text-primary hover:text-primary-dark"
          >
            View All <ChevronRight size={16} />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {leaders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No building data available yet.</p>
          ) : (
            leaders.map((building, index) => (
              <div 
                key={building.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-sm cursor-pointer ${
                  index === 0 ? 'bg-gradient-to-r from-amber-50 to-orange-50/50 border-amber-200' :
                  index === 1 ? 'bg-gradient-to-r from-slate-50 to-gray-50/50 border-slate-200' :
                  index === 2 ? 'bg-gradient-to-r from-orange-50/30 to-amber-50/30 border-orange-200/50' :
                  'bg-white border-gray-100 hover:border-primary/20'
                }`}
                onClick={() => navigate(`/buildings/${building.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${
                    index === 0 ? 'bg-amber-100 text-amber-600' :
                    index === 1 ? 'bg-slate-200 text-slate-600' :
                    index === 2 ? 'bg-orange-100 text-orange-600' :
                    'bg-gray-50 border border-gray-100 text-gray-500'
                  }`}>
                    {index === 0 ? <Trophy size={20} /> : index === 1 ? <Medal size={20} /> : index === 2 ? <Medal size={20} /> : `#${index + 1}`}
                  </div>
                  <div>
                    <h4 className="font-bold text-textMain text-base">{building.buildingName}</h4>
                    <p className="text-xs text-textLight flex items-center gap-1 mt-1 font-medium">
                      <Building2 size={12} /> {building.buildingCode}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-heading font-extrabold tracking-tight ${
                    (building.accessibilityScore || 0) >= 80 ? 'text-success-dark' : 
                    (building.accessibilityScore || 0) >= 50 ? 'text-warning-dark' : 
                    'text-danger-dark'
                  }`}>
                    {(building.accessibilityScore || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InclusionLeaderboard;
