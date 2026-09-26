import React, { useState } from 'react';
import { Building, TrendingUp, Trophy, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from './ui/Card';

const departmentsData = [
  {
    name: 'Computer Science & Engineering',
    block: 'Block A (A1–A3)',
    code: 'CSE',
    score: 96.7,
    resolvedBarriers: 26,
    pendingBarriers: 1,
    trend: '+8.2%',
    color: 'bg-emerald-500',
    accent: '#10b981',
    isWinner: true
  },
  {
    name: 'University Institute of Computing',
    block: 'Block C (C1–C3)',
    code: 'UIC',
    score: 79.7,
    resolvedBarriers: 21,
    pendingBarriers: 3,
    trend: '+4.8%',
    color: 'bg-emerald-500',
    accent: '#10b981'
  },
  {
    name: 'Chandigarh Business School',
    block: 'Block D (D1–D8)',
    code: 'CBS',
    score: 74.8,
    resolvedBarriers: 18,
    pendingBarriers: 5,
    trend: '+3.8%',
    color: 'bg-amber-500',
    accent: '#f59e0b'
  },
  {
    name: 'Pharmaceutical Sciences',
    block: 'Nek Chand (NC 1–5)',
    code: 'UIPS',
    score: 62.9,
    resolvedBarriers: 13,
    pendingBarriers: 8,
    trend: '+5.2%',
    color: 'bg-amber-500',
    accent: '#f59e0b'
  },
  {
    name: 'Engineering & Technology',
    block: 'Block B (B1–B5)',
    code: 'UIET',
    score: 59.8,
    resolvedBarriers: 11,
    pendingBarriers: 9,
    trend: '+3.4%',
    color: 'bg-blue-500',
    accent: '#3b82f6'
  },
];

const DepartmentComparison = () => {
  const [raceKey, setRaceKey] = useState(0);

  return (
    <Card className="h-full shadow-sm border border-gray-100">
      <CardHeader>
        <div className="flex flex-wrap justify-between items-center w-full gap-3">
          <div>
            <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
              <Building className="text-primary" size={24} /> Departmental Accessibility Comparison
            </h3>
            <p className="text-sm text-textLight mt-1">
              Compare WCAG & RPWD compliance metrics across university departments based on real ground survey data.
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <TrendingUp size={14} /> +5.1% Avg Growth
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {departmentsData.map((dept, index) => (
          <div
            key={`${dept.code}-${raceKey}`}
            className={`p-4 rounded-2xl border transition-all duration-300 ${
              dept.isWinner 
                ? 'bg-gradient-to-r from-emerald-50/40 via-white to-white border-emerald-200/80 shadow-xs winner-card' 
                : 'bg-white/80 border-gray-100 hover:shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl font-extrabold text-sm flex items-center justify-center flex-shrink-0 ${
                  dept.isWinner ? 'bg-emerald-500 text-white shadow-xs' : 'bg-primary/10 text-primary'
                }`}>
                  {dept.code}
                </div>
                <div>
                  <h4 className="font-bold text-textMain text-sm leading-tight flex items-center gap-2 flex-wrap">
                    {dept.name}
                    {dept.block && (
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200/50">
                        {dept.block}
                      </span>
                    )}
                    {dept.isWinner && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                        <Trophy size={11} className="text-amber-500" /> #1 Winner
                      </span>
                    )}
                  </h4>
                  <span className="text-[11px] text-textLight font-semibold">
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

            {/* Racing Progress Bar */}
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden p-0.5 relative">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: `${dept.score}%` }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 1.0,
                  ease: [0.16, 1, 0.3, 1], // snappy fast start, smooth finish
                  delay: index * 0.15,
                }}
                className={`h-full rounded-full relative overflow-hidden ${dept.color}`}
              >
                {/* Fast Racing Light Streak */}
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '200%' }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    delay: index * 0.15 + 0.5
                  }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DepartmentComparison;
