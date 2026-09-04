'use client';

import { motion } from 'framer-motion';

export default function IrisExpand({ scrollProgress }: { scrollProgress: number }) {
  const scale = 0.4 + scrollProgress * 2.8;
  const pupilScale = 0.3 + scrollProgress * 0.4;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        viewBox="-1.1 -1.1 2.2 2.2"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', scale, originX: '50%', originY: '50%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer limbal ring */}
        <circle cx="0" cy="0" r="1.05" fill="#0d0800" />

        {/* Iris base */}
        <circle cx="0" cy="0" r="0.95" fill="#6B4E10" />

        {/* Iris texture rings */}
        <circle cx="0" cy="0" r="0.78" fill="none" stroke="#8B6914" strokeWidth="0.14" strokeOpacity="0.6" />
        <circle cx="0" cy="0" r="0.62" fill="none" stroke="#C9A84C" strokeWidth="0.10" strokeOpacity="0.5" />
        <circle cx="0" cy="0" r="0.46" fill="none" stroke="#7A5A12" strokeWidth="0.09" strokeOpacity="0.6" />

        {/* Radial fiber lines */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i / 36) * Math.PI * 2;
          const x1 = Math.cos(angle) * 0.30;
          const y1 = Math.sin(angle) * 0.30;
          const x2 = Math.cos(angle) * 0.90;
          const y2 = Math.sin(angle) * 0.90;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#C9A84C"
              strokeWidth="0.012"
              strokeOpacity={i % 3 === 0 ? 0.35 : 0.15}
            />
          );
        })}

        {/* Pupil */}
        <motion.circle
          cx="0" cy="0" r="0.28"
          fill="#000000"
          style={{ scale: pupilScale, originX: '50%', originY: '50%' }}
        />

        {/* Cornea glare */}
        <motion.circle
          cx="0.18" cy="-0.22" r="0.09"
          fill="white"
          animate={{ opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="-0.12" cy="0.18" r="0.04" fill="white" fillOpacity="0.3" />
      </motion.svg>
    </div>
  );
}
