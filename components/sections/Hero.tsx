'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, animate } from 'framer-motion'
import { ArrowRight, Phone } from '@phosphor-icons/react'
import { BRAND, PRICING } from '@/lib/constants'
import EmberParticles from '@/components/EmberParticles'

const EXPO = [0.16, 1, 0.3, 1] as const

const lines = [
  { text: 'Your website.', ember: false },
  { text: 'Your files. Your domain.', ember: false },
  { text: 'Always.', ember: true },
]

function StatCount({
  from = 0,
  to,
  prefix = '',
  suffix = '',
  label,
  delay,
}: {
  from?: number
  to: number
  prefix?: string
  suffix?: string
  label: string
  delay: number
}) {
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [from, to, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EXPO }}
    >
      <div className="font-display font-black text-snow leading-none text-4xl lg:text-[2.75rem]">
        {prefix}{display}{suffix}
      </div>
      <div className="mt-2 text-xs text-smoke">{label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.55], ['0%', '8%'])

  return (
    <section ref={ref} id="home" className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-canvas">
      {/* Canvas ember particles — desktop only, paused by prefers-reduced-motion */}
      <EmberParticles />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-15%] top-1/3 h-175 w-175 rounded-full bg-ember/6 blur-[150px]"
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-16 lg:px-8 lg:pt-44"
      >
        {/* Eyebrow — first element, fires at 150ms */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EXPO }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-rim/60 bg-surface/60 px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-smoke">
            Calgary Web Agency
          </span>
        </motion.div>

        {/* Headline — each line reveals with 120ms stagger */}
        <h1 className="mb-12 font-display font-black leading-none tracking-tight">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EXPO }}
                className={`block text-[clamp(3.25rem,9.5vw,8rem)] ${line.ember ? 'text-ember' : 'text-snow'}`}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Horizontal rule — scales from left after headline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.72, ease: EXPO }}
          style={{ transformOrigin: 'left' }}
          className="mb-10 h-px bg-rim/50"
        />

        {/* Bottom row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Sub + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.86, ease: EXPO }}
          >
            <p className="mb-7 max-w-[38ch] text-lg leading-relaxed text-smoke">
              Affordable, modern websites for Calgary contractors and small businesses.{' '}
              <span className="font-semibold text-snow">${PRICING.build} flat.</span> No lock-in.
              No exit fees.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href="#portfolio"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.96, ease: EXPO }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-snow hover:bg-ember/90"
              >
                See Our Work
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-snow/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </motion.a>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.06, ease: EXPO }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center rounded-full border border-rim/60 bg-surface/40 px-7 py-3.5 text-sm font-semibold text-snow backdrop-blur-sm transition-colors duration-200 hover:border-ember/40 hover:bg-surface"
              >
                Free Preview
              </motion.a>
              <motion.a
                href={`tel:${BRAND.tel}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.16 }}
                className="inline-flex items-center gap-2 text-sm text-smoke transition-colors hover:text-snow"
              >
                <Phone size={13} weight="fill" />
                {BRAND.phone}
              </motion.a>
            </div>
          </motion.div>

          {/* Counting stats */}
          <div className="flex shrink-0 items-start gap-10 lg:gap-14">
            <StatCount to={PRICING.build} prefix="$" label="flat build fee" delay={1.0} />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.08, ease: EXPO }}
            >
              <div className="font-display font-black text-snow leading-none text-4xl lg:text-[2.75rem]">
                5–7
              </div>
              <div className="mt-2 text-xs text-smoke">days to launch</div>
            </motion.div>
            <StatCount to={100} suffix="%" label="you own it" delay={1.16} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
