'use client'

import { useState } from 'react'

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100
  if (s === 0) {
    const v = Math.round(l * 255)
    return [v, v, v]
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ]
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366f1')
  const [r, setR] = useState(99)
  const [g, setG] = useState(102)
  const [b, setB] = useState(241)
  const [h, setH] = useState(239)
  const [s, setS] = useState(84)
  const [l, setL] = useState(67)
  const [copied, setCopied] = useState('')

  const fromHex = (v: string) => {
    setHex(v)
    const rgb = hexToRgb(v)
    if (rgb) {
      setR(rgb[0]); setG(rgb[1]); setB(rgb[2])
      const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2])
      setH(hsl[0]); setS(hsl[1]); setL(hsl[2])
    }
  }

  const fromRgb = (nr: number, ng: number, nb: number) => {
    setR(nr); setG(ng); setB(nb)
    setHex(rgbToHex(nr, ng, nb))
    const hsl = rgbToHsl(nr, ng, nb)
    setH(hsl[0]); setS(hsl[1]); setL(hsl[2])
  }

  const fromHsl = (nh: number, ns: number, nl: number) => {
    setH(nh); setS(ns); setL(nl)
    const rgb = hslToRgb(nh, ns, nl)
    setR(rgb[0]); setG(rgb[1]); setB(rgb[2])
    setHex(rgbToHex(rgb[0], rgb[1], rgb[2]))
  }

  const copy = (label: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div>
      {/* Color preview */}
      <div
        className="mb-6 h-32 rounded-xl border shadow-inner"
        style={{ backgroundColor: hex }}
      />

      {/* Color picker */}
      <div className="mb-6">
        <input
          type="color"
          value={hex}
          onChange={(e) => fromHex(e.target.value)}
          className="h-10 w-20 cursor-pointer rounded border"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* HEX */}
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">HEX</label>
            <button
              onClick={() => copy('hex', hex)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {copied === 'hex' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <input
            value={hex}
            onChange={(e) => fromHex(e.target.value)}
            className="w-full rounded border px-3 py-2 font-mono text-sm"
          />
        </div>

        {/* RGB */}
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">RGB</label>
            <button
              onClick={() => copy('rgb', `rgb(${r}, ${g}, ${b})`)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {copied === 'rgb' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex gap-2">
            <input type="number" min={0} max={255} value={r} onChange={(e) => fromRgb(+e.target.value, g, b)} className="w-full rounded border px-2 py-2 font-mono text-sm" />
            <input type="number" min={0} max={255} value={g} onChange={(e) => fromRgb(r, +e.target.value, b)} className="w-full rounded border px-2 py-2 font-mono text-sm" />
            <input type="number" min={0} max={255} value={b} onChange={(e) => fromRgb(r, g, +e.target.value)} className="w-full rounded border px-2 py-2 font-mono text-sm" />
          </div>
          <p className="mt-1 font-mono text-xs text-gray-400">rgb({r}, {g}, {b})</p>
        </div>

        {/* HSL */}
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">HSL</label>
            <button
              onClick={() => copy('hsl', `hsl(${h}, ${s}%, ${l}%)`)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {copied === 'hsl' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex gap-2">
            <input type="number" min={0} max={360} value={h} onChange={(e) => fromHsl(+e.target.value, s, l)} className="w-full rounded border px-2 py-2 font-mono text-sm" />
            <input type="number" min={0} max={100} value={s} onChange={(e) => fromHsl(h, +e.target.value, l)} className="w-full rounded border px-2 py-2 font-mono text-sm" />
            <input type="number" min={0} max={100} value={l} onChange={(e) => fromHsl(h, s, +e.target.value)} className="w-full rounded border px-2 py-2 font-mono text-sm" />
          </div>
          <p className="mt-1 font-mono text-xs text-gray-400">hsl({h}, {s}%, {l}%)</p>
        </div>
      </div>
    </div>
  )
}
