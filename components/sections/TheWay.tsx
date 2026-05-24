'use client'

import { motion } from 'framer-motion'
import { HouseLine, CurrencyDollar, RocketLaunch, type Icon } from '@phosphor-icons/react'

const EXPO = [0.16, 1, 0.3, 1] as const
const SPRING = { type: 'spring', stiffness: 250, damping: 22 } as const

type Pillar = {
  num: string
  Icon: Icon
  title: string
  body: string
}

const pillars: Pillar[] = [
  {
    num: '01',
    Icon: HouseLine,
    title: 'You own everything.',
    body: "The code, the files, the domain. Always. From the moment you pay the build fee, everything belongs to you. No asterisks, no fine print, no waiting.",
  },
  {
    num: '02',
    Icon: CurrencyDollar,
    title: 'Transparent pricing.',
    body: "$300 flat build fee. $40 or $50/month optional hosting. Nothing else. Ever. You'll never get a surprise invoice.",
  },
  {
    num: '03',
    Icon: RocketLaunch,
    title: 'Built to perform.',
    body: 'Next.js. Mobile-first. SEO optimized from day one. Lighthouse scores that actually help you rank on Google.',
  },
]

const [p0, ...rest] = pillars

export default function TheWay() {
  const P0Icon = p0.Icon

  return (
    <section className="bg-surface/30 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden mb-14 max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
          >
            Why EmberNorth
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EXPO }}
              className="font-display font-black text-snow leading-none tracking-[-0.02em] text-[clamp(2.25rem,5.5vw,3.75rem)]"
            >
              Three things we never compromise on.
            </motion.h2>
          </div>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Large feature card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.1, ease: EXPO },
              y: SPRING,
            }}
            className="md:col-span-7 cursor-default rounded-[1.75rem] border border-rim/50 bg-surface/60 p-1.5"
          >
            <div className="flex h-full min-h-64 flex-col justify-between rounded-[calc(1.75rem-6px)] bg-raised/60 p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="mb-6 flex items-start justify-between">
                <span className="select-none font-display font-black text-[5rem] leading-none text-ember/12">
                  {p0.num}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-ember/20 bg-ember/10 text-ember">
                  <P0Icon size={22} weight="duotone" />
                </span>
              </div>
              <div>
                <h3 className="mb-3 font-display font-black text-snow text-2xl lg:text-3xl tracking-tight">
                  {p0.title}
                </h3>
                <p className="max-w-md leading-relaxed text-smoke">
                  {p0.body}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stacked smaller cards */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {rest.map((pillar, i) => {
              const PillarIcon = pillar.Icon
              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.2 + i * 0.1, ease: EXPO },
                    y: SPRING,
                  }}
                  className="flex-1 cursor-default rounded-[1.75rem] border border-rim/50 bg-surface/60 p-1.5"
                >
                  <div className="flex h-full flex-col justify-between rounded-[calc(1.75rem-6px)] bg-raised/60 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="select-none font-display font-black text-4xl leading-none text-ember/12">
                        {pillar.num}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-ember/20 bg-ember/10 text-ember">
                        <PillarIcon size={18} weight="duotone" />
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-2 font-display font-black text-snow text-xl tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-smoke">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
