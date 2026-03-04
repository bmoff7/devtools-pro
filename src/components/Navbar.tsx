'use client'

import Link from 'next/link'
import { useState } from 'react'

const tools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'Base64', href: '/tools/base64' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'URL Encoder', href: '/tools/url-encoder' },
  { name: 'Regex Tester', href: '/tools/regex-tester' },
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
  { name: 'Markdown Preview', href: '/tools/markdown-preview' },
  { name: 'Color Converter', href: '/tools/color-converter' },
  { name: 'Lorem Generator', href: '/tools/lorem-generator' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          DevTools Pro
        </Link>

        {/* Desktop */}
        <div className="hidden gap-1 md:flex">
          {tools.slice(0, 6).map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {t.name}
            </Link>
          ))}
          <div className="relative group">
            <button className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700">
              More &darr;
            </button>
            <div className="invisible absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border bg-white py-1 shadow-lg group-hover:visible">
              {tools.slice(6).map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded p-2 text-gray-600 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? '\u2715' : '\u2630'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-white px-4 py-2 md:hidden">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block rounded px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50"
              onClick={() => setOpen(false)}
            >
              {t.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
