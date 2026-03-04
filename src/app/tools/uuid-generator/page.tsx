import type { Metadata } from 'next'
import UuidGenerator from '@/components/tools/UuidGenerator'

export const metadata: Metadata = {
  title: 'UUID Generator - Generate Random UUID v4 Online',
  description:
    'Generate random UUID v4 identifiers instantly. Bulk generation supported. Uses the Web Crypto API for true randomness.',
  keywords: ['uuid generator', 'uuid v4', 'random uuid', 'guid generator', 'generate uuid online', 'bulk uuid'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">UUID Generator</h1>
      <p className="mb-6 text-gray-600">
        Generate random UUID v4 identifiers. Supports bulk generation and uppercase formatting.
      </p>
      <UuidGenerator />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About UUID v4</h2>
        <p>UUID v4 (Universally Unique Identifier version 4) identifiers are 128-bit numbers generated using random or pseudo-random data. They&apos;re widely used as database primary keys, session IDs, and correlation IDs.</p>
        <p>This tool uses <code>crypto.randomUUID()</code> from the Web Crypto API for cryptographically strong randomness.</p>
      </section>
    </div>
  )
}
