import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const ScoreCard = ({ title, value, icon, colorClass = "text-primary bg-primary/10", onClick, trend, trendLabel }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const isClickable = !!onClick;

  return (
    <motion.div
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.03,
          y: -6,
        }}
        whileTap={isClickable ? { scale: 0.97, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`group relative h-full bg-white rounded-2xl p-6 border border-gray-100/80 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col justify-between overflow-hidden select-none ${
          isClickable ? 'cursor-pointer' : ''
        }`}
      >
        {/* Subtle ambient gradient overlay on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" 
        />
        
        {/* Subtle 3D Top Border Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Row: Icon + Arrow */}
        <div className="flex items-start justify-between mb-5 relative z-10" style={{ transform: "translateZ(20px)" }}>
          <motion.div 
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`p-3.5 rounded-2xl ${colorClass} shadow-sm group-hover:shadow-md transition-shadow duration-300 flex items-center justify-center`}
          >
            {icon}
          </motion.div>

          {isClickable && (
            <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-primary/10 text-gray-400 group-hover:text-primary transition-all duration-300 flex items-center justify-center transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 shadow-xs">
              <ArrowUpRight size={18} />
            </div>
          )}
        </div>

        {/* Bottom Content: Numbers & Labels */}
        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-3xl lg:text-4xl font-heading font-extrabold text-textMain tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
            {value}
          </h3>
          <p className="text-xs font-bold text-textLight uppercase tracking-wider">
            {title}
          </p>

          {trend !== undefined && (
            <div 
              className={`flex items-center gap-1.5 mt-3.5 text-xs font-bold px-3 py-1 rounded-full w-fit shadow-xs ${
                trend >= 0 ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-rose-700 bg-rose-50 border border-rose-100'
              }`}
            >
              {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{Math.abs(trend)}%</span>
              {trendLabel && <span className="opacity-80 font-semibold ml-0.5">{trendLabel}</span>}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScoreCard;
