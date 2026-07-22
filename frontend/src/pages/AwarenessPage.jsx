import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, BookOpen, PlayCircle, ShieldCheck, 
  Sparkles, CheckCircle2, HelpCircle, Award 
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'react-toastify';

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
  },
  {
    id: 2,
    title: 'Screen Readers & Digital Accessibility (WCAG 2.1)',
    duration: '4 mins',
    category: 'Digital Tech',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 3,
    title: 'Tactile Ground Surface Indicators (TGSIs) Layout',
    duration: '5 mins',
    category: 'Navigation',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500',
  },
];

const AwarenessPage = () => {
  const [activeQuizAnswer, setActiveQuizAnswer] = useState(null);

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
            <Card key={vid.id} className="overflow-hidden border border-gray-100 group cursor-pointer hover:shadow-xl transition-all">
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
    </div>
  );
};

export default AwarenessPage;
