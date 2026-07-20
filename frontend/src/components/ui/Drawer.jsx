import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Drawer = ({ isOpen, onClose, title, children, position = 'right' }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const variants = {
    right: { hidden: { x: '100%' }, visible: { x: 0 } },
    left: { hidden: { x: '-100%' }, visible: { x: 0 } }
  };

  const styleClasses = position === 'right' ? 'right-0 rounded-l-3xl border-l' : 'left-0 rounded-r-3xl border-r';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-secondary/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial="hidden" animate="visible" exit="hidden"
            variants={variants[position]}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={bsolute top-0 bottom-0 w-full max-w-md bg-cards shadow-2xl border-gray-100 flex flex-col }
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-heading font-bold text-textMain">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default Drawer;
