import React from 'react';
import { Building, TrendingUp, ShieldCheck, Award } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/Card';

const departmentsData = [
  {
    name: 'Computer Science & Engineering',
    code: 'CSE',
    score: 88.5,
    resolvedBarriers: 24,
    pendingBarriers: 2,
    trend: '+6.2%',
    status: 'EXCELLENT',
  },
  {
    name: 'University Institute of Computing',
    code: 'UIC',
    score: 82.0,
    resolvedBarriers: 18,
    pendingBarriers: 4,
    trend: '+4.1%',
    status: 'GOOD',
  },
  {
    name: 'Chandigarh Business School',
    code: 'CBS',
    score: 76.4,
    resolvedBarriers: 14,
    pendingBarriers: 6,
    trend: '+2.8%',
    status: 'MODERATE',
  },
  {
    name: 'Pharmaceutical Sciences',
    code: 'UIPS',
    score: 64.2,
    resolvedBarriers: 9,
    pendingBarriers: 11,
    trend: '+5.0%',
    status: 'NEEDS_ATTENTION',
  },
];

const DepartmentComparison = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
              <Building className="text-primary" size={24} /> Departmental Accessibility Comparison
            </h3>
            <p className="text-sm text-textLight mt-1">
              Compare WCAG & RPWD compliance metrics across university departments.
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <TrendingUp size={14} /> +4.5% Avg Growth
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {departmentsData.map((dept) => (
          <div
            key={dept.code}
            className="p-4 bg-white/70 rounded-2xl border border-gray-100 space-y-3 hover:shadow-sm transition-all"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {dept.code}
                </div>
                <div>
                  <h4 className="font-bold text-textMain text-sm leading-tight">
                    {dept.name}
                  </h4>
                  <span className="text-[11px] text-textLight font-medium">
                    {dept.resolvedBarriers} Barriers Fixed • {dept.pendingBarriers} Pending
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {dept.trend}
                </span>
                <span className="text-xl font-heading font-extrabold text-textMain">
                  {dept.score}%
                </span>
              </div>
            </div>

            {/* Score Progress Bar */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  dept.score >= 80
                    ? 'bg-emerald-500'
                    : dept.score >= 70
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${dept.score}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DepartmentComparison;
