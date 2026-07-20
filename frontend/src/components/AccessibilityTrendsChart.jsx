import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/Card';

const data = [
  { month: 'Jan', score: 45, reports: 12 },
  { month: 'Feb', score: 52, reports: 19 },
  { month: 'Mar', score: 48, reports: 15 },
  { month: 'Apr', score: 61, reports: 8 },
  { month: 'May', score: 65, reports: 5 },
  { month: 'Jun', score: 72, reports: 3 },
  { month: 'Jul', score: 78, reports: 2 },
];

const AccessibilityTrendsChart = () => {
  return (
    <Card className="h-full mt-6">
      <CardHeader className="pb-2">
        <div>
          <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
            <TrendingUp className="text-primary" size={24} /> Campus Accessibility Trend
          </h3>
          <p className="text-sm text-textLight mt-1">Average compliance score over the last 7 months</p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: '600' }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              name="Compliance %" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorScore)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#0ea5e9' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AccessibilityTrendsChart;
