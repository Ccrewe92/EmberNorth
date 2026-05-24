'use client'

import { useEffect, useRef } from 'react'

const COLORS = ['#E8511A', '#FF6B35', '#FFB347', '#FFD580', '#FF8C42']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export default function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    let animId: number
    let frame = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const spawn = () => {
      if (particles.length >= 90) return
      particles.push({
        x:       Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
        y:       canvas.height + 6,
        vx:      (Math.random() - 0.5) * 0.9,
        vy:      -(Math.random() * 1.6 + 0.8),   // faster rise
        size:    Math.random() * 3.0 + 1.2,       // bigger
        opacity: Math.random() * 0.55 + 0.35,     // brighter base
        color:   COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const tick = () => {
      animId = requestAnimationFrame(tick)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      frame++
      if (frame % 4 === 0) spawn()   // spawn more frequently

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx + Math.sin(frame * 0.018 + i) * 0.22
        p.y += p.vy
        p.opacity -= 0.0028             // slower fade = visible longer

        if (p.opacity <= 0 || p.y < -10) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.globalAlpha  = p.opacity
        ctx.fillStyle    = p.color
        ctx.shadowColor  = p.color
        ctx.shadowBlur   = p.size * 10  // stronger glow halo
        ctx.fill()
        ctx.restore()
      }
    }

    tick()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80"
      aria-hidden="true"
    />
  )
}
