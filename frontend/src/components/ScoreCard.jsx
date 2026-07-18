import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ScoreCard = ({ title, value, icon, colorClass = "text-primary bg-primary-50", onClick, trend, trendLabel }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`group relative h-full flex flex-col justify-between glass-premium rounded-3xl p-5 overflow-hidden transition-shadow duration-300 ${
        onClick ? 'cursor-pointer hover:shadow-soft-lg hover:shadow-primary/10' : 'cursor-default'
      }`}
    >
      {/* Subtle background accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl -translate-y-8 translate-x-8 ${colorClass.split(' ')[0].replace('text', 'bg')}`} />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-2xl ${colorClass} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
          {icon}
        </div>
        {onClick && (
          <ArrowUpRight
            size={18}
            className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
          />
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-textMain tabular-nums tracking-tight">{value}</h3>
        <p className="text-xs text-textLight font-bold uppercase tracking-wider mt-1">{title}</p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 mt-3 text-xs font-semibold px-2 py-1 rounded-full w-fit ${trend >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
            <span>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
            {trendLabel && <span className="opacity-75 font-medium ml-1">{trendLabel}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScoreCard;
