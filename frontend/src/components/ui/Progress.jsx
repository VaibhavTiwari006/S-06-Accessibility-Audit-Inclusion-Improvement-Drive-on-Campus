import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ value, max = 100, className = '', color = 'bg-primary' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={w-full bg-gray-100 rounded-full h-2 overflow-hidden } role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: ${percentage}% }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={h-full rounded-full }
      />
    </div>
  );
};

export const ProgressRing = ({ radius = 40, stroke = 8, progress = 0, color = 'text-primary' }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-gray-100"
        />
        <motion.circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={color}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-heading font-bold">{progress}%</span>
      </div>
    </div>
  );
};
