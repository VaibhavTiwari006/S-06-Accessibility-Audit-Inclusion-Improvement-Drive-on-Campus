import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Building2, ChevronRight, Award, Star } from 'lucide-react';
import buildingService from '../services/buildingService';
import auditService from '../services/auditService';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './ui/Card';
import Button from './ui/Button';
import { motion } from 'framer-motion';

const InclusionLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const audits = await auditService.getAllAudits();
        
        // Group by building and find latest audit score
        const buildingScores = {};
        audits.forEach(audit => {
          if (!audit.buildingId || typeof audit.overallAccessibilityScore !== 'number') return;
          
          if (!buildingScores[audit.buildingId] || new Date(audit.auditDate) > new Date(buildingScores[audit.buildingId].date)) {
            buildingScores[audit.buildingId] = {
              id: audit.buildingId,
              buildingName: audit.buildingName || `Building #${audit.buildingId}`,
              buildingCode: `BLDG-${audit.buildingId}`,
              accessibilityScore: audit.overallAccessibilityScore,
              date: audit.auditDate
            };
          }
        });
        
        const topBuildings = Object.values(buildingScores)
          .sort((a, b) => b.accessibilityScore - a.accessibilityScore)
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
    <Card className="h-full relative overflow-hidden bg-white border border-gray-100/85 shadow-soft-sm">
      {/* Inline styles for medal shine effects */}
      <style>{`
        @keyframes medalShine {
          0% { transform: translateX(-150%) rotate(25deg); }
          50% { transform: translateX(250%) rotate(25deg); }
          100% { transform: translateX(250%) rotate(25deg); }
        }
        .medal-shine-container {
          position: relative;
          overflow: hidden;
        }
        .medal-shine-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(25deg);
          animation: medalShine 2.5s infinite ease-in-out;
          pointer-events: none;
        }
        .gold-border-glow {
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.15);
        }
        .silver-border-glow {
          box-shadow: 0 0 15px rgba(148, 163, 184, 0.1);
        }
        .bronze-border-glow {
          box-shadow: 0 0 15px rgba(217, 119, 6, 0.1);
        }
      `}</style>

      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <CardHeader className="pb-3 border-b border-gray-50">
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="text-xl font-heading font-extrabold text-textMain flex items-center gap-2">
              <Trophy className="text-amber-500 animate-pulse" size={24} /> Inclusion Leaderboard
            </h3>
            <p className="text-xs text-textLight mt-0.5 font-medium">Top accessible campus buildings</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/buildings')} 
            className="text-primary hover:text-primary-dark font-bold text-xs gap-1"
          >
            View All <ChevronRight size={14} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          {leaders.length === 0 ? (
            <p className="text-gray-500 text-center py-6 text-sm font-medium">No building data available yet.</p>
          ) : (
            leaders.map((building, index) => {
              // Metadata based on rank
              const isGold = index === 0;
              const isSilver = index === 1;
              const isBronze = index === 2;
              
              let rowStyle = "bg-white border-gray-100 hover:border-primary/20 hover:shadow-soft-sm";
              let medalStyle = "bg-gray-50 border border-gray-100 text-gray-500";
              let shadowStyle = "";

              if (isGold) {
                rowStyle = "bg-gradient-to-r from-amber-500/5 to-orange-500/5 border-amber-200/90 gold-border-glow hover:border-amber-400";
                medalStyle = "bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-600 text-amber-950 font-black medal-shine-container shadow-md shadow-amber-500/10";
              } else if (isSilver) {
                rowStyle = "bg-gradient-to-r from-slate-400/5 to-gray-400/5 border-slate-200/90 silver-border-glow hover:border-slate-400";
                medalStyle = "bg-gradient-to-br from-slate-350 via-white to-slate-500 text-slate-900 font-black medal-shine-container shadow-md shadow-slate-500/10";
              } else if (isBronze) {
                rowStyle = "bg-gradient-to-r from-orange-400/5 to-yellow-500/5 border-orange-200/70 bronze-border-glow hover:border-orange-400";
                medalStyle = "bg-gradient-to-br from-orange-500 via-orange-200 to-amber-700 text-orange-950 font-black medal-shine-container shadow-md shadow-orange-500/10";
              }

              return (
                <motion.div 
                  key={building.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.005, y: -1 }}
                  whileTap={{ scale: 0.995 }}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${rowStyle}`}
                  onClick={() => navigate(`/buildings/${building.id}`)}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Medal / Rank Indicator */}
                    <div className="relative">
                      {isGold && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm drop-shadow-sm select-none z-10 animate-bounce-slow">
                          👑
                        </div>
                      )}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm relative overflow-hidden ${medalStyle}`}>
                        {(isGold || isSilver || isBronze) && <div className="medal-shine-effect" />}
                        {isGold ? <Trophy size={18} className="drop-shadow-xs" /> : 
                         isSilver ? <Medal size={18} className="drop-shadow-xs" /> : 
                         isBronze ? <Award size={18} className="drop-shadow-xs" /> : 
                         `#${index + 1}`}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-textMain text-sm flex items-center gap-1.5">
                        {building.buildingName}
                        {isGold && <span className="text-[10px] bg-amber-500/15 text-amber-700 border border-amber-500/30 px-1.5 py-0.2 rounded font-extrabold flex items-center gap-0.5"><Star size={8} className="fill-amber-500" /> Winner</span>}
                      </h4>
                      <p className="text-xs text-textLight flex items-center gap-1 mt-1 font-semibold">
                        <Building2 size={11} className="text-gray-400" /> {building.buildingCode}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-lg font-heading font-extrabold tracking-tight ${
                      (building.accessibilityScore || 0) >= 80 ? 'text-success-dark' : 
                      (building.accessibilityScore || 0) >= 50 ? 'text-warning-dark' : 
                      'text-danger-dark'
                    }`}>
                      {(building.accessibilityScore || 0).toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </CardContent>
  );
};

export default InclusionLeaderboard;
