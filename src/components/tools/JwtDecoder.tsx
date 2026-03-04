'use client'

import { useState } from 'react'

function decodeBase64Url(str: string) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  return decodeURIComponent(
    atob(padded)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const parts = (() => {
    if (!token.trim()) return null
    const segments = token.trim().split('.')
    if (segments.length !== 3) {
      return null
    }
    try {
      const header = JSON.parse(decodeBase64Url(segments[0]))
      const payload = JSON.parse(decodeBase64Url(segments[1]))
      return { header, payload, signature: segments[2] }
    } catch {
      return null
    }
  })()

  const isExpired = parts?.payload?.exp
    ? parts.payload.exp * 1000 < Date.now()
    : null

  const copy = (section: string, data: string) => {
    navigator.clipboard.writeText(data)
    setCopied(section)
    setTimeout(() => setCopied(''), 1500)
  }

  const loadSample = () => {
    setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    )
    setError('')
  }

  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 flex gap-2">
          <button onClick={loadSample} className="btn-ghost">
            Load Sample
          </button>
          <button onClick={() => { setToken(''); setError('') }} className="btn-ghost">
            Clear
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => { setToken(e.target.value); setError('') }}
          placeholder="Paste your JWT token here..."
          className="tool-textarea h-28"
        />
      </div>

      {token.trim() && !parts && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Invalid JWT format. A valid JWT has three Base64-encoded sections separated by dots.
        </div>
      )}

      {parts && (
        <div className="space-y-4">
          {isExpired !== null && (
            <div
              className={`rounded-lg border p-3 text-sm ${
                isExpired
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-green-200 bg-green-50 text-green-700'
              }`}
            >
              {isExpired
                ? `Token expired on ${new Date(parts.payload.exp * 1000).toLocaleString()}`
                : `Token valid until ${new Date(parts.payload.exp * 1000).toLocaleString()}`}
            </div>
          )}

          <Section
            title="Header"
            data={parts.header}
            color="text-red-600"
            copied={copied}
            onCopy={(d) => copy('header', d)}
          />
          <Section
            title="Payload"
            data={parts.payload}
            color="text-purple-600"
            copied={copied}
            onCopy={(d) => copy('payload', d)}
          />
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-cyan-600">Signature</span>
              <button
                onClick={() => copy('signature', parts.signature)}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                {copied === 'signature' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="break-all font-mono text-xs text-gray-500">{parts.signature}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({
  title,
  data,
  color,
  copied,
  onCopy,
}: {
  title: string
  data: any
  color: string
  copied: string
  onCopy: (d: string) => void
}) {
  const formatted = JSON.stringify(data, null, 2)
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <div className="mb-1 flex items-center justify-between">
        <span className={`text-sm font-semibold ${color}`}>{title}</span>
        <button
          onClick={() => onCopy(formatted)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {copied === title.toLowerCase() ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto font-mono text-sm text-gray-700">{formatted}</pre>
    </div>
  )
}
