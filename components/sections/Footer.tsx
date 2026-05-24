import { BRAND } from '@/lib/constants'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="border-t border-rim/30 bg-canvas py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-rim/20">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="font-display font-black text-snow text-2xl tracking-wider uppercase mb-3">
              {BRAND.name.toUpperCase()}
            </p>
            <p className="text-smoke text-sm leading-relaxed max-w-xs">
              Affordable, modern websites for Calgary contractors and small businesses.
              You own everything.
            </p>
            <div className="mt-6 flex flex-col gap-1.5">
              <a
                href={`tel:${BRAND.tel}`}
                className="text-sm text-smoke hover:text-snow transition-colors w-fit"
              >
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-sm text-smoke hover:text-snow transition-colors w-fit"
              >
                {BRAND.email}
              </a>
              <p className="text-sm text-ash">{BRAND.location}</p>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-smoke mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-smoke hover:text-snow transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-4 md:col-start-10 flex flex-col items-start md:items-end justify-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-smoke mb-5 self-start md:self-end">
              Get Started
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-snow transition-all duration-300 hover:bg-ember/90 active:scale-[0.98]"
            >
              Free Preview
            </a>
            <p className="mt-3 text-xs text-ash text-right self-start md:self-end">
              No commitment. No cost.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-ash">
            &copy; {new Date().getFullYear()} {BRAND.name}. {BRAND.location}.
          </p>
          <p className="text-xs text-ash/60">
            Built by {BRAND.name}.
          </p>
        </div>
      </div>
    </footer>
  )
}
