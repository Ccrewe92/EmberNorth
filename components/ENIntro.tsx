'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXPO = [0.16, 1, 0.3, 1] as const

const BURN_AT_MS = 2400
const HOLD_MS    = 1600

const WORDMARK: React.CSSProperties = {
  fontSize: 'clamp(2rem, 6.5vw, 4.8rem)',
  fontWeight: 900,
  letterSpacing: '0.2em',
  userSelect: 'none',
  textTransform: 'uppercase',
}

export default function ENIntro() {
  const [show,     setShow]     = useState(true)
  const [fireDone, setFireDone] = useState(false)
  const [pulsing,  setPulsing]  = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEnded = () => setFireDone(true)

  useEffect(() => {
    const t = setTimeout(() => setFireDone(true), BURN_AT_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!fireDone) return
    const t = setTimeout(() => setPulsing(true), 900)
    return () => clearTimeout(t)
  }, [fireDone])

  useEffect(() => {
    if (!fireDone) return
    const t = setTimeout(() => setShow(false), HOLD_MS)
    return () => clearTimeout(t)
  }, [fireDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-canvas overflow-hidden"
          style={{ isolation: 'isolate' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.32, 0, 0.67, 0] }}
        >
          {/* Ambient heat */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 35% at 50% 50%, rgba(210,80,15,0.08) 0%, transparent 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: fireDone ? 0.5 : 1 }}
            transition={{ duration: 1.8 }}
          />

          {/* Wordmark stack */}
          <div className="relative z-10 text-center">
            {/* Bright layer */}
            <motion.h1
              className="font-display"
              style={{
                ...WORDMARK,
                color: '#F5EDE0',
                textShadow: [
                  '0 0 22px rgba(255,155,55,0.50)',
                  '0 0 55px rgba(255,95,20,0.22)',
                  '0 0 90px rgba(200,45,0,0.10)',
                ].join(', '),
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: fireDone ? 0 : 1 }}
              transition={{ duration: fireDone ? 1.1 : 0.6, ease: fireDone ? 'easeOut' : EXPO }}
            >
              EmberNorth
            </motion.h1>

            {/* Burned layer */}
            <motion.h1
              className="font-display absolute inset-0"
              style={{
                ...WORDMARK,
                color: '#7A2200',
                textShadow: '0 0 18px rgba(160,50,0,0.50)',
              }}
              initial={{ opacity: 0 }}
              animate={
                pulsing
                  ? { opacity: [0.42, 0.28, 0.42] }
                  : { opacity: fireDone ? 0.42 : 0 }
              }
              transition={
                pulsing
                  ? { repeat: Infinity, duration: 4.0, ease: 'easeInOut' }
                  : { duration: 0.85, ease: 'easeOut' }
              }
            >
              EmberNorth
            </motion.h1>
          </div>

          {/* Fire video — screen blend, GPU-accelerated */}
          <motion.video
            ref={videoRef}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{
              mixBlendMode: 'screen',
              transform: 'translateZ(0)',
              willChange: 'opacity',
            }}
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            initial={{ opacity: 0.92 }}
            animate={{ opacity: fireDone ? 0 : 0.92 }}
            transition={{ duration: 1.30, ease: 'easeOut' }}
          >
            <source src="/fire-trail-hq.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
