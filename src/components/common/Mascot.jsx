import React from 'react';
import { motion } from 'framer-motion';

export default function Mascot({ pose = 'welcome', size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 180 }}
      className={`relative inline-block select-none ${currentSize} ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="kipBody" x1="20" y1="20" x2="100" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="kipBelly" x1="40" y1="60" x2="80" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EEF2FF" />
            <stop offset="1" stopColor="#C7D2FE" />
          </linearGradient>
          <linearGradient id="kipBeak" x1="55" y1="52" x2="65" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="wandGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="1" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        {/* Ear Tufts */}
        <path d="M32 30L44 14L48 34Z" fill="#4338CA" />
        <path d="M88 30L76 14L72 34Z" fill="#4338CA" />
        <path d="M35 28L43 17L46 31Z" fill="#818CF8" />
        <path d="M85 28L77 17L74 31Z" fill="#818CF8" />

        {/* Owl Body */}
        <ellipse cx="60" cy="65" rx="38" ry="42" fill="url(#kipBody)" />

        {/* Cozy BackPack Straps */}
        <path d="M38 52C38 70 34 85 30 92" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M82 52C82 70 86 85 90 92" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />

        {/* Cream Belly */}
        <ellipse cx="60" cy="74" rx="24" ry="26" fill="url(#kipBelly)" />
        {/* Soft belly scalloped feather marks */}
        <path d="M52 68C55 71 65 71 68 68" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <path d="M48 76C53 80 67 80 72 76" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <path d="M54 84C57 87 63 87 66 84" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />

        {/* Feet */}
        <ellipse cx="48" cy="106" rx="7" ry="4" fill="#F59E0B" />
        <ellipse cx="72" cy="106" rx="7" ry="4" fill="#F59E0B" />

        {/* Eyes (Round & Curious) */}
        <circle cx="45" cy="46" r="14" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="2.5" />
        <circle cx="75" cy="46" r="14" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="2.5" />

        {/* Spectacles Bridge */}
        <path d="M56 46C58 43 62 43 64 46" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />

        {/* Eye Pupils based on Pose */}
        {pose === 'thinking' ? (
          <>
            <circle cx="48" cy="41" r="6" fill="#1E1B4B" />
            <circle cx="78" cy="41" r="6" fill="#1E1B4B" />
            <circle cx="50" cy="39" r="2" fill="#FFFFFF" />
            <circle cx="80" cy="39" r="2" fill="#FFFFFF" />
          </>
        ) : pose === 'celebrating' ? (
          <>
            {/* Happy squinting joyous eyes */}
            <path d="M38 48C41 40 49 40 52 48" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M68 48C71 40 79 40 82 48" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Standard cheerful wide pupils */}
            <circle cx="46" cy="46" r="6" fill="#1E1B4B" />
            <circle cx="74" cy="46" r="6" fill="#1E1B4B" />
            <circle cx="48" cy="43" r="2.5" fill="#FFFFFF" />
            <circle cx="76" cy="43" r="2.5" fill="#FFFFFF" />
          </>
        )}

        {/* Rosy Cheeks */}
        <ellipse cx="36" cy="56" rx="5" ry="3.5" fill="#F472B6" opacity="0.6" />
        <ellipse cx="84" cy="56" rx="5" ry="3.5" fill="#F472B6" opacity="0.6" />

        {/* Golden Triangle Beak */}
        <path d="M55 52L65 52L60 62Z" fill="url(#kipBeak)" />

        {/* Wings / Arms per Pose */}
        {pose === 'welcome' && (
          <>
            {/* Left wing waving */}
            <path d="M24 64C16 52 14 36 22 28C26 24 30 32 28 46" fill="#4F46E5" />
            {/* Right wing at side */}
            <path d="M96 64C102 72 100 86 92 92" fill="#4338CA" />
          </>
        )}

        {pose === 'thinking' && (
          <>
            {/* Wing raised to chin */}
            <path d="M24 64C18 72 18 86 28 92" fill="#4338CA" />
            <path d="M96 66C90 56 75 56 64 62" stroke="#4F46E5" strokeWidth="8" strokeLinecap="round" />
            {/* Thought sparkle */}
            <path d="M102 24L104 18L110 20L106 25L108 30L103 27L98 29L100 24Z" fill="#FBBF24" />
          </>
        )}

        {pose === 'celebrating' && (
          <>
            {/* Both wings raised happily */}
            <path d="M26 62C16 48 18 34 26 28C30 36 32 50 30 62" fill="#4F46E5" />
            <path d="M94 62C104 48 102 34 94 28C90 36 88 50 90 62" fill="#4F46E5" />
            {/* Holding Star Wand */}
            <line x1="26" y1="28" x2="16" y2="12" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
            <path
              d="M16 6L18.5 11.5L24 12L20 16L21 21.5L16 18.5L11 21.5L12 16L8 12L13.5 11.5L16 6Z"
              fill="url(#wandGrad)"
            />
          </>
        )}

        {pose === 'encouraging' && (
          <>
            {/* Left wing rests on hip */}
            <path d="M24 64C18 72 20 86 28 90" fill="#4338CA" />
            {/* Right wing gives thumbs up */}
            <path d="M96 64C104 60 106 50 98 44C94 40 88 48 88 56" fill="#4F46E5" />
            <circle cx="102" cy="46" r="3.5" fill="#F59E0B" />
          </>
        )}
      </svg>
    </motion.div>
  );
}
