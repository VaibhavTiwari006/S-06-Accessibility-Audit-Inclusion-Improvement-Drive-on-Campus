import React, { useEffect, useState } from 'react';
import maintenanceService from '../services/maintenanceService';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle, AlertCircle, Clock, MapPin, IndianRupee, Wrench, 
  ChevronRight, UserCheck, ShieldCheck, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

const WORKFLOW_STAGES = [
  { id: 'OPEN', label: 'Reported', color: 'border-red-200 bg-red-50/50', icon: <AlertCircle size={16} className="text-red-600" /> },
  { id: 'ASSIGNED', label: 'Assigned', color: 'border-blue-200 bg-blue-50/50', icon: <UserCheck size={16} className="text-blue-600" /> },
  { id: 'IN_PROGRESS', label: 'In Progress', color: 'border-purple-200 bg-purple-50/50', icon: <Clock size={16} className="text-purple-600" /> },
  { id: 'FIXED', label: 'Fixed', color: 'border-amber-200 bg-amber-50/50', icon: <Wrench size={16} className="text-amber-600" /> },
  { id: 'COMPLETED', label: 'Verified & Closed', color: 'border-emerald-200 bg-emerald-50/50', icon: <ShieldCheck size={16} className="text-emerald-600" /> },
];

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
      // Map statuses into 5-stage workflow
      const mapped = data.map((t, idx) => ({
        ...t,
        workflowStatus: t.status === 'COMPLETED' ? 'COMPLETED' : 
                        t.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 
                        (idx % 4 === 1 ? 'ASSIGNED' : idx % 4 === 3 ? 'FIXED' : 'OPEN'),
        assignedTo: t.assignedTo || 'Facility Eng. Team A',
      }));
      setTasks(mapped);
    } catch (err) {
      toast.error('Failed to load remediation roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvanceStatus = (taskId, currentStatus) => {
    const stageOrder = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'FIXED', 'COMPLETED'];
    const currentIdx = stageOrder.indexOf(currentStatus);
    if (currentIdx < stageOrder.length - 1) {
      const nextStatus = stageOrder[currentIdx + 1];
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, workflowStatus: nextStatus } : t))
      );
      toast.success(`Task moved to stage: ${nextStatus.replace('_', ' ')}`);
    }
  };

  const getNextStageDetails = (currentStage) => {
    switch (currentStage) {
      case 'OPEN':
        return { label: 'Assign Task', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/70' };
      case 'ASSIGNED':
        return { label: 'Start Work', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100/70' };
      case 'IN_PROGRESS':
        return { label: 'Finish Repair', bg: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/70' };
      case 'FIXED':
        return { label: 'Verify & Close', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/70' };
      default:
        return { label: 'Advance', bg: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100' };
    }
  };

  const calculateTotalCost = () => {
    return tasks.reduce((sum, task) => sum + (task.estimatedCost || 25000), 0);
  };

  const getCompletionPercentage = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.workflowStatus === 'COMPLETED').length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Metrics */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <h1 className="text-3xl font-bold font-heading text-textMain flex items-center gap-3">
              <Wrench className="text-primary" size={28} /> 5-Stage Maintenance Workflow
            </h1>
            <p className="text-gray-500 mt-1 font-medium text-sm">
              Track accessibility barriers from Report → Assignment → Work In-Progress → Repair → Verification.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-xs text-primary">
                <IndianRupee size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Est. Remediation Budget</p>
                <p className="text-lg font-extrabold text-gray-800">₹{calculateTotalCost().toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-xs text-emerald-600">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verified Completion</p>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${getCompletionPercentage()}%` }}></div>
                  </div>
                  <span className="text-lg font-extrabold text-gray-800">{getCompletionPercentage()}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Column Kanban Board */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[600px]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 h-full animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x">
          {WORKFLOW_STAGES.map((stage) => {
            const stageTasks = tasks.filter((t) => t.workflowStatus === stage.id);
            return (
              <div
                key={stage.id}
                className={`flex flex-col rounded-2xl border p-4 ${stage.color} min-w-[300px] w-[300px] flex-shrink-0 snap-start`}
                style={{ maxHeight: 'calc(100vh - 260px)' }}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200/60">
                  <div className="flex items-center gap-2">
                    {stage.icon}
                    <span className="font-bold text-sm text-gray-800 tracking-wide">{stage.label}</span>
                  </div>
                  <span className="bg-white text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-gray-100">
                    {stageTasks.length}
                  </span>
                </div>

                {/* Scrollable Task List */}
                <div className="space-y-4 flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {stageTasks.map((task) => {
                    const priorityColor =
                      (task.priority || 'HIGH') === 'HIGH' ? 'bg-red-100 text-red-700 border-red-200' :
                      (task.priority || 'HIGH') === 'MEDIUM' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-emerald-100 text-emerald-700 border-emerald-200';

                    return (
                      <div
                        key={task.id}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col gap-3"
                      >
                        {/* Priority + ID Row */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg border ${priorityColor}`}>
                            {task.priority || 'HIGH'}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono font-semibold">
                            #{task.id}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-gray-900 text-[13px] leading-snug font-heading">
                          {task.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>

                        {/* Location + Cost Footer */}
                        <div className="pt-3 mt-auto border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[11px] text-gray-500 font-medium truncate max-w-[140px] flex items-center gap-1">
                            <MapPin size={12} className="text-red-400 flex-shrink-0" />
                            {task.buildingName || 'Campus Wide'}
                          </span>
                          <span className="text-[11px] font-bold text-gray-700 flex items-center gap-0.5">
                            <IndianRupee size={11} />
                            {(task.estimatedCost || 25000).toLocaleString()}
                          </span>
                        </div>

                        {/* Action Button */}
                        {stage.id !== 'COMPLETED' && (
                          <button
                            onClick={() => handleAdvanceStatus(task.id, stage.id)}
                            className={`w-full text-xs font-bold border py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md ${getNextStageDetails(stage.id).bg}`}
                          >
                            {getNextStageDetails(stage.id).label}
                            <ArrowRight size={13} className="opacity-70" />
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {stageTasks.length === 0 && (
                    <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-200/80 rounded-2xl text-gray-400 text-xs font-medium gap-2">
                      <CheckCircle2 size={22} className="opacity-40" />
                      No tasks in {stage.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Roadmap;
