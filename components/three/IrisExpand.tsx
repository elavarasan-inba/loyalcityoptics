'use client';

import { motion } from 'framer-motion';

export default function IrisExpand({ scrollProgress }: { scrollProgress: number }) {
  const outerRays = Array.from({ length: 48 });
  const innerRays = Array.from({ length: 24 });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="-1.2 -1.2 2.4 2.4"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Gold glow filter */}
          <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.06" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="iris-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Radial gradient for iris base */}
          <radialGradient id="irisGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#E8C96A" />
            <stop offset="40%" stopColor="#C9A84C" />
            <stop offset="75%" stopColor="#8B6014" />
            <stop offset="100%" stopColor="#4A3008" />
          </radialGradient>
          {/* Limbal ring gradient */}
          <radialGradient id="limbalGrad" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="#1a0e00" />
            <stop offset="100%" stopColor="#2d1a00" />
          </radialGradient>
        </defs>

        {/* Outer ambient glow */}
        <circle cx="0" cy="0" r="1.05" fill="rgba(201,168,76,0.08)" filter="url(#iris-glow)" />

        {/* Limbal ring */}
        <circle cx="0" cy="0" r="1.08" fill="url(#limbalGrad)" />

        {/* Outer counter-rotating ring of dashes */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '0px', originY: '0px' }}
        >
          {Array.from({ length: 32 }).map((_, i) => {
            const angle = (i / 32) * Math.PI * 2;
            const x = Math.cos(angle) * 1.0;
            const y = Math.sin(angle) * 1.0;
            return (
              <circle key={i} cx={x} cy={y} r="0.022"
                fill="#C9A84C" fillOpacity={i % 4 === 0 ? 0.9 : 0.4}
              />
            );
          })}
        </motion.g>

        {/* Iris base with radial gradient */}
        <circle cx="0" cy="0" r="0.96" fill="url(#irisGrad)" />

        {/* Inner texture rings */}
        <circle cx="0" cy="0" r="0.82" fill="none" stroke="#E8C96A" strokeWidth="0.018" strokeOpacity="0.5" />
        <circle cx="0" cy="0" r="0.68" fill="none" stroke="#C9A84C" strokeWidth="0.025" strokeOpacity="0.7" />
        <circle cx="0" cy="0" r="0.52" fill="none" stroke="#F0D070" strokeWidth="0.014" strokeOpacity="0.4" />
        <circle cx="0" cy="0" r="0.36" fill="none" stroke="#C9A84C" strokeWidth="0.018" strokeOpacity="0.6" />

        {/* Outer radial fibers — slow rotation */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '0px', originY: '0px' }}
        >
          {outerRays.map((_, i) => {
            const angle = (i / 48) * Math.PI * 2;
            const x1 = Math.cos(angle) * 0.34;
            const y1 = Math.sin(angle) * 0.34;
            const x2 = Math.cos(angle) * 0.93;
            const y2 = Math.sin(angle) * 0.93;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#E8C96A"
                strokeWidth={i % 6 === 0 ? '0.022' : '0.010'}
                strokeOpacity={i % 6 === 0 ? 0.65 : 0.28}
              />
            );
          })}
        </motion.g>

        {/* Inner radial fibers — counter rotation */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '0px', originY: '0px' }}
        >
          {innerRays.map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const x1 = Math.cos(angle) * 0.30;
            const y1 = Math.sin(angle) * 0.30;
            const x2 = Math.cos(angle) * 0.50;
            const y2 = Math.sin(angle) * 0.50;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#F0D070"
                strokeWidth="0.016"
                strokeOpacity={0.5}
              />
            );
          })}
        </motion.g>

        {/* Pupil */}
        <circle cx="0" cy="0" r="0.29" fill="#050200" />
        <circle cx="0" cy="0" r="0.27" fill="#000000" />

        {/* Primary cornea glare */}
        <motion.ellipse
          cx="0.12" cy="-0.16" rx="0.10" ry="0.07"
          fill="white" fillOpacity="0.85"
          filter="url(#gold-glow)"
          animate={{ opacity: [0.7, 0.95, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Secondary glare */}
        <circle cx="-0.09" cy="0.13" r="0.035" fill="white" fillOpacity="0.35" />
        {/* Tiny sparkle */}
        <circle cx="0.05" cy="-0.28" r="0.015" fill="white" fillOpacity="0.5" />
      </svg>
    </div>
  );
}
