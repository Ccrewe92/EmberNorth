'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { BRAND } from '@/lib/constants'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className={`
            flex items-center gap-2 px-3 py-2.5 rounded-full
            transition-all duration-500
            ${scrolled
              ? 'bg-surface/80 border border-rim/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border border-transparent'
            }
          `}
        >
          <a
            href="#"
            className="font-display font-black text-snow text-sm tracking-wider uppercase mr-2 select-none"
          >
            {BRAND.name.toUpperCase()}
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm text-smoke hover:text-snow rounded-full transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 ml-2 bg-ember text-snow text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:bg-ember/90 active:scale-[0.98]"
          >
            Free Preview
          </a>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="md:hidden p-2 text-smoke hover:text-snow transition-colors"
          >
            <List size={20} weight="bold" />
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[100] bg-canvas/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-rim/30">
              <span className="font-display font-black text-snow text-sm tracking-wider uppercase">
                {BRAND.name.toUpperCase()}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 text-smoke hover:text-snow transition-colors"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <nav className="flex flex-col px-6 pt-8 gap-2 flex-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05 + i * 0.07,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="text-3xl font-display font-black text-smoke hover:text-snow py-3 transition-colors duration-200 border-b border-rim/20"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 + links.length * 0.07,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="mt-8 inline-flex items-center justify-center bg-ember text-snow text-lg font-semibold px-6 py-4 rounded-full self-start"
              >
                Get a Free Preview
              </motion.a>
            </nav>

            <div className="px-6 pb-10 text-smoke text-sm">
              <a href={`tel:${BRAND.tel}`} className="hover:text-snow transition-colors">
                {BRAND.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
