import type { Metadata } from 'next'
import HashGenerator from '@/components/tools/HashGenerator'

export const metadata: Metadata = {
  title: 'Hash Generator - SHA-1, SHA-256, SHA-512 Online Hash Generator',
  description:
    'Generate SHA-1, SHA-256, and SHA-512 hashes from any text. Free, fast, and secure - all hashing happens in your browser using the Web Crypto API.',
  keywords: ['hash generator', 'sha256 hash', 'sha512 hash', 'sha1 hash', 'online hash generator', 'hash calculator'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Hash Generator</h1>
      <p className="mb-6 text-gray-600">
        Generate SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text.
      </p>
      <HashGenerator />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About Hash Generation</h2>
        <p>Cryptographic hash functions produce a fixed-size output (hash) from any input. They are one-way functions, meaning you cannot reverse the hash to get the original input.</p>
        <p>This tool uses the Web Crypto API built into your browser for secure, fast hash generation. Your text is never sent to any server.</p>
      </section>
    </div>
  )
}
