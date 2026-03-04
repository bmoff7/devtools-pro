import type { Metadata } from 'next'
import JsonFormatter from '@/components/tools/JsonFormatter'

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Format, Validate, Minify JSON Online',
  description:
    'Free online JSON formatter, validator, and minifier. Beautify and validate your JSON data instantly. Runs entirely in your browser - no data is sent to any server.',
  keywords: ['json formatter', 'json validator', 'json beautifier', 'json minifier', 'format json online', 'pretty print json'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">JSON Formatter & Validator</h1>
      <p className="mb-6 text-gray-600">
        Format, validate, and minify JSON data instantly. Your data never leaves your browser.
      </p>
      <JsonFormatter />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About This Tool</h2>
        <p>This free JSON formatter lets you beautify, validate, and minify JSON data. It supports customizable indentation (2 or 4 spaces) and provides clear error messages for invalid JSON.</p>
        <p>All processing happens client-side using your browser&apos;s built-in JSON parser. No data is ever transmitted to a server, making this tool safe for sensitive data.</p>
      </section>
    </div>
  )
}
