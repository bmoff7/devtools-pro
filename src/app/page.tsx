import Link from 'next/link'

const tools = [
  {
    name: 'JSON Formatter',
    desc: 'Format, validate, and minify JSON data instantly',
    href: '/tools/json-formatter',
    icon: '{ }',
  },
  {
    name: 'Base64 Encoder/Decoder',
    desc: 'Encode and decode Base64 strings with ease',
    href: '/tools/base64',
    icon: 'B64',
  },
  {
    name: 'Hash Generator',
    desc: 'Generate SHA-1, SHA-256, and SHA-512 hashes',
    href: '/tools/hash-generator',
    icon: '#!',
  },
  {
    name: 'UUID Generator',
    desc: 'Generate random UUID v4 identifiers in bulk',
    href: '/tools/uuid-generator',
    icon: 'ID',
  },
  {
    name: 'URL Encoder/Decoder',
    desc: 'Encode and decode URL components and full URIs',
    href: '/tools/url-encoder',
    icon: '%2F',
  },
  {
    name: 'Regex Tester',
    desc: 'Test regular expressions with real-time matching',
    href: '/tools/regex-tester',
    icon: '/.*/',
  },
  {
    name: 'JWT Decoder',
    desc: 'Decode and inspect JSON Web Tokens instantly',
    href: '/tools/jwt-decoder',
    icon: 'JWT',
  },
  {
    name: 'Markdown Preview',
    desc: 'Write Markdown and see a live rendered preview',
    href: '/tools/markdown-preview',
    icon: 'MD',
  },
  {
    name: 'Color Converter',
    desc: 'Convert colors between HEX, RGB, and HSL formats',
    href: '/tools/color-converter',
    icon: '\u{1F3A8}',
  },
  {
    name: 'Lorem Ipsum Generator',
    desc: 'Generate placeholder text for your designs',
    href: '/tools/lorem-generator',
    icon: 'Aa',
  },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900">
          Free Online Developer Tools
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Fast, private, and completely free. Every tool runs entirely in your
          browser &mdash; your data never leaves your device. No sign-up
          required.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-xl border bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
          >
            <div className="mb-3 inline-block rounded-lg bg-indigo-50 px-3 py-1 font-mono text-lg text-indigo-600">
              {tool.icon}
            </div>
            <h2 className="mb-1 text-lg font-semibold group-hover:text-indigo-600">
              {tool.name}
            </h2>
            <p className="text-sm text-gray-500">{tool.desc}</p>
          </Link>
        ))}
      </section>

      <section className="mt-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">Why DevTools Pro?</h2>
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-2 text-3xl">&#x1f512;</div>
            <h3 className="font-semibold">100% Private</h3>
            <p className="text-sm text-gray-500">
              All processing happens in your browser. Nothing is ever sent to a
              server.
            </p>
          </div>
          <div>
            <div className="mb-2 text-3xl">&#x26a1;</div>
            <h3 className="font-semibold">Lightning Fast</h3>
            <p className="text-sm text-gray-500">
              Instant results with no loading spinners or server round-trips.
            </p>
          </div>
          <div>
            <div className="mb-2 text-3xl">&#x1f4b0;</div>
            <h3 className="font-semibold">Completely Free</h3>
            <p className="text-sm text-gray-500">
              No sign-up, no limits, no hidden fees. Just tools that work.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
