import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Moon, Sun } from 'lucide-react';

const AccessibilityPreferences = () => {
  const { highContrast, toggleHighContrast, fontSize, changeFontSize, dyslexiaFont, toggleDyslexiaFont, reduceMotion, toggleReduceMotion, colorBlindTheme, changeColorBlindTheme, distractionFree, toggleDistractionFree } = useAccessibility();

  return (
    <div className="max-w-4xl mx-auto page-container">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold gradient-text">Accessibility Preferences</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="section-card">
          <h2 className="text-xl font-bold mb-4 border-b border-gray-100 pb-2">Visual Adjustments</h2>
          
          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <div>
              <h3 className="font-semibold text-textMain">High Contrast Mode</h3>
              <p className="text-sm text-textLight mt-1">Enhance visual contrast for better readability</p>
            </div>
            <button 
              onClick={toggleHighContrast}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${highContrast ? 'bg-primary' : 'bg-gray-300'}`}
              role="switch"
              aria-checked={highContrast}
              aria-label="Toggle High Contrast Mode"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${highContrast ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>
          
          {/* Font Size Scaling */}
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 mt-4">
            <div>
              <h3 className="font-semibold text-textMain">Font Size</h3>
              <p className="text-sm text-textLight mt-1">Adjust text scale globally</p>
            </div>
            <select
              value={fontSize}
              onChange={(e) => changeFontSize(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Select Font Size"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </div>
          
          {/* Dyslexia-Friendly Font Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 mt-4">
            <div>
              <h3 className="font-semibold text-textMain">Dyslexia-Friendly Font</h3>
              <p className="text-sm text-textLight mt-1">Use Atkinson Hyperlegible for improved readability</p>
            </div>
            <button 
              onClick={toggleDyslexiaFont}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${dyslexiaFont ? 'bg-primary' : 'bg-gray-300'}`}
              role="switch"
              aria-checked={dyslexiaFont}
              aria-label="Toggle Dyslexia-Friendly Font"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${dyslexiaFont ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Reduce Motion Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 mt-4">
            <div>
              <h3 className="font-semibold text-textMain">Reduce Motion</h3>
              <p className="text-sm text-textLight mt-1">Minimize animations for comfort</p>
            </div>
            <button 
              onClick={toggleReduceMotion}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${reduceMotion ? 'bg-primary' : 'bg-gray-300'}`}
              role="switch"
              aria-checked={reduceMotion}
              aria-label="Toggle Reduce Motion"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${reduceMotion ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Color Blind Theme Selector */}
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 mt-4">
            <div>
              <h3 className="font-semibold text-textMain">Color Blind Theme</h3>
              <p className="text-sm text-textLight mt-1">Alternate palettes for color vision deficiencies</p>
            </div>
            <select
              value={colorBlindTheme}
              onChange={(e) => changeColorBlindTheme(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Select Color Blind Theme"
            >
              <option value="default">Default</option>
              <option value="protanopia">Protanopia (Red-blind)</option>
              <option value="deuteranopia">Deuteranopia (Green-blind)</option>
              <option value="tritanopia">Tritanopia (Blue-blind)</option>
            </select>
          </div>

          {/* Distraction Free Mode */}
          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100 mt-4">
            <div>
              <h3 className="font-semibold text-textMain">Distraction-Free Reading</h3>
              <p className="text-sm text-textLight mt-1">Hides sidebars and centers content</p>
            </div>
            <button 
              onClick={toggleDistractionFree}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${distractionFree ? 'bg-primary' : 'bg-gray-300'}`}
              role="switch"
              aria-checked={distractionFree}
              aria-label="Toggle Distraction-Free Mode"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${distractionFree ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPreferences;
