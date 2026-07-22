import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { motion } from 'framer-motion';
import { Eye, Type, Palette, Maximize, Activity, Focus, Bell, Type as TextIcon } from 'lucide-react';

const AccessibilityPreferences = () => {
  const { 
    highContrast, toggleHighContrast, 
    fontSize, changeFontSize, 
    dyslexiaFont, toggleDyslexiaFont, 
    reduceMotion, toggleReduceMotion, 
    colorBlindTheme, changeColorBlindTheme, 
    distractionFree, toggleDistractionFree, 
    magnifyMode, toggleMagnifyMode, 
    visualAlerts, toggleVisualAlerts 
  } = useAccessibility();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-inner ${checked ? 'bg-primary' : 'bg-gray-300'}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-8' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-heading font-extrabold text-textMain">Accessibility Preferences</h1>
        <p className="text-textLight mt-2 font-medium">Customize your experience to make the platform work best for your unique needs.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Visual & Typography Settings */}
        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl shadow-soft-md border border-white/60 space-y-5">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-textMain border-b border-gray-100 pb-3">
            <Eye className="text-primary" size={24} /> Visual & Typography
          </h2>
          
          <div className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 transition-colors rounded-xl border border-gray-100/50 shadow-sm group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform"><Palette size={20} /></div>
              <div>
                <h3 className="font-bold text-textMain">High Contrast Mode</h3>
                <p className="text-sm text-textLight mt-0.5">Enhance visual contrast for better readability</p>
              </div>
            </div>
            <ToggleSwitch checked={highContrast} onChange={toggleHighContrast} label="Toggle High Contrast Mode" />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 transition-colors rounded-xl border border-gray-100/50 shadow-sm group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform"><TextIcon size={20} /></div>
              <div>
                <h3 className="font-bold text-textMain">Global Font Size</h3>
                <p className="text-sm text-textLight mt-0.5">Adjust text scale across all pages</p>
              </div>
            </div>
            <select
              value={fontSize}
              onChange={(e) => changeFontSize(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              aria-label="Select Font Size"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 transition-colors rounded-xl border border-gray-100/50 shadow-sm group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform"><Type size={20} /></div>
              <div>
                <h3 className="font-bold text-textMain">Dyslexia-Friendly Font</h3>
                <p className="text-sm text-textLight mt-0.5">Use Atkinson Hyperlegible typeface</p>
              </div>
            </div>
            <ToggleSwitch checked={dyslexiaFont} onChange={toggleDyslexiaFont} label="Toggle Dyslexia-Friendly Font" />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 transition-colors rounded-xl border border-gray-100/50 shadow-sm group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform"><Palette size={20} /></div>
              <div>
                <h3 className="font-bold text-textMain">Color Blind Theme</h3>
                <p className="text-sm text-textLight mt-0.5">Palettes optimized for color vision</p>
              </div>
            </div>
            <select
              value={colorBlindTheme}
              onChange={(e) => changeColorBlindTheme(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              aria-label="Select Color Blind Theme"
            >
              <option value="default">Default</option>
              <option value="protanopia">Protanopia (Red-blind)</option>
              <option value="deuteranopia">Deuteranopia (Green-blind)</option>
              <option value="tritanopia">Tritanopia (Blue-blind)</option>
            </select>
          </div>
        </motion.div>

        {/* Motion & Interaction Settings */}
        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl shadow-soft-md border border-white/60 space-y-5">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-textMain border-b border-gray-100 pb-3">
            <Activity className="text-primary" size={24} /> Motion & Interaction
          </h2>
          
          <div className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 transition-colors rounded-xl border border-gray-100/50 shadow-sm group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary group-hover:scale-110 transition-transform"><Activity size={20} /></div>
              <div>
                <h3 className="font-bold text-textMain">Reduce Motion</h3>
                <p className="text-sm text-textLight mt-0.5">Minimize animations and transitions</p>
              </div>
            </div>
            <ToggleSwitch checked={reduceMotion} onChange={toggleReduceMotion} label="Toggle Reduce Motion" />
          </div>


          <div className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 transition-colors rounded-xl border border-gray-100/50 shadow-sm group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary group-hover:scale-110 transition-transform"><Maximize size={20} /></div>
              <div>
                <h3 className="font-bold text-textMain">Image Magnification</h3>
                <p className="text-sm text-textLight mt-0.5">Hover to enlarge images and charts</p>
              </div>
            </div>
            <ToggleSwitch checked={magnifyMode} onChange={toggleMagnifyMode} label="Toggle Image Magnification Mode" />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 transition-colors rounded-xl border border-gray-100/50 shadow-sm group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary group-hover:scale-110 transition-transform"><Bell size={20} /></div>
              <div>
                <h3 className="font-bold text-textMain">Visual Alerts</h3>
                <p className="text-sm text-textLight mt-0.5">Flash screen borders for notifications</p>
              </div>
            </div>
            <ToggleSwitch checked={visualAlerts} onChange={toggleVisualAlerts} label="Toggle Visual Alerts" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AccessibilityPreferences;

