'use client'

import { motion } from 'framer-motion'
import { BRAND } from '@/lib/constants'

const EXPO = [0.16, 1, 0.3, 1] as const

export default function About() {
  return (
    <section id="about" className="bg-surface/30 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Photo — slides in from left simultaneously with text */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: EXPO }}
            className="lg:col-span-4"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
            >
              About
            </motion.p>
            <div className="rounded-[1.75rem] border border-rim/40 bg-surface/60 p-1.5 aspect-4/5">
              <div className="h-full rounded-[calc(1.75rem-6px)] bg-canvas/60 flex flex-col items-center justify-center gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <span className="select-none font-display font-black text-[5rem] leading-none text-ember/15">
                  CC
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rim/60 px-3 py-1 text-[11px] text-ash">
                  <span className="text-ember">[[NEEDS:</span> photo of Clinton Crewe
                  <span className="text-ember">]]</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio — slides in from right simultaneously */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: EXPO }}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EXPO }}
                className="font-display font-black text-snow leading-none tracking-tight text-[clamp(2rem,5vw,4rem)]"
              >
                I&apos;m {BRAND.owner}. I run EmberNorth out of {BRAND.location.split(',')[0]}.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EXPO }}
              className="text-lg leading-relaxed text-smoke"
            >
              I got tired of watching contractors and tradespeople get burned by web agencies
              that charged thousands, then held their sites hostage when they wanted to leave.
              So I built EmberNorth around the opposite idea: you hire me to build your site,
              and from day one, it&apos;s yours. No drama. The code, the files, the domain,
              all of it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: EXPO }}
              className="mt-5 text-lg leading-relaxed text-smoke"
            >
              I work with Calgary contractors and small businesses who need a fast, professional
              website that actually shows up on Google. Not a template. Not a site builder. A
              real, custom-built website that belongs to you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease: EXPO }}
              className="mt-10 pt-8 border-t border-rim/30 flex flex-wrap gap-4"
            >
              <a
                href={`tel:${BRAND.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-rim/60 bg-surface/60 px-5 py-2.5 text-sm font-semibold text-snow transition-all duration-200 hover:border-ember/30 hover:bg-surface"
              >
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-rim/60 bg-surface/60 px-5 py-2.5 text-sm font-semibold text-smoke transition-all duration-200 hover:border-rim hover:text-snow"
              >
                {BRAND.email}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
