'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1] as const
const LIN  = [0, 0, 1, 1]     as const  // constant-speed pathLength

// Stroke data: path string + start/end for leading ember dot
// viewBox 0 0 220 100 — E: x 22–82, N: x 128–198
const STROKES = [
  { id: 'ev', d: 'M 22 8 L 22 92',   x1: 22,  y1: 8,  x2: 22,  y2: 92, delay: 0.00, dur: 0.30 },
  { id: 'et', d: 'M 22 8 L 82 8',    x1: 22,  y1: 8,  x2: 82,  y2: 8,  delay: 0.30, dur: 0.20 },
  { id: 'eb', d: 'M 22 92 L 82 92',  x1: 22,  y1: 92, x2: 82,  y2: 92, delay: 0.30, dur: 0.20 },
  { id: 'em', d: 'M 22 50 L 69 50',  x1: 22,  y1: 50, x2: 69,  y2: 50, delay: 0.50, dur: 0.16 },
  { id: 'nl', d: 'M 128 8 L 128 92', x1: 128, y1: 8,  x2: 128, y2: 92, delay: 0.66, dur: 0.30 },
  { id: 'nd', d: 'M 128 8 L 198 92', x1: 128, y1: 8,  x2: 198, y2: 92, delay: 0.96, dur: 0.24 },
  { id: 'nr', d: 'M 198 8 L 198 92', x1: 198, y1: 8,  x2: 198, y2: 92, delay: 1.20, dur: 0.20 },
] as const
// Drawing completes ~1.40s. Burned-in state settles by ~2.10s.

// Scatter — embers break free after drawing and arc toward the hero below
const SCATTER = [
  { id: 0,  cx: 22,  cy: 8,  dx: -18, dy: 160, delay: 1.42, r: 2.8, color: '#FFD580' },
  { id: 1,  cx: 82,  cy: 8,  dx:  25, dy: 190, delay: 1.45, r: 2.0, color: '#FF7A2F' },
  { id: 2,  cx: 52,  cy: 50, dx: -10, dy: 210, delay: 1.43, r: 3.2, color: '#FFB347' },
  { id: 3,  cx: 52,  cy: 92, dx:  14, dy: 175, delay: 1.48, r: 2.2, color: '#E8511A' },
  { id: 4,  cx: 22,  cy: 92, dx: -22, dy: 155, delay: 1.51, r: 1.8, color: '#FF7A2F' },
  { id: 5,  cx: 128, cy: 8,  dx: -12, dy: 200, delay: 1.44, r: 3.0, color: '#FFD580' },
  { id: 6,  cx: 128, cy: 92, dx: -20, dy: 165, delay: 1.49, r: 2.0, color: '#FFB347' },
  { id: 7,  cx: 163, cy: 50, dx:  18, dy: 195, delay: 1.46, r: 2.5, color: '#E8511A' },
  { id: 8,  cx: 198, cy: 8,  dx:  28, dy: 210, delay: 1.47, r: 2.0, color: '#FF7A2F' },
  { id: 9,  cx: 198, cy: 92, dx:  12, dy: 170, delay: 1.53, r: 2.4, color: '#FFD580' },
  { id: 10, cx: 37,  cy: 8,  dx:  -5, dy: 185, delay: 1.55, r: 1.6, color: '#FFB347' },
  { id: 11, cx: 155, cy: 8,  dx:  10, dy: 180, delay: 1.50, r: 1.8, color: '#E8511A' },
] as const

export default function ENIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Hold long enough for burned state to be appreciated (~1.5s) before exiting
    const t = setTimeout(() => setShow(false), 3700)
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
          <div className="w-[58vw] max-w-125 min-w-57.5">
            <svg
              viewBox="0 0 220 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Bright amber→ember gradient for the drawing trail */}
                <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#FFD580" />
                  <stop offset="45%"  stopColor="#FF7A2F" />
                  <stop offset="100%" stopColor="#C0390A" />
                </linearGradient>

                {/* Bloom for the bright drawing trail */}
                <filter id="sg" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Softer glow for the burned-in marks — like cooling coal */}
                <filter id="bg" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="1.8" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Tight bright halo for the leading ember dot */}
                <filter id="dg" x="-300%" y="-300%" width="700%" height="700%">
                  <feGaussianBlur stdDeviation="5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {STROKES.map((s) => {
                const drawDone  = s.delay + s.dur
                const fadeDur   = s.dur + 0.85  // how long the drawing layer animates total
                const t1 = s.dur / fadeDur               // normalized time: draw complete
                const t2 = (s.dur + 0.40) / fadeDur     // normalized time: start fade

                return (
                  <g key={s.id}>
                    {/* ── Drawing trail: bright, draws itself, then fades out ── */}
                    <motion.path
                      d={s.d}
                      stroke="url(#ig)"
                      strokeWidth={10}
                      strokeLinecap="round"
                      fill="none"
                      filter="url(#sg)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 0.90, 0.90, 0] }}
                      transition={{
                        pathLength: { duration: s.dur,  delay: s.delay, ease: LIN },
                        opacity:    { duration: fadeDur, delay: s.delay, times: [0, t1, t2, 1] },
                      }}
                    />

                    {/* ── Burned-in mark: fades in after drawing, stays ── */}
                    {/* Dark ember colour at low opacity = scorched/charred look */}
                    <motion.path
                      d={s.d}
                      stroke="#C0390A"
                      strokeWidth={7}
                      strokeLinecap="round"
                      fill="none"
                      filter="url(#bg)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.40 }}
                      transition={{ duration: 0.55, delay: drawDone + 0.10, ease: 'easeOut' }}
                    />

                    {/* ── Leading ember dot: travels the stroke, then gone ── */}
                    <motion.circle
                      cx={s.x1} cy={s.y1}
                      r={4} fill="#FFF5CC"
                      filter="url(#dg)"
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{
                        x: s.x2 - s.x1,
                        y: s.y2 - s.y1,
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        x:       { duration: s.dur,        delay: s.delay, ease: LIN },
                        y:       { duration: s.dur,        delay: s.delay, ease: LIN },
                        opacity: { duration: s.dur + 0.12, delay: s.delay },
                      }}
                    />
                  </g>
                )
              })}

              {/* Scatter particles — arc downward after drawing to seed hero embers */}
              {SCATTER.map((p) => (
                <motion.circle
                  key={p.id}
                  cx={p.cx} cy={p.cy}
                  r={p.r} fill={p.color}
                  filter="url(#dg)"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    x: [0, p.dx * 0.3, p.dx],
                    y: [0, p.dy * 0.2, p.dy],
                    opacity: [0, 0.95, 0.7, 0],
                  }}
                  transition={{ duration: 1.1, delay: p.delay, ease: [0.2, 0, 0.6, 1] }}
                />
              ))}
            </svg>
          </div>

          {/* Wordmark — fades in once drawing is done */}
          <motion.p
            className="mt-6 text-sm font-semibold tracking-[0.45em] uppercase text-ember/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 1.5, ease: EXPO }}
          >
            EmberNorth
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
