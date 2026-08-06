import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Filter } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/Card';

const fullData = [
  { month: 'Jan', score: 45, reports: 12, audits: 4 },
  { month: 'Feb', score: 52, reports: 19, audits: 7 },
  { month: 'Mar', score: 48, reports: 15, audits: 6 },
  { month: 'Apr', score: 61, reports: 8, audits: 11 },
  { month: 'May', score: 65, reports: 5, audits: 14 },
  { month: 'Jun', score: 72, reports: 3, audits: 18 },
  { month: 'Jul', score: 78, reports: 2, audits: 22 },
];

const weeklyData1M = [
  { month: 'Wk 1', score: 72, reports: 4 },
  { month: 'Wk 2', score: 74, reports: 3 },
  { month: 'Wk 3', score: 76, reports: 3 },
  { month: 'Wk 4', score: 78, reports: 2 },
];

const TIMEFRAMES = [
  { label: '1M', days: 4, text: 'last 30 days (weekly breakdown)', isWeekly: true },
  { label: '3M', days: 3, text: 'last 3 months' },
  { label: '6M', days: 6, text: 'last 6 months' },
  { label: '1Y', days: 7, text: 'full year' },
];

const AccessibilityTrendsChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');

  const tf = TIMEFRAMES.find(t => t.label === selectedTimeframe) || TIMEFRAMES[2];
  const chartData = tf.isWeekly ? weeklyData1M : fullData.slice(-tf.days);

  return (
    <Card className="h-full flex flex-col justify-between shadow-sm border border-gray-100 overflow-hidden">
      <CardHeader className="pb-3 flex-wrap gap-3 items-center justify-between border-b border-gray-50">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-heading font-bold text-textMain flex items-center gap-2">
            <TrendingUp className="text-primary" size={22} /> Campus Accessibility Trend
          </h3>
          <p className="text-xs text-textLight mt-0.5 font-medium">
            Average compliance score over the <span className="font-bold text-primary">{tf.text}</span>
          </p>
        </div>

        {/* Duration Filter Pills */}
        <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl border border-gray-200/50 filter-pills flex-shrink-0">
          {TIMEFRAMES.map((t) => (
            <button
              key={t.label}
              onClick={() => setSelectedTimeframe(t.label)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-200 focus:outline-none ${
                selectedTimeframe === t.label
                  ? 'bg-primary text-white shadow-xs scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-2 px-3 flex-1 flex flex-col justify-center min-h-[280px]">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C8102E" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#C8102E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
              dy={8} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              domain={[0, 100]}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                padding: '10px 14px'
              }}
              itemStyle={{ fontWeight: '700', color: '#0F172A' }}
              labelStyle={{ fontWeight: '700', color: '#C8102E', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              name="Compliance Score (%)" 
              stroke="#C8102E" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorScore)" 
              activeDot={{ r: 7, strokeWidth: 2, stroke: '#ffffff', fill: '#C8102E' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AccessibilityTrendsChart;
