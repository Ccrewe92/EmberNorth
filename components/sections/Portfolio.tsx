'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import { PORTFOLIO } from '@/lib/constants'

const EXPO = [0.16, 1, 0.3, 1] as const
const SPRING = { type: 'spring', stiffness: 220, damping: 22 } as const

export default function Portfolio() {
  const project = PORTFOLIO[0]

  return (
    <section id="portfolio" className="bg-canvas py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
          >
            Our Work
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EXPO }}
              className="font-display font-black leading-none tracking-tight text-snow text-[clamp(2rem,5vw,3.5rem)]"
            >
              Real sites. Real businesses.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25, ease: EXPO }}
            className="mt-4 text-lg leading-relaxed text-smoke"
          >
            Every site is built custom for the client. No templates, no shortcuts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Main project card — slides up, then browser chrome draws in */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              opacity: { duration: 0.65, ease: EXPO },
              y: SPRING,
            }}
            className="md:col-span-8 cursor-default rounded-[1.75rem] border border-rim/50 bg-surface/60 p-1.5 group"
          >
            <div className="overflow-hidden rounded-[calc(1.75rem-6px)] bg-raised/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {/* Browser chrome — dots pop in, URL slides in */}
              <div className="flex items-center gap-0 border-b border-rim/40 bg-canvas/40 px-5 py-3 overflow-hidden">
                <div className="flex items-center gap-2.5 shrink-0">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 22,
                        delay: 0.2 + i * 0.07,
                      }}
                      className="h-2.5 w-2.5 rounded-full bg-rim"
                    />
                  ))}
                </div>
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.46, ease: EXPO }}
                  className="ml-3 overflow-hidden"
                  style={{ minWidth: 0 }}
                >
                  <span className="block truncate rounded-full bg-rim/40 px-3 py-1 text-xs text-ash">
                    {project.url.replace('https://', '')}
                  </span>
                </motion.div>
                <motion.a
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name}`}
                  className="ml-2 shrink-0 text-smoke transition-colors hover:text-snow"
                >
                  <ArrowUpRight size={14} weight="bold" />
                </motion.a>
              </div>

              {/* Preview — fades in after chrome */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="relative aspect-video flex flex-col items-center justify-center gap-4 bg-canvas/60"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,81,26,0.06)_0%,transparent_70%)]" />
                <span className="select-none font-display font-black leading-none text-[clamp(3rem,10vw,7rem)] text-ember/10">
                  RC
                </span>
                <p className="text-center text-sm text-smoke px-8">
                  {/* [[NEEDS: screenshot of reliant-contractors-ltd.vercel.app]] */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rim/60 px-3 py-1 text-xs">
                    <span className="text-ember">[[NEEDS:</span> screenshot of reliant-contractors-ltd.vercel.app
                    <span className="text-ember">]]</span>
                  </span>
                </p>
              </motion.div>

              {/* Card footer */}
              <div className="flex items-start justify-between gap-4 px-7 py-6">
                <div>
                  <h3 className="mb-1 font-display font-black text-snow text-xl tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-sm text-smoke">{project.description}</p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex shrink-0 items-center gap-2 rounded-full border border-rim/60 px-4 py-2 text-sm font-semibold text-snow transition-all duration-200 hover:border-ember/40 hover:bg-surface"
                >
                  View live
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Tags + coming soon */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EXPO }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-rim/50 bg-surface/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-smoke"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{
                opacity: { duration: 0.5, delay: 0.2, ease: EXPO },
                y: SPRING,
              }}
              className="cursor-default rounded-[1.75rem] border border-rim/30 bg-surface/30 p-1.5"
            >
              <div className="rounded-[calc(1.75rem-6px)] bg-canvas/40 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <p className="mb-2 font-display font-black text-snow text-lg">More coming soon.</p>
                <p className="text-sm leading-relaxed text-smoke">
                  We build one site at a time and do it right. Your project gets full attention.
                </p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ember transition-colors hover:text-ember/80"
                >
                  Start your project
                  <ArrowUpRight size={13} weight="bold" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
