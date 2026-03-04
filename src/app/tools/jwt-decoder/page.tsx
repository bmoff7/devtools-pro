import type { Metadata } from 'next'
import JwtDecoder from '@/components/tools/JwtDecoder'

export const metadata: Metadata = {
  title: 'JWT Decoder - Decode JSON Web Tokens Online',
  description:
    'Free online JWT decoder. Decode and inspect JSON Web Token headers, payloads, and signatures. Check token expiration status instantly.',
  keywords: ['jwt decoder', 'jwt debugger', 'decode jwt', 'json web token decoder', 'jwt parser', 'jwt online'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">JWT Decoder</h1>
      <p className="mb-6 text-gray-600">
        Decode and inspect JSON Web Tokens. View headers, payloads, and check expiration.
      </p>
      <JwtDecoder />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About JSON Web Tokens</h2>
        <p>JWTs are compact, URL-safe tokens used for authentication and information exchange. They consist of three parts: a header (algorithm info), payload (claims), and signature.</p>
        <p>This tool decodes the token locally in your browser. It does not verify signatures - for that, you need the signing secret or public key.</p>
      </section>
    </div>
  )
}
