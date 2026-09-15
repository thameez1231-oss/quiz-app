import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Calendar,
  Star,
  Award,
  BookOpen,
  Calculator,
  Atom,
  Globe2,
  ArrowLeft,
  Printer,
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Avatar from '../components/common/Avatars';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import questionsData from '../data/questions.json';

export default function ParentPortalPage() {
  const { user, quizHistory, totalStars, streak } = useUser();
  const { playClick, playCorrect } = useAudio();

  // Simple parent gate challenge: 8 x 7 = 56
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [gateAnswer, setGateAnswer] = useState('');
  const [gateError, setGateError] = useState(false);

  const student = user || {
    name: 'Student Explorer',
    classLevel: '1',
    avatar: 'owl',
    isGuest: true,
  };

  const handleGateSubmit = (e) => {
    e.preventDefault();
    playClick();
    if (gateAnswer.trim() === '56' || gateAnswer.trim() === '1234') {
      playCorrect();
      setGateUnlocked(true);
      setGateError(false);
    } else {
      setGateError(true);
    }
  };

  // Subject accuracy calculations
  const calculateSubjectStats = (subjectId) => {
    const attempts = quizHistory.filter((q) => q.subjectId === subjectId);
    if (attempts.length === 0) return { totalAttempts: 0, accuracy: 0 };
    const totalScore = attempts.reduce((acc, q) => acc + q.score, 0);
    const totalQuestions = attempts.reduce((acc, q) => acc + q.totalQuestions, 0);
    const accuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
    return { totalAttempts: attempts.length, accuracy };
  };

  const subjectStats = {
    math: calculateSubjectStats('math'),
    english: calculateSubjectStats('english'),
    science: calculateSubjectStats('science'),
    gk: calculateSubjectStats('gk'),
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Parent Gate (Keeps young kids from tampering with records) */}
        {!gateUnlocked ? (
          <div className="max-w-md mx-auto my-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-4xl p-8 border border-slate-200 shadow-card text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>

              <h1 className="text-2xl font-display font-bold text-slate-900 mb-1">
                Parent & Educator Portal
              </h1>
              <p className="text-xs text-slate-500 mb-6">
                Please verify you are a parent or educator to view performance diagnostics.
              </p>

              <form onSubmit={handleGateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Security Check: What is 8 × 7?
                  </label>
                  <input
                    type="text"
                    value={gateAnswer}
                    onChange={(e) => setGateAnswer(e.target.value)}
                    placeholder="Enter answer (or 56)"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-center font-bold text-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  {gateError && (
                    <p className="text-xs font-bold text-rose-600 mt-1.5 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Incorrect answer. Please calculate 8 × 7 = 56.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-display font-bold text-sm shadow-button transition-all"
                >
                  Unlock Portal
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* UNLOCKED PARENT PORTAL */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <Avatar id={student.avatar} size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-display font-bold text-slate-900">
                      {student.name}'s Learning Report
                    </h1>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      Class {student.classLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Continuous learning record • Active {streak.count} day streak
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Report Card</span>
                </button>

                <Link
                  to="/dashboard"
                  onClick={playClick}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Quizzes</p>
                <p className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                  {quizHistory.length}
                </p>
                <span className="text-[10px] text-slate-400">Attempts recorded</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Stars</p>
                <p className="text-2xl font-display font-extrabold text-amber-500 mt-1">
                  {totalStars} ⭐
                </p>
                <span className="text-[10px] text-slate-400">Reward milestones</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Accuracy</p>
                <p className="text-2xl font-display font-extrabold text-brand-600 mt-1">
                  {quizHistory.length > 0
                    ? Math.round(
                        (quizHistory.reduce((a, b) => a + b.score, 0) /
                          quizHistory.reduce((a, b) => a + b.totalQuestions, 0)) *
                          100
                      )
                    : 100}
                  %
                </p>
                <span className="text-[10px] text-slate-400">Across all topics</span>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Streak</p>
                <p className="text-2xl font-display font-extrabold text-orange-500 mt-1">
                  {streak.count} Days 🔥
                </p>
                <span className="text-[10px] text-slate-400">Daily consistency</span>
              </div>
            </div>

            {/* Subject Mastery Progress Bars */}
            <div className="bg-white p-6 sm:p-8 rounded-4xl border border-slate-200 shadow-soft">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-600" />
                <span>Subject Mastery Diagnostics</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Math */}
                <div className="p-4 rounded-2xl bg-math-50/50 border border-math-200/80">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 mb-2">
                    <span className="flex items-center gap-1.5 text-math-700">
                      <Calculator className="w-4 h-4" />
                      Math
                    </span>
                    <span>
                      {subjectStats.math.totalAttempts > 0 ? `${subjectStats.math.accuracy}%` : 'Not yet attempted'}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-math-500 rounded-full"
                      style={{ width: `${subjectStats.math.accuracy}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    {subjectStats.math.totalAttempts} quiz attempts in Class {student.classLevel}
                  </p>
                </div>

                {/* English */}
                <div className="p-4 rounded-2xl bg-english-50/50 border border-english-200/80">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 mb-2">
                    <span className="flex items-center gap-1.5 text-english-700">
                      <BookOpen className="w-4 h-4" />
                      English
                    </span>
                    <span>
                      {subjectStats.english.totalAttempts > 0 ? `${subjectStats.english.accuracy}%` : 'Not yet attempted'}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-english-500 rounded-full"
                      style={{ width: `${subjectStats.english.accuracy}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    {subjectStats.english.totalAttempts} quiz attempts in Class {student.classLevel}
                  </p>
                </div>

                {/* Science */}
                <div className="p-4 rounded-2xl bg-science-50/50 border border-science-200/80">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 mb-2">
                    <span className="flex items-center gap-1.5 text-science-700">
                      <Atom className="w-4 h-4" />
                      Science
                    </span>
                    <span>
                      {subjectStats.science.totalAttempts > 0 ? `${subjectStats.science.accuracy}%` : 'Not yet attempted'}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-science-500 rounded-full"
                      style={{ width: `${subjectStats.science.accuracy}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    {subjectStats.science.totalAttempts} quiz attempts in Class {student.classLevel}
                  </p>
                </div>

                {/* General Knowledge */}
                <div className="p-4 rounded-2xl bg-gk-50/50 border border-gk-200/80">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 mb-2">
                    <span className="flex items-center gap-1.5 text-gk-700">
                      <Globe2 className="w-4 h-4" />
                      General Knowledge
                    </span>
                    <span>
                      {subjectStats.gk.totalAttempts > 0 ? `${subjectStats.gk.accuracy}%` : 'Not yet attempted'}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gk-500 rounded-full"
                      style={{ width: `${subjectStats.gk.accuracy}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    {subjectStats.gk.totalAttempts} quiz attempts in Class {student.classLevel}
                  </p>
                </div>
              </div>
            </div>

            {/* Complete Attempt Log */}
            <div className="bg-white p-6 sm:p-8 rounded-4xl border border-slate-200 shadow-soft">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4">
                Detailed Quiz Session History
              </h2>

              {quizHistory.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-6 text-center">
                  No completed quiz records on this device yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Subject</th>
                        <th className="py-3 px-4">Class</th>
                        <th className="py-3 px-4">Score</th>
                        <th className="py-3 px-4">Accuracy</th>
                        <th className="py-3 px-4">Stars</th>
                        <th className="py-3 px-4">Mode</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quizHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-medium text-slate-500">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900 uppercase">
                            {item.subjectId}
                          </td>
                          <td className="py-3 px-4">Class {item.classLevel}</td>
                          <td className="py-3 px-4 font-extrabold text-slate-900">
                            {item.score} / {item.totalQuestions}
                          </td>
                          <td className="py-3 px-4 font-bold text-brand-600">
                            {item.percentage}%
                          </td>
                          <td className="py-3 px-4 text-amber-500 font-bold">
                            {item.starsEarned || 1} ⭐
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                              {item.timedMode ? 'Timed' : 'Relaxed'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
