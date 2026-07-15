import React from 'react';

const ScoreCard = ({ title, value, icon, colorClass = "text-primary bg-blue-50" }) => {
  return (
    <div className="bg-cards p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-full ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-textMain">{value}</h3>
      </div>
    </div>
  );
};

export default ScoreCard;
