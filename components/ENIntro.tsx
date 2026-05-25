'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1] as const

// Ember particles — absolute within the letter container
// Rise upward during/after reveal; a few arc downward to seed the hero
const EMBERS = [
  // Rise during E reveal (0–1.2s)
  { id: 0,  l: '2%',  t: '25%', dx: -18, dy: -70, delay: 0.10, dur: 0.85, sz: 7,  col: '#FFB347' },
  { id: 1,  l: '20%', t: '8%',  dx:  12, dy: -60, delay: 0.30, dur: 0.90, sz: 5,  col: '#FF7A2F' },
  { id: 2,  l: '38%', t: '50%', dx:  -8, dy: -55, delay: 0.55, dur: 0.80, sz: 6,  col: '#FFD580' },
  // Rise during N reveal (0.6–1.8s)
  { id: 3,  l: '55%', t: '15%', dx: -14, dy: -65, delay: 0.68, dur: 0.85, sz: 7,  col: '#FFB347' },
  { id: 4,  l: '72%', t: '35%', dx:  16, dy: -58, delay: 0.92, dur: 0.90, sz: 5,  col: '#FF7A2F' },
  { id: 5,  l: '90%', t: '10%', dx:  -6, dy: -50, delay: 1.18, dur: 0.80, sz: 6,  col: '#FFD580' },
  // Post-reveal — arc downward to seed hero embers
  { id: 6,  l: '12%', t: '75%', dx: -24, dy: 140, delay: 1.50, dur: 1.10, sz: 10, col: '#E8511A' },
  { id: 7,  l: '45%', t: '60%', dx:  10, dy: 165, delay: 1.58, dur: 1.20, sz: 12, col: '#FF7A2F' },
  { id: 8,  l: '78%', t: '70%', dx:  28, dy: 150, delay: 1.66, dur: 1.05, sz: 9,  col: '#FFB347' },
  { id: 9,  l: '30%', t: '85%', dx: -16, dy: 130, delay: 1.74, dur: 1.15, sz: 8,  col: '#E8511A' },
] as const

// Timing:
// E blur-in: 0.0–0.6s resolve, bright 0.6–1.0s, fade 1.0–1.6s
// N blur-in: 0.6s later, same
// E burned:  0.75s | N burned: 1.35s
// Wordmark:  1.80s
// Exit:      3900ms

function Letter({
  char,
  delay,
  burnDelay,
}: {
  char: string
  delay: number
  burnDelay: number
}) {
  const base: React.CSSProperties = {
    fontSize: 'clamp(5rem, 17vw, 10.5rem)',
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: '-0.02em',
    userSelect: 'none',
  }

  return (
    <div className="relative">
      {/* Reveal layer — warm cream, emerges from glowing blur, then fades */}
      <motion.div
        className="font-display"
        style={{
          ...base,
          color: '#F5EDE0',
          // Three-layer glow: tight amber halo → wide orange → deep red bloom
          textShadow: [
            '0 0 28px rgba(255,160,60,0.55)',
            '0 0 60px rgba(255,100,20,0.28)',
            '0 0 110px rgba(200,50,0,0.14)',
          ].join(', '),
        }}
        initial={{ opacity: 0, filter: 'blur(28px)' }}
        animate={{
          opacity: [0, 1, 1, 0],
          filter: ['blur(28px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
        }}
        transition={{
          opacity: { duration: 1.60, delay, times: [0, 0.30, 0.62, 1] },
          filter:  { duration: 0.55, delay, ease: EXPO },
        }}
      >
        {char}
      </motion.div>

      {/* Burned-in layer — dark smoldering mark that stays after the flame passes */}
      <motion.div
        className="font-display absolute inset-0"
        style={{
          ...base,
          color: '#5C1800',
          textShadow: '0 0 12px rgba(140,40,0,0.40)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.36 }}
        transition={{ duration: 0.65, delay: burnDelay, ease: 'easeOut' }}
      >
        {char}
      </motion.div>
    </div>
  )
}

export default function ENIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3900)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.65, ease: [0.32, 0, 0.67, 0] }}
        >
          {/* Letter container — relative so particles can position inside */}
          <div className="relative flex items-center gap-[3vw]">
            <Letter char="E" delay={0.00} burnDelay={0.75} />
            <Letter char="N" delay={0.60} burnDelay={1.35} />

            {/* Ember particles */}
            {EMBERS.map((e) => (
              <motion.div
                key={e.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: e.l, top: e.t,
                  width: e.sz, height: e.sz,
                  backgroundColor: e.col,
                  boxShadow: `0 0 ${e.sz * 2}px ${e.sz * 0.6}px ${e.col}70`,
                }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  x: [0, e.dx * 0.4, e.dx],
                  y: [0, e.dy * 0.3, e.dy],
                  opacity: [0, 0.92, 0.70, 0],
                }}
                transition={{ duration: e.dur, delay: e.delay, ease: [0.2, 0, 0.55, 1] }}
              />
            ))}
          </div>

          {/* Wordmark */}
          <motion.p
            className="mt-8 text-sm font-semibold tracking-[0.45em] uppercase text-ember/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 1.80, ease: EXPO }}
          >
            EmberNorth
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
