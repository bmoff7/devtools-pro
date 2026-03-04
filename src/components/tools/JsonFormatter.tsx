'use client'

import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  const validate = () => {
    try {
      JSON.parse(input)
      setOutput('Valid JSON')
      setError('')
    } catch (e: any) {
      setError('Invalid JSON: ' + e.message)
      setOutput('')
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const sample = () => {
    const s = {
      name: 'DevTools Pro',
      version: '1.0.0',
      features: ['JSON Formatter', 'Base64', 'Hash Generator'],
      config: { theme: 'dark', autoSave: true },
    }
    setInput(JSON.stringify(s))
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button onClick={format} className="btn-primary">
          Format
        </button>
        <button onClick={minify} className="btn-secondary">
          Minify
        </button>
        <button onClick={validate} className="btn-green">
          Validate
        </button>
        <select
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
        <button onClick={sample} className="btn-ghost">
          Load Sample
        </button>
        <button onClick={clear} className="btn-ghost">
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
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="tool-textarea h-96"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) format()
            }}
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
          <textarea value={output} readOnly className="tool-textarea h-96 bg-gray-50" />
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-400">
        Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to format
      </p>
    </div>
  )
}
