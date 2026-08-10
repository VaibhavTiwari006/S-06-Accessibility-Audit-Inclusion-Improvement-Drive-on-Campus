import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccessibility } from '../context/AccessibilityContext';
import { motion } from 'framer-motion';
import { Eye, Type, Palette, Maximize, Activity, Focus, Bell, Type as TextIcon, Volume2, Sparkles } from 'lucide-react';

const BRAILLE_MAP = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
  'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
  'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
  ' ': '⠀', '1': '⠂', '2': '⠆', '3': '⠒', '4': '⠲', '5': '⠢', '6': '⠖', '7': '⠶', '8': '⠦', '9': '⠔', '0': '⠴'
};

const AccessibilityPreferences = () => {
  const { 
    highContrast, toggleHighContrast, 
    fontSize, changeFontSize, 
    dyslexiaFont, toggleDyslexiaFont, 
    reduceMotion, toggleReduceMotion, 
    colorBlindTheme, changeColorBlindTheme, 
    distractionFree, toggleDistractionFree, 
    magnifyMode, toggleMagnifyMode, 
    visualAlerts, toggleVisualAlerts,
    textToSpeech, toggleTextToSpeech,
    ttsVoice, changeTtsVoice
  } = useAccessibility();

  const [englishText, setEnglishText] = useState('welcome to campus');

  const translateToBraille = (text) => {
    return text.toLowerCase().split('').map(char => BRAILLE_MAP[char] || char).join('');
  };

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

          <div className="border-t border-gray-200/60 pt-4 mt-4 space-y-4">
            <h3 className="font-bold text-textMain text-sm flex items-center gap-2">
              <Volume2 className="text-secondary" size={18} /> Screen Reader (TTS)
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 transition-colors rounded-xl border border-gray-100/50 shadow-sm group">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg text-secondary group-hover:scale-110 transition-transform"><Volume2 size={20} /></div>
                <div>
                  <h3 className="font-bold text-textMain">Text-To-Speech</h3>
                  <p className="text-sm text-textLight mt-0.5">Read hovered text aloud</p>
                </div>
              </div>
              <ToggleSwitch checked={textToSpeech} onChange={toggleTextToSpeech} label="Toggle Screen Reader" />
            </div>

            {textToSpeech && (
              <div className="mt-3 p-4 bg-white/40 border border-gray-100 rounded-xl space-y-3">
                <div>
                  <label className="block text-xs font-bold text-textMain mb-1.5">Voice Preference</label>
                  <select 
                    value={ttsVoice} 
                    onChange={(e) => changeTtsVoice(e.target.value)}
                    className="w-full bg-white border border-gray-250 rounded-lg px-3 py-2 text-sm font-semibold text-textMain focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer"
                  >
                    <option value="default">System Default Voice</option>
                    <option value="Google US English">Google US English</option>
                    <option value="Google UK English Female">Google UK English Female</option>
                    <option value="Microsoft David - English (United States)">Microsoft David (US Male)</option>
                    <option value="Microsoft Zira - English (United States)">Microsoft Zira (US Female)</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!window.speechSynthesis) return;
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance("Welcome! Screen Reader accessibility assistant is active.");
                    if (ttsVoice !== 'default') {
                      const voices = window.speechSynthesis.getVoices();
                      const selected = voices.find(v => v.name.includes(ttsVoice));
                      if (selected) utterance.voice = selected;
                    }
                    window.speechSynthesis.speak(utterance);
                  }}
                  className="w-full py-1.5 border border-primary/20 bg-primary/10 hover:bg-primary/15 text-primary text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Volume2 size={12} /> Play Voice Demo
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Braille Translator Tool */}
      <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl shadow-soft-md border border-white/60 space-y-5 mt-8">
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-textMain border-b border-gray-100 pb-3">
            <Sparkles className="text-primary animate-pulse" size={24} /> Interactive English-to-Braille Translator
          </h2>
          <p className="text-sm text-textLight mt-0.5">
            Type any English sentence or number to watch it translate to Grade 1 Braille cells in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Input text */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">English Text Input</label>
            <textarea
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
              placeholder="Type English words or numbers to translate..."
              className="w-full h-32 bg-white/55 border border-gray-200 rounded-2xl p-4 text-sm font-semibold text-textMain focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-none"
              maxLength={200}
            />
            <div className="text-[10px] text-gray-400 font-bold text-right">
              {englishText.length}/200 characters
            </div>
          </div>

          {/* Output Braille dots */}
          <div className="space-y-2 flex flex-col">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Tactile Braille Output</label>
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center flex flex-col justify-center items-center relative overflow-hidden group shadow-inner min-h-[128px]">
              <div 
                className="text-4xl md:text-5xl font-mono text-white tracking-widest leading-relaxed break-all select-all font-bold transition-all duration-300"
                style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}
              >
                {englishText.trim() ? translateToBraille(englishText) : '⠀'}
              </div>
              {!englishText.trim() && (
                <div className="text-xs text-slate-500 font-semibold italic">
                  Translation will appear here
                </div>
              )}
            </div>

            {/* Quick buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const val = translateToBraille(englishText);
                  if (val) {
                    navigator.clipboard.writeText(val);
                    toast.success('Braille copied to clipboard!');
                  }
                }}
                disabled={!englishText.trim()}
                className="flex-1 py-2 border border-gray-200 hover:border-primary/20 hover:bg-primary/5 text-gray-700 disabled:opacity-40 disabled:hover:bg-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
              >
                Copy Braille Glyphs
              </button>
              <button
                type="button"
                onClick={() => setEnglishText('')}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-500 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessibilityPreferences;

