'use client'

import { motion } from 'framer-motion'
import { X, Check, ArrowRight } from '@phosphor-icons/react'

const EXPO = [0.16, 1, 0.3, 1] as const

const oldWay = [
  'They own the code',
  'Exit fees when you leave',
  'Locked to their hosting',
  "Can't touch it without them",
  'Months to build, thousands to pay',
]

const newWay = [
  'You own 100% of the code',
  'No exit fees. Ever.',
  'Host anywhere you want',
  'Files delivered, no questions asked',
  '$300 flat. Live in days.',
]

export default function Problem() {
  return (
    <section id="services" className="bg-canvas py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading — slides in from left */}
        <div className="mb-20 lg:mb-28">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO }}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
          >
            The Problem
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EXPO }}
              className="font-display font-black leading-none tracking-[-0.02em] text-snow text-[clamp(2.75rem,7vw,5.75rem)] max-w-5xl"
            >
              Most web agencies own your website.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3, ease: EXPO }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-smoke"
          >
            They make it complicated on purpose. Switching providers means paying exit fees,
            fighting for your files, or starting over completely.
          </motion.p>
        </div>

        {/* Two-column comparison — slide in from opposite sides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Old Way — slides from left, slight rotation */}
          <motion.div
            initial={{ opacity: 0, x: -48, rotate: -1.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: EXPO }}
          >
            <p className="mb-8 border-b border-rim/30 pb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke/50">
              The Old Way
            </p>
            <ul className="space-y-6">
              {oldWay.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: EXPO }}
                  className="flex items-center gap-4"
                >
                  <X size={13} weight="bold" className="shrink-0 text-ash/50" />
                  <span className="text-[1.0625rem] leading-snug text-smoke/50 line-through decoration-ash/30">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* EmberNorth Way — slides from right with delay */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EXPO }}
          >
            <p className="mb-8 border-b border-ember/25 pb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ember/70">
              The EmberNorth Way
            </p>
            <ul className="space-y-6">
              {newWay.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: EXPO }}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember/15">
                    <Check size={11} weight="bold" className="text-ember" />
                  </span>
                  <span className="text-[1.0625rem] font-medium leading-snug text-snow">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: EXPO }}
          className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-rim/30 pt-10"
        >
          <p className="max-w-lg text-lg text-smoke">
            That&apos;s why EmberNorth exists. You should own what you paid for.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-b border-snow/20 pb-px text-sm font-semibold text-snow transition-colors duration-200 hover:border-ember hover:text-ember"
          >
            Get a free preview
            <ArrowRight size={13} weight="bold" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
