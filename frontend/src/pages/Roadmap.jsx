import React, { useEffect, useState } from 'react';
import maintenanceService from '../services/maintenanceService';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, AlertCircle, Clock, MapPin, IndianRupee, Wrench, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

const Roadmap = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await maintenanceService.getAllTasks();
      setTasks(data);
    } catch (err) {
      toast.error('Failed to load remediation roadmap');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = () => {
    return tasks.reduce((sum, task) => sum + (task.estimatedCost || 0), 0);
  };

  const getCompletionPercentage = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'COMPLETED').length;
    return Math.round((completed / tasks.length) * 100);
  };

  const groupedTasks = {
    OPEN: tasks.filter(t => t.status === 'OPEN'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    COMPLETED: tasks.filter(t => t.status === 'COMPLETED'),
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderColumn = (title, statusKey, icon) => (
    <div className="flex flex-col bg-gray-50/50 rounded-2xl border border-gray-100 shadow-inner overflow-hidden h-full">
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
        <h3 className="font-heading font-bold text-gray-800 flex items-center gap-2">
          {icon} {title}
        </h3>
        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
          {groupedTasks[statusKey].length}
        </span>
      </div>
      <div className="p-3 flex-1 overflow-y-auto space-y-3 min-h-[400px]">
        {groupedTasks[statusKey].map(task => (
          <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                {task.priority || 'MEDIUM'} PRIORITY
              </span>
              {task.estimatedCost > 0 && (
                <span className="text-xs font-bold text-gray-500 flex items-center">
                  <IndianRupee size={12} /> {task.estimatedCost.toLocaleString()}
                </span>
              )}
            </div>
            <h4 className="font-bold text-gray-800 text-sm mb-1 leading-tight">{task.title}</h4>
            <p className="text-xs text-gray-500 line-clamp-2 mb-3">{task.description}</p>
            <div className="flex justify-between items-center pt-2 border-t border-gray-50">
              <span className="text-xs text-gray-400 flex items-center gap-1 font-medium truncate max-w-[70%]">
                <MapPin size={12} className="text-danger flex-shrink-0" />
                <span className="truncate">{task.buildingName || 'Campus Wide'}</span>
              </span>
              <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
        {groupedTasks[statusKey].length === 0 && (
          <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium">
            No items here
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-danger/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <h1 className="text-2xl font-bold font-heading text-textMain flex items-center gap-2">
              <Wrench className="text-danger" /> Remediation Roadmap
            </h1>
            <p className="text-gray-500 mt-1">Track and prioritize accessibility improvements across the university.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-primary">
                <IndianRupee size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Est. Budget</p>
                <p className="text-lg font-extrabold text-gray-800">₹{calculateTotalCost().toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-success">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Progress</p>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: `${getCompletionPercentage()}%` }}></div>
                  </div>
                  <span className="text-lg font-extrabold text-gray-800">{getCompletionPercentage()}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-50/50 rounded-2xl border border-gray-100 p-4 h-full skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-280px)] min-h-[600px]">
          {renderColumn("Open Issues", "OPEN", <AlertCircle size={18} className="text-danger" />)}
          {renderColumn("In Progress", "IN_PROGRESS", <Clock size={18} className="text-primary" />)}
          {renderColumn("Completed", "COMPLETED", <CheckCircle size={18} className="text-success" />)}
        </div>
      )}
    </div>
  );
};

export default Roadmap;
