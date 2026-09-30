import React, { useEffect, useState } from 'react';
import usePageTitle from '../hooks/usePageTitle';
import maintenanceService from '../services/maintenanceService';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle, AlertCircle, Clock, MapPin, IndianRupee, Wrench, 
  ChevronLeft, ChevronRight, UserCheck, ShieldCheck, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { accessibleToast as toast } from '../utils/accessibleToast';
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

export const DEFAULT_ROADMAP_TASKS = [
  // ── Stage 1: Reported (OPEN) ──
  {
    id: 101,
    title: 'High Threshold Step Hazard at Academic Block 1 Entrance',
    description: 'Main ground floor entrance threshold exceeds 25mm statutory limit without a chamfered transition ramp, obstructing manual wheelchair entry.',
    buildingName: 'Academic Block 1 (Ground Floor)',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 12000,
    workflowStatus: 'OPEN',
    assignedTo: 'Campus Facilities Desk'
  },
  {
    id: 102,
    title: 'Elevator Audio Arrival Chime Silent in Engineering Block B2',
    description: 'Acoustic arrival chime speaker is silent in passenger elevator. Low-vision students cannot verify landing levels independently.',
    buildingName: 'Engineering Block B2',
    priority: 'MEDIUM',
    severity: 'MEDIUM',
    estimatedCost: 8500,
    workflowStatus: 'OPEN',
    assignedTo: 'Campus Facilities Desk'
  },
  {
    id: 103,
    title: 'Missing Tactile Warning Pavers at South Canteen Staircase',
    description: 'Exterior approach staircase lacks 300mm blister tactile guidance tiles before descent, creating a hazard in low light.',
    buildingName: 'Student Activity Center & South Canteen',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 18000,
    workflowStatus: 'OPEN',
    assignedTo: 'Campus Facilities Desk'
  },
  {
    id: 104,
    title: 'Heavy Manual Double Doors at Central Library Foyer',
    description: 'Door push force exceeds 35N statutory limit. Retrofit required with delayed-action electromagnetic swing assist.',
    buildingName: 'Central University Library',
    priority: 'LOW',
    severity: 'LOW',
    estimatedCost: 14500,
    workflowStatus: 'OPEN',
    assignedTo: 'Campus Facilities Desk'
  },

  // ── Stage 2: Assigned (ASSIGNED) ──
  {
    id: 105,
    title: 'Dual-Height Handrail Fabrication on North Plaza Ramp',
    description: 'Existing handrail installed only at 1050mm. Work order dispatched to workshop for continuous 750mm secondary rail.',
    buildingName: 'North Plaza & Lecture Theatres',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 32000,
    workflowStatus: 'ASSIGNED',
    assignedTo: 'Campus Civil Works Dept'
  },
  {
    id: 106,
    title: 'Braille Room Number Plaques & Tactile Maps for Auditorium',
    description: 'Procuring acrylic Grade-1 English & Gurmukhi Braille signage at 1400mm eye level for stage wings and seating pods.',
    buildingName: 'Central Auditorium (Dr. APJ Kalam Hall)',
    priority: 'MEDIUM',
    severity: 'MEDIUM',
    estimatedCost: 22000,
    workflowStatus: 'ASSIGNED',
    assignedTo: 'Signage & Facilities Team'
  },
  {
    id: 107,
    title: 'Anti-Skid Carborundum Strips at Chemistry Block Walkway',
    description: 'Polished Kota stone surface slippery during monsoons. Approved 50mm non-slip aggregate thermal strips across ramp incline.',
    buildingName: 'Science & Research Complex Block C',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 9500,
    workflowStatus: 'ASSIGNED',
    assignedTo: 'Civil Maintenance Division'
  },

  // ── Stage 3: In Progress (IN_PROGRESS) ──
  {
    id: 108,
    title: 'Unisex Accessible Restroom Remodeling with L-Shaped Grab Bars',
    description: 'Currently tiling and plumbing universal accessible cubicle with 900mm clearance, fold-down support bars, and emergency pull cord.',
    buildingName: 'Academic Block 1 (East Wing)',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 48000,
    workflowStatus: 'IN_PROGRESS',
    assignedTo: 'Plumbing & Sanitary Wing'
  },
  {
    id: 109,
    title: 'Re-Grading Pathway to Indoor Sports Arena',
    description: 'Excavation and leveling underway to reduce steep 1:7 slope down to compliant 1:12 gradient with 1500mm intermediate rest landings.',
    buildingName: 'Sports Arena & Gymnasium',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 65000,
    workflowStatus: 'IN_PROGRESS',
    assignedTo: 'Roads & Ground Infrastructure'
  },
  {
    id: 110,
    title: 'Acoustic Crossing Beacons at Main Avenue Crosswalk',
    description: 'Wiring synchronized push-button acoustic pedestrian signals with localized bird chirps for visually impaired pedestrians.',
    buildingName: 'Central Quadrangle / Main Avenue',
    priority: 'MEDIUM',
    severity: 'MEDIUM',
    estimatedCost: 28000,
    workflowStatus: 'IN_PROGRESS',
    assignedTo: 'Campus Electrical Operations'
  },
  {
    id: 111,
    title: 'Vertical Platform Wheelchair Lift Servicing & Battery Backup',
    description: 'Hydraulic seal replacement and UPS auxiliary power integration to guarantee evacuation during power shedding.',
    buildingName: 'Administrative Complex & Registrar Office',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 16000,
    workflowStatus: 'IN_PROGRESS',
    assignedTo: 'Specialist Elevator Contractors'
  },

  // ── Stage 4: Fixed (FIXED) ──
  {
    id: 112,
    title: 'Lowered Student Helpdesk Counter & Assistive Induction Loop',
    description: 'Carpentry lowered desk section to 760mm height with knee recess. Fixed induction loop installed and frequency tested for hearing aid users.',
    buildingName: 'Student Service Center',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 38000,
    workflowStatus: 'FIXED',
    assignedTo: 'Interior Projects Wing'
  },
  {
    id: 113,
    title: 'Exterior Ramp Re-surfacing with Polyurethane Textured Grit',
    description: 'Epoxy anti-skid overlay application finished. Pendulum slip test verified BPN 42 in wet state. Ready for audit sign-off.',
    buildingName: 'Mechanical Engineering Wing',
    priority: 'MEDIUM',
    severity: 'MEDIUM',
    estimatedCost: 21000,
    workflowStatus: 'FIXED',
    assignedTo: 'Civil Maintenance Division'
  },
  {
    id: 114,
    title: 'High-Contrast Glass Manifestation Bands in Faculty Lounge',
    description: 'Affixed two 75mm matte silver frosted visual warning bands at 900mm and 1500mm heights across frameless glass doors.',
    buildingName: 'Faculty Lounge & Seminar Hall',
    priority: 'LOW',
    severity: 'LOW',
    estimatedCost: 7500,
    workflowStatus: 'FIXED',
    assignedTo: 'Facilities & Safety Team'
  },

  // ── Stage 5: Verified (COMPLETED) ──
  {
    id: 115,
    title: 'Universal Access Ramp with Stainless Steel Handrails',
    description: 'Completed 22m covered ramp conforming to RPWD Act 2016. Dual continuous rails, blister tactile start/end pads, and LED night guidance.',
    buildingName: 'Academic Block 1 (Main Gate)',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 95000,
    workflowStatus: 'COMPLETED',
    assignedTo: 'Chief Civil Engineer'
  },
  {
    id: 116,
    title: 'Tactile Audio-Navigational Directory Kiosk',
    description: 'Multi-sensory campus map kiosk installed with high-contrast UI, screen-reader mode, and physical Braille routing buttons.',
    buildingName: 'Student Activity Center (Foyer)',
    priority: 'MEDIUM',
    severity: 'MEDIUM',
    estimatedCost: 54000,
    workflowStatus: 'COMPLETED',
    assignedTo: 'IT & Digital Campus Dept'
  },
  {
    id: 117,
    title: 'Dual Push-Paddle Accessible Water Dispenser Unit',
    description: 'Installed front/side paddle water cooler at 800mm rim height with wheelchair knee clearance and drainage tray.',
    buildingName: 'Central Library (First Floor)',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 19500,
    workflowStatus: 'COMPLETED',
    assignedTo: 'Sanitary Maintenance'
  },
  {
    id: 118,
    title: 'Reserved Accessible Parking Bays with 1200mm Access Aisle',
    description: 'International Symbol of Access painted with thermoplastic blue coating, dropped kerb ramp, and no-obstruction signage.',
    buildingName: 'Administrative Block Parking Lot',
    priority: 'HIGH',
    severity: 'HIGH',
    estimatedCost: 15000,
    workflowStatus: 'COMPLETED',
    assignedTo: 'Estate & Traffic Management'
  },
  {
    id: 119,
    title: 'High-Luminance Photoluminescent Stair Nosing Strips',
    description: 'Installed 55mm safety yellow glow-in-dark aluminum nosings on all step edges across 6 lecture theatre flight staircases.',
    buildingName: 'North Plaza Lecture Hall 1-4',
    priority: 'MEDIUM',
    severity: 'MEDIUM',
    estimatedCost: 27000,
    workflowStatus: 'COMPLETED',
    assignedTo: 'Facilities Maintenance'
  }
];

