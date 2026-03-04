'use client'

import { useState } from 'react'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))))
      setError('')
    } catch (e: any) {
      setError('Encoding failed: ' + e.message)
    }
  }

  const decode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input.trim()))))
      setError('')
    } catch {
      setError('Invalid Base64 string')
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={encode} className="btn-primary">
          Encode
        </button>
        <button onClick={decode} className="btn-secondary">
          Decode
        </button>
        <button onClick={() => { setInput(output); setOutput('') }} className="btn-ghost">
          Swap
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="btn-ghost">
          Clear
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or Base64 string to decode..."
            className="tool-textarea h-64"
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Output</label>
            {output && (
              <button onClick={copy} className="text-sm text-indigo-600 hover:text-indigo-800">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea value={output} readOnly className="tool-textarea h-64 bg-gray-50" />
        </div>
      </div>
    </div>
  )
}
