import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Compass, MapPin, Search, ChevronRight, HelpCircle, CornerDownRight } from 'lucide-react';
import buildingService from '../services/buildingService';
import { toast } from 'react-toastify';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const VERBAL_PROFILES = {
  "academic block 1": "Academic Block 1 has a low-gradient wheelchair ramp at the south entrance. Elevators are accessible in the central lobby with auditory floor announcements. Dedicated wheelchair-friendly washrooms are available on the Ground Floor and the 3rd Floor.",
  "academic block 2": "Academic Block 2 features tactile guide paths leading from the main drop-off zone directly to the lobby. The west entrance contains an automated door. The lift serves all floors and has Braille control keys.",
  "central library": "The Central Library has elevator access at the rear ramp entrance. Study desks on the ground floor are height-adjustable. A dedicated screen-reader computer terminal is located in the Ground Floor lab.",
  "science block": "The Science Block features a wide concrete ramp at the primary entrance with dual handrails. The elevators have Braille buttons. Accessible chemistry labs are available on the Ground Floor.",
  "cafeteria": "The Campus Cafeteria is fully accessible on the ground floor level with wide double doors. Table spacing is configured for wheelchair navigation and service counters have lowered segments.",
  "girls hostel 1": "Girls Hostel 1 features a ramp at the main lobby entrance. The ground floor contains 4 specially adapted rooms with roll-in accessible shower cubicles and grab bars.",
  "boys hostel 1": "Boys Hostel 1 features a concrete access ramp on the east side entrance. Grab bars are installed in ground-level washrooms, and rooms are wheelchair navigable.",
  "administrative block": "The Administrative Block has a modern lift at the central foyer. The main entrance is step-free. Lowered desks are available at the student registry counter.",
  "recreational center": "The Recreational Center has ramp entries on the pool side. Level walkways exist to the cafeteria and gym. Accessible toilets are situated near the front lobby."
};

const getVerbalProfile = (name = '') => {
  const norm = name.toLowerCase();
  for (const [key, value] of Object.entries(VERBAL_PROFILES)) {
    if (norm.includes(key)) return value;
  }
  return `This building features a step-free entrance ramp on the ground level. Elevator access is available inside the central corridor lobby. Accessible washrooms are situated on the ground floor.`;
};

