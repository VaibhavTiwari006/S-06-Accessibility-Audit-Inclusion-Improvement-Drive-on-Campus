import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, Camera, Send, CheckCircle2, ShieldCheck, 
  AlertCircle, Sparkles, ArrowLeft 
} from 'lucide-react';
import buildingService from '../services/buildingService';
import issueService from '../services/issueService';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'react-toastify';

const BARRIER_CATEGORIES = [
  { id: 'RAMP', label: 'Ramp / Slope Issue', icon: '♿' },
  { id: 'ELEVATOR', label: 'Elevator Out of Order', icon: '🛗' },
  { id: 'WASHROOM', label: 'Washroom Barrier', icon: '🚻' },
  { id: 'TACTILE', label: 'Missing Tactile Path', icon: '👣' },
  { id: 'PARKING', label: 'Parking Obstruction', icon: '🅿️' },
  { id: 'OTHER', label: 'Other Infrastructure', icon: '🔧' },
];

const InstantQRReport = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();

  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('RAMP');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        setLoading(true);
        const data = await buildingService.getAllBuildings();
        const found = data.find((b) => String(b.id) === String(buildingId)) || data[0];
        setBuilding(found);
      } catch (error) {
        toast.error('Failed to load building context.');
      } finally {
        setLoading(false);
      }
    };
    fetchBuilding();
  }, [buildingId]);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error('Please add a short description of the barrier.');
      return;
    }

    setIsSubmitting(true);
    try {
      await issueService.reportIssue({
        buildingId: building?.id || 1,
        buildingName: building?.buildingName || 'Campus Building',
        category,
        description,
        locationDetails: 'Scanned via Location QR Code',
        status: 'PENDING',
      });

      setSubmitted(true);
      toast.success('Instant report submitted to Campus Maintenance!');
    } catch (error) {
      toast.error('Failed to submit report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4 space-y-6 animate-fade-in">
      <button
        onClick={() => navigate('/qr-code')}
        className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Back to QR Manager
      </button>

      {/* Header Context */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-primary text-white mx-auto flex items-center justify-center shadow-lg shadow-primary/20">
          <Building2 size={24} />
        </div>
        <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
          Instant Scan Report
        </span>
        <h2 className="text-2xl font-extrabold font-heading text-textMain">
          {loading ? 'Loading...' : building?.buildingName}
        </h2>
        <p className="text-xs text-textLight font-medium">
          Reporting barrier at {building?.location || 'Main Campus Entrance'}
        </p>
      </div>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4 shadow-sm"
        >
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-heading text-emerald-950">
              Report Logged Successfully!
            </h3>
            <p className="text-xs text-emerald-800 font-medium">
              Your submission has been dispatched to campus facilities for priority resolution.
            </p>
          </div>

          <Button
            onClick={() => {
              setSubmitted(false);
              setDescription('');
            }}
            variant="outline"
            className="w-full text-xs py-2.5"
          >
            Submit Another Report
          </Button>
        </motion.div>
      ) : (
        <Card className="p-6 border border-gray-200/80 shadow-xl space-y-5">
          <form onSubmit={handleSubmitReport} className="space-y-5">
            {/* Category Selector Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                Barrier Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BARRIER_CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-primary/10 border-primary text-primary font-bold shadow-xs'
                          : 'bg-gray-50 border-gray-100 text-gray-700 hover:border-gray-200'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-xs font-semibold leading-tight">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Barrier Description */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                Issue Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe the accessibility barrier (e.g., Ramp is blocked, elevator button broken)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-textMain focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Photo Attachment Placeholder */}
            <div className="p-3 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center text-xs font-semibold text-gray-500 flex items-center justify-center gap-2">
              <Camera size={16} className="text-gray-400" />
              <span>Photo Attached Automatically</span>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              icon={Send}
              className="w-full py-3.5 text-sm shadow-lg shadow-primary/20"
            >
              Submit Fast Report
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default InstantQRReport;
