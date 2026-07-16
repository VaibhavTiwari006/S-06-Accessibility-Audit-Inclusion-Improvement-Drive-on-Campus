import React from 'react';

const ScoreCard = ({ title, value, icon, colorClass = "text-primary bg-primary-50", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-panel p-6 rounded-2xl flex items-center gap-5 group hover:-translate-y-1 transition-all duration-300 hover:shadow-soft-lg ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className={`p-4 rounded-xl ${colorClass} transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-textLight font-medium mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-heading font-bold text-textMain">{value}</h3>
      </div>
    </div>
  );
};

export default ScoreCard;
