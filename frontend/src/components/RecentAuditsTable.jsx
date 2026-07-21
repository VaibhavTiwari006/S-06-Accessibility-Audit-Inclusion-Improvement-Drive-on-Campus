import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './ui/Card';
import { ClipboardList, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import auditService from '../services/auditService';

const RecentAuditsTable = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const res = await auditService.getAllAudits();
        if (Array.isArray(res)) {
          // Sort by date descending and take top 5
          setAudits(res.sort((a, b) => new Date(b.auditDate) - new Date(a.auditDate)).slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to fetch recent audits', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAudits();
  }, []);

  if (loading) {
    return <div className="animate-pulse bg-gray-100 rounded-2xl h-64 w-full mt-6"></div>;
  }

  return (
    <Card className="h-full mt-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
              <ClipboardList className="text-primary" size={24} /> Recent Audits
            </h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/audits')} 
            className="text-primary hover:text-primary-dark"
          >
            View All <ChevronRight size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {audits.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent audits found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-textLight text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Building</th>
                  <th className="pb-3 font-semibold">Auditor</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {audits.map((audit) => (
                  <tr 
                    key={audit.id} 
                    onClick={() => navigate(`/audits/${audit.id}`)}
                    className="hover:bg-gray-50/50 cursor-pointer transition-colors group"
                  >
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-textMain group-hover:text-primary transition-colors">
                        {audit.buildingName || 'Unknown Building'}
                      </p>
                    </td>
                    <td className="py-4 pr-4 text-sm text-textLight">
                      {audit.auditorName || 'Unknown'}
                    </td>
                    <td className="py-4 pr-4 text-sm text-textLight flex items-center gap-1.5">
                      <Clock size={14} className="text-gray-400" />
                      {new Date(audit.auditDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      {audit.overallAccessibilityScore !== null && audit.overallAccessibilityScore !== undefined ? (
                        <Badge 
                          variant={
                            audit.overallAccessibilityScore >= 80 ? 'success' : 
                            audit.overallAccessibilityScore >= 50 ? 'warning' : 
                            'danger'
                          }
                        >
                          {audit.overallAccessibilityScore.toFixed(1)}%
                        </Badge>
                      ) : (
                        <Badge variant="secondary">N/A</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAuditsTable;
