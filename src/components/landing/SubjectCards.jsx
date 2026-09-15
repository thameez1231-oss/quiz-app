import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, Atom, Globe2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';

const subjects = [
  {
    id: 'math',
    name: 'Math',
    badge: 'Numbers & Logic',
    icon: Calculator,
    colorClass: 'math',
    themeBg: 'bg-math-50',
    border: 'border-math-200',
    iconColor: 'text-math-600',
    buttonColor: 'bg-math-600 hover:bg-math-700 text-white shadow-button-blue',
    tagline: 'Addition, multiplication, fractions, shapes, and everyday puzzles.',
    sampleTopic: 'Classes 1–5 • 50 Curated Challenges',
  },
  {
    id: 'english',
    name: 'English',
    badge: 'Words & Grammar',
    icon: BookOpen,
    colorClass: 'english',
    themeBg: 'bg-english-50',
    border: 'border-english-200',
    iconColor: 'text-english-600',
    buttonColor: 'bg-english-600 hover:bg-english-700 text-white shadow-button-green',
    tagline: 'Phonics, vocabulary, parts of speech, reading idioms, and spelling.',
    sampleTopic: 'Classes 1–5 • 50 Curated Challenges',
  },
  {
    id: 'science',
    name: 'Science',
    badge: 'Nature & Discovery',
    icon: Atom,
    colorClass: 'science',
    themeBg: 'bg-science-50',
    border: 'border-science-200',
    iconColor: 'text-science-600',
    buttonColor: 'bg-science-600 hover:bg-science-700 text-white shadow-button-purple',
    tagline: 'The 5 senses, states of matter, plant cycles, solar system, and human body.',
    sampleTopic: 'Classes 1–5 • 50 Curated Challenges',
  },
  {
    id: 'gk',
    name: 'General Knowledge',
    badge: 'World & Wonders',
    icon: Globe2,
    colorClass: 'gk',
    themeBg: 'bg-gk-50',
    border: 'border-gk-200',
    iconColor: 'text-gk-600',
    buttonColor: 'bg-gk-600 hover:bg-gk-700 text-white shadow-button-orange',
    tagline: 'Continents, oceans, world landmarks, great inventors, and animal facts.',
    sampleTopic: 'Classes 1–5 • 50 Curated Challenges',
  },
];

export default function SubjectCards() {
  const { playClick } = useAudio();

  return (
    <section id="subjects" className="py-20 bg-slate-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            Core Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Explore 4 Core Subjects
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-500 leading-relaxed">
            Carefully tiered from Class 1 through Class 5. Tap any subject to start exploring!
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((sub, index) => {
            const Icon = sub.icon;
            return (
              <motion.div
                key={sub.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`bg-white rounded-3xl p-6 border ${sub.border} shadow-soft hover:shadow-card-hover flex flex-col justify-between transition-all group`}
              >
                <div>
                  {/* Subject Icon + Badge Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${sub.themeBg} border ${sub.border} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className={`w-7 h-7 ${sub.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      {sub.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
                    {sub.name}
                  </h3>

                  <p className="text-xs font-semibold text-slate-400 mb-3">
                    {sub.sampleTopic}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {sub.tagline}
                  </p>
                </div>

                <Link
                  to={`/subjects?highlight=${sub.id}`}
                  onClick={playClick}
                  className={`w-full py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${sub.buttonColor}`}
                >
                  <span>Play {sub.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
