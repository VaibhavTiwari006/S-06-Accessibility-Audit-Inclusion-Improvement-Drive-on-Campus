import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  return (
    <div className="w-full">
      <div className="flex space-x-2 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={elative px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap focus:outline-none }
          >
            <div className="flex items-center gap-2">
              {tab.icon && <tab.icon size={16} />}
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
};
export default Tabs;
