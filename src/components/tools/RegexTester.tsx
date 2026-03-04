'use client'

import { useState, useMemo } from 'react'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testStr, setTestStr] = useState('')
  const [error, setError] = useState('')

  const matches = useMemo(() => {
    if (!pattern || !testStr) {
      setError('')
      return []
    }
    try {
      const re = new RegExp(pattern, flags)
      setError('')
      const results: { match: string; index: number; groups?: Record<string, string> }[] = []
      let m: RegExpExecArray | null
      if (flags.includes('g')) {
        while ((m = re.exec(testStr)) !== null) {
          results.push({ match: m[0], index: m.index, groups: m.groups })
          if (!m[0]) re.lastIndex++
        }
      } else {
        m = re.exec(testStr)
        if (m) results.push({ match: m[0], index: m.index, groups: m.groups })
      }
      return results
    } catch (e: any) {
      setError(e.message)
      return []
    }
  }, [pattern, flags, testStr])

  const highlighted = useMemo(() => {
    if (!pattern || !testStr || error) return null
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      let last = 0
      const parts: { text: string; matched: boolean }[] = []
      let m: RegExpExecArray | null
      while ((m = re.exec(testStr)) !== null) {
        if (m.index > last) parts.push({ text: testStr.slice(last, m.index), matched: false })
        parts.push({ text: m[0], matched: true })
        last = m.index + m[0].length
        if (!m[0]) { re.lastIndex++; last++ }
      }
      if (last < testStr.length) parts.push({ text: testStr.slice(last), matched: false })
      return parts
    } catch {
      return null
    }
  }, [pattern, flags, testStr, error])

  return (
    <div>
      <div className="mb-4 grid gap-4 md:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Pattern</label>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="w-full rounded-lg border px-4 py-2 font-mono text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Flags</label>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g"
            className="w-24 rounded-lg border px-4 py-2 font-mono text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">Test String</label>
        <textarea
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          placeholder="Enter test string..."
          className="tool-textarea h-40"
        />
      </div>

      {highlighted && highlighted.length > 0 && (
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">Highlighted</label>
          <div className="rounded-lg border bg-white p-4 font-mono text-sm whitespace-pre-wrap break-all">
            {highlighted.map((p, i) =>
              p.matched ? (
                <mark key={i} className="rounded bg-yellow-200 px-0.5">
                  {p.text}
                </mark>
              ) : (
                <span key={i}>{p.text}</span>
              )
            )}
          </div>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Matches ({matches.length})
        </label>
        {matches.length > 0 ? (
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div key={i} className="rounded-lg bg-gray-50 p-3 font-mono text-sm">
                <span className="text-gray-400">#{i + 1}</span>{' '}
                <span className="font-semibold text-indigo-700">{JSON.stringify(m.match)}</span>{' '}
                <span className="text-gray-400">at index {m.index}</span>
                {m.groups && (
                  <div className="mt-1 text-xs text-gray-500">
                    Groups: {JSON.stringify(m.groups)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          pattern && testStr && !error && (
            <p className="text-sm text-gray-400">No matches found</p>
          )
        )}
      </div>
    </div>
  )
}
