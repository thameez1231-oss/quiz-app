import React from 'react';

export const AVATAR_LIST = [
  { id: 'lion', name: 'Leo the Lion', color: '#F59E0B', bg: 'bg-amber-100' },
  { id: 'owl', name: 'Oliver the Owl', color: '#6366F1', bg: 'bg-indigo-100' },
  { id: 'fox', name: 'Felix the Fox', color: '#EA580C', bg: 'bg-orange-100' },
  { id: 'panda', name: 'Penny the Panda', color: '#10B981', bg: 'bg-emerald-100' },
  { id: 'bunny', name: 'Benny the Bunny', color: '#EC4899', bg: 'bg-pink-100' },
  { id: 'astronaut', name: 'Cosmo Astronaut', color: '#0EA5E9', bg: 'bg-sky-100' },
  { id: 'dino', name: 'Dizzy the Dino', color: '#84CC16', bg: 'bg-lime-100' },
  { id: 'dolphin', name: 'Pip the Dolphin', color: '#06B6D4', bg: 'bg-cyan-100' },
];

export default function Avatar({ id = 'owl', size = 'md', className = '', selected = false, onClick }) {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const renderAvatarSvg = () => {
    switch (id) {
      case 'lion':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            {/* Mane */}
            <circle cx="32" cy="32" r="28" fill="#F59E0B" />
            <circle cx="32" cy="32" r="23" fill="#D97706" />
            {/* Face */}
            <circle cx="32" cy="34" r="18" fill="#FDE68A" />
            {/* Ears */}
            <circle cx="18" cy="20" r="6" fill="#F59E0B" />
            <circle cx="18" cy="20" r="3.5" fill="#FDE68A" />
            <circle cx="46" cy="20" r="6" fill="#F59E0B" />
            <circle cx="46" cy="20" r="3.5" fill="#FDE68A" />
            {/* Eyes */}
            <circle cx="26" cy="32" r="3" fill="#1F2937" />
            <circle cx="38" cy="32" r="3" fill="#1F2937" />
            <circle cx="27" cy="31" r="1" fill="#FFFFFF" />
            <circle cx="39" cy="31" r="1" fill="#FFFFFF" />
            {/* Nose & Mouth */}
            <polygon points="29,38 35,38 32,42" fill="#78350F" />
            <path d="M29 43C30.5 45 33.5 45 35 43" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="22" cy="36" r="2" fill="#F87171" opacity="0.6" />
            <circle cx="42" cy="36" r="2" fill="#F87171" opacity="0.6" />
          </svg>
        );
      case 'fox':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#FFEDD5" />
            {/* Ears */}
            <polygon points="14,24 24,6 30,22" fill="#EA580C" />
            <polygon points="17,21 24,10 27,20" fill="#FFFFFF" />
            <polygon points="50,24 40,6 34,22" fill="#EA580C" />
            <polygon points="47,21 40,10 37,20" fill="#FFFFFF" />
            {/* Head */}
            <polygon points="12,28 52,28 32,56" fill="#F97316" />
            <polygon points="20,28 32,44 12,28" fill="#FFFFFF" />
            <polygon points="44,28 32,44 52,28" fill="#FFFFFF" />
            {/* Eyes */}
            <ellipse cx="23" cy="30" rx="3" ry="2" fill="#1F2937" />
            <ellipse cx="41" cy="30" rx="3" ry="2" fill="#1F2937" />
            {/* Nose */}
            <circle cx="32" cy="48" r="3" fill="#1F2937" />
          </svg>
        );
      case 'panda':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#ECFDF5" />
            {/* Ears */}
            <circle cx="16" cy="18" r="8" fill="#1F2937" />
            <circle cx="48" cy="18" r="8" fill="#1F2937" />
            {/* Face */}
            <circle cx="32" cy="35" r="22" fill="#FFFFFF" />
            {/* Eye Patches */}
            <ellipse cx="23" cy="33" rx="6" ry="7" fill="#1F2937" transform="rotate(-15 23 33)" />
            <ellipse cx="41" cy="33" rx="6" ry="7" fill="#1F2937" transform="rotate(15 41 33)" />
            {/* Eyes */}
            <circle cx="23" cy="33" r="2.5" fill="#FFFFFF" />
            <circle cx="41" cy="33" r="2.5" fill="#FFFFFF" />
            <circle cx="24" cy="33" r="1.5" fill="#1F2937" />
            <circle cx="42" cy="33" r="1.5" fill="#1F2937" />
            {/* Nose & Mouth */}
            <ellipse cx="32" cy="42" rx="3.5" ry="2" fill="#1F2937" />
            <path d="M29 46C31 48 33 48 35 46" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'bunny':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#FDF2F8" />
            {/* Long Ears */}
            <ellipse cx="22" cy="16" rx="5" ry="14" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1" />
            <ellipse cx="22" cy="16" rx="2.5" ry="9" fill="#FBCFE8" />
            <ellipse cx="42" cy="16" rx="5" ry="14" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1" />
            <ellipse cx="42" cy="16" rx="2.5" ry="9" fill="#FBCFE8" />
            {/* Head */}
            <circle cx="32" cy="38" r="20" fill="#FFFFFF" />
            {/* Eyes */}
            <circle cx="25" cy="35" r="3" fill="#1F2937" />
            <circle cx="39" cy="35" r="3" fill="#1F2937" />
            <circle cx="26" cy="34" r="1" fill="#FFFFFF" />
            <circle cx="40" cy="34" r="1" fill="#FFFFFF" />
            {/* Nose & Whiskers */}
            <polygon points="30,41 34,41 32,44" fill="#EC4899" />
            <path d="M16 38L24 40M16 42L24 42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M48 38L40 40M48 42L40 42" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="40" r="3" fill="#FBCFE8" />
            <circle cx="44" cy="40" r="3" fill="#FBCFE8" />
          </svg>
        );
      case 'astronaut':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#F0F9FF" />
            {/* Helmet Outer */}
            <circle cx="32" cy="32" r="22" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
            {/* Visor */}
            <rect x="18" y="20" width="28" height="20" rx="9" fill="#0284C7" />
            {/* Visor Glare Reflection */}
            <path d="M22 25C26 23 36 23 42 27" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="40" cy="26" r="2" fill="#BAE6FD" />
            {/* Side Earcups */}
            <rect x="8" y="26" width="4" height="12" rx="2" fill="#94A3B8" />
            <rect x="52" y="26" width="4" height="12" rx="2" fill="#94A3B8" />
          </svg>
        );
      case 'dino':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#F7FEE7" />
            {/* Spikes on Head */}
            <polygon points="26,14 30,6 34,14" fill="#65A30D" />
            <polygon points="36,16 40,8 44,16" fill="#65A30D" />
            <polygon points="16,18 20,10 24,18" fill="#65A30D" />
            {/* Dino Face */}
            <circle cx="32" cy="34" r="20" fill="#84CC16" />
            {/* Big Friendly Eyes */}
            <circle cx="24" cy="30" r="4" fill="#FFFFFF" />
            <circle cx="40" cy="30" r="4" fill="#FFFFFF" />
            <circle cx="25" cy="30" r="2.5" fill="#1F2937" />
            <circle cx="39" cy="30" r="2.5" fill="#1F2937" />
            {/* Nostrils & Smile */}
            <circle cx="28" cy="40" r="1.5" fill="#4D7C0F" />
            <circle cx="36" cy="40" r="1.5" fill="#4D7C0F" />
            <path d="M28 45C30 47 34 47 36 45" stroke="#4D7C0F" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'dolphin':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#ECFEFF" />
            {/* Dolphin Fin */}
            <path d="M30 18C33 10 40 12 40 18" fill="#0891B2" />
            {/* Head & Snout */}
            <ellipse cx="32" cy="34" rx="20" ry="18" fill="#06B6D4" />
            <path d="M44 32C52 34 54 40 46 44C42 45 36 44 32 44" fill="#0891B2" />
            {/* Belly */}
            <ellipse cx="30" cy="40" rx="14" ry="10" fill="#CFFAFE" />
            {/* Eye */}
            <circle cx="34" cy="30" r="3" fill="#FFFFFF" />
            <circle cx="35" cy="30" r="2" fill="#164E63" />
            <circle cx="36" cy="29" r="0.8" fill="#FFFFFF" />
            {/* Water blowhole spray */}
            <circle cx="24" cy="12" r="2" fill="#67E8F9" />
            <circle cx="22" cy="8" r="1.5" fill="#67E8F9" />
          </svg>
        );
      case 'owl':
      default:
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="28" fill="#EEF2FF" />
            {/* Ears */}
            <polygon points="16,22 22,10 26,20" fill="#4338CA" />
            <polygon points="48,22 42,10 38,20" fill="#4338CA" />
            {/* Head/Body */}
            <ellipse cx="32" cy="35" rx="20" ry="21" fill="#6366F1" />
            {/* Belly */}
            <ellipse cx="32" cy="42" rx="12" ry="13" fill="#E0E7FF" />
            {/* Big Eyes */}
            <circle cx="24" cy="29" r="7" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="1.5" />
            <circle cx="40" cy="29" r="7" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="1.5" />
            <circle cx="25" cy="29" r="3" fill="#1E1B4B" />
            <circle cx="39" cy="29" r="3" fill="#1E1B4B" />
            <circle cx="26" cy="28" r="1" fill="#FFFFFF" />
            <circle cx="40" cy="28" r="1" fill="#FFFFFF" />
            {/* Glasses Bridge */}
            <path d="M30 29H34" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
            {/* Beak */}
            <polygon points="29,34 35,34 32,39" fill="#F59E0B" />
          </svg>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-full transition-all duration-200 flex-shrink-0 flex items-center justify-center ${currentSize} ${className} ${
        selected ? 'ring-4 ring-brand-500 ring-offset-2 scale-105 shadow-md' : ''
      } ${onClick ? 'cursor-pointer hover:scale-110 active:scale-95' : ''}`}
    >
      {renderAvatarSvg()}
    </div>
  );
}
