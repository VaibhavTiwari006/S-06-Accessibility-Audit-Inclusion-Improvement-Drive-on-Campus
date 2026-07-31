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
  { id: 'OPEN', label: 'Reported', color: 'border-red-200 bg-red-50/50', icon: <AlertCircle size={15} className="text-red-600" />, dot: 'bg-red-500' },
  { id: 'ASSIGNED', label: 'Assigned', color: 'border-blue-200 bg-blue-50/50', icon: <UserCheck size={15} className="text-blue-600" />, dot: 'bg-blue-500' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: 'border-purple-200 bg-purple-50/50', icon: <Clock size={15} className="text-purple-600" />, dot: 'bg-purple-500' },
  { id: 'FIXED', label: 'Fixed', color: 'border-amber-200 bg-amber-50/50', icon: <Wrench size={15} className="text-amber-600" />, dot: 'bg-amber-500' },
  { id: 'COMPLETED', label: 'Verified & Closed', color: 'border-emerald-200 bg-emerald-50/50', icon: <ShieldCheck size={15} className="text-emerald-600" />, dot: 'bg-emerald-500' },
];

const Roadmap = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState('OPEN');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await maintenanceService.getAllTasks();
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

  const activeStageObj = WORKFLOW_STAGES.find((s) => s.id === activeStage);
  const activeTasks = tasks.filter((t) => t.workflowStatus === activeStage);

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

      {/* Stage Tabs */}
      <div className="flex flex-wrap gap-2">
        {WORKFLOW_STAGES.map((stage) => {
          const count = tasks.filter((t) => t.workflowStatus === stage.id).length;
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                isActive
                  ? `${stage.color} shadow-sm`
                  : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              {stage.icon}
              <span>{stage.label}</span>
              <span className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                isActive ? 'bg-white/70 text-gray-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Task Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-5 h-48 animate-pulse"></div>
          ))}
        </div>
      ) : activeTasks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <CheckCircle2 size={36} className="text-gray-300 mb-3" />
          <p className="text-sm font-semibold text-gray-400">No tasks in {activeStageObj?.label}</p>
          <p className="text-xs text-gray-400 mt-1">Tasks will appear here when moved to this stage.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTasks.map((task) => {
            const priorityColor =
              (task.priority || 'HIGH') === 'HIGH' ? 'bg-red-100 text-red-700 border-red-200' :
              (task.priority || 'HIGH') === 'MEDIUM' ? 'bg-amber-100 text-amber-700 border-amber-200' :
              'bg-emerald-100 text-emerald-700 border-emerald-200';

            return (
              <div
                key={task.id}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3"
              >
                {/* Priority + ID */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded-md border ${priorityColor}`}>
                    {task.priority || 'HIGH'}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">#{task.id}</span>
                </div>

                {/* Title */}
                <h4 className="font-bold text-textMain text-sm leading-snug font-heading">
                  {task.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>

                {/* Location + Cost */}
                <div className="pt-2.5 mt-auto border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium truncate max-w-[140px] flex items-center gap-1">
                    <MapPin size={12} className="text-red-400 flex-shrink-0" />
                    {task.buildingName || 'Campus Wide'}
                  </span>
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-0.5">
                    <IndianRupee size={11} />
                    {(task.estimatedCost || 25000).toLocaleString()}
                  </span>
                </div>

                {/* Action Button */}
                {activeStage !== 'COMPLETED' && (
                  <button
                    onClick={() => handleAdvanceStatus(task.id, activeStage)}
                    className={`w-full text-xs font-bold border py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 shadow-xs hover:shadow-sm ${getNextStageDetails(activeStage).bg}`}
                  >
                    {getNextStageDetails(activeStage).label}
                    <ArrowRight size={13} className="opacity-70" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Roadmap;
