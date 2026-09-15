import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Star,
  Trophy,
  RotateCcw,
  BookOpen,
  Home,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Mascot from '../components/common/Mascot';
import { useAudio } from '../context/AudioContext';
import { useUser } from '../context/UserContext';

export default function QuizResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playClick, playFanfare } = useAudio();
  const { user } = useUser();

  const state = location.state || {};
  const record = state.record || {
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    starsEarned: 3,
    subjectId: 'math',
    classLevel: '1',
  };
  const answersHistory = state.answersHistory || [];
  const subjectMeta = state.subjectMeta || { name: 'Quiz', accentBg: 'bg-brand-50' };

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // quiet
    }
  }, []);

  const scorePct = record.percentage;
  const stars = record.starsEarned || (scorePct >= 80 ? 3 : scorePct >= 50 ? 2 : 1);

  let congratTitle = "Outstanding Achievement! ⭐";
  let congratSub = `You are a true ${subjectMeta.name} Superstar!`;

  if (scorePct >= 80) {
    congratTitle = `Brilliant Job! You're a ${subjectMeta.name} Star! ⭐`;
    congratSub = "You demonstrated fantastic understanding and focus.";
  } else if (scorePct >= 50) {
    congratTitle = "Great Effort! Growing Smarter Every Day! 🚀";
    congratSub = "You're making steady progress. Review the clues below!";
  } else {
    congratTitle = "Good Practice! Every Mistake Helps You Grow 🌱";
    congratSub = "Keep practicing and try again to collect all 3 stars!";
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Top Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-4xl border-2 border-slate-200/80 shadow-card p-6 sm:p-10 text-center relative overflow-hidden mb-10"
        >
          {/* Mascot in celebratory pose */}
          <div className="flex justify-center mb-4">
            <Mascot pose="celebrating" size="lg" />
          </div>

          {/* 3 Stars Trophy Display */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {[1, 2, 3].map((starNum) => {
              const isEarned = starNum <= stars;
              return (
                <motion.div
                  key={starNum}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + starNum * 0.15, type: 'spring' }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center border-2 shadow-sm ${
                    isEarned
                      ? 'bg-amber-50 border-amber-300 text-amber-500'
                      : 'bg-slate-50 border-slate-200 text-slate-300'
                  }`}
                >
                  <Star className={`w-8 h-8 sm:w-10 sm:h-10 ${isEarned ? 'fill-amber-400' : ''}`} />
                </motion.div>
              );
            })}
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 mb-2">
            {congratTitle}
          </h1>

          <p className="text-xs sm:text-base text-slate-600 max-w-md mx-auto mb-8">
            {congratSub}
          </p>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Score
              </p>
              <p className="text-xl sm:text-3xl font-display font-extrabold text-slate-900">
                {record.score} / {record.totalQuestions}
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Accuracy
              </p>
              <p className="text-xl sm:text-3xl font-display font-extrabold text-brand-600">
                {scorePct}%
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Stars Added
              </p>
              <p className="text-xl sm:text-3xl font-display font-extrabold text-amber-500">
                +{stars} ⭐
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/quiz/${record.subjectId}/play?class=${record.classLevel}`}
              onClick={playClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-display font-bold text-sm shadow-button transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </Link>

            <Link
              to="/subjects"
              onClick={playClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Choose Another Subject</span>
            </Link>

            <Link
              to="/dashboard"
              onClick={playClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </motion.div>

        {/* Detailed Question Review & Simple Explanations */}
        <div className="bg-white rounded-4xl border border-slate-200 shadow-soft p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">
                Question Review & Explanations
              </h2>
              <p className="text-xs text-slate-400">
                Review your answers to see what you mastered and learn from clues
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              {record.totalQuestions} Questions
            </span>
          </div>

          {answersHistory.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">
              Detailed review will display here when completing questions in order.
            </p>
          ) : (
            <div className="space-y-4">
              {answersHistory.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 sm:p-5 rounded-3xl border-2 transition-all ${
                    item.isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200/80'
                      : 'bg-amber-50/40 border-amber-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-2.5">
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="font-display font-bold text-sm sm:text-base text-slate-900">
                        {index + 1}. {item.question}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                        item.isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.isCorrect ? 'Correct' : 'Needs Practice'}
                    </span>
                  </div>

                  {/* Answers Comparison */}
                  <div className="ml-7 text-xs space-y-1 my-2">
                    <p className="text-slate-600">
                      Your answer:{' '}
                      <span className={`font-bold ${item.isCorrect ? 'text-emerald-700' : 'text-amber-800'}`}>
                        {item.selectedAnswer}
                      </span>
                    </p>
                    {!item.isCorrect && (
                      <p className="text-emerald-700 font-bold">
                        Correct answer: {item.correctAnswer}
                      </p>
                    )}
                  </div>

                  {/* Explanation text */}
                  <div className="ml-7 mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-500 leading-relaxed">
                    <strong>Why:</strong> {item.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
