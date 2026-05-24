'use client'

import { motion } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1] as const

// Flame paths — viewBox 0 0 100 160
// Outer: widest silhouette, burnt orange
const OUTER =
  'M 50 152 C 64 144,82 122,80 98 C 78 76,66 60,70 40 C 73 24,62 10,50 7 C 38 10,27 24,30 40 C 34 60,22 76,20 98 C 18 122,36 144,50 152 Z'

// Inner: mid-layer flame shape, amber
const INNER =
  'M 50 138 C 60 128,70 112,68 92 C 66 74,57 60,60 44 C 62 32,55 20,50 18 C 45 20,38 32,40 44 C 43 60,34 74,32 92 C 30 112,40 128,50 138 Z'

// Soul: narrow core, hottest layer, amber
const SOUL =
  'M 50 118 C 55 108,60 96,58 82 C 56 70,54 62,50 54 C 46 62,44 70,42 82 C 40 96,45 108,50 118 Z'

// Deterministic ember particles — no Math.random() in render
const DOTS = [
  { id: 0, cx: 34, r: 1.6, fill: '#E8511A', delay: 0.3, dx: -8,  rise: 60, dur: 1.8, rd: 0.6 },
  { id: 1, cx: 42, r: 2.0, fill: '#FFB347', delay: 0.8, dx:  5,  rise: 48, dur: 1.5, rd: 1.0 },
  { id: 2, cx: 50, r: 2.4, fill: '#E8511A', delay: 0.2, dx: -3,  rise: 70, dur: 2.0, rd: 0.8 },
  { id: 3, cx: 56, r: 1.8, fill: '#FFB347', delay: 1.3, dx:  9,  rise: 54, dur: 1.7, rd: 1.3 },
  { id: 4, cx: 66, r: 1.4, fill: '#E8511A', delay: 0.6, dx: -6,  rise: 42, dur: 1.4, rd: 0.9 },
  { id: 5, cx: 38, r: 2.2, fill: '#FFB347', delay: 1.1, dx:  6,  rise: 58, dur: 1.9, rd: 1.2 },
  { id: 6, cx: 60, r: 1.5, fill: '#E8511A', delay: 1.6, dx: -10, rise: 50, dur: 1.6, rd: 1.5 },
  { id: 7, cx: 45, r: 1.9, fill: '#FFB347', delay: 0.5, dx:  7,  rise: 64, dur: 2.1, rd: 0.7 },
] as const

export default function ENMark() {
  return (
    // Breathing starts after draw (1.5s) + 0.3s buffer
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
      style={{ originX: 0.5, originY: 0.95 }}
    >
      <svg
        viewBox="0 0 100 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
        {/* Outer flame — draws first, burnt orange */}
        <motion.path
          d={OUTER}
          stroke="#E8511A"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.13 }}
          transition={{
            pathLength: { duration: 1.5, ease: EXPO },
            opacity: { duration: 0.4 },
          }}
        />

        {/* Inner flame — 0.2s delayed, amber */}
        <motion.path
          d={INNER}
          stroke="#FFB347"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.17 }}
          transition={{
            pathLength: { duration: 1.2, delay: 0.2, ease: EXPO },
            opacity: { duration: 0.35, delay: 0.2 },
          }}
        />

        {/* Soul — innermost core, draws last, amber */}
        <motion.path
          d={SOUL}
          stroke="#FFB347"
          strokeWidth={0.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.13 }}
          transition={{
            pathLength: { duration: 0.9, delay: 0.45, ease: EXPO },
            opacity: { duration: 0.3, delay: 0.45 },
          }}
        />

        {/* Ember particles — float up from flame base after draw completes */}
        {DOTS.map((dot) => (
          <motion.circle
            key={dot.id}
            cx={dot.cx}
            cy={152}
            r={dot.r}
            fill={dot.fill}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -dot.rise],
              x: [0, dot.dx],
              opacity: [0, 0.75, 0],
            }}
            transition={{
              duration: dot.dur,
              delay: 1.5 + dot.delay,
              repeat: Infinity,
              repeatDelay: dot.rd,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}
