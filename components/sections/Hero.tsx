'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Phone } from '@phosphor-icons/react'
import { BRAND, PRICING } from '@/lib/constants'

const EXPO = [0.16, 1, 0.3, 1] as const

const lines = [
  { text: 'Your website.', ember: false },
  { text: 'Your files. Your domain.', ember: false },
  { text: 'Always.', ember: true },
]

const stats = [
  { value: `$${PRICING.build}`, label: 'flat build fee' },
  { value: '5–7', label: 'days to launch' },
  { value: '100%', label: 'you own it' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.55], ['0%', '8%'])

  return (
    <section ref={ref} id="home" className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-canvas">
      {/* Parallax EN mark */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-3%] top-[5%] font-display font-black leading-none text-[44vw] text-ember opacity-[0.04]"
      >
        EN
      </motion.div>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-15%] top-1/3 h-[700px] w-[700px] rounded-full bg-ember/6 blur-[150px]"
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-16 lg:px-8 lg:pt-44"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EXPO }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-rim/60 bg-surface/60 px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-smoke">
            Calgary Web Agency
          </span>
        </motion.div>

        {/* Headline — line reveal */}
        <h1 className="mb-12 font-display font-black leading-[1.0] tracking-[-0.025em]">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EXPO }}
                className={`block text-[clamp(3.25rem,9.5vw,8rem)] ${line.ember ? 'text-ember' : 'text-snow'}`}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.62, ease: EXPO }}
          style={{ transformOrigin: 'left' }}
          className="mb-10 h-px bg-rim/50"
        />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.76, ease: EXPO }}
          className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          {/* Sub + CTAs */}
          <div>
            <p className="mb-7 max-w-[38ch] text-lg leading-relaxed text-smoke">
              Affordable, modern websites for Calgary contractors and small businesses.{' '}
              <span className="font-semibold text-snow">${PRICING.build} flat.</span> No lock-in.
              No exit fees.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="group inline-flex items-center gap-3 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-snow hover:bg-ember/90"
              >
                See Our Work
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-snow/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="inline-flex items-center rounded-full border border-rim/60 bg-surface/40 px-7 py-3.5 text-sm font-semibold text-snow backdrop-blur-sm transition-colors duration-200 hover:border-ember/40 hover:bg-surface"
              >
                Free Preview
              </motion.a>
              <a
                href={`tel:${BRAND.tel}`}
                className="inline-flex items-center gap-2 text-sm text-smoke transition-colors hover:text-snow"
              >
                <Phone size={13} weight="fill" />
                {BRAND.phone}
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex shrink-0 items-start gap-10 lg:gap-14">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.88 + i * 0.08, ease: EXPO }}
              >
                <div className="font-display font-black text-snow leading-none text-4xl lg:text-[2.75rem]">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs text-smoke">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
