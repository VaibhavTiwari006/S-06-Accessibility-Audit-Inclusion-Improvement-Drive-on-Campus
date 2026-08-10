import React, { useEffect, useState } from 'react';
import maintenanceService from '../services/maintenanceService';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle, AlertCircle, Clock, MapPin, IndianRupee, Wrench, 
  ChevronLeft, ChevronRight, UserCheck, ShieldCheck, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * Roadmap Workflow Stages Definitions
 * Defines the sequential milestones for task resolution, mapping status identifiers
 * to brand-aligned Tailwind theme aesthetics, badges, rings, and Lucide icons.
 */
const WORKFLOW_STAGES = [
  { id: 'OPEN', label: 'Reported', icon: <AlertCircle size={18} className="text-red-500" />, ring: 'ring-red-400 bg-red-50', activeBg: 'bg-red-500', line: 'bg-red-300' },
  { id: 'ASSIGNED', label: 'Assigned', icon: <UserCheck size={18} className="text-blue-500" />, ring: 'ring-blue-400 bg-blue-50', activeBg: 'bg-blue-500', line: 'bg-blue-300' },
  { id: 'IN_PROGRESS', label: 'In Progress', icon: <Clock size={18} className="text-purple-500" />, ring: 'ring-purple-400 bg-purple-50', activeBg: 'bg-purple-500', line: 'bg-purple-300' },
  { id: 'FIXED', label: 'Fixed', icon: <Wrench size={18} className="text-amber-500" />, ring: 'ring-amber-400 bg-amber-50', activeBg: 'bg-amber-500', line: 'bg-amber-300' },
  { id: 'COMPLETED', label: 'Verified', icon: <ShieldCheck size={18} className="text-emerald-500" />, ring: 'ring-emerald-400 bg-emerald-50', activeBg: 'bg-emerald-500', line: 'bg-emerald-300' },
];

const CARDS_PER_PAGE = 6;

const Roadmap = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState('OPEN');
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [activeStage]);

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

  const handleAdvanceStatus = async (taskId, currentStatus) => {
    const stageOrder = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'FIXED', 'COMPLETED'];
    const currentIdx = stageOrder.indexOf(currentStatus);
    if (currentIdx < stageOrder.length - 1) {
      const nextStatus = stageOrder[currentIdx + 1];
      
      try {
        if (nextStatus === 'IN_PROGRESS') {
          await maintenanceService.updateTaskStatus(taskId, 'IN_PROGRESS');
        } else if (nextStatus === 'COMPLETED') {
          await maintenanceService.updateTaskStatus(taskId, 'COMPLETED', 'Remediation completed and verified.');
        } else if (nextStatus === 'ASSIGNED') {
          await maintenanceService.updateTaskStatus(taskId, 'OPEN');
        } else if (nextStatus === 'FIXED') {
          await maintenanceService.updateTaskStatus(taskId, 'IN_PROGRESS');
        }

        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, workflowStatus: nextStatus } : t))
        );
        toast.success(`Task moved to stage: ${nextStatus.replace('_', ' ')}`);
      } catch (error) {
        toast.error('Failed to update task status in database.');
      }
    }
  };

  const getNextStageDetails = (currentStage) => {
    switch (currentStage) {
      case 'OPEN':
        return { label: 'Assign Task', bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' };
      case 'ASSIGNED':
        return { label: 'Start Work', bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' };
      case 'IN_PROGRESS':
        return { label: 'Finish Repair', bg: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' };
      case 'FIXED':
        return { label: 'Verify & Close', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' };
      default:
        return { label: 'Advance', bg: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100' };
    }
  };

  const calculateTotalCost = () => tasks.reduce((sum, task) => sum + (task.estimatedCost || 25000), 0);

  const getCompletionPercentage = () => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter((t) => t.workflowStatus === 'COMPLETED').length / tasks.length) * 100);
  };

  const activeStageObj = WORKFLOW_STAGES.find((s) => s.id === activeStage);
  const activeTasks = tasks.filter((t) => t.workflowStatus === activeStage);
  const totalPages = Math.ceil(activeTasks.length / CARDS_PER_PAGE);
  const pagedTasks = activeTasks.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

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
              Track accessibility barriers from Report → Assignment → Work → Repair → Verification.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-xs text-primary"><AlertCircle size={20} /></div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending Tasks</p>
                <p className="text-lg font-extrabold text-gray-800">{tasks.filter(t => t.workflowStatus !== 'COMPLETED').length}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-xs text-emerald-600"><CheckCircle size={20} /></div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verified</p>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${getCompletionPercentage()}%` }}></div>
                  </div>
                  <span className="text-lg font-extrabold text-gray-800">{getCompletionPercentage()}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Visual Pipeline Stepper ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between relative">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const count = tasks.filter((t) => t.workflowStatus === stage.id).length;
            const isActive = activeStage === stage.id;
            const isPast = WORKFLOW_STAGES.findIndex(s => s.id === activeStage) > idx;

            return (
              <React.Fragment key={stage.id}>
                {/* Node */}
                <button
                  onClick={() => setActiveStage(stage.id)}
                  className="flex flex-col items-center gap-2 relative z-10 group cursor-pointer"
                  style={{ flex: '0 0 auto' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `${stage.activeBg} text-white shadow-lg scale-110 ring-4 ring-offset-2 ${stage.ring}`
                      : isPast
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                  }`}>
                    {stage.icon}
                  </div>
                  <span className={`text-xs font-bold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {stage.label}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive ? `${stage.activeBg} text-white` : 'bg-gray-100 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>

                {/* Connector Line */}
                {idx < WORKFLOW_STAGES.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 rounded-full relative" style={{ marginTop: '-28px' }}>
                    <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                        isPast ? stage.line : 'bg-transparent'
                      }`}
                      style={{ width: isPast ? '100%' : '0%' }}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Task Cards Grid + Pagination ── */}
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pagedTasks.map((task) => {
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

                  {/* Location */}
                  <div className="pt-2.5 mt-auto border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium truncate flex items-center gap-1">
                      <MapPin size={12} className="text-red-400 flex-shrink-0" />
                      {task.buildingName || 'Campus Wide'}
                    </span>
                  </div>

                  {/* Action Button */}
                  {activeStage !== 'COMPLETED' && (
                    <button
                      onClick={() => handleAdvanceStatus(task.id, activeStage)}
                      className={`w-full text-xs font-bold border py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 ${getNextStageDetails(activeStage).bg}`}
                    >
                      {getNextStageDetails(activeStage).label}
                      <ArrowRight size={13} className="opacity-70" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200 ${
                    page === i
                      ? `${activeStageObj?.activeBg || 'bg-primary'} text-white shadow-sm`
                      : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Roadmap;
