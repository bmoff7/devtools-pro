'use client'

import { useState } from 'react'

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
  'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores',
  'quas', 'molestias', 'recusandae', 'itaque', 'earum', 'rerum', 'hic', 'tenetur',
  'sapiente', 'delectus', 'reiciendis', 'maiores', 'alias', 'perferendis',
  'doloribus', 'asperiores', 'repellat',
]

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

function generateSentence(minWords = 6, maxWords = 14) {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords + 1))
  const words = Array.from({ length: len }, randomWord)
  words[0] = words[0][0].toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function generateParagraph(sentences = 4) {
  return Array.from({ length: sentences }, () => generateSentence()).join(' ')
}

export default function LoremGenerator() {
  const [count, setCount] = useState(3)
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [startWithLorem, setStartWithLorem] = useState(true)

  const generate = () => {
    let result = ''
    if (unit === 'paragraphs') {
      const paras = Array.from({ length: count }, () => generateParagraph())
      if (startWithLorem) {
        paras[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paras[0]
      }
      result = paras.join('\n\n')
    } else if (unit === 'sentences') {
      const sents = Array.from({ length: count }, () => generateSentence())
      if (startWithLorem) {
        sents[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
      result = sents.join(' ')
    } else {
      const words = Array.from({ length: count }, randomWord)
      if (startWithLorem && count >= 2) {
        words[0] = 'lorem'
        words[1] = 'ipsum'
      }
      result = words.join(' ')
    }
    setOutput(result)
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.max(1, +e.target.value))}
          className="w-20 rounded-lg border px-3 py-2 text-sm"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as any)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded"
          />
          Start with &quot;Lorem ipsum...&quot;
        </label>
        <button onClick={generate} className="btn-primary">
          Generate
        </button>
      </div>

      {output && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Output</label>
            <button onClick={copy} className="text-sm text-indigo-600 hover:text-indigo-800">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea value={output} readOnly className="tool-textarea h-64 bg-gray-50" />
        </div>
      )}
    </div>
  )
}
