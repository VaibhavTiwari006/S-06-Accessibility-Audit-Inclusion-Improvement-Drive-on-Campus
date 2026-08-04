import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, BookOpen, PlayCircle, ShieldCheck, 
  Sparkles, CheckCircle2, HelpCircle, Award 
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'react-toastify';

const BRAILLE_MAP = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
  'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
  'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
  ' ': '⠀', '1': '⠂', '2': '⠆', '3': '⠒', '4': '⠲', '5': '⠢', '6': '⠖', '7': '⠶', '8': '⠦', '9': '⠔', '0': '⠴'
};

const ETIQUETTE_RULES = [
  {
    title: 'Ask Before Assisting',
    desc: 'Never assume someone needs help. Offer assistance politely and wait for permission before acting.',
    icon: '🤝',
  },
  {
    title: 'Speak Directly to the Individual',
    desc: 'Make eye contact and converse directly with the person, not their interpreter or companion.',
    icon: '💬',
  },
  {
    title: 'Respect Personal Mobility Space',
    desc: 'A wheelchair or white cane is an extension of personal space. Never lean on or touch without consent.',
    icon: '♿',
  },
  {
    title: 'Use Inclusive Language',
    desc: 'Prefer "person with disability" or "wheelchair user" over outdated or condescending terms.',
    icon: '🗣️',
  },
];

const EDUCATIONAL_VIDEOS = [
  {
    id: 1,
    title: 'Understanding Physical Ramp Gradients (RPWD 2016)',
    duration: '3 mins',
    category: 'Architecture',
    thumbnail: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=500',
    url: 'https://www.youtube.com/watch?v=93UgG72os8M',
  },
  {
    id: 2,
    title: 'Screen Readers & Digital Accessibility (WCAG 2.1)',
    duration: '4 mins',
    category: 'Digital Tech',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500',
    url: 'https://www.youtube.com/watch?v=8Rn5pXCdZWU',
  },
  {
    id: 3,
    title: 'Tactile Ground Surface Indicators (TGSIs) Layout',
    duration: '5 mins',
    category: 'Navigation',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500',
    url: 'https://www.youtube.com/watch?v=iWO5N3n1DXU',
  },
];

const AwarenessPage = () => {
  const [activeQuizAnswer, setActiveQuizAnswer] = useState(null);
  const [englishText, setEnglishText] = useState('welcome to campus');

  const translateToBraille = (text) => {
    return text.toLowerCase().split('').map(char => BRAILLE_MAP[char] || char).join('');
  };

  const handleQuizSubmit = (optionIdx) => {
    setActiveQuizAnswer(optionIdx);
    if (optionIdx === 1) {
      toast.success('Correct! 1:12 is the RPWD standard ramp gradient!');
    } else {
      toast.error('Incorrect. The standard RPWD gradient for ramps is 1:12.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
              <HeartHandshake size={22} />
            </div>
            Inclusive Awareness & Education
          </h2>
          <p className="text-textLight mt-1.5 font-medium">
            Disability etiquette, WCAG 2.1 guidelines, RPWD 2016 standards, and educational videos.
          </p>
        </div>
      </div>

      {/* Etiquette Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
          <BookOpen className="text-primary" size={20} /> Campus Disability Etiquette Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ETIQUETTE_RULES.map((rule) => (
            <Card key={rule.title} className="p-5 border border-gray-100 space-y-2 hover:shadow-md transition-all">
              <div className="text-3xl mb-1">{rule.icon}</div>
              <h4 className="font-bold text-textMain text-sm font-heading">{rule.title}</h4>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">{rule.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Educational Short Videos */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
          <PlayCircle className="text-rose-500" size={20} /> Educational Video Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATIONAL_VIDEOS.map((vid) => (
            <Card
              key={vid.id}
              className="overflow-hidden border border-gray-100 group cursor-pointer hover:shadow-xl transition-all"
              onClick={() => window.open(vid.url, '_blank', 'noopener,noreferrer')}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(vid.url, '_blank', 'noopener,noreferrer'); } }}
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                    <PlayCircle size={28} />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {vid.duration}
                </span>
                <span className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  ▶ YouTube
                </span>
              </div>
              <CardContent className="p-4 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
                  {vid.category}
                </span>
                <h4 className="font-bold text-textMain text-sm leading-snug font-heading">
                  {vid.title}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Compliance Quiz */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 via-emerald-50/30 to-white border border-primary/20 shadow-md">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-base font-extrabold text-textMain font-heading">
            <HelpCircle className="text-primary" size={22} />
            <span>Interactive Quiz: Test Your RPWD 2016 Knowledge</span>
          </div>

          <p className="text-xs font-semibold text-gray-700">
            What is the mandatory maximum gradient slope for wheelchair ramps under RPWD Act 2016?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['1:5 Slope (Very Steep)', '1:12 Slope (Mandatory Standard)', '1:25 Slope (Too Flat)'].map((opt, idx) => (
              <button
                key={opt}
                onClick={() => handleQuizSubmit(idx)}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  activeQuizAnswer === idx
                    ? idx === 1
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                      : 'bg-rose-500 text-white border-rose-500 shadow-sm'
                    : 'bg-white border-gray-200 hover:border-primary text-gray-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Braille Translator Card */}
      <Card className="p-6 bg-white border border-gray-100 shadow-md space-y-5 mt-6">
        <div>
          <h3 className="text-xl font-heading font-bold text-textMain flex items-center gap-2">
            <Sparkles className="text-primary animate-pulse" size={20} />
            Interactive English-to-Braille Translator
          </h3>
          <p className="text-xs text-textLight mt-1">
            Type any English sentence or number to watch it translate to Grade 1 Braille cells in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input text */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">English Text Input</label>
            <textarea
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
              placeholder="Type English words or numbers to translate..."
              className="w-full h-32 bg-gray-50/50 border border-gray-250 rounded-2xl p-4 text-sm font-semibold text-textMain focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-none"
              maxLength={200}
            />
            <div className="text-[10px] text-gray-400 font-bold text-right">
              {englishText.length}/200 characters
            </div>
          </div>

          {/* Output Braille dots */}
          <div className="space-y-2 flex flex-col">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Tactile Braille Output</label>
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center flex flex-col justify-center items-center relative overflow-hidden group shadow-inner min-h-[128px]">
              <div 
                className="text-4xl md:text-5xl font-mono text-white tracking-widest leading-relaxed break-all select-all font-bold transition-all duration-300"
                style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}
              >
                {englishText.trim() ? translateToBraille(englishText) : '⠀'}
              </div>
              {!englishText.trim() && (
                <div className="text-xs text-slate-500 font-semibold italic">
                  Translation will appear here
                </div>
              )}
            </div>

            {/* Quick buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const val = translateToBraille(englishText);
                  if (val) {
                    navigator.clipboard.writeText(val);
                    toast.success('Braille copied to clipboard!');
                  }
                }}
                disabled={!englishText.trim()}
                className="flex-1 py-2 border border-gray-200 hover:border-primary/20 hover:bg-primary/5 text-gray-700 disabled:opacity-40 disabled:hover:bg-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
              >
                Copy Braille Glyphs
              </button>
              <button
                type="button"
                onClick={() => setEnglishText('')}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-500 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AwarenessPage;
