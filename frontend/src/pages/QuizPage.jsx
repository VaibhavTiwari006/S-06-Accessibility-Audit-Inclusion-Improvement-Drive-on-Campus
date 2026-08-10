import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, BookOpen, CheckCircle2, XCircle, ArrowRight, HelpCircle, 
  Award, Star, Sparkles, RefreshCw, Calendar, ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const DAILY_KNOWLEDGE = [
  {
    title: "Tactile Walkway Indicators",
    fact: "Tactile paving (textured tiles) on pathways helps visually impaired students navigate safely. Yellow blistered tiles warn of hazards/intersections, while directional strip tiles indicate a safe path forward.",
    category: "Physical Infrastructure"
  },
  {
    title: "The power of Alt Text",
    fact: "Adding 'alt text' (alternative text descriptions) to images on websites and study portals allows screen readers to read the description aloud to students with visual impairments.",
    category: "Digital LMS Accessibility"
  },
  {
    title: "RPWD Act 2016 Guidelines",
    fact: "The Rights of Persons with Disabilities Act 2016 recognizes 21 distinct conditions (up from 7 in 1995) and mandates accessibility audits for all public university campuses in India.",
    category: "Regulatory Compliance"
  },
  {
    title: "Color Contrast Standards",
    fact: "WCAG 2.1 AA guidelines require a contrast ratio of at least 4.5:1 for standard text (under 18pt) to make sure it is readable for users with low-vision or color blindness.",
    category: "Digital Content"
  },
  {
    title: "Accessible Washrooms Specs",
    fact: "An accessible washroom must provide clear internal turning space of at least 1500mm x 1500mm, alongside support grab bars mounted between 750mm and 800mm from the floor.",
    category: "Washroom Standards"
  },
  {
    title: "Wheelchair Ramps Ratio",
    fact: "The ideal ramp gradient is 1:12. This means for every 1 unit of vertical rise, there must be 12 units of horizontal run. Steeper slopes (like 1:10) can cause wheelchairs to tip backwards.",
    category: "Ramp Accessibility"
  },
  {
    title: "Braille Signage Placement",
    fact: "Tactile and Braille signage should be mounted at a consistent height (usually between 1400mm and 1600mm) near the latch side of doors, allowing easy search by hand.",
    category: "Emergency Signage"
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the standard recommended slope gradient ratio for a wheelchair ramp in public university buildings?",
    options: ["1:6 (Very Steep)", "1:10 (Moderately Steep)", "1:12 (Recommended Standard)", "1:20 (Extra Flat)"],
    answer: 2,
    explanation: "According to the RPWD Act guidelines, the standard gradient for a wheelchair ramp must be 1:12 to allow users to ascend independently and safely without tipping."
  },
  {
    id: 2,
    question: "Which legislation mandates physical and digital accessibility audits for university campuses across India?",
    options: [
      "The Persons with Disabilities Act 1995",
      "The Rights of Persons with Disabilities (RPWD) Act 2016",
      "The Rehabilitation Council of India Act 1992",
      "The National Trust Act 1999"
    ],
    answer: 1,
    explanation: "The Rights of Persons with Disabilities (RPWD) Act 2016 enforces strict compliance standards for physical buildings and digital sites in India."
  },
  {
    id: 3,
    question: "What is the minimum WCAG 2.1 AA compliance color contrast ratio required for standard body text?",
    options: ["3.0:1", "4.5:1", "7.0:1", "10:1"],
    answer: 1,
    explanation: "WCAG 2.1 AA rules mandate a minimum contrast ratio of 4.5:1 for standard text to ensure readability for colorblind or low-vision students."
  },
  {
    id: 4,
    question: "What do yellow blister-pattern tiles underfoot indicate on a campus walkway?",
    options: [
      "The path is leading to the student cafeteria entrance",
      "A warning of an upcoming hazard, level change, or intersection",
      "Anti-slip flooring designed specifically for rainy weather",
      "Decorative tile markings representing college boundaries"
    ],
    answer: 1,
    explanation: "Blister tactile warning tiles feature raised dots that alert visually impaired users of step-downs, crossroads, or stairs ahead."
  },
  {
    id: 5,
    question: "Alternative text (alt-text) on course materials is used on website systems to:",
    options: [
      "Speed up the loading times of digital image files",
      "Enable screen-reading assistants to describe images to visually impaired users",
      "Add hover effects and pop-ups on mouse pointers",
      "Automatically translate textbooks into different languages"
    ],
    answer: 1,
    explanation: "Alt text is converted into audio speech by screen readers, ensuring students with visual impairments can fully understand visual content."
  }
];

