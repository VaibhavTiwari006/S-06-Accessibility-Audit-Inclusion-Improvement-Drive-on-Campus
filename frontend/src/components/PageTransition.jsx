import React from 'react';
import { motion } from 'framer-motion';
import { useAccessibility } from '../context/AccessibilityContext';

const pageVariants = {
  initial: { opacity: 0, y: 15, scale: 0.99 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -15, scale: 0.99 }
};

const reducedMotionVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

const PageTransition = ({ children, className = "" }) => {
  const { reduceMotion } = useAccessibility();

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={reduceMotion ? reducedMotionVariants : pageVariants}
      transition={reduceMotion ? { duration: 0.2 } : { type: "spring", stiffness: 260, damping: 25, duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
