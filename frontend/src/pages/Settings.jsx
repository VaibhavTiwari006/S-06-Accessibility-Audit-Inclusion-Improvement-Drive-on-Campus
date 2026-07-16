import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Paintbrush, LogOut, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-textMain flex items-center gap-2">
          <SettingsIcon className="text-primary" /> Settings
        </h2>
        <p className="text-textLight mt-1">Manage your account preferences and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="glass-panel p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 h-fit">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <User size={18} /> Profile Info
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'notifications' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'security' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Shield size={18} /> Security
          </button>
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'appearance' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Paintbrush size={18} /> Appearance
          </button>
          
          <div className="border-t border-gray-100 my-2 pt-2"></div>
          
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 glass-panel p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
          
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-textMain border-b border-gray-100 pb-3">Profile Information</h3>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                  {user?.fullName?.charAt(0)}
                </div>
                <div>
                  <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Change Avatar
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" defaultValue={user?.fullName} className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" defaultValue={user?.email} disabled className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <input type="text" defaultValue={user?.role} disabled className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-textMain border-b border-gray-100 pb-3">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                  <div>
                    <h4 className="font-medium text-gray-800">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive daily summaries and critical alerts via email.</p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, email: !notifications.email})}
                    className={`w-12 h-6 rounded-full transition-colors relative ${notifications.email ? 'bg-primary' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications.email ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                  <div>
                    <h4 className="font-medium text-gray-800">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Real-time alerts for audit assignments and pilot approvals.</p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, push: !notifications.push})}
                    className={`w-12 h-6 rounded-full transition-colors relative ${notifications.push ? 'bg-primary' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications.push ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-textMain border-b border-gray-100 pb-3">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full max-w-md border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full max-w-md border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                <div className="pt-2">
                  <button onClick={handleSave} className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-black transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-textMain border-b border-gray-100 pb-3">Appearance</h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-3">Theme Preference</label>
                <div className="flex gap-4">
                  <div className="border-2 border-primary rounded-lg p-1 cursor-pointer">
                    <div className="bg-white border border-gray-200 rounded w-24 h-16 flex flex-col items-center justify-center gap-1">
                      <div className="w-12 h-2 bg-gray-200 rounded"></div>
                      <div className="w-8 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <p className="text-xs text-center mt-1 font-medium text-primary flex items-center justify-center gap-1"><CheckCircle size={10} /> Light</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-1 cursor-not-allowed opacity-50 relative" title="Coming soon">
                    <div className="bg-gray-800 border border-gray-700 rounded w-24 h-16 flex flex-col items-center justify-center gap-1">
                      <div className="w-12 h-2 bg-gray-600 rounded"></div>
                      <div className="w-8 h-2 bg-gray-700 rounded"></div>
                    </div>
                    <p className="text-xs text-center mt-1 text-gray-500">Dark</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
