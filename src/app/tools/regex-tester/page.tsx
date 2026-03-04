import type { Metadata } from 'next'
import RegexTester from '@/components/tools/RegexTester'

export const metadata: Metadata = {
  title: 'Regex Tester - Test Regular Expressions Online',
  description:
    'Free online regex tester. Test and debug regular expressions with real-time matching, highlighting, and group capture display.',
  keywords: ['regex tester', 'regular expression tester', 'regex online', 'regex debugger', 'test regex', 'regex match'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Regex Tester</h1>
      <p className="mb-6 text-gray-600">
        Test regular expressions with real-time matching and highlighted results.
      </p>
      <RegexTester />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About Regular Expressions</h2>
        <p>Regular expressions (regex) are patterns used to match character combinations in strings. This tool supports JavaScript regex syntax with all standard flags (g, i, m, s, u).</p>
        <p>Matches are highlighted in real-time and named capture groups are displayed for each match.</p>
      </section>
    </div>
  )
}
