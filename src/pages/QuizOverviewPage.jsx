import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator,
  BookOpen,
  Atom,
  Globe2,
  Clock,
  Star,
  CheckCircle2,
  HelpCircle,
  Zap,
  ArrowLeft,
  Sparkles,
  Flame,
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Mascot from '../components/common/Mascot';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import questionsData from '../data/questions.json';

export default function QuizOverviewPage() {
  const { subjectId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { playClick } = useAudio();

  const classLevel = searchParams.get('class') || (user ? String(user.classLevel) : '1');
  const [timedMode, setTimedMode] = useState(false);

  const subjectMeta = questionsData.subjects.find((s) => s.id === subjectId) || questionsData.subjects[0];
  const classMeta = questionsData.classes.find((c) => c.id === classLevel) || questionsData.classes[0];
  const topicTitle = subjectMeta.topicsByClass[classLevel] || 'Foundations & Practice';

  const subjectIcons = {
    math: Calculator,
    english: BookOpen,
    science: Atom,
    gk: Globe2,
  };
  const Icon = subjectIcons[subjectMeta.id] || Calculator;

  // Star difficulty rating based on class
  const difficultyStars = Math.min(3, Math.max(1, Math.ceil(parseInt(classLevel, 10) / 2)));
  const difficultyLabel = difficultyStars === 1 ? 'Gentle / Easy' : difficultyStars === 2 ? 'Medium' : 'Advanced Challenge';

  const handleStartQuiz = () => {
    playClick();
    navigate(`/quiz/${subjectMeta.id}/play?class=${classLevel}&timed=${timedMode}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-4xl border-2 border-slate-200/80 shadow-card overflow-hidden w-full"
        >
          {/* Top Themed Header Banner */}
          <div className={`${subjectMeta.accentBg} p-6 sm:p-8 border-b ${subjectMeta.accentBorder} relative`}>
            <Link
              to="/subjects"
              onClick={playClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs mb-4 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Subjects</span>
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-3xl bg-white border ${subjectMeta.accentBorder} shadow-sm flex items-center justify-center`}>
                  <Icon className={`w-8 h-8 ${subjectMeta.accentText}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {classMeta.name} ({classMeta.ageRange})
                    </span>
                    <span className="text-base">{subjectMeta.badge}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                    {subjectMeta.name}: {topicTitle}
                  </h1>
                </div>
              </div>

              {/* Mascot Peeking */}
              <div className="hidden sm:block">
                <Mascot pose="welcome" size="sm" />
              </div>
            </div>
          </div>

          {/* Details & Specifications Grid */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Questions
                </span>
                <span className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                  10 Total
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Est. Time
                </span>
                <span className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  ~5 Min
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Difficulty
                </span>
                <div className="flex items-center justify-center gap-0.5 text-amber-500 my-0.5">
                  {[...Array(difficultyStars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-500">{difficultyLabel}</span>
              </div>
            </div>

            {/* Quiz Rules & Friendly Reassurances */}
            <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900">Encouraging Feedback:</strong> Learn at your own pace. There are no harsh penalties — mistakes help your brain grow!
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900">Helpful Hints:</strong> Stuck on a question? Tap the hint bulb anytime for an educational clue.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900">Star Rewards:</strong> Score 80%+ to earn 3 Golden Stars and boost your streak!
                </p>
              </div>
            </div>

            {/* Mode Selection: Relaxed vs Timed */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Choose Quiz Mode:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Relaxed Mode */}
                <div
                  onClick={() => {
                    playClick();
                    setTimedMode(false);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    !timedMode
                      ? 'border-brand-500 bg-brand-50/70 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    !timedMode ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display font-bold text-sm text-slate-900">Relaxed Mode</p>
                      <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      No countdown timers. Take all the time you need to read and think!
                    </p>
                  </div>
                </div>

                {/* Timed Challenge */}
                <div
                  onClick={() => {
                    playClick();
                    setTimedMode(true);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    timedMode
                      ? 'border-brand-500 bg-brand-50/70 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    timedMode ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display font-bold text-sm text-slate-900">Timed Challenge</p>
                      <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        30s / Q
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fun countdown for older classes or quick brain sprints!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-2 text-center">
              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto px-12 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-display font-bold text-lg shadow-button hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Ready? Let's Go! 🚀</span>
              </button>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                Playing as <strong className="text-slate-700">{user ? user.name : 'Guest Explorer'}</strong>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
