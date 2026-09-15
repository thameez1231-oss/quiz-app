import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Star,
  Trophy,
  Target,
  ArrowRight,
  Calculator,
  BookOpen,
  Atom,
  Globe2,
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Avatar from '../components/common/Avatars';
import Mascot from '../components/common/Mascot';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import questionsData from '../data/questions.json';

export default function DashboardPage() {
  const { user, streak, totalStars, quizHistory } = useUser();
  const { playClick } = useAudio();
  const navigate = useNavigate();

  // If unauthenticated, redirect to login or show default guest state
  const student = user || {
    name: 'Curious Explorer',
    classLevel: '1',
    avatar: 'owl',
    isGuest: true,
  };

  const classInfo = questionsData.classes.find((c) => c.id === String(student.classLevel)) || questionsData.classes[0];

  // Calculate statistics
  const totalCompleted = quizHistory.length;
  const totalScore = quizHistory.reduce((acc, q) => acc + (q.score || 0), 0);
  const totalPossible = quizHistory.reduce((acc, q) => acc + (q.totalQuestions || 10), 0);
  const accuracy = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 100;

  // Icon mapping
  const subjectIcons = {
    math: Calculator,
    english: BookOpen,
    science: Atom,
    gk: Globe2,
  };

  const handleStartRecommended = () => {
    playClick();
    navigate(`/quiz/math/overview?class=${student.classLevel}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* WELCOME BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white rounded-4xl p-6 sm:p-10 shadow-soft overflow-hidden mb-8"
        >
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
              {/* Student Avatar */}
              <div className="relative">
                <Avatar id={student.avatar} size="lg" className="border-4 border-white/30 shadow-md" />
                <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase shadow-xs">
                  {classInfo.name}
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold text-brand-100 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Welcome Back to QuizKids!</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
                  Hello, {student.name}! 👋
                </h1>
                <p className="text-brand-100 text-xs sm:text-sm mt-1 max-w-md">
                  Ready to exercise your brain today? Keep your {streak.count}-day streak going strong!
                </p>
              </div>
            </div>

            {/* Mascot Kip greeting */}
            <div className="hidden md:flex flex-col items-center">
              <Mascot pose="encouraging" size="md" />
            </div>
          </div>
        </motion.div>

        {/* STAT TRACKER ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Streak Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 flex-shrink-0">
              <Flame className="w-6 h-6 fill-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Streak</p>
              <p className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                {streak.count} {streak.count === 1 ? 'Day' : 'Days'} 🔥
              </p>
            </div>
          </div>

          {/* Quizzes Completed */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 flex-shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed</p>
              <p className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                {totalCompleted} {totalCompleted === 1 ? 'Quiz' : 'Quizzes'}
              </p>
            </div>
          </div>

          {/* Stars Earned */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Stars Earned</p>
              <p className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                {totalStars} ⭐
              </p>
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Accuracy</p>
              <p className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                {totalCompleted > 0 ? `${accuracy}%` : '100%'}
              </p>
            </div>
          </div>
        </div>

        {/* FEATURED DAILY MISSION CTA */}
        <div className="bg-gradient-to-r from-math-500 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-card mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Today's Recommended Quest
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              {classInfo.name} Math: {questionsData.subjects[0].topicsByClass[student.classLevel]}
            </h2>
            <p className="text-math-100 text-xs sm:text-sm max-w-xl">
              10 bite-sized questions designed to test your mental math, patterns, and logic skills.
            </p>
          </div>

          <button
            onClick={handleStartRecommended}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white text-math-700 font-display font-bold text-base shadow-lg hover:bg-math-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>Start Daily Quest</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* 4 CORE SUBJECTS TILES */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Choose a Subject
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Curriculum tailored for {classInfo.name} ({classInfo.ageRange})
              </p>
            </div>
            <Link
              to="/subjects"
              onClick={playClick}
              className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View All Grades</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {questionsData.subjects.map((sub) => {
              const Icon = subjectIcons[sub.id] || Calculator;
              const currentTopic = sub.topicsByClass[student.classLevel];
              const historyForSub = quizHistory.filter((q) => q.subjectId === sub.id);

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl ${sub.accentBg} border ${sub.accentBorder} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <Icon className={`w-7 h-7 ${sub.accentText}`} />
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        {sub.name}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-slate-900 mb-1">
                      {sub.name}
                    </h3>
                    <p className="text-xs font-bold text-brand-600 mb-2">
                      {currentTopic}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      {sub.tagline}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3 pt-3 border-t border-slate-100">
                      <span>Completed:</span>
                      <span className="text-slate-700">{historyForSub.length} Quizzes</span>
                    </div>

                    <Link
                      to={`/quiz/${sub.id}/overview?class=${student.classLevel}`}
                      onClick={playClick}
                      className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${sub.accentBtn}`}
                    >
                      <span>Play {sub.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECENT ACTIVITY & PROGRESS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Recent Quiz Activity
                </h3>
                <p className="text-xs text-slate-400">
                  Track your scores, review answers, and try again
                </p>
              </div>
            </div>

            <Link
              to="/parent-portal"
              onClick={playClick}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Full History & Analytics</span>
            </Link>
          </div>

          {quizHistory.length === 0 ? (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-3">
                <Mascot pose="thinking" size="sm" />
              </div>
              <p className="text-sm font-bold text-slate-700">No quizzes completed yet!</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Pick a subject above to start your first 10-question quiz and earn shiny stars.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {quizHistory.slice(0, 5).map((item) => {
                const subMeta = questionsData.subjects.find((s) => s.id === item.subjectId);
                const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${subMeta?.accentBg || 'bg-slate-100'} flex items-center justify-center font-bold text-sm ${subMeta?.accentText || 'text-slate-700'}`}>
                        {subMeta?.name.charAt(0) || 'Q'}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">
                          {subMeta?.name || 'Quiz'} • Class {item.classLevel}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {dateStr} • {item.timedMode ? 'Timed Challenge' : 'Relaxed Mode'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-slate-900">
                          {item.score} / {item.totalQuestions}
                        </p>
                        <div className="flex items-center justify-end gap-0.5 text-amber-500">
                          {[...Array(item.starsEarned || 1)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <Link
                        to={`/quiz/${item.subjectId}/overview?class=${item.classLevel}`}
                        onClick={playClick}
                        className="p-2 rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                        title="Play again"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
