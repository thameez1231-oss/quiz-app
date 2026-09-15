import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight, CheckCircle2, Star, Users } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroIllustration from '../components/landing/HeroIllustration';
import HowItWorks from '../components/landing/HowItWorks';
import SubjectCards from '../components/landing/SubjectCards';
import Mascot from '../components/common/Mascot';
import { useAudio } from '../context/AudioContext';
import { useUser } from '../context/UserContext';

export default function LandingPage() {
  const { playClick } = useAudio();
  const { continueAsGuest } = useUser();
  const navigate = useNavigate();

  const handleQuickGuest = () => {
    playClick();
    continueAsGuest('1', 'lion');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          {/* Subtle geometric gradient background blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-100/50 blur-3xl" />
            <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-math-100/50 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Value Proposition & CTAs */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                {/* Trust Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-bold text-slate-700">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span>Trusted by Parents & Schools for Classes 1–5</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 leading-[1.12] tracking-tight">
                  Where Learning Feels Like{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-math-600">
                    Play
                  </span>
                  , and Curiosity Thrives.
                </h1>

                {/* Subheadline */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  QuizKids is a warm, ad-free EdTech quiz app for young minds aged 6 to 11. Built with research-backed positive reinforcement, encouraging hints, and curriculum-aligned questions.
                </p>

                {/* Feature Bullet Points */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-semibold text-slate-700 pt-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    4 Core Subjects
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Classes 1 to 5
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    100% Ad-Free & Safe
                  </span>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
                  <Link
                    to="/login"
                    onClick={playClick}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-display font-bold text-base shadow-button hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={handleQuickGuest}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-base shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-brand-500" />
                    <span>Instant Guest Play</span>
                  </button>
                </div>

                {/* Micro reassurance */}
                <p className="text-[11px] text-slate-400 font-medium">
                  No credit card or download needed • Play right in your web browser
                </p>
              </div>

              {/* Right Column: Hero Vector Illustration */}
              <div className="lg:col-span-6 flex justify-center">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* 3-STEP HOW IT WORKS */}
        <HowItWorks />

        {/* 4 CORE SUBJECTS SHOWCASE */}
        <SubjectCards />

        {/* WHY QUIZKIDS / PEDAGOGICAL PILLARS */}
        <section className="py-20 bg-white border-b border-slate-100 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Pedagogical Standards
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Designed with Care for Developing Minds
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-500 leading-relaxed">
                We combine educational science with warm, kid-friendly interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  Zero Ads, Total Safety
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No popups, external tracking, or third-party advertisements. A serene, protected learning space parents can trust.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  Gentle Encouragement
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mistakes are reframed as stepping stones. No scary red buzzers — only gentle wobbles, friendly hints, and explanations.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
                <div className="w-12 h-12 rounded-2xl bg-math-100 text-math-700 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  Class 1 to 5 Scaled
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Content naturally scales in vocabulary, logic complexity, and reading comprehension from age 6 to age 11.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
                <div className="w-12 h-12 rounded-2xl bg-sunny-100 text-amber-700 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                  Parent Progress Portal
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Review quiz accuracy, identify subjects that need extra practice, and celebrate milestones together.
                </p>
              </div>
            </div>

            {/* Testimonials sample section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "My 7-year-old daughter actually asks to do her math quiz after school! The star rewards keep her so motivated.",
                  author: "Sarah M.",
                  role: "Parent of Class 2 Student",
                  rating: 5,
                },
                {
                  quote: "The interface is so clean and respectful of children's attention spans. No flashing ads or noisy distractions.",
                  author: "David K.",
                  role: "Elementary School Teacher",
                  rating: 5,
                },
                {
                  quote: "The science questions are spot on for Class 4. It helps my son revise his school lessons while having fun.",
                  author: "Priya R.",
                  role: "Parent of Class 4 Student",
                  rating: 5,
                },
              ].map((t, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    {/* Placeholder for reviewer avatar/photo */}
                    <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xs">
                      {/* TODO: replace with real photo */}
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">{t.author}</p>
                      <p className="text-[10px] text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <section className="py-16 bg-brand-600 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-brand-700/50 p-8 sm:p-12 rounded-4xl border border-brand-500/50 backdrop-blur-xs">
              <div className="space-y-3 text-center md:text-left max-w-xl">
                <h3 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                  Ready to Jump into QuizKids?
                </h3>
                <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
                  Join thousands of children mastering Math, English, Science, and General Knowledge one fun question at a time.
                </p>
                <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                  <Link
                    to="/login"
                    onClick={playClick}
                    className="px-6 py-3.5 rounded-2xl bg-white hover:bg-brand-50 text-brand-700 font-display font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    Start Learning Today 🚀
                  </Link>
                  <button
                    onClick={handleQuickGuest}
                    className="px-6 py-3.5 rounded-2xl bg-brand-800/80 hover:bg-brand-900 text-white font-bold text-sm border border-brand-500/60 transition-all hover:scale-105 active:scale-95"
                  >
                    Try Without Account
                  </button>
                </div>
              </div>

              {/* Mascot Kip greeting */}
              <div className="flex-shrink-0">
                <Mascot pose="welcome" size="lg" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