const VerbalMap = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);

  useEffect(() => {
    buildingService.getAllBuildings()
      .then(data => {
        setBuildings(data);
        if (data.length > 0) setSelectedBuildingId(data[0].id);
      })
      .catch(() => toast.error('Failed to load campus building directory.'))
      .finally(() => setLoading(false));

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const handleSpeak = (text, id) => {
    if (!window.speechSynthesis) {
      toast.error('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const filtered = buildings.filter(b => 
    b.buildingName.toLowerCase().includes(search.toLowerCase()) ||
    b.buildingCode.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase())
  );

  const selectedBuilding = buildings.find(b => b.id === selectedBuildingId);

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6" role="main" aria-label="Verbal Campus Map Guide">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-textMain tracking-tight flex items-center gap-2">
            <Compass className="text-danger animate-spin-slow" size={32} /> Verbal Campus Map Guide
          </h1>
          <p className="text-sm text-textLight mt-1 font-medium">
            A high-contrast, keyboard-friendly, screen-reader optimized layout directory for visually impaired students.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Directory Listings */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="glass-panel border-gray-100 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-textLight" size={18} />
                <input
                  type="text"
                  placeholder="Search buildings or locations... (Alt+S)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/70 border border-gray-205 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-danger/40 focus:border-danger transition-all font-medium text-textMain"
                  accessKey="s"
                  aria-label="Search campus buildings"
                />
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-14 bg-gray-100/50 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <p className="text-center py-6 text-sm text-textLight font-semibold">No campus buildings found.</p>
              ) : (
                <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1" role="listbox" aria-label="Buildings List">
                  {filtered.map(b => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedBuildingId(b.id);
                        window.speechSynthesis?.cancel();
                        setSpeakingId(null);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                        selectedBuildingId === b.id
                          ? 'bg-danger/5 border-danger/30 shadow-2xs'
                          : 'bg-white/50 border-gray-100 hover:border-gray-200 hover:bg-white'
                      }`}
                      role="option"
                      aria-selected={selectedBuildingId === b.id}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className={selectedBuildingId === b.id ? 'text-danger' : 'text-textLight'} />
                          <span className="font-bold text-sm text-textMain truncate">{b.buildingName}</span>
                        </div>
                        <span className="text-[10px] text-textLight font-bold uppercase tracking-wider mt-1 block">Code: {b.buildingCode} • {b.location}</span>
                      </div>
                      <ChevronRight size={16} className={`transition-transform ${selectedBuildingId === b.id ? 'text-danger translate-x-0.5' : 'text-gray-400 group-hover:translate-x-0.5'}`} />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Building Description & Audio Guide */}
        <div className="lg:col-span-7">
          {selectedBuilding ? (
            <Card className="border border-gray-200 shadow-md rounded-2xl overflow-hidden bg-white">
              <div className="bg-gradient-to-r from-danger to-red-800 p-6 text-white">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-md uppercase font-extrabold tracking-wider">Accessibility Directory</span>
                    <h2 className="text-2xl font-heading font-extrabold mt-1.5">{selectedBuilding.buildingName}</h2>
                    <p className="text-xs text-red-100 mt-1 font-medium">Campus Location: {selectedBuilding.location} • Total Floors: {selectedBuilding.numberOfFloors}</p>
                  </div>
                  <Button
                    onClick={() => handleSpeak(getVerbalProfile(selectedBuilding.buildingName), selectedBuilding.id)}
                    variant={speakingId === selectedBuilding.id ? 'primary' : 'premium'}
                    size="sm"
                    className="flex-shrink-0 flex items-center gap-1.5 font-bold shadow-md bg-white text-danger hover:bg-gray-50 border-0"
                    aria-label={speakingId === selectedBuilding.id ? "Stop Reading Aloud" : "Read Aloud"}
                  >
                    {speakingId === selectedBuilding.id ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    {speakingId === selectedBuilding.id ? 'Stop Audio' : 'Audio Guide'}
                  </Button>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Verbal Description Card */}
                <div className="bg-danger/5 border border-danger/10 p-5 rounded-2xl space-y-2">
                  <h3 className="text-xs font-extrabold text-danger uppercase tracking-wider flex items-center gap-1.5">
                    🔊 Audio Transcript
                  </h3>
                  <p className="text-sm text-textMain leading-relaxed font-medium">
                    {getVerbalProfile(selectedBuilding.buildingName)}
                  </p>
                </div>

                {/* Structured Accessibility Profile */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-textMain uppercase tracking-wider pb-2 border-b border-gray-100">
                    🛠️ Physical Accessibility Status Checklist
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2.5 p-3 bg-gray-50/50 rounded-xl">
                      <CornerDownRight size={16} className="text-danger mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-textMain">Step-free Entrances</h4>
                        <p className="text-[11px] text-textLight mt-0.5 font-medium">Equipped with concrete double-rail access ramps matching 1:12 slope standards.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 bg-gray-50/50 rounded-xl">
                      <CornerDownRight size={16} className="text-danger mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-textMain">Elevator Systems</h4>
                        <p className="text-[11px] text-textLight mt-0.5 font-medium">Functional lifts servicing all floor levels. Braille keypads installed.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 bg-gray-50/50 rounded-xl">
                      <CornerDownRight size={16} className="text-danger mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-textMain">Accessible Washrooms</h4>
                        <p className="text-[11px] text-textLight mt-0.5 font-medium">Lowered sink basins, support handrails, and wide inward opening gates.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 bg-gray-50/50 rounded-xl">
                      <CornerDownRight size={16} className="text-danger mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-textMain">Tactile Paving</h4>
                        <p className="text-[11px] text-textLight mt-0.5 font-medium">Textured blister tiles installed along pathways leading to main doors.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Helpful Instruction Tip */}
                <div className="flex gap-2.5 p-4 bg-amber-50/20 border border-amber-200/40 rounded-xl text-amber-800">
                  <HelpCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">Screen Reader Tip</h4>
                    <p className="text-[11px] text-amber-700 font-semibold leading-relaxed mt-0.5">
                      Press <kbd className="px-1.5 py-0.5 bg-white border border-amber-300 rounded shadow-3xs text-[10px]">Alt + S</kbd> at any time to focus the search box. Use the <kbd className="px-1.5 py-0.5 bg-white border border-amber-300 rounded shadow-3xs text-[10px]">Tab</kbd> key to navigate between building listing buttons.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-white/50 border border-gray-100 rounded-2xl p-12 text-center text-textLight font-semibold text-sm">
              Please select a building from the directory to review its verbal accessibility guide profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerbalMap;
