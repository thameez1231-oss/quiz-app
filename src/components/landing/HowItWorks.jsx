import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';

const steps = [
  {
    step: '01',
    title: 'Choose Grade & Subject',
    description: 'Select your class level (Class 1 to 5) and pick from Math, English, Science, or General Knowledge.',
    icon: Compass,
    accent: 'bg-math-50 text-math-600 border-math-200',
    numberColor: 'text-math-500',
  },
  {
    step: '02',
    title: 'Play Interactive Quests',
    description: 'Bite-sized, 10-question challenges with instant, encouraging feedback, hints, and zero pressure.',
    icon: Sparkles,
    accent: 'bg-brand-50 text-brand-600 border-brand-200',
    numberColor: 'text-brand-500',
  },
  {
    step: '03',
    title: 'Earn Stars & Master Skills',
    description: 'Celebrate your achievements with star rewards, track learning streaks, and review easy explanations.',
    icon: Trophy,
    accent: 'bg-sunny-100 text-amber-700 border-amber-200',
    numberColor: 'text-amber-600',
  },
];

export default function HowItWorks() {
  const { playClick } = useAudio();

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Simple & Joyful
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            How QuizKids Powers Learning
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-500 leading-relaxed">
            Designed to build genuine confidence through small, delightful wins — just three simple steps to start.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-slate-300 hover:shadow-card transition-all group"
              >
                {/* Step Number */}
                <div className={`font-display font-black text-4xl mb-4 opacity-70 ${item.numberColor}`}>
                  {item.step}
                </div>

                {/* Icon Squircle */}
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.accent}`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="mt-14 text-center">
          <Link
            to="/login"
            onClick={playClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <span>Try a Quiz Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
