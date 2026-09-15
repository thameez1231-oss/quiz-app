import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', to = '/', showTagline = false }) {
  const sizeClasses = {
    sm: {
      svg: 'w-7 h-7',
      text: 'text-xl',
      badge: 'text-[9px] px-1.5 py-0.5',
    },
    md: {
      svg: 'w-9 h-9',
      text: 'text-2xl',
      badge: 'text-[10px] px-2 py-0.5',
    },
    lg: {
      svg: 'w-12 h-12',
      text: 'text-3xl md:text-4xl',
      badge: 'text-xs px-2.5 py-1',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const content = (
    <div className="inline-flex items-center gap-2.5 group select-none">
      {/* Custom Vector Emblem: Rocket-Star Spark inside rounded squircle */}
      <div className={`${currentSize.svg} relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3`}>
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="starGrad" x1="12" y1="12" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="44" height="44" rx="13" fill="url(#logoGrad)" />
          {/* Subtle inner border */}
          <rect x="1.5" y="1.5" width="41" height="41" rx="11.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          {/* Glowing star spark mark */}
          <path
            d="M22 9L24.8 17.2L33 20L24.8 22.8L22 31L19.2 22.8L11 20L19.2 17.2L22 9Z"
            fill="url(#starGrad)"
          />
          {/* Playful mini dots */}
          <circle cx="32" cy="11" r="2.2" fill="#38BDF8" />
          <circle cx="12" cy="31" r="2" fill="#34D399" />
          <circle cx="31" cy="30" r="1.8" fill="#F472B6" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-bold tracking-tight text-slate-900 ${currentSize.text}`}>
            Quiz<span className="text-brand-600">Kids</span>
          </span>
          <span className={`font-bold bg-brand-50 text-brand-600 border border-brand-200/80 rounded-full uppercase tracking-wider ${currentSize.badge}`}>
            EdTech
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-semibold text-slate-400 tracking-wide mt-0.5">
            Classes 1 to 5 • Joyful Learning
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
