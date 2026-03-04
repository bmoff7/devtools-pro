import type { Metadata } from 'next'
import LoremGenerator from '@/components/tools/LoremGenerator'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Generate Placeholder Text Online',
  description:
    'Free Lorem Ipsum generator. Generate placeholder text by paragraphs, sentences, or words for your designs and mockups.',
  keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text generator', 'lorem ipsum', 'filler text'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Lorem Ipsum Generator</h1>
      <p className="mb-6 text-gray-600">
        Generate placeholder text for your designs, mockups, and prototypes.
      </p>
      <LoremGenerator />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About Lorem Ipsum</h2>
        <p>Lorem Ipsum is placeholder text used in the printing and typesetting industry since the 1500s. It provides a natural-looking distribution of letters for layout and design work.</p>
      </section>
    </div>
  )
}
