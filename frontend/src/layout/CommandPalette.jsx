import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, Building2, ClipboardList, Map, HeartHandshake, Settings as SettingsIcon } from 'lucide-react';
import Modal from '../components/ui/Modal';

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const commands = [
    { id: 'dashboard', title: 'Go to Dashboard', icon: LayoutDashboard, path: '/dashboard', shortcut: 'D' },
    { id: 'buildings', title: 'Manage Buildings', icon: Building2, path: '/buildings', shortcut: 'B' },
    { id: 'audits', title: 'View Audits', icon: ClipboardList, path: '/audits', shortcut: 'A' },
    { id: 'map', title: 'Campus Map', icon: Map, path: '/map', shortcut: 'M' },
    { id: 'community', title: 'Community Forum', icon: HeartHandshake, path: '/community', shortcut: 'C' },
    { id: 'settings', title: 'System Settings', icon: SettingsIcon, path: '/settings', shortcut: 'S' },
  ];

  const filteredCommands = commands.filter(cmd => cmd.title.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (path) => {
    navigate(path);
    onClose();
    setSearch('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : onClose(false); // Let parent handle opening if possible, but we don't have access to setIsOpen here. 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-secondary/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-cards rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="flex items-center px-4 border-b border-gray-100">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-4 bg-transparent border-none text-textMain placeholder:text-gray-400 focus:outline-none focus:ring-0 text-base"
              />
              <div className="text-xs text-gray-400 font-semibold border border-gray-200 rounded px-2 py-0.5 bg-gray-50">ESC</div>
            </div>
            
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                <ul className="space-y-1">
                  {filteredCommands.map((cmd) => (
                    <li key={cmd.id}>
                      <button
                        onClick={() => handleSelect(cmd.path)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-textMain hover:bg-primary/5 hover:text-primary rounded-xl transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <cmd.icon size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                          <span className="font-medium">{cmd.title}</span>
                        </div>
                        {cmd.shortcut && (
                          <div className="text-xs text-gray-400 font-semibold">
                            <span className="mr-1 opacity-60">Ctrl +</span>{cmd.shortcut}
                          </div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-14 text-center text-gray-500 text-sm">
                  No results found for "{search}"
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
