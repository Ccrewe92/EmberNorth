'use client'

import { motion } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1] as const

// E letter strokes
const E_VERT = 'M 12 90 L 12 150'
const E_TOP  = 'M 12 90 L 43 90'
const E_MID  = 'M 12 120 L 37 120'
const E_BOT  = 'M 12 150 L 43 150'

// N letter strokes
const N_LEFT  = 'M 60 90 L 60 150'
const N_DIAG  = 'M 60 90 L 94 150'
const N_RIGHT = 'M 94 90 L 94 150'

// Embers rise from the letters after drawing completes
const DOTS = [
  { id: 0, cx: 20, r: 1.5, fill: '#E8511A', delay: 0.2, dx: -6,  rise: 50, dur: 1.8, rd: 0.7 },
  { id: 1, cx: 28, r: 1.9, fill: '#FFB347', delay: 0.7, dx:  4,  rise: 42, dur: 1.5, rd: 1.1 },
  { id: 2, cx: 37, r: 1.3, fill: '#E8511A', delay: 1.1, dx: -3,  rise: 60, dur: 2.0, rd: 0.9 },
  { id: 3, cx: 62, r: 1.7, fill: '#FFB347', delay: 0.4, dx:  5,  rise: 55, dur: 1.7, rd: 0.6 },
  { id: 4, cx: 75, r: 2.1, fill: '#E8511A', delay: 0.9, dx: -7,  rise: 48, dur: 1.6, rd: 1.3 },
  { id: 5, cx: 88, r: 1.4, fill: '#FFB347', delay: 1.4, dx:  6,  rise: 44, dur: 1.9, rd: 0.8 },
  { id: 6, cx: 50, r: 1.6, fill: '#E8511A', delay: 0.6, dx: -4,  rise: 52, dur: 1.4, rd: 1.0 },
] as const

// Animation schedule:
// 0.00–0.24s  E vertical bar
// 0.24–0.41s  E top + bottom arms (simultaneous)
// 0.41–0.55s  E middle arm
// 0.55–0.79s  N left bar
// 0.79–0.98s  N diagonal (longest path)
// 0.98–1.15s  N right bar   ← done ~1.15s
// 1.15s+      embers
// 1.80s+      breathing (1.0 → 1.02, 3s loop)

function flameStroke(d: string, delay: number, dur: number) {
  return {
    d,
    stroke: 'url(#flameGrad)',
    strokeWidth: 8,
    strokeLinecap: 'round' as const,
    fill: 'none',
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration: dur,  delay, ease: EXPO },
      opacity:    { duration: 0.06, delay },
    },
  }
}

export default function ENMark() {
  return (
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
      style={{ originX: '50%', originY: '95%' }}
    >
      <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full">
        <defs>
          {/* Flame gradient: hot amber core → burnt orange → deep ember */}
          <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFD580" />
            <stop offset="40%"  stopColor="#FF7A2F" />
            <stop offset="100%" stopColor="#C0390A" />
          </linearGradient>
        </defs>

        {/* ── E ── */}
        <motion.path {...flameStroke(E_VERT, 0.00, 0.24)} />
        <motion.path {...flameStroke(E_TOP,  0.24, 0.17)} />
        <motion.path {...flameStroke(E_BOT,  0.24, 0.17)} />
        <motion.path {...flameStroke(E_MID,  0.41, 0.14)} />

        {/* ── N ── */}
        <motion.path {...flameStroke(N_LEFT,  0.55, 0.24)} />
        <motion.path {...flameStroke(N_DIAG,  0.79, 0.19)} />
        <motion.path {...flameStroke(N_RIGHT, 0.98, 0.17)} />

        {/* ── Embers rise from the letter strokes ── */}
        {DOTS.map((dot) => (
          <motion.circle
            key={dot.id}
            cx={dot.cx} cy={150} r={dot.r} fill={dot.fill}
            initial={{ opacity: 0 }}
            animate={{ y: [0, -dot.rise], x: [0, dot.dx], opacity: [0, 0.85, 0] }}
            transition={{
              duration: dot.dur,
              delay: 1.15 + dot.delay,
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
