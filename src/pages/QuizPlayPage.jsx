import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowRight,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import Mascot from '../components/common/Mascot';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import questionsData from '../data/questions.json';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizPlayPage() {
  const { subjectId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, saveQuizResult } = useUser();
  const { playClick, playCorrect, playIncorrect, playFanfare, sfxEnabled, setSfxEnabled } = useAudio();

  const classLevel = searchParams.get('class') || (user ? String(user.classLevel) : '1');
  const isTimed = searchParams.get('timed') === 'true';

  // Retrieve questions for this subject & class
  const questionsList = questionsData.questions[subjectId]?.[classLevel] || questionsData.questions.math['1'];
  const subjectMeta = questionsData.subjects.find((s) => s.id === subjectId) || questionsData.subjects[0];

  // Quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const currentQuestion = questionsList[currentIndex] || questionsList[0];
  const totalQuestions = questionsList.length;

  // Timer countdown if timed mode is enabled
  useEffect(() => {
    if (!isTimed || isAnswered) return;

    setTimeLeft(30);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered, isTimed]);

  const handleTimeExpired = () => {
    if (isAnswered) return;
    playIncorrect();
    setIsAnswered(true);
    setSelectedOption(-1); // -1 signifies timeout
    setAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        selectedAnswer: 'Time Expired',
        correctAnswer: currentQuestion.options[currentQuestion.correctIndex],
        isCorrect: false,
        explanation: currentQuestion.explanation,
      },
    ]);
  };

  const handleSelectOption = (optionIndex) => {
    if (isAnswered) return;

    playClick();
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      playCorrect();
      setScore((prev) => prev + 1);
      // Small celebratory burst
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.75 },
        });
      } catch {
        // quiet
      }
    } else {
      playIncorrect();
    }

    setAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        selectedAnswer: currentQuestion.options[optionIndex],
        correctAnswer: currentQuestion.options[currentQuestion.correctIndex],
        isCorrect: isCorrect,
        explanation: currentQuestion.explanation,
      },
    ]);
  };

  const handleNext = () => {
    playClick();
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    playFanfare();

    // Calculate stars: 80%+ = 3 stars, 50-70% = 2 stars, <50% = 1 star
    const finalScore = selectedOption === currentQuestion.correctIndex ? score : score;
    const pct = Math.round((finalScore / totalQuestions) * 100);
    const starsEarned = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;

    const missed = answersHistory.filter((a) => !a.isCorrect);

    const savedRecord = saveQuizResult({
      subjectId: subjectMeta.id,
      classLevel: classLevel,
      score: finalScore,
      totalQuestions: totalQuestions,
      percentage: pct,
      starsEarned: starsEarned,
      timedMode: isTimed,
      missedQuestions: missed,
    });

    navigate(`/quiz/${subjectMeta.id}/results`, {
      state: {
        record: savedRecord,
        answersHistory: answersHistory,
        subjectMeta: subjectMeta,
      },
    });
  };

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 transition-colors select-none">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Quit button */}
          <button
            onClick={() => {
              playClick();
              setShowExitModal(true);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            title="Quit Quiz"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Center Progress bar & counter */}
          <div className="flex-grow max-w-md">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                <span>{subjectMeta.name} • Class {classLevel}</span>
              </span>
              <span>
                Question {currentIndex + 1} of {totalQuestions}
              </span>
            </div>
            {/* Animated progress bar */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 rounded-full"
              />
            </div>
          </div>

          {/* Right controls: Timer & Sound */}
          <div className="flex items-center gap-2">
            {isTimed && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display font-extrabold text-xs border ${
                  timeLeft <= 5
                    ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}

            <button
              onClick={() => setSfxEnabled(!sfxEnabled)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              title={sfxEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            >
              {sfxEnabled ? <Volume2 className="w-4 h-4 text-brand-600" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Question Playground */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-8 w-full flex flex-col justify-center">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* Question Card */}
          <div className="bg-white rounded-4xl p-6 sm:p-10 border-2 border-slate-200 shadow-card relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Question #{currentIndex + 1}
              </span>

              {/* Hint Trigger Button */}
              <button
                onClick={() => {
                  playClick();
                  setShowHint(!showHint);
                }}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                  showHint
                    ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Lightbulb className={`w-3.5 h-3.5 ${showHint ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
                <span>{showHint ? 'Hide Clue' : 'Need a Clue?'}</span>
              </button>
            </div>

            {/* Hint Box (if revealed) */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{currentQuestion.hint}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* 4 Multiple Choice Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {currentQuestion.options.map((option, index) => {
              const letter = OPTION_LETTERS[index];
              const isSelected = selectedOption === index;
              const isCorrectAnswer = index === currentQuestion.correctIndex;

              let optionStyle = 'bg-white border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 text-slate-800 shadow-soft';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-extrabold shadow-md ring-2 ring-emerald-400';
                } else if (isSelected && !isCorrectAnswer) {
                  // Gentle encouraging warm style for mistakes (no red buzzer scare)
                  optionStyle = 'bg-amber-50/90 border-amber-300 text-amber-900 font-semibold animate-wiggle';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  className={`quiz-option p-4 sm:p-5 rounded-3xl border-2 text-left transition-all flex items-center gap-3.5 ${optionStyle}`}
                >
                  {/* Letter badge */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-display font-extrabold text-sm flex-shrink-0 ${
                      isAnswered && isCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && isSelected && !isCorrectAnswer
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isAnswered && isCorrectAnswer ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      letter
                    )}
                  </div>

                  {/* Option Text */}
                  <span className="text-base sm:text-lg font-bold flex-grow">
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation Drawer (Revealed after answering) */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className={`p-6 rounded-3xl border-2 ${
                  selectedOption === currentQuestion.correctIndex
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-white border-brand-200 text-slate-800 shadow-card'
                } flex flex-col sm:flex-row items-center justify-between gap-4`}
              >
                <div className="flex items-start gap-4">
                  <div className="hidden sm:block flex-shrink-0">
                    <Mascot
                      pose={selectedOption === currentQuestion.correctIndex ? 'celebrating' : 'welcome'}
                      size="sm"
                    />
                  </div>
                  <div>
                    <p className="font-display font-bold text-base mb-1">
                      {selectedOption === currentQuestion.correctIndex
                        ? '🌟 Super Star! Spot on!'
                        : '💡 Good try! Here is how it works:'}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-display font-bold text-base shadow-button hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>{currentIndex + 1 < totalQuestions ? 'Next Question' : 'See Results ⭐'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-4xl p-6 sm:p-8 max-w-sm w-full text-center border border-slate-200 shadow-2xl"
            >
              <div className="flex justify-center mb-3">
                <Mascot pose="thinking" size="sm" />
              </div>

              <h3 className="text-xl font-display font-bold text-slate-900 mb-1">
                Pause and Exit?
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                You can return to the dashboard anytime without losing your overall streak!
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
                >
                  Keep Playing
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all"
                >
                  Exit Quiz
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
