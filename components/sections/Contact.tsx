'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, EnvelopeSimple } from '@phosphor-icons/react'
import { BRAND } from '@/lib/constants'

const EXPO = [0.16, 1, 0.3, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, delay, ease: EXPO },
  }
}

const inputClass =
  'w-full rounded-xl border border-rim/50 bg-surface/60 px-4 py-3 text-snow text-sm placeholder:text-ash outline-none transition-all duration-200 focus:border-ember/50 focus:bg-surface focus:shadow-[0_0_0_3px_rgba(232,81,26,0.1)]'

const labelClass =
  'block text-[11px] font-semibold uppercase tracking-[0.14em] text-smoke mb-2'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    const business = data.get('business') as string
    const phone = data.get('phone') as string
    const email = data.get('email') as string
    const description = data.get('description') as string

    const subject = encodeURIComponent(`Website inquiry from ${name} — ${business}`)
    const body = encodeURIComponent(
      `Name: ${name}\nBusiness: ${business}\nPhone: ${phone}\nEmail: ${email}\n\n${description}`
    )
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setSent(true)
      setLoading(false)
    }, 800)
  }

  return (
    <section id="contact" className="bg-surface/30 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — copy + contact links */}
          <div className="md:col-span-5">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
              >
                Contact
              </motion.p>
              <div className="overflow-hidden mb-6">
                <motion.h2
                  initial={{ y: '105%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: EXPO }}
                  className="font-display font-black text-snow leading-none tracking-tight text-[clamp(2rem,4.5vw,3.25rem)]"
                >
                  Let&apos;s build something.
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2, ease: EXPO }}
                className="text-lg leading-relaxed text-smoke max-w-md"
              >
                Tell us about your business and we&apos;ll put together a free preview. No
                commitment, no cost.
              </motion.p>
            </div>

            <motion.div {...fadeUp(0.15)} className="mt-10 flex flex-col gap-4">
              <a
                href={`tel:${BRAND.tel}`}
                className="group inline-flex items-center gap-4 rounded-2xl border border-rim/40 bg-surface/40 px-5 py-4 transition-all duration-200 hover:border-ember/30 hover:bg-surface"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ember/20 bg-ember/10 text-ember">
                  <Phone size={18} weight="duotone" />
                </span>
                <div>
                  <p className="text-xs text-smoke mb-0.5">Call us</p>
                  <p className="text-sm font-semibold text-snow">{BRAND.phone}</p>
                </div>
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="group inline-flex items-center gap-4 rounded-2xl border border-rim/40 bg-surface/40 px-5 py-4 transition-all duration-200 hover:border-ember/30 hover:bg-surface"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ember/20 bg-ember/10 text-ember">
                  <EnvelopeSimple size={18} weight="duotone" />
                </span>
                <div>
                  <p className="text-xs text-smoke mb-0.5">Email us</p>
                  <p className="text-sm font-semibold text-snow">{BRAND.email}</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div {...fadeUp(0.1)} className="md:col-span-7">
            <div className="rounded-[1.75rem] border border-rim/50 bg-surface/60 p-1.5">
              <div className="rounded-[calc(1.75rem-6px)] bg-raised/60 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-14 gap-5 text-center">
                    {/* Animated SVG checkmark */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-ember/30 bg-ember/10"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
                        <motion.path
                          d="M5 13l4 4L19 7"
                          stroke="#E8511A"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.25, ease: EXPO }}
                        />
                      </svg>
                    </motion.div>
                    <h3 className="font-display font-black text-snow text-xl tracking-tight">
                      Message sent.
                    </h3>
                    <p className="max-w-xs leading-relaxed text-smoke">
                      Your default email app should have opened. If not, reach us directly at{' '}
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="text-snow underline underline-offset-2"
                      >
                        {BRAND.email}
                      </a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelClass}>Your Name</label>
                        <input id="name" name="name" type="text" required autoComplete="name" placeholder="Clinton Crewe" className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="business" className={labelClass}>Business Name</label>
                        <input id="business" name="business" type="text" required autoComplete="organization" placeholder="Reliant Contractors" className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className={labelClass}>Phone</label>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(780) 555-0123" className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email <span className="text-ember">*</span>
                        </label>
                        <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@yourbusiness.ca" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="description" className={labelClass}>Tell us about your business</label>
                      <textarea id="description" name="description" rows={4} placeholder="What you do, where you're based, what you need..." className={`${inputClass} resize-none`} />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-snow shadow-[0_0_20px_-4px_rgba(232,81,26,0.35)] transition-all duration-200 hover:bg-ember/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                            className="block h-4 w-4 rounded-full border-2 border-snow/30 border-t-snow"
                          />
                          Sending...
                        </span>
                      ) : (
                        'Send message'
                      )}
                    </button>

                    <p className="text-center text-xs text-ash">
                      Free preview. No commitment. We reply within one business day.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
