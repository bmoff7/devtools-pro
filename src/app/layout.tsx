import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'DevTools Pro - Free Online Developer Tools',
    template: '%s | DevTools Pro',
  },
  description:
    'Free, fast, and private developer tools. JSON formatter, Base64 encoder, hash generator, UUID generator, regex tester, and more. All tools run in your browser.',
  keywords: [
    'developer tools',
    'json formatter',
    'base64 encoder',
    'hash generator',
    'uuid generator',
    'url encoder',
    'regex tester',
    'jwt decoder',
    'online tools',
    'free developer tools',
  ],
  openGraph: {
    title: 'DevTools Pro - Free Online Developer Tools',
    description:
      'Free, fast, and private developer tools that run entirely in your browser.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9740462215782549"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
          <p>
            DevTools Pro &mdash; All tools run 100% in your browser. Your data
            never leaves your device.
          </p>
        </footer>
      </body>
    </html>
  )
}
