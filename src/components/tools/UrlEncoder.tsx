'use client'

import { useState } from 'react'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const encodeComp = () => {
    setOutput(encodeURIComponent(input))
    setError('')
  }

  const decodeComp = () => {
    try {
      setOutput(decodeURIComponent(input))
      setError('')
    } catch {
      setError('Invalid encoded string')
    }
  }

  const encodeFull = () => {
    setOutput(encodeURI(input))
    setError('')
  }

  const decodeFull = () => {
    try {
      setOutput(decodeURI(input))
      setError('')
    } catch {
      setError('Invalid encoded URI')
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
        <button onClick={encodeComp} className="btn-primary">Encode Component</button>
        <button onClick={decodeComp} className="btn-secondary">Decode Component</button>
        <button onClick={encodeFull} className="btn-primary">Encode URI</button>
        <button onClick={decodeFull} className="btn-secondary">Decode URI</button>
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
            placeholder="Enter text or URL to encode/decode..."
            className="tool-textarea h-48"
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
          <textarea value={output} readOnly className="tool-textarea h-48 bg-gray-50" />
        </div>
      </div>
    </div>
  )
}
