'use client'

import { useState } from 'react'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState('')

  const generate = async () => {
    if (!input) return
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const algorithms = ['SHA-1', 'SHA-256', 'SHA-512']
    const results: Record<string, string> = {}
    for (const algo of algorithms) {
      const buf = await crypto.subtle.digest(algo, data)
      results[algo] = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    }
    setHashes(results)
  }

  const copy = (algo: string, hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopied(algo)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="tool-textarea h-32"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generate()
          }}
        />
      </div>

      <button onClick={generate} className="btn-primary mb-6">
        Generate Hashes
      </button>

      {Object.entries(hashes).length > 0 && (
        <div className="space-y-3">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="rounded-lg bg-gray-50 p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{algo}</span>
                <button
                  onClick={() => copy(algo, hash)}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {copied === algo ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="break-all font-mono text-sm text-gray-600">{hash}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
