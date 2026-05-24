import type { Metadata } from 'next'
import { Syne, Manrope } from 'next/font/google'
import './globals.css'
import { localBusinessSchema } from '@/lib/schema'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EmberNorth — Websites for Calgary Contractors & Small Business',
  description:
    'Affordable, modern websites for Calgary contractors and small businesses. You own everything. $300 flat build fee. No lock-in, no exit fees. Built by EmberNorth.',
  metadataBase: new URL('https://embernorth.ca'),
  openGraph: {
    title: 'EmberNorth — Websites for Calgary Contractors & Small Business',
    description:
      'Affordable, modern websites for Calgary contractors and small businesses. $300 flat. No lock-in. No exit fees.',
    url: 'https://embernorth.ca',
    siteName: 'EmberNorth',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
