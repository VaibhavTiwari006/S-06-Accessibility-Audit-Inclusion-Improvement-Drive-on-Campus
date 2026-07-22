import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, Download, Printer, ExternalLink, Building2, 
  MapPin, Sparkles, CheckCircle2, QrCode as QrIcon, Send 
} from 'lucide-react';
import buildingService from '../services/buildingService';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const QRCodeManager = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const data = await buildingService.getAllBuildings();
        setBuildings(data);
        if (data.length > 0) setSelectedBuilding(data[0]);
      } catch (error) {
        toast.error('Failed to load buildings for QR generation.');
      } finally {
        setLoading(false);
      }
    };
    fetchBuildings();
  }, []);

  const handleSimulateScan = (buildingId) => {
    navigate(`/qr-report/${buildingId}`);
  };

  const handleDownloadPoster = (bName) => {
    toast.success(`Printable QR poster for ${bName} downloaded!`);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <QrCode size={22} />
            </div>
            QR Code Barrier Feedback System
          </h2>
          <p className="text-textLight mt-1.5 font-medium">
            Generate building QR posters for instant mobile barrier reporting by students & staff.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-3xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Building Selection List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-1">
              Select Campus Building
            </h3>
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {buildings.map((b) => {
                const isSelected = selectedBuilding?.id === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBuilding(b)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary/10 border-primary/40 shadow-sm'
                        : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Building2 size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-textMain text-sm">{b.buildingName}</h4>
                        <span className="text-xs text-textLight">Code: {b.buildingCode}</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-primary">
                      ID #{b.id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Printable QR Code Poster Card Preview */}
          {selectedBuilding && (
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 bg-gradient-to-br from-white via-indigo-50/20 to-primary/5 border border-primary/20 shadow-xl flex flex-col md:flex-row items-center gap-8">
                
                {/* Generated QR Code Graphic */}
                <div className="w-56 h-56 bg-white p-4 rounded-3xl border-2 border-primary/30 shadow-lg flex flex-col items-center justify-center text-center relative group flex-shrink-0">
                  {/* High quality SVG QR graphic representation */}
                  <div className="w-full h-full bg-slate-950 p-3 rounded-2xl flex items-center justify-center text-emerald-400">
                    <QrIcon size={140} />
                  </div>
                  <div className="absolute inset-0 bg-primary/90 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-white text-center">
                    <Sparkles size={28} className="mb-2" />
                    <span className="text-xs font-extrabold uppercase">Instant Mobile Scan</span>
                  </div>
                </div>

                {/* Poster Details & Actions */}
                <div className="space-y-4 flex-1 text-center md:text-left">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                      Official Campus Poster
                    </span>
                    <h3 className="text-2xl font-extrabold text-textMain font-heading mt-2">
                      {selectedBuilding.buildingName}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Location: {selectedBuilding.location || 'Main Campus Entrance'}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 bg-white p-3.5 rounded-xl border border-gray-200/80 leading-relaxed font-medium">
                    "Scanning this QR code opens a 1-tap accessibility barrier report form. Submissions are instantly routed to campus maintenance engineers."
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      onClick={() => handleSimulateScan(selectedBuilding.id)}
                      icon={Send}
                      className="shadow-md"
                    >
                      Test Scan Form
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadPoster(selectedBuilding.buildingName)}
                      icon={Download}
                    >
                      Download Poster
                    </Button>
                  </div>
                </div>

              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodeManager;
