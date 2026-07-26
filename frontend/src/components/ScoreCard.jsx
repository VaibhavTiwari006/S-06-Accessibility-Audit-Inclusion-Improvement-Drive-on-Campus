import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const ScoreCard = ({ 
  title, 
  value, 
  icon, 
  colorClass = "text-primary bg-primary/10", 
  onClick, 
  trend, 
  trendLabel,
  bgImage = "/campus_bg.jpg" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, high-response springs for instant 3D rotation
  const mouseXSpring = useSpring(x, { stiffness: 800, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 800, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
          scale: 1.025,
          y: -5,
        }}
        whileTap={isClickable ? { scale: 0.98, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 700, damping: 25 }}
        className={`group relative h-full bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-gray-100/90 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.12)] transition-shadow duration-150 flex flex-col justify-between overflow-hidden select-none ${
          isClickable ? 'cursor-pointer' : ''
        }`}
      >
        {/* Background Image Layer with Instant Parallax Zoom & Blend */}
        {bgImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-all duration-200 scale-100 group-hover:scale-105 filter saturate-150 mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
        )}

        {/* Lively Animated Gradient Sheen / Mesh in Background */}
        <div 
          className="absolute -inset-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:animate-shimmer pointer-events-none" 
        />

        {/* Ambient Color Glow on Hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/90 to-primary/10 opacity-60 group-hover:opacity-90 transition-opacity duration-150 pointer-events-none" 
        />
        
        {/* Subtle 3D Top Border Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Row: Icon + Arrow */}
        <div className="flex items-start justify-between mb-5 relative z-10" style={{ transform: "translateZ(20px)" }}>
          <motion.div 
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`p-3.5 rounded-2xl ${colorClass} shadow-sm group-hover:shadow-md transition-shadow duration-300 flex items-center justify-center backdrop-blur-md`}
          >
            {icon}
          </motion.div>

          {isClickable && (
            <div className="p-2 rounded-xl bg-white/80 group-hover:bg-primary/10 text-gray-400 group-hover:text-primary transition-all duration-300 flex items-center justify-center transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 shadow-xs border border-gray-100/50">
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
              className={`flex items-center gap-1.5 mt-3.5 text-xs font-bold px-3 py-1 rounded-full w-fit shadow-xs backdrop-blur-md ${
                trend >= 0 ? 'text-emerald-700 bg-emerald-50/90 border border-emerald-100' : 'text-rose-700 bg-rose-50/90 border border-rose-100'
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
