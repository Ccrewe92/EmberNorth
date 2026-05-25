'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1] as const

// Two particle tiers: fine sparks (small, fast) and heavy embers (large, slow)
const EMBERS = [
  // — Fine sparks during E reveal —
  { id: 0,  l: '4%',  t: '30%', dx: -16, dy: -82, delay: 0.10, dur: 0.68, sz: 3,  col: '#FFE8A0' },
  { id: 1,  l: '22%', t: '8%',  dx:  12, dy: -68, delay: 0.28, dur: 0.62, sz: 4,  col: '#FFD580' },
  { id: 2,  l: '36%', t: '55%', dx:  -9, dy: -72, delay: 0.46, dur: 0.72, sz: 3,  col: '#FFB347' },
  { id: 3,  l: '8%',  t: '65%', dx: -20, dy: -52, delay: 0.36, dur: 0.58, sz: 3,  col: '#FFE8A0' },
  // — Heavy embers during E reveal —
  { id: 4,  l: '15%', t: '18%', dx: -14, dy: -58, delay: 0.18, dur: 1.05, sz: 9,  col: '#FF7A2F' },
  { id: 5,  l: '40%', t: '12%', dx:  19, dy: -62, delay: 0.52, dur: 1.12, sz: 10, col: '#E8511A' },
  // — Fine sparks during N reveal —
  { id: 6,  l: '58%', t: '10%', dx: -13, dy: -78, delay: 0.70, dur: 0.68, sz: 3,  col: '#FFE8A0' },
  { id: 7,  l: '76%', t: '38%', dx:  15, dy: -64, delay: 0.90, dur: 0.62, sz: 4,  col: '#FFD580' },
  { id: 8,  l: '90%', t: '52%', dx:  -7, dy: -68, delay: 1.14, dur: 0.72, sz: 3,  col: '#FFB347' },
  // — Heavy embers during N reveal —
  { id: 9,  l: '64%', t: '22%', dx: -18, dy: -55, delay: 0.76, dur: 1.05, sz: 9,  col: '#FF7A2F' },
  { id: 10, l: '93%', t: '6%',  dx:  24, dy: -60, delay: 1.18, dur: 1.12, sz: 10, col: '#E8511A' },
  // — Post-reveal downward scatter to seed hero —
  { id: 11, l: '12%', t: '72%', dx: -28, dy: 148, delay: 1.52, dur: 1.18, sz: 12, col: '#E8511A' },
  { id: 12, l: '46%', t: '60%', dx:  10, dy: 168, delay: 1.60, dur: 1.28, sz: 14, col: '#FF7A2F' },
  { id: 13, l: '81%', t: '68%', dx:  32, dy: 158, delay: 1.68, dur: 1.12, sz: 11, col: '#FFB347' },
  { id: 14, l: '30%', t: '82%', dx: -18, dy: 138, delay: 1.76, dur: 1.22, sz: 10, col: '#E8511A' },
] as const

function Letter({
  char,
  delay,
  burnDelay,
}: {
  char: string
  delay: number
  burnDelay: number
}) {
  // After the burned mark settles, it breathes — like cooling coal not quite dead
  const [pulsing, setPulsing] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setPulsing(true), (burnDelay + 0.95) * 1000)
    return () => clearTimeout(t)
  }, [burnDelay])

  const base: React.CSSProperties = {
    fontSize: 'clamp(5rem, 17vw, 10.5rem)',
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: '-0.02em',
    userSelect: 'none',
  }

  return (
    <div className="relative">
      {/* Warm cream letter: emerges from glowing heat blur, then fades */}
      <motion.div
        className="font-display"
        style={{
          ...base,
          color: '#F5EDE0',
          textShadow: [
            '0 0 22px rgba(255,160,60,0.62)',
            '0 0 52px rgba(255,100,20,0.32)',
            '0 0 95px rgba(200,50,0,0.16)',
          ].join(', '),
        }}
        initial={{ opacity: 0, filter: 'blur(28px)' }}
        animate={{
          opacity: [0, 1, 1, 0],
          filter: ['blur(28px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
        }}
        transition={{
          opacity: { duration: 1.72, delay, times: [0, 0.28, 0.64, 1] },
          filter:  { duration: 0.52, delay, ease: EXPO },
        }}
      >
        {char}
      </motion.div>

      {/* Burned-in mark: dark smoldering ember that outlasts the flame */}
      <motion.div
        className="font-display absolute inset-0"
        style={{
          ...base,
          color: '#7A2200',
          textShadow: '0 0 16px rgba(160,50,0,0.50)',
        }}
        initial={{ opacity: 0 }}
        animate={pulsing ? { opacity: [0.40, 0.28, 0.40] } : { opacity: 0.40 }}
        transition={
          pulsing
            ? { repeat: Infinity, duration: 4.2, ease: 'easeInOut' }
            : { duration: 0.65, delay: burnDelay, ease: 'easeOut' }
        }
      >
        {char}
      </motion.div>
    </div>
  )
}

export default function ENIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 4000)
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
          {/* Ambient heat — diffuse ember glow that lights the background like real fire */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 58% 38% at 50% 48%, rgba(220,90,20,0.11) 0%, transparent 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.42] }}
            transition={{ duration: 2.1, times: [0, 0.26, 0.64, 1] }}
          />

          {/* Letter container — relative for particle overlay */}
          <div className="relative flex items-center gap-[3vw]">
            <Letter char="E" delay={0.00} burnDelay={0.75} />
            <Letter char="N" delay={0.60} burnDelay={1.35} />

            {EMBERS.map((e) => (
              <motion.div
                key={e.id}
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: e.l, top: e.t,
                  width: e.sz, height: e.sz,
                  backgroundColor: e.col,
                  boxShadow: `0 0 ${e.sz * 2.2}px ${e.sz * 0.7}px ${e.col}60`,
                }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  x: [0, e.dx * 0.38, e.dx],
                  y: [0, e.dy * 0.28, e.dy],
                  opacity: [0, 0.96, 0.72, 0],
                }}
                transition={{ duration: e.dur, delay: e.delay, ease: [0.18, 0, 0.52, 1] }}
              />
            ))}
          </div>

          {/* Wordmark: ruled line draws first, text rises beneath it */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <motion.div
              className="h-px bg-ember/35"
              style={{
                width: 'clamp(8rem, 22vw, 14rem)',
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 1.90, ease: EXPO }}
            />
            <motion.p
              className="text-sm font-semibold tracking-[0.45em] uppercase text-ember/55"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.50, delay: 2.10, ease: EXPO }}
            >
              EmberNorth
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
