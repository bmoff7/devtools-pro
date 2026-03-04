import type { Metadata } from 'next'
import UrlEncoder from '@/components/tools/UrlEncoder'

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder - Encode and Decode URLs Online',
  description:
    'Free online URL encoder and decoder. Encode URL components or full URIs with encodeURIComponent and encodeURI.',
  keywords: ['url encoder', 'url decoder', 'encode url online', 'decode url online', 'percent encoding', 'urlencode'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">URL Encoder / Decoder</h1>
      <p className="mb-6 text-gray-600">
        Encode and decode URL components and full URIs instantly.
      </p>
      <UrlEncoder />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About URL Encoding</h2>
        <p>URL encoding (percent-encoding) replaces unsafe characters with a &quot;%&quot; followed by their hex value. This tool supports both component encoding (for query parameters) and full URI encoding.</p>
      </section>
    </div>
  )
}
