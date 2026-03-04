import type { Metadata } from 'next'
import ColorConverter from '@/components/tools/ColorConverter'

export const metadata: Metadata = {
  title: 'Color Converter - HEX, RGB, HSL Color Converter Online',
  description:
    'Free online color converter. Convert colors between HEX, RGB, and HSL formats instantly with a live color preview and picker.',
  keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter', 'color picker', 'hex to hsl'],
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Color Converter</h1>
      <p className="mb-6 text-gray-600">
        Convert colors between HEX, RGB, and HSL with a live preview and color picker.
      </p>
      <ColorConverter />
      <section className="mt-12 max-w-3xl text-sm text-gray-500 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">About Color Formats</h2>
        <p>HEX uses hexadecimal notation (#RRGGBB). RGB specifies red, green, blue channels (0-255). HSL uses hue (0-360), saturation (0-100%), and lightness (0-100%).</p>
      </section>
    </div>
  )
}
