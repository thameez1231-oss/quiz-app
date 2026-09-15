import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, KeyRound, ArrowRight, Check, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Avatar, { AVATAR_LIST } from '../components/common/Avatars';
import Mascot from '../components/common/Mascot';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';

const CLASSES = [
  { id: '1', name: 'Class 1', ages: 'Ages 6–7', color: 'border-math-300 bg-math-50 text-math-800' },
  { id: '2', name: 'Class 2', ages: 'Ages 7–8', color: 'border-english-300 bg-english-50 text-english-800' },
  { id: '3', name: 'Class 3', ages: 'Ages 8–9', color: 'border-brand-300 bg-brand-50 text-brand-800' },
  { id: '4', name: 'Class 4', ages: 'Ages 9–10', color: 'border-science-300 bg-science-50 text-science-800' },
  { id: '5', name: 'Class 5', ages: 'Ages 10–11', color: 'border-gk-300 bg-gk-50 text-gk-800' },
];

export default function LoginPage() {
  const { login, continueAsGuest } = useUser();
  const { playClick, playCorrect } = useAudio();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('2');
  const [selectedAvatar, setSelectedAvatar] = useState('owl');
  const [pin, setPin] = useState('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();

    const student = login({
      name: name.trim() || 'Super Star',
      classLevel: selectedClass,
      avatar: selectedAvatar,
      pin: pin,
    });

    setStudentProfile(student);
    playCorrect();

    // Fire joyful confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // quiet fallback
    }

    setShowWelcomeModal(true);

    // Transition smoothly to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1800);
  };

  const handleGuestLogin = () => {
    playClick();
    const guest = continueAsGuest(selectedClass, selectedAvatar);
    setStudentProfile(guest);
    playCorrect();

    setShowWelcomeModal(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-4xl p-6 sm:p-10 border border-slate-200/80 shadow-card"
          >
            {/* Header with Mascot */}
            <div className="flex items-center gap-4 mb-8">
              <Mascot pose="welcome" size="sm" className="flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-full">
                  Student Sign-in
                </span>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
                  Welcome, Explorer!
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Enter your name & class to start earning quiz stars.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Student Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. What is your name?
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={24}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your first name (e.g. Maya, Leo, Sam)"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-base"
                  />
                </div>
              </div>

              {/* 2. Class Level Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  2. Select your class
                </label>
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                  {CLASSES.map((c) => {
                    const isSelected = selectedClass === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          playClick();
                          setSelectedClass(c.id);
                        }}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                          isSelected
                            ? 'border-brand-500 bg-brand-600 text-white shadow-button scale-105'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-display font-extrabold text-sm sm:text-base">
                          {c.name}
                        </span>
                        <span
                          className={`text-[9px] sm:text-[10px] font-semibold mt-0.5 ${
                            isSelected ? 'text-brand-100' : 'text-slate-400'
                          }`}
                        >
                          {c.ages}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Avatar Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  3. Pick your buddy avatar
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  {AVATAR_LIST.map((av) => (
                    <div
                      key={av.id}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => {
                        playClick();
                        setSelectedAvatar(av.id);
                      }}
                    >
                      <Avatar
                        id={av.id}
                        size="sm"
                        selected={selectedAvatar === av.id}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Simple PIN (Optional) */}
              <div>
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  <span>4. Secret PIN / Password (Optional)</span>
                  <span className="text-[10px] text-slate-400 font-normal">For saving your stars</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    maxLength={8}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter a 4-digit code (or leave blank)"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-display font-bold text-base shadow-button hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Let's Start Learning! 🚀</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-xs font-bold text-slate-400 uppercase">Or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-brand-600" />
                  <span>Continue as Guest (No Setup Needed)</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Cheerful Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-4xl p-8 max-w-sm w-full text-center border-2 border-brand-200 shadow-2xl relative overflow-hidden"
            >
              {/* Confetti decoration */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-brand-500 via-math-500 to-amber-400" />

              <div className="flex justify-center mb-4">
                <Mascot pose="celebrating" size="lg" />
              </div>

              <h3 className="text-2xl font-display font-bold text-slate-900 mb-1">
                Yay! Let's learn, {studentProfile?.name}! 🎉
              </h3>

              <p className="text-sm font-semibold text-brand-600 mb-4">
                Class {studentProfile?.classLevel} • Ready for adventure
              </p>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Launching your dashboard...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
