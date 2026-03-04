'use client'

import { useState } from 'react'

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [uppercase, setUppercase] = useState(false)
  const [copied, setCopied] = useState(-1)

  const generate = () => {
    const list = Array.from({ length: count }, () => {
      const id = crypto.randomUUID()
      return uppercase ? id.toUpperCase() : id
    })
    setUuids(list)
  }

  const copyOne = (i: number) => {
    navigator.clipboard.writeText(uuids[i])
    setCopied(i)
    setTimeout(() => setCopied(-1), 1500)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied(-2)
    setTimeout(() => setCopied(-1), 1500)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={generate} className="btn-primary">
          Generate
        </button>
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value={1}>1 UUID</option>
          <option value={5}>5 UUIDs</option>
          <option value={10}>10 UUIDs</option>
          <option value={25}>25 UUIDs</option>
          <option value={50}>50 UUIDs</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded"
          />
          Uppercase
        </label>
        {uuids.length > 1 && (
          <button onClick={copyAll} className="text-sm text-indigo-600 hover:text-indigo-800">
            {copied === -2 ? 'Copied!' : 'Copy All'}
          </button>
        )}
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
          >
            <code className="text-sm">{uuid}</code>
            <button
              onClick={() => copyOne(i)}
              className="ml-4 text-sm text-indigo-600 hover:text-indigo-800"
            >
              {copied === i ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
