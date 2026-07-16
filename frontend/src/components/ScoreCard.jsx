import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ScoreCard = ({ title, value, icon, colorClass = "text-primary bg-primary-50", onClick, trend, trendLabel }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative glass-panel rounded-2xl p-5 overflow-hidden transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-soft-lg' : 'cursor-default'
      }`}
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 -translate-y-6 translate-x-6 bg-current" />

      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClass} transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        {onClick && (
          <ArrowUpRight
            size={16}
            className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        )}
      </div>

      <div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-textMain tabular-nums">{value}</h3>
        <p className="text-xs text-textLight font-semibold uppercase tracking-wider mt-1">{title}</p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            <span>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
            {trendLabel && <span className="text-gray-400 font-normal">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
