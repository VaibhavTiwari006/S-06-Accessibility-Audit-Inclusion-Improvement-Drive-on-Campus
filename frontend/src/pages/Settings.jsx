import React, { useState, useEffect, useRef } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Paintbrush, LogOut, CheckCircle, Camera, Accessibility, Volume2, Eye, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

import { useAccessibility } from '../context/AccessibilityContext';
import userService from '../services/userService';

const Settings = () => {
  const { user, logout, updateUser } = useAuth();
  const { 
    darkMode, setDarkMode, 
    textToSpeech, toggleTextToSpeech, ttsVoice, changeTtsVoice,
    highContrast, toggleHighContrast,
    dyslexiaFont, toggleDyslexiaFont,
    fontSize, changeFontSize
  } = useAccessibility();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.fullName) {
      setFullName(user.fullName);
    }
    if (user?.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        toast.info("Click 'Save Changes' to update your profile photo.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar('');
    toast.info("Click 'Save Changes' to confirm profile photo removal.");
  };

  const handleSave = async () => {
    try {
      if (!fullName.trim()) {
        toast.error('Name cannot be empty.');
        return;
      }
      if (user?.id) {
        await userService.updateUser(user.id, fullName);
      }
      updateUser({ fullName, avatar });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    }
  };

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-inner ${checked ? 'bg-primary' : 'bg-gray-300'}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  );

  const tabContentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.15 } }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col">
        <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
          <SettingsIcon className="text-primary" size={32} /> System Settings
        </h2>
        <p className="text-textLight mt-1.5 font-medium">Manage your account preferences, security, and notification settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Sidebar Menu */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-gray-100 shadow-soft-sm flex flex-col gap-1.5 h-full min-h-[480px]">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 pb-2 pt-1 border-b border-gray-50 mb-1">Preferences</p>
            {[
              { id: 'profile', icon: <User size={16} />, label: 'Profile Info' },
              { id: 'notifications', icon: <Bell size={16} />, label: 'Notifications' },
              { id: 'security', icon: <Shield size={16} />, label: 'Security & Auth' },
              { id: 'appearance', icon: <Paintbrush size={16} />, label: 'Appearance' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 border relative overflow-hidden ${
                  activeTab === tab.id 
                    ? 'text-primary bg-primary/10 border-primary/20 shadow-2xs font-extrabold scale-[1.01]' 
                    : 'text-gray-500 hover:bg-gray-55/40 hover:text-gray-900 border-transparent'
                }`}
              >
                {tab.icon} {tab.label}
                {activeTab === tab.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-primary rounded-r-full" />}
              </button>
            ))}
            
            <div className="border-t border-gray-100 my-3 mx-2"></div>
            
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-300 group mt-auto"
            >
              <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-gray-100 shadow-soft-md min-h-[480px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div key="profile" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 h-full flex flex-col justify-between flex-1">
                <div className="space-y-5">
                  <div className="border-b border-gray-100 pb-3.5">
                    <h3 className="text-xl font-bold text-textMain">Profile Information</h3>
                    <p className="text-xs text-textLight mt-0.5">Update your account details and public profile.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl shadow-2xs">
                    <div className="relative group">
                      <div className="w-20 h-20 bg-gradient-to-tr from-primary to-primary-dark rounded-full p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                        {avatar ? (
                          <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-primary font-heading font-black text-3xl">
                            {user?.fullName?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-200 text-gray-600 hover:text-primary rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Camera size={12} />
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleAvatarChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <h4 className="text-base font-extrabold text-textMain leading-none">{user?.fullName}</h4>
                      <div className="pt-0.5 flex flex-wrap gap-2 items-center justify-center sm:justify-start">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                          {user?.role}
                        </span>
                        {avatar && (
                          <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="text-[11px] font-bold text-red-600 hover:text-red-805 hover:underline transition-all cursor-pointer"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold tracking-wide">Click the camera badge to upload a custom avatar</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-textMain focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-2xs" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block ml-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email} 
                        disabled 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed shadow-2xs" 
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block ml-1">System Role</label>
                      <input 
                        type="text" 
                        defaultValue={user?.role} 
                        disabled 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed shadow-2xs" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-5 border-t border-gray-150 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSave} 
                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary/10 hover:bg-primary-dark transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle size={14} /> Save Changes
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div key="notifications" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5 h-full flex flex-col justify-between flex-1">
                <div className="space-y-5">
                  <div className="border-b border-gray-100 pb-3.5">
                    <h3 className="text-xl font-bold text-textMain">Notification Preferences</h3>
                    <p className="text-xs text-textLight mt-0.5">Control how and when you receive system alerts.</p>
                  </div>
                  
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-gray-50/80 transition-colors shadow-2xs group">
                      <div className="flex gap-3.5 items-center">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:scale-105 transition-transform"><Bell size={18} /></div>
                        <div>
                          <h4 className="font-bold text-sm text-textMain">Email Notifications</h4>
                          <p className="text-xs text-textLight mt-0.5">Receive daily summaries and critical alerts via email.</p>
                        </div>
                      </div>
                      <ToggleSwitch checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} label="Toggle Email Notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-gray-50/80 transition-colors shadow-2xs group">
                      <div className="flex gap-3.5 items-center">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:scale-105 transition-transform"><Bell size={18} /></div>
                        <div>
                          <h4 className="font-bold text-sm text-textMain">Push Notifications</h4>
                          <p className="text-xs text-textLight mt-0.5">Real-time alerts for audit assignments and approvals.</p>
                        </div>
                      </div>
                      <ToggleSwitch checked={notifications.push} onChange={() => setNotifications({...notifications, push: !notifications.push})} label="Toggle Push Notifications" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-5 border-t border-gray-150 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSave} 
                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary/10 hover:bg-primary-dark transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle size={14} /> Save Preferences
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div key="security" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5 h-full flex flex-col justify-between flex-1">
                <div className="space-y-5">
                  <div className="border-b border-gray-100 pb-3.5">
                    <h3 className="text-xl font-bold text-textMain">Security Settings</h3>
                    <p className="text-xs text-textLight mt-0.5">Update your password and secure your account.</p>
                  </div>
                  
                  <div className="space-y-4 max-w-md pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block ml-1">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-textMain focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-2xs" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block ml-1">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-white/70 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-textMain focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-2xs" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-5 border-t border-gray-150 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSave} 
                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary/10 hover:bg-primary-dark transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle size={14} /> Update Password
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div key="appearance" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5 h-full flex flex-col justify-between flex-1">
                <div className="space-y-5">
                  <div className="border-b border-gray-100 pb-3.5">
                    <h3 className="text-xl font-bold text-textMain">Appearance</h3>
                    <p className="text-xs text-textLight mt-0.5">Customize the visual theme of your dashboard.</p>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-3 ml-1">Theme Preference</label>
                    <div className="flex gap-4">
                      <div 
                        onClick={() => setDarkMode(false)}
                        className={`border-2 rounded-2xl p-1.5 cursor-pointer shadow-2xs transition-all w-36 ${!darkMode ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50/50 hover:bg-gray-50'}`}
                      >
                        <div className="bg-white border border-gray-200 rounded-xl w-full h-16 flex flex-col items-center justify-center gap-1.5 shadow-2xs">
                          <div className="w-12 h-2 bg-gray-200 rounded-full"></div>
                          <div className="w-8 h-1.5 bg-gray-100 rounded-full"></div>
                        </div>
                        <p className={`text-xs text-center mt-2.5 font-bold flex items-center justify-center gap-1 ${!darkMode ? 'text-primary' : 'text-gray-500'}`}>
                          {!darkMode && <CheckCircle size={12} />} Light Mode
                        </p>
                      </div>
                      
                      <div 
                        onClick={() => setDarkMode(true)}
                        className={`border-2 rounded-2xl p-1.5 cursor-pointer shadow-2xs transition-all w-36 ${darkMode ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50/50 hover:bg-gray-50'}`}
                      >
                        <div className="bg-gray-950 border border-gray-800 rounded-xl w-full h-16 flex flex-col items-center justify-center gap-1.5 shadow-2xs">
                          <div className="w-12 h-2 bg-gray-700 rounded-full"></div>
                          <div className="w-8 h-1.5 bg-gray-800 rounded-full"></div>
                        </div>
                        <p className={`text-xs text-center mt-2.5 font-bold flex items-center justify-center gap-1 ${darkMode ? 'text-primary' : 'text-gray-500'}`}>
                          {darkMode && <CheckCircle size={12} />} Dark Mode
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-5 border-t border-gray-150 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSave} 
                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary/10 hover:bg-primary-dark transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle size={14} /> Save Appearance
                  </motion.button>
                </div>
              </motion.div>
            )}


          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
