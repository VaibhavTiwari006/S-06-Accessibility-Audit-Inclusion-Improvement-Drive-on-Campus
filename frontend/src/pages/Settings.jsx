import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, User, Bell, Shield, Paintbrush, LogOut, CheckCircle, 
  Camera, Accessibility, Volume2, Eye, EyeOff, Sparkles, Trophy, ShieldAlert,
  ChevronRight, Laptop, HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

import { useAccessibility } from '../context/AccessibilityContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const { 
    darkMode, setDarkMode, 
    textToSpeech, toggleTextToSpeech, ttsVoice, changeTtsVoice,
    highContrast, toggleHighContrast,
    dyslexiaFont, toggleDyslexiaFont,
    fontSize, changeFontSize
  } = useAccessibility();

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  // Avatar customization options
  const avatarThemes = [
    { id: 'red', name: 'Admin Red', color: 'bg-gradient-to-tr from-red-500 to-rose-600', text: user?.fullName?.charAt(0) || 'U' },
    { id: 'blue', name: 'Auditor Blue', color: 'bg-gradient-to-tr from-blue-500 to-indigo-600', text: user?.fullName?.charAt(0) || 'U' },
    { id: 'green', name: 'Inclusion Green', color: 'bg-gradient-to-tr from-emerald-500 to-teal-600', text: '★' },
    { id: 'purple', name: 'Leadership Gold', color: 'bg-gradient-to-tr from-amber-500 to-orange-500', text: '⭐' },
    { id: 'pink', name: 'Support Heart', color: 'bg-gradient-to-tr from-pink-500 to-rose-500', text: '❤️' }
  ];
  const [selectedAvatarTheme, setSelectedAvatarTheme] = useState(avatarThemes[0]);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Live password strength
  const getPasswordStrength = () => {
    if (!newPassword) return { label: 'Empty', color: 'bg-gray-100', width: 'w-0' };
    if (newPassword.length < 5) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (newPassword.length < 8) return { label: 'Moderate', color: 'bg-amber-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
  };
  const strength = getPasswordStrength();

  // Screen Reader TTS Speak Demo
  const playVoiceDemo = () => {
    if (!window.speechSynthesis) {
      toast.error("Text-to-speech is not supported on this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const text = `Voice preferences updated. Chandigarh University accessibility assistant is active.`;
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (ttsVoice !== 'default') {
      const voices = window.speechSynthesis.getVoices();
      const selected = voices.find(v => v.name.includes(ttsVoice));
      if (selected) utterance.voice = selected;
    }
    window.speechSynthesis.speak(utterance);
    toast.success("Playing voice assistant demo!");
  };

  const handleSave = () => {
    toast.success('Preferences saved successfully!');
  };

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-inner ${checked ? 'bg-primary' : 'bg-gray-300'}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <SettingsIcon className="text-primary animate-spin-slow" size={32} /> Command Center
          </h2>
          <p className="text-textLight mt-1.5 font-medium">Configure deep accessibility, visual preferences, notifications, and security widgets.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary/10 hover:bg-primary-dark transition-colors flex items-center gap-1.5 cursor-pointer self-stretch md:self-auto text-center justify-center"
        >
          <CheckCircle size={14} /> Save All Changes
        </motion.button>
      </div>

      {/* Grid Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WIDGET 1: Interactive User Profile */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="p-6 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50 flex-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <User size={12} className="text-primary" /> Profile Passport
                </span>
                <span className="text-[9px] bg-primary/15 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  {user?.role}
                </span>
              </div>

              {/* Interactive Avatar Container */}
              <div className="flex flex-col items-center text-center space-y-4 py-2">
                <div className="relative group">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className={`w-24 h-24 rounded-full p-1 shadow-md cursor-pointer ${selectedAvatarTheme.color}`}
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  >
                    <div className="w-full h-full bg-white/10 backdrop-blur-xs rounded-full flex items-center justify-center text-white font-heading font-black text-3xl shadow-inner">
                      {selectedAvatarTheme.text}
                    </div>
                  </motion.div>
                  <button 
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 text-gray-600 hover:text-primary rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Camera size={13} />
                  </button>

                  {/* Avatar Customize Popover */}
                  <AnimatePresence>
                    {showAvatarPicker && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute z-20 top-26 left-1/2 -translate-x-1/2 bg-white border border-gray-150 p-3 rounded-2xl shadow-xl w-48 space-y-2"
                      >
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">Select Profile theme</p>
                        <div className="flex justify-center gap-2">
                          {avatarThemes.map(theme => (
                            <button
                              key={theme.id}
                              onClick={() => {
                                setSelectedAvatarTheme(theme);
                                setShowAvatarPicker(false);
                                toast.success(`Theme updated to ${theme.name}`);
                              }}
                              className={`w-7 h-7 rounded-full border border-white hover:scale-110 transition-all shadow-2xs ${theme.color} flex items-center justify-center text-[10px] text-white font-bold`}
                            >
                              {theme.id === 'pink' || theme.id === 'purple' ? '' : theme.text}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-extrabold text-textMain">{user?.fullName}</h4>
                  <p className="text-xs text-textLight">{user?.email}</p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white border border-gray-100 rounded-xl text-center shadow-2xs">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Audits Done</span>
                  <span className="text-xl font-heading font-black text-primary">12</span>
                </div>
                <div className="p-3 bg-white border border-gray-100 rounded-xl text-center shadow-2xs">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Issues Filed</span>
                  <span className="text-xl font-heading font-black text-amber-600">3</span>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block ml-1">Editable Display Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.fullName} 
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-textMain focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-2xs" 
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* WIDGET 2: Advanced Deep Accessibility & Switchboard */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-6 bg-white border border-gray-100 shadow-soft-sm flex flex-col justify-between flex-1">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Accessibility size={12} className="text-primary" /> Accessibility Command Center
                </span>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-0.5">
                  <Sparkles size={9} /> Active Specs
                </span>
              </div>

              {/* Toggles Board */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Toggle 1: High Contrast */}
                <div className={`p-4 border rounded-2xl transition-all duration-300 ${highContrast ? 'border-primary bg-primary/5 shadow-2xs' : 'border-gray-100 bg-gray-50/30'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`p-2 rounded-xl text-xs font-bold ${highContrast ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500'}`}><Eye size={16} /></span>
                    <ToggleSwitch checked={highContrast} onChange={toggleHighContrast} label="High Contrast" />
                  </div>
                  <h4 className="text-xs font-black text-textMain uppercase mb-1">High Contrast</h4>
                  <p className="text-[10px] text-textLight leading-tight">Apply intense black colors and borders.</p>
                </div>

                {/* Toggle 2: Dark Theme */}
                <div className={`p-4 border rounded-2xl transition-all duration-300 ${darkMode ? 'border-primary bg-primary/5 shadow-2xs' : 'border-gray-100 bg-gray-50/30'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`p-2 rounded-xl text-xs font-bold ${darkMode ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500'}`}><Laptop size={16} /></span>
                    <ToggleSwitch checked={darkMode} onChange={() => setDarkMode(!darkMode)} label="Dark Mode" />
                  </div>
                  <h4 className="text-xs font-black text-textMain uppercase mb-1">Dark Mode</h4>
                  <p className="text-[10px] text-textLight leading-tight">Switch system screens to dark backgrounds.</p>
                </div>

                {/* Toggle 3: Dyslexia Friendly */}
                <div className={`p-4 border rounded-2xl transition-all duration-300 ${dyslexiaFont ? 'border-primary bg-primary/5 shadow-2xs' : 'border-gray-100 bg-gray-50/30'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`p-2 rounded-xl text-xs font-bold ${dyslexiaFont ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500'}`}><Paintbrush size={16} /></span>
                    <ToggleSwitch checked={dyslexiaFont} onChange={toggleDyslexiaFont} label="Dyslexia Font" />
                  </div>
                  <h4 className="text-xs font-black text-textMain uppercase mb-1">Dyslexic Font</h4>
                  <p className="text-[10px] text-textLight leading-tight">Use OpenDyslexic letters to aid reading.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Font Size & Live Typography Preview */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block ml-1">Interface Font Size</label>
                  <div className="flex gap-2">
                    {['Small', 'Medium', 'Large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => changeFontSize(size)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          fontSize === size 
                            ? 'bg-primary text-white shadow-soft-sm' 
                            : 'bg-white hover:bg-gray-50 text-gray-500 border border-gray-200 shadow-2xs'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Real-time Visual Preview */}
                  <div className="p-3.5 bg-gray-50 border border-gray-150 rounded-2xl flex flex-col gap-1.5 shadow-2xs">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Live Typography Preview</span>
                    <p 
                      className={`font-semibold transition-all duration-300 leading-tight ${
                        fontSize === 'Small' ? 'text-xs' : fontSize === 'Large' ? 'text-lg' : 'text-sm'
                      } ${dyslexiaFont ? 'font-dyslexic' : 'font-sans'} ${highContrast ? 'text-black border-l-4 border-primary pl-2' : 'text-textMain'}`}
                    >
                      Chandigarh University Accessibility Drive
                    </p>
                  </div>
                </div>

                {/* Voice Assistant Speech Synthesis */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block ml-1">Screen Reader (TTS)</label>
                  
                  <div className="p-4 bg-gray-55/20 border border-gray-100 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-textMain flex items-center gap-1.5">
                        <Volume2 size={14} className="text-primary" /> TTS Screen Reader
                      </span>
                      <ToggleSwitch checked={textToSpeech} onChange={toggleTextToSpeech} label="Toggle Screen Reader" />
                    </div>

                    {textToSpeech && (
                      <div className="space-y-3 pt-2 border-t border-gray-200/50">
                        <select 
                          value={ttsVoice} 
                          onChange={(e) => changeTtsVoice(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs cursor-pointer"
                        >
                          <option value="default">System Default Voice</option>
                          <option value="Google US English">Google US English</option>
                          <option value="Google UK English Female">Google UK English Female</option>
                          <option value="Microsoft David - English (United States)">Microsoft David (US Male)</option>
                          <option value="Microsoft Zira - English (United States)">Microsoft Zira (US Female)</option>
                        </select>

                        <button
                          onClick={playVoiceDemo}
                          className="w-full py-1.5 border border-primary/20 bg-primary/10 hover:bg-primary/15 text-primary text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <Volume2 size={11} /> Play Voice Demo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 2: Notifications and Security Password Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WIDGET 3: Notification Switchboard */}
        <div className="lg:col-span-1 flex flex-col">
          <Card className="p-6 bg-white border border-gray-100 shadow-soft-sm flex flex-col justify-between flex-1">
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Bell size={12} className="text-primary" /> Alert Preferences
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'email', label: 'Email Alerts', desc: 'Daily summaries & updates', icon: Bell },
                  { id: 'push', label: 'Push Notifications', desc: 'Realtime assignments info', icon: Sparkles }
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-50 rounded-xl bg-gray-50/20 hover:bg-gray-50/50 transition-colors shadow-2xs">
                    <div>
                      <h5 className="font-bold text-xs text-textMain leading-none">{item.label}</h5>
                      <span className="text-[9px] text-textLight block mt-1">{item.desc}</span>
                    </div>
                    <ToggleSwitch 
                      checked={notifications[item.id]} 
                      onChange={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })} 
                      label={item.label} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-5 flex justify-end">
              <button 
                onClick={handleSave}
                className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-primary hover:border-primary/30 rounded-xl text-[10px] font-bold transition-all shadow-2xs cursor-pointer"
              >
                Apply Alerts
              </button>
            </div>
          </Card>
        </div>

        {/* WIDGET 4: Interactive Security & Passwords */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="p-6 bg-white border border-gray-100 shadow-soft-sm flex flex-col justify-between flex-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Shield size={12} className="text-primary" /> Authentication Security
                </span>
                <span className="text-[9px] text-gray-400 font-semibold tracking-wide">Last modified: 4 days ago</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current Password Field */}
                <div className="space-y-1.5 relative">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block ml-1">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-textMain focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-2xs" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* New Password Field */}
                <div className="space-y-1.5 relative">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block ml-1">New Password</label>
                  <div className="relative">
                    <input 
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2 text-xs font-bold text-textMain focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-2xs" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-gray-400 uppercase tracking-wider">Password Strength:</span>
                    <span className={strength.label === 'Strong' ? 'text-emerald-600' : strength.label === 'Moderate' ? 'text-amber-500' : 'text-red-500'}>{strength.label}</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden w-full relative">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 mt-5 flex justify-end">
              <button 
                onClick={() => {
                  if (!currentPassword || !newPassword) {
                    toast.error('Please enter current and new passwords.');
                    return;
                  }
                  toast.success('Password updated successfully!');
                  setCurrentPassword('');
                  setNewPassword('');
                }}
                className="px-5 py-2 bg-gray-800 text-white rounded-xl text-[10px] font-bold hover:bg-black transition-all shadow-2xs cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Simple visual Card wrappers if Card component is not globally exposed
const Card = ({ children, className }) => (
  <div className={`bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-soft-md ${className}`}>
    {children}
  </div>
);

export default Settings;
