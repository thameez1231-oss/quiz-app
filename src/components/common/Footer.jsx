import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Award, GraduationCap } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-8 text-slate-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-slate-500 leading-relaxed">
              Joyful, curriculum-aligned quiz learning for young minds in Classes 1 to 5. Built with warmth, positive reinforcement, and pedagogical rigor.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>100% Ad-Free & Kid-Safe</span>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm tracking-wide uppercase mb-3">
              Subjects
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link to="/subjects" className="hover:text-math-600 transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-math-500"></span>
                  Math Adventures (Cl 1–5)
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-english-600 transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-english-500"></span>
                  English Language Arts
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-science-600 transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-science-500"></span>
                  Science & Nature Discovery
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-gk-600 transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gk-500"></span>
                  General Knowledge & World
                </Link>
              </li>
            </ul>
          </div>

          {/* Grade Levels */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm tracking-wide uppercase mb-3">
              Grade Levels
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'Class 1', ages: 'Ages 6–7' },
                { name: 'Class 2', ages: 'Ages 7–8' },
                { name: 'Class 3', ages: 'Ages 8–9' },
                { name: 'Class 4', ages: 'Ages 9–10' },
                { name: 'Class 5', ages: 'Ages 10–11' },
              ].map((lvl, i) => (
                <div
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:border-brand-300 transition-all"
                >
                  <span className="text-slate-900 font-bold">{lvl.name}</span>{' '}
                  <span className="text-[10px] text-slate-400">({lvl.ages})</span>
                </div>
              ))}
            </div>
          </div>

          {/* For Parents & Educators */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-sm tracking-wide uppercase mb-3">
              Parents & Teachers
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link to="/parent-portal" className="hover:text-brand-600 transition-colors flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                  Parent & Educator Dashboard
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Curriculum Aligned Standards</span>
              </li>
              <li>
                <span className="text-slate-400">Zero In-App Purchases</span>
              </li>
              <li>
                <span className="text-slate-400">WCAG 2.1 Accessibility Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} QuizKids Learning System. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted for curious learners with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
            <span>and joyful play</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
