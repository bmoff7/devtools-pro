import type { Metadata } from 'next'
import MarkdownPreview from '@/components/tools/MarkdownPreview'

export const metadata: Metadata = {
  title: 'Markdown Preview - Live Markdown Editor and Previewer',
  description:
    'Free online Markdown editor with live preview. Write Markdown and see rendered HTML in real time. Supports GitHub Flavored Markdown.',
  keywords: ['markdown preview', 'markdown editor', 'markdown to html', 'live markdown', 'markdown online', 'github markdown'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Markdown Preview</h1>
      <p className="mb-6 text-gray-600">
        Write Markdown and see a live rendered preview side by side.
      </p>
      <MarkdownPreview />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About Markdown</h2>
        <p>Markdown is a lightweight markup language for creating formatted text. It&apos;s widely used for documentation, README files, and content management systems.</p>
      </section>
    </div>
  )
}
