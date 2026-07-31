import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import auditService from '../services/auditService';
import { 
  ArrowLeft, Save, CheckCircle, Calculator, Info, HelpCircle, 
  ChevronDown, ChevronUp, AlertCircle, Sparkles, MapPin, Calendar, User
} from 'lucide-react';
import { accessibleToast as toast } from '../utils/accessibleToast';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

const AuditConduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [audit, setAudit] = useState(null);
  const [checklists, setChecklists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [responses, setResponses] = useState({}); // { checklistId: { score, comments } }
  const [remarks, setRemarks] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  // Ramp Calculator State
  const [showRampCalc, setShowRampCalc] = useState(false);
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const [calculatedSlope, setCalculatedSlope] = useState(null);
  const [isCompliant, setIsCompliant] = useState(null);

  useEffect(() => {
    fetchAuditData();
  }, [id]);

  const fetchAuditData = async () => {
    try {
      setLoading(true);
      const auditData = await auditService.getAuditById(id);
      setAudit(auditData);
      setRemarks(auditData.remarks || '');

      const [checklistData, categoryData] = await Promise.all([
        auditService.getChecklists(),
        auditService.getCategories()
      ]);

      setChecklists(checklistData);
      setCategories(categoryData);

      if (categoryData.length > 0) {
        setActiveCategory(categoryData[0].id);
      }

      // Initialize responses from existing audit responses
      const initialResponses = {};
      
      // First, seed with all checklists to default score=0, comments=""
      checklistData.forEach(item => {
        initialResponses[item.id] = {
          checklistId: item.id,
          score: 0,
          comments: ''
        };
      });

      // Override with actual saved draft responses if any
      if (auditData.responses && auditData.responses.length > 0) {
        auditData.responses.forEach(resp => {
          initialResponses[resp.checklistId] = {
            checklistId: resp.checklistId,
            score: resp.score,
            comments: resp.comments || ''
          };
        });
      }

      setResponses(initialResponses);
    } catch (error) {
      toast.error('Failed to load audit checklist.');
      navigate('/audits');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (checklistId, val, maxScore) => {
    const score = Math.min(maxScore, Math.max(0, parseInt(val) || 0));
    setResponses(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        score
      }
    }));
  };

  const handleCommentsChange = (checklistId, comments) => {
    setResponses(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        comments
      }
    }));
  };

  const calculateRampSlope = () => {
    const riseVal = parseFloat(rise);
    const runVal = parseFloat(run);

    if (isNaN(riseVal) || isNaN(runVal) || runVal <= 0) {
      toast.error('Please enter valid positive dimensions.');
      return;
    }

    const slopeRatio = runVal / riseVal;
    setCalculatedSlope(slopeRatio.toFixed(2));
    
    // RPWD standard: minimum 1:12 slope (so run must be >= 12 * rise, slopeRatio must be >= 12)
    const compliant = slopeRatio >= 12;
    setIsCompliant(compliant);
  };

  const getPayload = () => {
    return {
      buildingId: audit.buildingId,
      auditorId: audit.auditorId,
      auditDate: audit.auditDate,
      remarks: remarks,
      responses: Object.values(responses)
    };
  };

  const handleSaveDraft = async () => {
    try {
      const payload = getPayload();
      await auditService.updateDraft(id, payload);
      toast.success('Draft saved successfully.');
    } catch (error) {
      toast.error('Failed to save draft.');
    }
  };

  const handleSubmitAudit = async () => {
    try {
      const payload = getPayload();
      // First save draft update
      await auditService.updateDraft(id, payload);
      // Then submit for review
      await auditService.submitAudit(id);
      toast.success('Audit submitted successfully for review.');
      navigate('/audits');
    } catch (error) {
      toast.error('Failed to submit audit.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
        <p className="text-sm font-semibold text-textLight">Loading Audit Checklist...</p>
      </div>
    );
  }

  // Group checklist items by category
  const activeChecklists = checklists.filter(item => item.categoryId === activeCategory);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/audits')} className="p-2 rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-heading text-textMain">Conduct Audit</h1>
            <p className="text-sm text-textLight mt-0.5">Fill in the checklist parameters to calculate compliance score.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowRampCalc(true)} icon={Calculator}>
            Show Ramp Calculator
          </Button>
          <Button variant="outline" onClick={handleSaveDraft} icon={Save}>
            Save Draft
          </Button>
          <Button onClick={handleSubmitAudit} icon={CheckCircle}>
            Submit Audit
          </Button>
        </div>
      </div>

      {/* Building Info Header Banner */}
      {audit && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Building Name</span>
            <p className="text-base font-bold text-textMain font-heading mt-1 flex items-center gap-1.5">
              <MapPin size={16} className="text-primary" /> {audit.buildingName}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assigned Auditor</span>
            <p className="text-base font-bold text-textMain mt-1 flex items-center gap-1.5">
              <User size={16} className="text-primary" /> {audit.auditorName}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Audit Date</span>
            <p className="text-base font-bold text-textMain mt-1 flex items-center gap-1.5">
              <Calendar size={16} className="text-primary" /> {audit.auditDate}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</span>
            <div className="mt-1">
              <Badge variant={audit.status === 'APPROVED' ? 'success' : audit.status === 'PENDING' ? 'warning' : 'primary'}>
                {audit.status}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Categories Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const count = checklists.filter(item => item.categoryId === cat.id).length;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                isActive
                  ? 'bg-primary/10 text-primary border-primary shadow-sm'
                  : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
              }`}
            >
              {cat.categoryName}
              <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Checklist items list */}
      <div className="space-y-4">
        {activeChecklists.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
            No questions available for this category.
          </div>
        ) : (
          activeChecklists.map((item) => {
            const resp = responses[item.id] || { score: 0, comments: '' };
            return (
              <Card key={item.id} className="overflow-hidden hover:border-gray-200/80 transition-all duration-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <h4 className="font-bold text-textMain text-sm leading-relaxed">{item.question}</h4>
                      {item.standardReference && (
                        <p className="text-[10px] text-gray-400 font-medium">Standard Ref: {item.standardReference}</p>
                      )}
                    </div>
                    {/* Score Picker */}
                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100 flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-500 pl-1">Score:</span>
                      <input 
                        type="number" 
                        min="0"
                        max={item.maximumScore}
                        value={resp.score}
                        onChange={(e) => handleScoreChange(item.id, e.target.value, item.maximumScore)}
                        className="w-12 h-8 rounded-lg border border-gray-200 bg-white text-center font-bold text-sm text-textMain focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <span className="text-xs font-bold text-gray-400">/ {item.maximumScore}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Comments / Observations</span>
                    <textarea 
                      placeholder="Add observations, defects, or remediations required..."
                      value={resp.comments}
                      onChange={(e) => handleCommentsChange(item.id, e.target.value)}
                      className="w-full h-16 rounded-xl border border-gray-150 p-3 text-xs text-textMain focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-gray-300 resize-none leading-relaxed"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* General Remarks Card */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <div>
            <h4 className="font-bold text-textMain text-sm font-heading">General Audit Remarks</h4>
            <p className="text-xs text-gray-400">Overall assessment notes, general observations, and primary recommendations.</p>
          </div>
          <textarea 
            placeholder="Add general remarks about this building's accessibility audit..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full h-24 rounded-2xl border border-gray-150 p-4 text-xs text-textMain focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-gray-300 resize-none leading-relaxed"
          />
        </CardContent>
      </Card>

      {/* Action buttons footer */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSaveDraft} icon={Save}>
          Save Draft
        </Button>
        <Button onClick={handleSubmitAudit} icon={CheckCircle}>
          Submit Audit
        </Button>
      </div>

      {/* Ramp Slope Calculator Modal */}
      <Modal isOpen={showRampCalc} onClose={() => setShowRampCalc(false)} title="Ramp Slope Calculator" maxWidth="max-w-md">
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-2xl border border-primary/20 flex gap-3">
            <Info size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-primary font-medium leading-relaxed">
              Standard guidelines require a minimum of <strong>1:12 slope</strong> for ramps. For every 1 unit of rise (vertical height), there must be at least 12 units of run (horizontal length).
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Ramp Rise (Vertical Height)</label>
              <Input 
                type="number" 
                placeholder="e.g. 15 cm or inches"
                value={rise}
                onChange={(e) => setRise(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Ramp Run (Horizontal Length)</label>
              <Input 
                type="number" 
                placeholder="e.g. 180 cm or inches"
                value={run}
                onChange={(e) => setRun(e.target.value)}
              />
            </div>
          </div>

          <Button variant="primary" className="w-full" onClick={calculateRampSlope}>
            Calculate Slope
          </Button>

          {calculatedSlope !== null && (
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">Calculated Slope Ratio</span>
                <span className="text-sm font-extrabold text-gray-800">1 : {calculatedSlope}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">Guidelines Standard</span>
                <span className="text-xs font-bold text-gray-700">1 : 12 or gentler</span>
              </div>
              <div className="mt-2">
                {isCompliant ? (
                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                    <CheckCircle size={16} className="flex-shrink-0" />
                    <span className="text-xs font-semibold">Compliant with 1:12 slope standards!</span>
                  </div>
                ) : (
                  <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span className="text-xs font-semibold">Non-Compliant. Slope is too steep.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button variant="ghost" className="w-full" onClick={() => setShowRampCalc(false)}>
              Close Calculator
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AuditConduct;
