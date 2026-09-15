import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flame, Star, LogOut, Menu, X, Shield, Type, Eye, User, Sparkles } from 'lucide-react';
import Logo from './Logo';
import Avatar from './Avatars';
import SoundToggle from './SoundToggle';
import { useUser } from '../../context/UserContext';
import { useAudio } from '../../context/AudioContext';

export default function Navbar() {
  const { user, logout, streak, totalStars, accessibility, toggleLargeText, toggleHighContrast } = useUser();
  const { playClick } = useAudio();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessMenuOpen, setAccessMenuOpen] = useState(false);

  const handleLogout = () => {
    playClick();
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Logo size="md" to={user ? '/dashboard' : '/'} showTagline={false} />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={playClick}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive('/dashboard')
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/subjects"
                    onClick={playClick}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive('/subjects')
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Subjects
                  </Link>
                  <Link
                    to="/parent-portal"
                    onClick={playClick}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all ${
                      isActive('/parent-portal')
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-brand-500" />
                    <span>Parent Portal</span>
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="#how-it-works"
                    onClick={playClick}
                    className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                  >
                    How It Works
                  </a>
                  <a
                    href="#subjects"
                    onClick={playClick}
                    className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                  >
                    Subjects
                  </a>
                  <Link
                    to="/parent-portal"
                    onClick={playClick}
                    className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 transition-all"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>For Parents & Schools</span>
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Toggles */}
            <SoundToggle compact={true} />

            {/* Accessibility Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccessMenuOpen(!accessMenuOpen)}
                title="Accessibility & Display"
                aria-label="Accessibility options"
                className={`p-2 rounded-xl border transition-all ${
                  accessibility.largeText || accessibility.highContrast
                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                    : 'bg-slate-100/90 border-slate-200/80 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-4 h-4" />
              </button>

              {accessMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-card border border-slate-200/80 p-3 z-50">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                    Display & Accessibility
                  </div>
                  <button
                    onClick={() => {
                      playClick();
                      toggleLargeText();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left text-sm font-semibold text-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <Type className="w-4 h-4 text-brand-600" />
                      Larger Text Mode
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                        accessibility.largeText ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {accessibility.largeText ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      toggleHighContrast();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-left text-sm font-semibold text-slate-700 mt-1"
                  >
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-brand-600" />
                      High Contrast
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                        accessibility.highContrast ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {accessibility.highContrast ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Authenticated State Header Widgets */}
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Streak Counter */}
                <div
                  title={`${streak.count} day active learning streak!`}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-700 font-bold text-xs shadow-xs"
                >
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                  <span>{streak.count}d</span>
                </div>

                {/* Stars Counter */}
                <div
                  title={`${totalStars} total stars earned!`}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 font-bold text-xs shadow-xs"
                >
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>{totalStars}</span>
                </div>

                {/* Student Profile Pill */}
                <Link
                  to="/dashboard"
                  onClick={playClick}
                  className="flex items-center gap-2 p-1 pl-2.5 pr-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 transition-all"
                >
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[110px]">
                      {user.name}
                    </p>
                    <p className="text-[10px] font-semibold text-brand-600 mt-0.5">
                      Class {user.classLevel}
                    </p>
                  </div>
                  <Avatar id={user.avatar} size="xs" />
                </Link>

                {/* Log Out */}
                <button
                  onClick={handleLogout}
                  title="Sign out of student account"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Public / Logged Out CTA Buttons */
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={playClick}
                  className="px-3.5 py-2 rounded-xl text-sm font-bold text-brand-600 hover:bg-brand-50 transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/login"
                  onClick={playClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-button transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Free</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 px-2 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-brand-50/70 rounded-2xl mb-3">
                  <Avatar id={user.avatar} size="sm" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                    <p className="text-xs text-brand-600 font-semibold">Class {user.classLevel} • {user.isGuest ? 'Guest Mode' : 'Student Account'}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/subjects"
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                  All Subjects
                </Link>
                <Link
                  to="/parent-portal"
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                  Parent & Teacher Portal
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                  Home
                </Link>
                <Link
                  to="/parent-portal"
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                  Parent & Teacher Portal
                </Link>
                <Link
                  to="/login"
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-xl text-sm font-bold text-brand-600 bg-brand-50"
                >
                  Student Login / Guest Play
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
