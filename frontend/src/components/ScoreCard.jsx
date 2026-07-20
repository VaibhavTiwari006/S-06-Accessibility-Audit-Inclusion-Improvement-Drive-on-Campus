import React from 'react';
import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/Card';

const ScoreCard = ({ title, value, icon, colorClass = "text-primary bg-primary/10", onClick, trend, trendLabel }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: onClick ? -4 : 0 }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className="h-full"
    >
      <Card hover={!!onClick} className={`h-full ${onClick ? 'cursor-pointer' : ''}`}>
        <CardContent className="h-full flex flex-col justify-between">
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3 rounded-2xl ${colorClass}`}>
              {icon}
            </div>
            {onClick && (
              <ArrowUpRight size={20} className="text-gray-300" />
            )}
          </div>

          <div>
            <h3 className="text-3xl font-heading font-extrabold text-textMain tracking-tight mb-1">{value}</h3>
            <p className="text-xs text-textLight font-semibold uppercase tracking-wider">{title}</p>
            
            {trend !== undefined && (
              <div className={`flex items-center gap-1.5 mt-4 text-xs font-semibold px-2.5 py-1 rounded-md w-fit ${trend >= 0 ? 'text-success-dark bg-success/10' : 'text-danger-dark bg-danger/10'}`}>
                {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{Math.abs(trend)}%</span>
                {trendLabel && <span className="opacity-80 font-medium ml-1">{trendLabel}</span>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScoreCard;
