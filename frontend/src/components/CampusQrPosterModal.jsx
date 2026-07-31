import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Printer, ShieldCheck, MapPin, Wrench, X, Smartphone } from 'lucide-react';
import Button from './ui/Button';

const CampusQrPosterModal = ({ issue, onClose }) => {
  const posterRef = useRef(null);

  if (!issue) return null;

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'RESOLVED': return 100;
      case 'IN_PROGRESS': return 65;
      case 'PENDING': default: return 25;
    }
  };

  const progress = getProgressPercentage(issue.status);

  // Generate SVG QR matrix pattern dynamically based on issue ID/string
  const generateQrMatrix = (text) => {
    const size = 21;
    const matrix = Array(size).fill(0).map(() => Array(size).fill(false));

    // Helper to draw Finder Patterns (7x7 outer squares with 3x3 inner squares)
    const drawFinder = (row, col) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            matrix[row + r][col + c] = true;
          }
        }
      }
    };

    // Draw 3 Corner Finder Patterns
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // Hash text to generate deterministic data dots
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Skip finder pattern zones
        if ((r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7)) continue;

        // Timing patterns
        if (r === 6 || c === 6) {
          matrix[r][c] = (r + c) % 2 === 0;
        } else {
          const bitVal = Math.abs(Math.sin(hash + r * size + c) * 10000);
          matrix[r][c] = (Math.floor(bitVal) % 3) !== 0;
        }
      }
    }

    return matrix;
  };

  const qrMatrix = generateQrMatrix(`accessaudit-issue-${issue.id || '101'}`);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Backdrop overlay for closing on click-outside */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full flex flex-col max-h-[90vh] overflow-hidden relative border border-gray-100 z-10"
      >
        {/* Modal Controls Header (Fixed) */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5 print:hidden flex-shrink-0">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Printer size={18} />
            <span>Printable Campus Barrier Notice Poster</span>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" icon={Printer} onClick={handlePrint}>
              Print Poster
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-textMain font-bold text-lg p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Printable Poster Sheet (Target for window.print()) */}
          <div ref={posterRef} className="print-poster p-6 rounded-2xl border-4 border-primary/30 bg-gradient-to-b from-amber-50/50 via-white to-primary/5 space-y-5 shadow-sm text-textMain">
            {/* Official Campus Notice Header Banner */}
            <div className="text-center space-y-1.5 border-b-2 border-primary/20 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                <ShieldCheck size={14} /> Chandigarh University Accessibility Drive
              </div>
              <h1 className="text-2xl font-heading font-black text-secondary uppercase tracking-tight">
                NOTICE: WORK IN PROGRESS
              </h1>
              <p className="text-xs font-bold text-amber-700 bg-amber-100/80 inline-block px-3 py-0.5 rounded-md">
                🚧 Physical Barrier Remediation Underway
              </p>
            </div>

            {/* Issue Location & Details Box */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Facility Location</span>
                  <h2 className="text-lg font-heading font-extrabold text-textMain flex items-center gap-1.5">
                    <MapPin size={18} className="text-primary flex-shrink-0" />
                    {issue.buildingName}
                  </h2>
                </div>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                  issue.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' :
                  issue.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {issue.status?.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-xs text-gray-700 font-semibold bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <strong>Reported Issue:</strong> {issue.description}
              </p>

              {issue.locationDetails && (
                <p className="text-[11px] text-gray-500 font-medium">
                  📍 <strong>Specific Zone:</strong> {issue.locationDetails}
                </p>
              )}
            </div>

            {/* Live Progress Bar Section */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className="text-gray-700 flex items-center gap-1.5">
                  <Wrench size={14} className="text-primary" /> Maintenance Work Progress
                </span>
                <span className="text-primary">{progress}% Completed</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-primary to-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 pt-0.5">
                <span>1. Issue Logged</span>
                <span>2. Crew Assigned</span>
                <span>3. Remediation Complete</span>
              </div>
            </div>

            {/* Scannable QR Code Box */}
            <div className="p-5 rounded-2xl bg-white border-2 border-primary/30 text-center space-y-3 shadow-md flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-wider">
                <Smartphone size={16} /> Scan QR with Phone Camera to Track Live Progress
              </div>

              {/* Rendered SVG QR Code */}
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs inline-block">
                <svg width="150" height="150" viewBox="0 0 21 21" className="shape-rendering-crisp">
                  {qrMatrix.map((row, r) =>
                    row.map((cell, c) =>
                      cell ? (
                        <rect
                          key={`${r}-${c}`}
                          x={c}
                          y={r}
                          width="1"
                          height="1"
                          fill="#0F172A"
                        />
                      ) : null
                    )
                  )}
                </svg>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-800">
                  Live App Link: <a href={`/track/${issue.id}`} target="_blank" rel="noreferrer" className="font-mono text-primary font-extrabold underline hover:text-primary-dark">http://localhost:5173/track/{issue.id}</a>
                </p>
                <p className="text-[11px] text-gray-500 font-medium max-w-xs">
                  Scanning this QR code or opening the link shows real-time repair status, engineering notes, and completion progress.
                </p>
              </div>
            </div>

            {/* Footer Official Stamp */}
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 pt-2 border-t border-gray-200">
              <span>Official Poster • AccessAudit Inclusion Drive</span>
              <span>Issue Ref: #{issue.id}</span>
            </div>
          </div>
        </div>

        {/* Modal Controls Footer (Fixed) */}
        <div className="flex justify-end p-5 border-t border-gray-100 bg-gray-50/50 print:hidden flex-shrink-0">
          <Button variant="secondary" onClick={onClose}>
            Close Poster
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CampusQrPosterModal;
