'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1] as const
const LIN  = [0, 0, 1, 1]     as const   // constant-speed wipe

// Flame gradient for the bright reveal layer
const FLAME_GRAD: React.CSSProperties = {
  backgroundImage: 'linear-gradient(to bottom, #FFD580 0%, #FF7A2F 45%, #C0390A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 0 28px rgba(232,81,26,0.55))',
}

// Ember particles — positioned as % of the combined letter container
// Positive dy = fall toward hero; negative dy = rise (sparks flying off)
const EMBERS = [
  // E phase (delay 0 – 0.85s)
  { id: 0,  l: '3%',  t: '15%', dx: -22, dy: -65, delay: 0.08, dur: 0.80, sz: 8,  col: '#FFD580' },
  { id: 1,  l: '18%', t: '5%',  dx:  14, dy: -55, delay: 0.28, dur: 0.90, sz: 6,  col: '#FF7A2F' },
  { id: 2,  l: '32%', t: '40%', dx: -10, dy: -50, delay: 0.50, dur: 0.75, sz: 7,  col: '#FFB347' },
  { id: 3,  l: '43%', t: '20%', dx:  18, dy: -45, delay: 0.72, dur: 0.85, sz: 5,  col: '#FFD580' },
  // N phase (delay 0.7 – 1.55s)
  { id: 4,  l: '56%', t: '10%', dx: -18, dy: -60, delay: 0.75, dur: 0.80, sz: 8,  col: '#FFD580' },
  { id: 5,  l: '68%', t: '30%', dx:  16, dy: -50, delay: 0.98, dur: 0.90, sz: 6,  col: '#FF7A2F' },
  { id: 6,  l: '80%', t: '15%', dx: -12, dy: -55, delay: 1.22, dur: 0.75, sz: 7,  col: '#FFB347' },
  { id: 7,  l: '92%', t: '40%', dx:  20, dy: -40, delay: 1.48, dur: 0.85, sz: 5,  col: '#FFD580' },
  // Post-reveal scatter — fall toward hero bottom
  { id: 8,  l: '15%', t: '70%', dx: -28, dy: 130, delay: 1.60, dur: 1.10, sz: 10, col: '#E8511A' },
  { id: 9,  l: '48%', t: '55%', dx:  12, dy: 155, delay: 1.65, dur: 1.20, sz: 12, col: '#FF7A2F' },
  { id: 10, l: '82%', t: '65%', dx:  32, dy: 140, delay: 1.70, dur: 1.05, sz: 9,  col: '#FFD580' },
  { id: 11, l: '30%', t: '85%', dx: -15, dy: 120, delay: 1.75, dur: 1.15, sz: 8,  col: '#FFB347' },
  { id: 12, l: '65%', t: '80%', dx:  22, dy: 110, delay: 1.80, dur: 1.00, sz: 7,  col: '#E8511A' },
] as const

function Letter({
  char,
  revealDelay,
  burnDelay,
}: {
  char: string
  revealDelay: number
  burnDelay: number
}) {
  const fontSize = 'clamp(5rem, 17vw, 10.5rem)'
  const base: React.CSSProperties = {
    fontSize,
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: '-0.02em',
    userSelect: 'none',
  }

  return (
    <div className="relative">
      {/* Bright flame layer — clips from left, then fades out */}
      <motion.div
        className="font-display"
        style={{ ...base, ...FLAME_GRAD }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)', opacity: [1, 1, 1, 0] }}
        transition={{
          clipPath: { duration: 0.85, delay: revealDelay, ease: LIN },
          opacity: {
            duration: 1.20, delay: revealDelay,
            times: [0, 0.65, 0.80, 1],
          },
        }}
      >
        {char}
      </motion.div>

      {/* Burned-in layer — smoldering dark mark that stays */}
      <motion.div
        className="font-display absolute inset-0"
        style={{
          ...base,
          color: '#7A2000',
          filter: 'drop-shadow(0 0 10px rgba(192,57,10,0.45))',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.38 }}
        transition={{ duration: 0.6, delay: burnDelay, ease: 'easeOut' }}
      >
        {char}
      </motion.div>
    </div>
  )
}

export default function ENIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
        >
          {/* Letter area + ember overlay */}
          <div className="relative flex items-center gap-[3vw]">
            <Letter char="E" revealDelay={0.00} burnDelay={0.90} />
            <Letter char="N" revealDelay={0.70} burnDelay={1.60} />

            {/* Ember particles positioned within the letter container */}
            {EMBERS.map((e) => (
              <motion.div
                key={e.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: e.l, top: e.t,
                  width: e.sz, height: e.sz,
                  backgroundColor: e.col,
                  boxShadow: `0 0 ${e.sz * 2.5}px ${e.sz * 0.8}px ${e.col}80`,
                }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  x: [0, e.dx * 0.35, e.dx],
                  y: [0, e.dy * 0.25, e.dy],
                  opacity: [0, 0.95, 0.75, 0],
                }}
                transition={{ duration: e.dur, delay: e.delay, ease: [0.2, 0, 0.55, 1] }}
              />
            ))}
          </div>

          {/* Wordmark */}
          <motion.p
            className="mt-8 text-sm font-semibold tracking-[0.45em] uppercase text-ember/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 1.65, ease: EXPO }}
          >
            EmberNorth
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
