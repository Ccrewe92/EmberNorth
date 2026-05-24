'use client'

import { motion } from 'framer-motion'
import { Check, Star } from '@phosphor-icons/react'
import { BRAND, PRICING } from '@/lib/constants'

const EXPO = [0.16, 1, 0.3, 1] as const
const SPRING = { type: 'spring', stiffness: 250, damping: 22 } as const

const planAFeatures = [
  'Hosting on Vercel (fast, global)',
  'DNS management via Cloudflare',
  'Security & software updates',
  'Up to 4 hrs content changes/month',
  'Cancel with 30 days notice',
]

const planBFeatures = [
  'Everything in Plan A',
  'Domain renewal management',
  '1 professional email at your domain',
  'Priority turnaround on changes',
  'Cancel with 30 days notice',
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-canvas py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 overflow-hidden">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
          >
            Pricing
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EXPO }}
              className="font-display font-black leading-none tracking-[-0.02em] text-snow text-[clamp(2rem,5vw,3.5rem)]"
            >
              Honest pricing. Nothing hidden.
            </motion.h2>
          </div>
        </div>

        {/* Guarantee badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EXPO }}
          className="mb-14 inline-flex items-center gap-2.5 rounded-full border border-ember/20 bg-ember/8 px-5 py-2.5"
        >
          <Star size={14} weight="fill" className="text-ember" />
          <span className="text-sm font-semibold text-snow">
            We build it first. You only pay if you love it.
          </span>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Build Fee */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1, ease: EXPO },
              y: SPRING,
            }}
            className="md:col-span-3 cursor-default rounded-[1.75rem] border border-rim/40 bg-surface/40 p-1.5"
          >
            <div className="rounded-[calc(1.75rem-6px)] bg-canvas/60 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-smoke">
                Build Fee
              </p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="font-display font-black text-snow text-4xl">${PRICING.build}</span>
                <span className="text-sm text-smoke">one-time</span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-smoke">
                Custom site built for your business. Pay only after you approve.
              </p>
              <ul className="space-y-2.5 text-sm text-smoke">
                {['Full custom design', 'Mobile-first', 'SEO ready', 'Delivered in 5-7 days'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={13} weight="bold" className="shrink-0 text-ash" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Plan A */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.15, ease: EXPO },
              y: SPRING,
            }}
            className="md:col-span-4 cursor-default rounded-[1.75rem] border border-rim/50 bg-surface/60 p-1.5"
          >
            <div className="rounded-[calc(1.75rem-6px)] bg-raised/60 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-smoke">
                Plan A
              </p>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="font-display font-black text-snow text-5xl">${PRICING.planA}</span>
                <span className="text-sm text-smoke">/month</span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-smoke">
                Hosting, maintenance, and content updates. Cancel anytime.
              </p>
              <ul className="space-y-3 text-sm">
                {planAFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-smoke">
                    <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-smoke" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-rim/60 bg-surface px-5 py-3 text-sm font-semibold text-snow transition-all duration-200 hover:border-ember/30 hover:bg-raised"
              >
                Get started
              </a>
            </div>
          </motion.div>

          {/* Plan B — featured */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.2, ease: EXPO },
              y: SPRING,
            }}
            className="md:col-span-5 cursor-default rounded-[1.75rem] border border-ember/30 bg-surface/60 p-1.5 shadow-[0_0_48px_-12px_rgba(232,81,26,0.2)]"
          >
            <div className="h-full rounded-[calc(1.75rem-6px)] bg-raised/80 p-7 shadow-[inset_0_1px_0_rgba(232,81,26,0.08)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-smoke">
                  Plan B
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ember/25 bg-ember/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ember">
                  <Star size={10} weight="fill" />
                  Most Popular
                </span>
              </div>
              <div className="mb-4 flex items-baseline gap-1">
                <span className="font-display font-black text-snow text-5xl">${PRICING.planB}</span>
                <span className="text-sm text-smoke">/month</span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-smoke">
                Everything in Plan A, plus domain and email management handled.
              </p>
              <ul className="space-y-3 text-sm">
                {planBFeatures.map((f, i) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 ${i === 0 ? 'font-medium text-ember' : 'text-snow'}`}
                  >
                    <Check
                      size={14}
                      weight="bold"
                      className={`mt-0.5 shrink-0 ${i === 0 ? 'text-ember' : 'text-ember/60'}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ember px-5 py-3 text-sm font-semibold text-snow shadow-[0_0_20px_-4px_rgba(232,81,26,0.4)] transition-colors duration-200 hover:bg-ember/90"
              >
                Get started
              </a>
            </div>
          </motion.div>
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EXPO }}
          className="mt-10 max-w-xl mx-auto text-center text-sm leading-relaxed text-ash"
        >
          Cancel anytime with 30 days written notice. No cancellation fees. All your files
          delivered within 5 business days at no charge. No questions asked.{' '}
          <a
            href={`mailto:${BRAND.email}`}
            className="text-smoke underline underline-offset-2 transition-colors hover:text-snow"
          >
            Questions? Just ask.
          </a>
        </motion.p>
      </div>
    </section>
  )
}
