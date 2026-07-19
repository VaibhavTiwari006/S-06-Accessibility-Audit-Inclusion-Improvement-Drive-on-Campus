import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Paintbrush, LogOut, CheckCircle, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
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

  const tabContentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col mb-4">
        <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
          <SettingsIcon className="text-primary" size={32} /> System Settings
        </h2>
        <p className="text-textLight mt-2 font-medium">Manage your account preferences, security, and notification settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Menu */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="glass-panel p-3 rounded-2xl shadow-soft-sm border border-white/60 flex flex-col gap-1 sticky top-24">
            {[
              { id: 'profile', icon: <User size={18} />, label: 'Profile Information' },
              { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
              { id: 'security', icon: <Shield size={18} />, label: 'Security' },
              { id: 'appearance', icon: <Paintbrush size={18} />, label: 'Appearance' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                  activeTab === tab.id 
                    ? 'text-primary bg-primary/10 shadow-sm border border-primary/20' 
                    : 'text-gray-600 hover:bg-white/60 hover:text-gray-900 border border-transparent'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            
            <div className="border-t border-gray-200/50 my-2 mx-2"></div>
            
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-danger hover:bg-danger/10 border border-transparent hover:border-danger/20 transition-all duration-300 group"
            >
              <LogOut size={18} className="group-hover:scale-110 transition-transform" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 glass-panel py-6 px-8 rounded-3xl shadow-soft-md border border-white/60 h-fit max-w-2xl">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div key="profile" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-2xl font-bold text-textMain">Profile Information</h3>
                  <p className="text-sm text-textLight mt-1">Update your account details and public profile.</p>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="relative group cursor-pointer">
                    <div className="w-28 h-28 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center text-primary text-4xl font-heading font-bold shadow-soft-sm border-2 border-primary/20 group-hover:border-primary/50 transition-all">
                      {user?.fullName?.charAt(0)}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={28} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-textMain">{user?.fullName}</h4>
                    <p className="text-textLight text-sm font-medium">{user?.role}</p>
                    <button className="mt-3 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:shadow-sm transition-all">
                      Change Avatar
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <input type="text" defaultValue={user?.fullName} className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input type="email" defaultValue={user?.email} disabled className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-500 cursor-not-allowed shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">System Role</label>
                    <input type="text" defaultValue={user?.role} disabled className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-500 cursor-not-allowed shadow-sm" />
                  </div>
                </div>
                
                <div className="flex justify-end pt-6 border-t border-gray-100">
                  <button onClick={handleSave} className="btn-primary shadow-soft-md">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div key="notifications" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-2xl font-bold text-textMain">Notification Preferences</h3>
                  <p className="text-sm text-textLight mt-1">Control how and when you receive system alerts.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 border border-gray-100/50 rounded-2xl bg-white/50 hover:bg-white/80 transition-colors shadow-sm group">
                    <div className="flex gap-4 items-center">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform"><Bell size={20} /></div>
                      <div>
                        <h4 className="font-bold text-textMain">Email Notifications</h4>
                        <p className="text-sm text-textLight mt-0.5">Receive daily summaries and critical alerts via email.</p>
                      </div>
                    </div>
                    <ToggleSwitch checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} label="Toggle Email Notifications" />
                  </div>
                  
                  <div className="flex items-center justify-between p-5 border border-gray-100/50 rounded-2xl bg-white/50 hover:bg-white/80 transition-colors shadow-sm group">
                    <div className="flex gap-4 items-center">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform"><Bell size={20} /></div>
                      <div>
                        <h4 className="font-bold text-textMain">Push Notifications</h4>
                        <p className="text-sm text-textLight mt-0.5">Real-time alerts for audit assignments and approvals.</p>
                      </div>
                    </div>
                    <ToggleSwitch checked={notifications.push} onChange={() => setNotifications({...notifications, push: !notifications.push})} label="Toggle Push Notifications" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div key="security" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-2xl font-bold text-textMain">Security Settings</h3>
                  <p className="text-sm text-textLight mt-1">Update your password and secure your account.</p>
                </div>
                
                <div className="space-y-5 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all shadow-sm" />
                  </div>
                  <div className="pt-4">
                    <button onClick={handleSave} className="w-full bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black hover:shadow-md transition-all">
                      Update Password
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div key="appearance" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-2xl font-bold text-textMain">Appearance</h3>
                  <p className="text-sm text-textLight mt-1">Customize the visual theme of your dashboard.</p>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-4 ml-1">Theme Preference</label>
                  <div className="flex gap-6">
                    <div className="border-2 border-primary rounded-2xl p-1.5 cursor-pointer shadow-soft-sm bg-primary/5">
                      <div className="bg-white border border-gray-200 rounded-xl w-32 h-20 flex flex-col items-center justify-center gap-1.5 shadow-sm">
                        <div className="w-16 h-2.5 bg-gray-200 rounded-full"></div>
                        <div className="w-10 h-2 bg-gray-100 rounded-full"></div>
                      </div>
                      <p className="text-sm text-center mt-2 font-bold text-primary flex items-center justify-center gap-1"><CheckCircle size={14} /> Light Mode</p>
                    </div>
                    
                    <div className="border-2 border-transparent rounded-2xl p-1.5 cursor-not-allowed opacity-50 relative group" title="Dark mode coming soon">
                      <div className="bg-gray-900 border border-gray-700 rounded-xl w-32 h-20 flex flex-col items-center justify-center gap-1.5 shadow-sm group-hover:bg-gray-800 transition-colors">
                        <div className="w-16 h-2.5 bg-gray-700 rounded-full"></div>
                        <div className="w-10 h-2 bg-gray-800 rounded-full"></div>
                      </div>
                      <p className="text-sm text-center mt-2 font-semibold text-gray-500">Dark Mode</p>
                    </div>
                  </div>
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
