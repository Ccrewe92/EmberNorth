'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { faqSchema } from '@/lib/schema'

const EXPO = [0.16, 1, 0.3, 1] as const

const faqs = [
  {
    q: 'Do I own the website?',
    a: "Yes. 100%. The code, the files, and the domain are yours from the moment the build fee is paid. We don't retain any ownership or rights. Ever.",
  },
  {
    q: 'What if I want to cancel the monthly plan?',
    a: "30 days written notice. No cancellation fees, no exit fees. We'll deliver every file within 5 business days at no charge. No questions asked.",
  },
  {
    q: "What's included in the monthly plan?",
    a: 'Plan A ($40/month) covers hosting, DNS management, security updates, and up to 4 hours of content changes per month. Plan B ($50/month) adds domain renewal management and one professional email address at your domain.',
  },
  {
    q: 'How long does a build take?',
    a: "Most sites are ready for review within 5-7 business days of receiving your content. We build it first and show you — you only pay if you're happy with it.",
  },
  {
    q: 'Do you work outside Calgary?',
    a: 'Primarily Calgary and the surrounding area, but we can work with any local business in Alberta.',
  },
  {
    q: 'What makes EmberNorth different from other agencies?',
    a: "We build the site before you pay anything. You own everything from day one. Our contract says so explicitly. No lock-in, no exit fees, no surprises. Most agencies can't say any of that.",
  },
  {
    q: 'What technology do you use?',
    a: "Next.js — one of the fastest, most modern web frameworks available. Your site will load faster, rank better on Google, and be easier to build on in the future than anything built on WordPress or Wix.",
  },
]

function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EXPO }}
      className={`border-b border-rim/30 last:border-0 rounded-xl -mx-4 px-4 transition-colors duration-300 ${
        isOpen ? 'bg-surface/25' : ''
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="text-[1.0625rem] font-semibold leading-snug text-snow transition-colors duration-200 group-hover:text-ember">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EXPO }}
          className="mt-0.5 shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-rim/60 text-smoke transition-colors duration-200 group-hover:border-ember/30 group-hover:text-ember"
        >
          <CaretDown size={14} weight="bold" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <p className="pb-6 leading-relaxed text-smoke max-w-2xl">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-canvas py-28 lg:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky header */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
              >
                FAQ
              </motion.p>
              <div className="overflow-hidden mb-5">
                <motion.h2
                  initial={{ y: '105%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: EXPO }}
                  className="font-display font-black text-snow leading-none tracking-tight text-[clamp(2rem,4vw,3rem)]"
                >
                  Questions you probably have.
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: EXPO }}
                className="leading-relaxed text-smoke"
              >
                Straight answers. No fluff.
              </motion.p>
            </div>
          </div>

          {/* Accordion */}
          <div className="md:col-span-8">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
