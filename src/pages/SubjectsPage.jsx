import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, Atom, Globe2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Mascot from '../components/common/Mascot';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import questionsData from '../data/questions.json';

export default function SubjectsPage() {
  const { user } = useUser();
  const { playClick } = useAudio();
  const [searchParams] = useSearchParams();

  // Selected class level: defaults to student's class, or URL param, or Class 1
  const defaultClass = searchParams.get('class') || (user ? String(user.classLevel) : '1');
  const [selectedClass, setSelectedClass] = useState(defaultClass);

  const activeClassData = questionsData.classes.find((c) => c.id === selectedClass) || questionsData.classes[0];

  const subjectIcons = {
    math: Calculator,
    english: BookOpen,
    science: Atom,
    gk: Globe2,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Curriculum Explorer
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Choose Your Learning Adventure
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Pick your class and select any subject to dive into fun, interactive quizzes.
          </p>
        </div>

        {/* Grade / Class Filter Tabs */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-2 p-1.5 bg-white rounded-3xl border border-slate-200/80 shadow-soft">
            {questionsData.classes.map((cls) => {
              const isSelected = selectedClass === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => {
                    playClick();
                    setSelectedClass(cls.id);
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-2xl font-display font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-button scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{cls.name}</span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-brand-200' : 'text-slate-400'}`}>
                    ({cls.ageRange})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Class Description Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700 font-display font-black text-lg">
              {activeClassData.id}
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-slate-900">
                {activeClassData.name} Syllabus ({activeClassData.ageRange})
              </h2>
              <p className="text-xs text-slate-500">
                {activeClassData.description}
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            40 Total Challenges in this Grade
          </div>
        </div>

        {/* 4 Subjects Big Touch-Friendly Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {questionsData.subjects.map((sub) => {
            const Icon = subjectIcons[sub.id] || Calculator;
            const currentTopic = sub.topicsByClass[selectedClass];

            return (
              <motion.div
                key={sub.id}
                whileHover={{ y: -4 }}
                className={`bg-white rounded-4xl p-6 sm:p-8 border-2 ${sub.accentBorder} shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between`}
              >
                <div>
                  {/* Subject Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 rounded-3xl ${sub.accentBg} border ${sub.accentBorder} flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${sub.accentText}`} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{sub.badge}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${sub.accentBg} ${sub.accentText} border ${sub.accentBorder}`}>
                        10 Questions
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mb-2">
                    {sub.name}
                  </h3>

                  <div className="inline-block bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 mb-3">
                    Focus: <span className="text-brand-600">{currentTopic}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-8">
                    {sub.tagline}
                  </p>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Includes Hints & Explanations</span>
                  </div>

                  <Link
                    to={`/quiz/${sub.id}/overview?class=${selectedClass}`}
                    onClick={playClick}
                    className={`py-3.5 px-6 rounded-2xl font-display font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ${sub.accentBtn}`}
                  >
                    <span>Start Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
