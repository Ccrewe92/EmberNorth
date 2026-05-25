'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1] as const

// How long to hold after fire settles before exiting
const HOLD_MS   = 1400
// When to consider the fire "done" and switch to burned state (ms into playback)
const BURN_AT_MS = 2200

function Letter({
  char,
  burnDelay,
}: {
  char: string
  burnDelay: number
}) {
  const [pulsing, setPulsing] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPulsing(true), (burnDelay + 1.0) * 1000)
    return () => clearTimeout(t)
  }, [burnDelay])

  const base: React.CSSProperties = {
    fontSize: 'clamp(5.5rem, 18vw, 11rem)',
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: '-0.02em',
    userSelect: 'none',
  }

  return (
    <div className="relative">
      {/* Warm base — gives the fire something bright to composite against */}
      <div
        className="font-display"
        style={{
          ...base,
          color: '#F5EDE0',
          textShadow: [
            '0 0 20px rgba(255,150,50,0.45)',
            '0 0 50px rgba(255,90,20,0.20)',
          ].join(', '),
        }}
      >
        {char}
      </div>

      {/* Burned-in mark — fades in after fire passes, breathes slowly */}
      <motion.div
        className="font-display absolute inset-0"
        style={{
          ...base,
          color: '#7A2200',
          textShadow: '0 0 18px rgba(160,50,0,0.55)',
        }}
        initial={{ opacity: 0 }}
        animate={pulsing ? { opacity: [0.42, 0.28, 0.42] } : { opacity: 0.42 }}
        transition={
          pulsing
            ? { repeat: Infinity, duration: 4.0, ease: 'easeInOut' }
            : { duration: 0.80, delay: burnDelay, ease: 'easeOut' }
        }
      >
        {char}
      </motion.div>
    </div>
  )
}

export default function ENIntro() {
  const [show,       setShow]       = useState(true)
  const [fireDone,   setFireDone]   = useState(false)
  const [showMark,   setShowMark]   = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Fallback: if video never fires onEnded, still progress
  useEffect(() => {
    const burnTimer = setTimeout(() => setFireDone(true), BURN_AT_MS)
    return () => clearTimeout(burnTimer)
  }, [])

  // Show wordmark shortly after fire is considered done
  useEffect(() => {
    if (!fireDone) return
    const t = setTimeout(() => setShowMark(true), 400)
    return () => clearTimeout(t)
  }, [fireDone])

  // Exit after wordmark has been visible for HOLD_MS
  useEffect(() => {
    if (!showMark) return
    const t = setTimeout(() => setShow(false), HOLD_MS)
    return () => clearTimeout(t)
  }, [showMark])

  const handleEnded = () => setFireDone(true)

  // Letter burn delays relative to when fire hits each letter
  const E_BURN = BURN_AT_MS / 1000 - 0.5
  const N_BURN = BURN_AT_MS / 1000 - 0.2

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.70, ease: [0.32, 0, 0.67, 0] }}
        >
          {/* Subtle ambient warmth behind the letters */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 48%, rgba(210,80,15,0.09) 0%, transparent 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: fireDone ? 0.5 : 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* EN letters */}
          <div className="relative flex items-center gap-[3vw]">
            <Letter char="E" burnDelay={E_BURN} />
            <Letter char="N" burnDelay={N_BURN} />
          </div>

          {/* Wordmark */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <motion.div
              className="h-px bg-ember/35"
              style={{ width: 'clamp(8rem, 22vw, 14rem)', transformOrigin: 'left center' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showMark ? 1 : 0 }}
              transition={{ duration: 0.55, ease: EXPO }}
            />
            <motion.p
              className="text-sm font-semibold tracking-[0.45em] uppercase text-ember/55"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: showMark ? 1 : 0, y: showMark ? 0 : 8 }}
              transition={{ duration: 0.50, ease: EXPO }}
            >
              EmberNorth
            </motion.p>
          </div>

          {/* ── Fire video ──────────────────────────────────────────────────
              mix-blend-mode: screen makes every black pixel transparent.
              The fire composites directly over the letters — no greenscreen
              needed. Opacity fades out once the fire has done its job.     */}
          <motion.video
            ref={videoRef}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ mixBlendMode: 'screen' }}
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            initial={{ opacity: 0.90 }}
            animate={{ opacity: fireDone ? 0 : 0.90 }}
            transition={{ duration: 1.20, ease: 'easeOut' }}
          >
            <source src="/fire-trail.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
