'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-ember pointer-events-none"
    />
  )
}
