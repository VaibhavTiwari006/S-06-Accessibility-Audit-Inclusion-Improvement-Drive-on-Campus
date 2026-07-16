import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-100 py-3 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-gray-400">
        <span>
          &copy; {new Date().getFullYear()} <strong className="text-gray-500">CU Access Audit</strong> &mdash; S-06 Project, Chandigarh University
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          All systems operational
        </span>
      </div>
    </footer>
  );
};

export default Footer;