const INITIAL_LEADERBOARD = [
  { rank: 1, name: "Aarav Mehta", points: 450, badge: "Inclusion Guru", current: false },
  { rank: 2, name: "Sneha Reddy", points: 420, badge: "Access Champion", current: false },
  { rank: 3, name: "Priya Singh", points: 395, badge: "Access Ally", current: false },
  { rank: 4, name: "Rahul Verma", points: 340, badge: "Inclusion Pioneer", current: false },
  { rank: 5, name: "You (Student)", points: 280, badge: "Inclusion Learner", current: true },
  { rank: 6, name: "Vikram Malhotra", points: 270, badge: "Accessibility Ally", current: false }
];

/**
 * QuizPage Component
 * 
 * Renders the gamified inclusion training and quiz challenge.
 * Features:
 * - Interactive multi-choice questions on accessibility rules (WCAG/RPWD).
 * - Real-time answer evaluation and detailed explanations.
 * - Score summaries, leaderboard rankings, and daily knowledge fact cards.
 */
const QuizPage = () => {
  const { user } = useAuth();
  
  // Daily Knowledge Fact
  const dailyIndex = new Date().getDate() % DAILY_KNOWLEDGE.length;
  const dailyFact = DAILY_KNOWLEDGE[dailyIndex];

  // Quiz States
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answersSubmitted, setAnswersSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setAnswersSubmitted(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const handleOptionSelect = (optionIdx) => {
    if (answersSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const submitAnswer = () => {
    if (selectedOption === null) {
      toast.warn("Please select an option to proceed.");
      return;
    }

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];
    const isCorrect = selectedOption === currentQuestion.answer;
    
    if (isCorrect) setScore(prev => prev + 1);

    setUserAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selected: selectedOption,
      correct: isCorrect
    }]);

    setAnswersSubmitted(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setAnswersSubmitted(false);
    } else {
      setQuizCompleted(true);
      // Update leaderboard points dynamically!
      const gainedPoints = score * 20;
      setLeaderboard(prev => prev.map(member => {
        if (member.current) {
          const updatedPoints = member.points + gainedPoints;
          let badge = member.badge;
          if (updatedPoints >= 400) badge = "Inclusion Guru";
          else if (updatedPoints >= 350) badge = "Access Champion";
          else if (updatedPoints >= 300) badge = "Access Ally";
          return { ...member, points: updatedPoints, badge };
        }
        return member;
      }).sort((a, b) => b.points - a.points).map((member, index) => ({ ...member, rank: index + 1 })));

      toast.success(`Quiz Completed! You scored ${score}/${QUIZ_QUESTIONS.length}!`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Inline styles for quiz page medal shine effects */}
      <style>{`
        @keyframes medalShineQuiz {
          0% { transform: translateX(-150%) rotate(25deg); }
          50% { transform: translateX(250%) rotate(25deg); }
          100% { transform: translateX(250%) rotate(25deg); }
        }
        .medal-shine-quiz-container {
          position: relative;
          overflow: hidden;
        }
        .medal-shine-quiz-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.65) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(25deg);
          animation: medalShineQuiz 2.5s infinite ease-in-out;
          pointer-events: none;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-heading font-extrabold text-textMain flex items-center gap-3">
          <Trophy className="text-primary animate-bounce-slow" size={32} /> Inclusion Quiz Challenge
        </h2>
        <p className="text-textLight mt-1.5 font-medium">Test your accessibility knowledge, learn daily compliance insights, and rank on the student leaderboard.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Daily Knowledge & Leaderboard */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Daily Knowledge Fact Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-gradient-to-br from-primary to-primary-dark rounded-3xl text-white shadow-md border border-primary/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
                  <Calendar size={11} /> Knowledge Nugget
                </span>
                <span className="text-[10px] font-extrabold text-white/80">{dailyFact.category}</span>
              </div>
              <h3 className="text-lg font-heading font-black leading-tight">{dailyFact.title}</h3>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                "{dailyFact.fact}"
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[10px] text-white/80 font-bold">
                <Sparkles size={12} className="text-amber-300" /> Fact of the Day • Refreshes daily
              </div>
            </div>
          </motion.div>

          {/* Leaderboard Widget */}
          <Card className="p-6 bg-white border border-gray-100 shadow-soft-sm">
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Trophy size={14} className="text-primary" /> Student Standings
                </span>
                <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-black uppercase">
                  Weekly
                </span>
              </div>

              <div className="space-y-2.5">
                {leaderboard.map((member) => {
                  const isGold = member.rank === 1;
                  const isSilver = member.rank === 2;
                  const isBronze = member.rank === 3;

                  let rankStyle = "bg-gray-150 text-gray-500";
                  if (isGold) rankStyle = "bg-gradient-to-br from-amber-400 via-yellow-100 to-amber-600 text-amber-950 font-black medal-shine-quiz-container shadow-sm";
                  else if (isSilver) rankStyle = "bg-gradient-to-br from-slate-300 via-white to-slate-550 text-slate-900 font-black medal-shine-quiz-container shadow-sm";
                  else if (isBronze) rankStyle = "bg-gradient-to-br from-orange-400 via-orange-100 to-amber-700 text-orange-950 font-black medal-shine-quiz-container shadow-sm";
                  else if (member.current) rankStyle = "bg-primary text-white";

                  return (
                    <motion.div 
                      key={member.rank}
                      whileHover={{ scale: 1.005, y: -0.5 }}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                        member.current 
                          ? 'bg-primary/5 border-primary/25 shadow-3xs' 
                          : 'bg-gray-50/30 border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative">
                          {isGold && (
                            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs select-none z-10 animate-bounce-slow">
                              👑
                            </div>
                          )}
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 relative overflow-hidden ${rankStyle}`}>
                            {(isGold || isSilver || isBronze) && <div className="medal-shine-quiz-effect" />}
                            {member.rank}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className={`text-xs font-bold text-textMain truncate leading-tight ${member.current ? 'text-primary' : ''}`}>
                            {member.name}
                          </p>
                          <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">{member.badge}</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-textMain">{member.points} pts</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Quiz Play Area */}
        <div className="lg:col-span-2">
          <Card className="h-full bg-white border border-gray-100 shadow-soft-md p-8 flex flex-col justify-between min-h-[460px]">
            <AnimatePresence mode="wait">
              {!quizStarted ? (
                // 1. Splash Screen
                <motion.div 
                  key="splash"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 text-center my-auto py-10"
                >
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <HelpCircle size={32} className="animate-pulse" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-xl font-extrabold text-textMain">Ready for the Inclusion Challenge?</h3>
                    <p className="text-xs text-textLight leading-relaxed">
                      Answer 5 quick multiple-choice questions regarding campus accessibility standard compliance, regulations, and digital accessibility guidelines. Earn 20 points per correct answer!
                    </p>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="px-8 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-md hover:bg-primary-dark transition-all hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    Start Challenge &rarr;
                  </button>
                </motion.div>
              ) : quizCompleted ? (
                // 2. Results Screen
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center my-auto py-6"
                >
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Award size={40} className="text-emerald-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-textMain">Inclusion Challenge Result</h3>
                    <p className="text-sm font-semibold text-emerald-700">
                      You scored {score} out of {QUIZ_QUESTIONS.length} correct! (+{score * 20} pts)
                    </p>
                  </div>

                  <div className="max-w-md mx-auto p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs text-textLight leading-relaxed">
                    {score === QUIZ_QUESTIONS.length ? (
                      <span className="font-bold text-textMain flex items-center justify-center gap-1">
                        <Star size={14} className="text-amber-500 fill-amber-400" /> Perfect score! You are an Accessibility Guru!
                      </span>
                    ) : score >= 3 ? (
                      <span className="font-semibold text-textMain">Great job! You have a solid understanding of campus inclusion standards.</span>
                    ) : (
                      <span>Keep learning! Review the explanations to understand how accessibility shapes a supportive campus.</span>
                    )}
                  </div>

                  <div className="flex justify-center gap-3 pt-4">
                    <button
                      onClick={startQuiz}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:bg-primary-dark transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw size={13} /> Retake Challenge
                    </button>
                    <button
                      onClick={() => setQuizStarted(false)}
                      className="px-6 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Back to Start
                    </button>
                  </div>
                </motion.div>
              ) : (
                // 3. Active Quiz Question
                <motion.div 
                  key={currentQuestionIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Progress Header */}
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                    </span>
                    <Badge variant="primary" rounded="full">
                      {score * 20} Points
                    </Badge>
                  </div>

                  {/* Question */}
                  <h3 className="text-base font-extrabold text-textMain leading-tight">
                    {QUIZ_QUESTIONS[currentQuestionIdx].question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {QUIZ_QUESTIONS[currentQuestionIdx].options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];
                      const showCorrect = answersSubmitted && idx === currentQuestion.answer;
                      const showIncorrect = answersSubmitted && isSelected && idx !== currentQuestion.answer;

                      let btnStyle = "border-gray-150 hover:bg-gray-50 hover:border-gray-300";
                      if (isSelected) btnStyle = "border-primary bg-primary/5 text-primary";
                      if (showCorrect) btnStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-800";
                      if (showIncorrect) btnStyle = "border-red-500 bg-red-50/50 text-red-800";

                      return (
                        <button
                          key={idx}
                          disabled={answersSubmitted}
                          onClick={() => handleOptionSelect(idx)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${btnStyle}`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold border ${
                              isSelected ? 'bg-primary border-primary text-white' : 'bg-gray-50 text-gray-500'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            {option}
                          </span>
                          
                          {showCorrect && <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />}
                          {showIncorrect && <XCircle size={16} className="text-red-600 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback block */}
                  {answersSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                        selectedOption === QUIZ_QUESTIONS[currentQuestionIdx].answer
                          ? 'bg-emerald-50/30 border-emerald-100 text-emerald-800'
                          : 'bg-red-50/20 border-red-100 text-red-800'
                      }`}
                    >
                      <span className="font-extrabold flex items-center gap-1.5 mb-1.5">
                        {selectedOption === QUIZ_QUESTIONS[currentQuestionIdx].answer ? '✓ Correct Answer!' : '✗ Explanation:'}
                      </span>
                      {QUIZ_QUESTIONS[currentQuestionIdx].explanation}
                    </motion.div>
                  )}

                  {/* Control Button footer */}
                  <div className="pt-5 border-t border-gray-100 flex justify-end">
                    {!answersSubmitted ? (
                      <button
                        onClick={submitAnswer}
                        disabled={selectedOption === null}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1 ${
                          selectedOption === null
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                            : 'bg-primary text-white hover:bg-primary-dark cursor-pointer'
                        }`}
                      >
                        Submit Answer <ChevronRight size={13} />
                      </button>
                    ) : (
                      <button
                        onClick={nextQuestion}
                        className="px-6 py-2.5 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        {currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default QuizPage;
