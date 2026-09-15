import React from 'react';
import { motion } from 'framer-motion';

export default function HeroIllustration({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative w-full max-w-xl mx-auto select-none ${className}`}
    >
      <svg
        viewBox="0 0 540 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          <linearGradient id="heroBgGrad" x1="0" y1="0" x2="540" y2="440" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EEF2FF" stopOpacity="0.8" />
            <stop offset="1" stopColor="#E0E7FF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="rocketGrad" x1="0" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="deskGrad" x1="120" y1="280" x2="420" y2="380" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F8FAFC" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="yellowAccent" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#4F46E5" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ambient Backdrop Blob */}
        <path
          d="M70 140C30 220 50 340 160 380C270 420 440 400 480 300C520 200 450 80 350 50C250 20 110 60 70 140Z"
          fill="url(#heroBgGrad)"
        />

        {/* Soft Orbit Ring */}
        <ellipse cx="270" cy="240" rx="210" ry="90" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="6 8" />

        {/* Orbiting Subject Badges */}
        {/* Math Planet */}
        <g transform="translate(70, 190)">
          <circle cx="26" cy="26" r="26" fill="#E0F2FE" />
          <circle cx="26" cy="26" r="21" fill="#0284C7" />
          <text x="26" y="32" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Fredoka, sans-serif">1+2</text>
        </g>

        {/* Science Atom Planet */}
        <g transform="translate(420, 170)">
          <circle cx="26" cy="26" r="26" fill="#EDE9FE" />
          <circle cx="26" cy="26" r="21" fill="#7C3AED" />
          {/* Miniature orbit */}
          <ellipse cx="26" cy="26" rx="14" ry="5" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(30 26 26)" />
          <ellipse cx="26" cy="26" rx="14" ry="5" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(-30 26 26)" />
          <circle cx="26" cy="26" r="3.5" fill="#FDE047" />
        </g>

        {/* English ABC Star */}
        <g transform="translate(370, 70)">
          <circle cx="22" cy="22" r="22" fill="#ECFDF5" />
          <circle cx="22" cy="22" r="18" fill="#059669" />
          <text x="22" y="27" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Fredoka, sans-serif">ABC</text>
        </g>

        {/* GK Globe */}
        <g transform="translate(130, 80)">
          <circle cx="22" cy="22" r="22" fill="#FFEDD5" />
          <circle cx="22" cy="22" r="18" fill="#EA580C" />
          <circle cx="22" cy="22" r="14" fill="#FED7AA" />
          <path d="M12 22C14 16 28 16 32 22C28 28 14 28 12 22Z" fill="#EA580C" opacity="0.6" />
        </g>

        {/* Main Base Platform / Tablet Table */}
        <rect x="130" y="280" width="280" height="24" rx="12" fill="url(#deskGrad)" />
        <rect x="140" y="304" width="16" height="48" rx="8" fill="#CBD5E1" />
        <rect x="384" y="304" width="16" height="48" rx="8" fill="#CBD5E1" />

        {/* Interactive Learning Tablet on Stand */}
        <g filter="url(#softShadow)">
          <rect x="195" y="160" width="150" height="130" rx="16" fill="#1E1B4B" />
          {/* Screen Inner */}
          <rect x="203" y="168" width="134" height="114" rx="10" fill="#FFFFFF" />
          
          {/* Quiz Screen Interface Preview */}
          <rect x="213" y="178" width="60" height="8" rx="4" fill="#6366F1" />
          <rect x="285" y="178" width="42" height="8" rx="4" fill="#FEF08A" />
          
          {/* Question Text bar */}
          <rect x="213" y="194" width="114" height="14" rx="4" fill="#F1F5F9" />

          {/* Answer Option Buttons */}
          <rect x="213" y="216" width="53" height="24" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="223" cy="228" r="4" fill="#10B981" />
          <path d="M221 228L223 230L226 226" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          
          <rect x="274" y="216" width="53" height="24" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="284" cy="228" r="4" fill="#E2E8F0" />
          
          <rect x="213" y="246" width="53" height="24" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="274" y="246" width="53" height="24" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
        </g>

        {/* Cheerful Girl Student (Left) */}
        <g transform="translate(90, 180)">
          {/* Body */}
          <path d="M50 85C50 72 65 68 75 68C85 68 100 72 100 85L105 130H45L50 85Z" fill="#F43F5E" />
          {/* Collar */}
          <path d="M68 68C72 74 78 74 82 68" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Head & Neck */}
          <rect x="71" y="55" width="8" height="14" rx="4" fill="#FCD34D" />
          <circle cx="75" cy="42" r="20" fill="#FDE68A" />
          {/* Hair (Pig tails) */}
          <circle cx="52" cy="38" r="10" fill="#7C2D12" />
          <circle cx="98" cy="38" r="10" fill="#7C2D12" />
          <path d="M56 40C56 26 64 22 75 22C86 22 94 26 94 40C88 34 82 34 75 35C68 34 62 34 56 40Z" fill="#7C2D12" />
          {/* Face */}
          <circle cx="69" cy="42" r="2.5" fill="#1F2937" />
          <circle cx="81" cy="42" r="2.5" fill="#1F2937" />
          <path d="M72 48C73.5 50 76.5 50 78 48" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          {/* Hand pointing to tablet */}
          <path d="M96 85C108 85 116 80 125 75" stroke="#FDE68A" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* Cheerful Boy Student (Right) */}
        <g transform="translate(340, 185)">
          {/* Body */}
          <path d="M40 80C40 68 55 64 65 64C75 64 90 68 90 80L94 125H36L40 80Z" fill="#3B82F6" />
          {/* Collar */}
          <polygon points="58,64 65,72 72,64" fill="#FFFFFF" />
          {/* Head & Neck */}
          <rect x="61" y="52" width="8" height="14" rx="4" fill="#FCD34D" />
          <circle cx="65" cy="40" r="19" fill="#FDE68A" />
          {/* Boy Hair */}
          <path d="M46 36C46 22 55 18 65 18C75 18 84 22 84 36C80 32 75 32 65 33C55 32 50 32 46 36Z" fill="#451A03" />
          {/* Face */}
          <circle cx="59" cy="40" r="2.5" fill="#1F2937" />
          <circle cx="71" cy="40" r="2.5" fill="#1F2937" />
          <path d="M62 46C63.5 48 66.5 48 68 46" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          {/* Hand giving cheerful thumbs up */}
          <path d="M36 80C26 78 20 74 14 68" stroke="#FDE68A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="12" cy="66" r="4.5" fill="#FDE68A" />
        </g>

        {/* Mascot Kip peeking over the tablet top */}
        <g transform="translate(245, 115) scale(0.42)">
          <circle cx="60" cy="65" r="40" fill="#6366F1" />
          <circle cx="45" cy="46" r="14" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="3" />
          <circle cx="75" cy="46" r="14" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="3" />
          <circle cx="46" cy="46" r="6" fill="#1E1B4B" />
          <circle cx="74" cy="46" r="6" fill="#1E1B4B" />
          <polygon points="55,54 65,54 60,63" fill="#F59E0B" />
        </g>

        {/* Ascending Rocket (EdTech Progress metaphor) */}
        <g transform="translate(245, 20) scale(0.65)">
          {/* Rocket Body */}
          <path d="M30 0C15 20 15 65 15 80H45C45 65 45 20 30 0Z" fill="url(#rocketGrad)" />
          {/* Cockpit Window */}
          <circle cx="30" cy="35" r="8" fill="#FFFFFF" />
          <circle cx="30" cy="35" r="5" fill="#38BDF8" />
          {/* Fins */}
          <polygon points="15,60 0,80 15,80" fill="#EF4444" />
          <polygon points="45,60 60,80 45,80" fill="#EF4444" />
          {/* Flame */}
          <path d="M22 80C22 95 30 110 30 110C30 110 38 95 38 80H22Z" fill="url(#yellowAccent)" />
        </g>

        {/* Golden floating celebration stars & sparks */}
        <g transform="translate(180, 50)">
          <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9" fill="#FBBF24" />
        </g>
        <g transform="translate(330, 45)">
          <polygon points="10,0 12,7 20,10 12,13 10,20 8,13 0,10 8,7" fill="#FBBF24" />
        </g>
        <circle cx="210" cy="95" r="3" fill="#38BDF8" />
        <circle cx="330" cy="115" r="3.5" fill="#34D399" />
        <circle cx="160" cy="270" r="2.5" fill="#F472B6" />
        <circle cx="390" cy="265" r="3" fill="#FBBF24" />
      </svg>
    </motion.div>
  );
}