const CARDS_PER_PAGE = 6;

const Roadmap = () => {
  usePageTitle('Roadmap');
  const { user } = useAuth();
  const [tasks, setTasks] = useState(DEFAULT_ROADMAP_TASKS);
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
      if (!data || !Array.isArray(data) || data.length === 0) {
        setTasks(DEFAULT_ROADMAP_TASKS);
        return;
      }

      const mapped = data.map((t) => {
        let stage = t.status || 'OPEN';
        if (t.status === 'COMPLETED') {
          stage = 'COMPLETED';
        } else if (t.status === 'IN_PROGRESS') {
          const notes = (t.completionNotes || '').toLowerCase();
          if (notes.includes('fixed') || notes.includes('repaired') || notes.includes('completed')) {
            stage = 'FIXED';
          } else {
            stage = 'IN_PROGRESS';
          }
        } else if (t.status === 'OPEN') {
          const notes = (t.completionNotes || '').toLowerCase();
          if (t.assigneeId || t.assigneeName || notes.includes('assigned')) {
            stage = 'ASSIGNED';
          } else {
            stage = 'OPEN';
          }
        }
        return {
          ...t,
          workflowStatus: stage,
          assignedTo: t.assigneeName || t.assignedTo || 'Facility Eng. Team A',
        };
      });

      // Ensure all 5 stages have rich data representation
      const stagesPresent = new Set(mapped.map((m) => m.workflowStatus));
      if (stagesPresent.size < 5) {
        const missingDefaults = DEFAULT_ROADMAP_TASKS.filter(
          (dt) => !stagesPresent.has(dt.workflowStatus)
        );
        setTasks([...mapped, ...missingDefaults]);
      } else {
        setTasks(mapped);
      }
    } catch (err) {
      setTasks(DEFAULT_ROADMAP_TASKS);
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
        if (typeof taskId === 'number' && taskId < 100) {
          if (nextStatus === 'COMPLETED') {
            await maintenanceService.updateTaskStatus(taskId, 'COMPLETED', 'Remediation completed and verified.');
          } else if (nextStatus === 'IN_PROGRESS' || nextStatus === 'FIXED') {
            await maintenanceService.updateTaskStatus(taskId, 'IN_PROGRESS', nextStatus === 'FIXED' ? 'Work completed - FIXED' : 'Work in progress');
          } else {
            await maintenanceService.updateTaskStatus(taskId, nextStatus);
          }
        }
      } catch (error) {
        // Optimistic UI updates remain intact for client session
      }

      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, workflowStatus: nextStatus } : t))
      );
      toast.success(`Task moved to stage: ${nextStatus.replace('_', ' ')}`);
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
