import type { Metadata } from 'next'
import Base64Tool from '@/components/tools/Base64Tool'

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder - Encode and Decode Base64 Online',
  description:
    'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings instantly in your browser.',
  keywords: ['base64 encoder', 'base64 decoder', 'base64 encode online', 'base64 decode online', 'convert to base64'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Base64 Encoder / Decoder</h1>
      <p className="mb-6 text-gray-600">
        Encode text to Base64 or decode Base64 strings instantly in your browser.
      </p>
      <Base64Tool />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About Base64 Encoding</h2>
        <p>Base64 is a binary-to-text encoding scheme that represents binary data as ASCII text. It&apos;s commonly used for encoding data in URLs, email attachments, and data URIs.</p>
        <p>This tool handles full UTF-8 text including special characters and emoji. All encoding and decoding happens in your browser.</p>
      </section>
    </div>
  )
}
