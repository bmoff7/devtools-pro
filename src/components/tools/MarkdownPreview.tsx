'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const sampleMd = `# Hello World

This is a **Markdown** preview tool.

## Features
- Real-time preview
- GitHub Flavored Markdown
- Code blocks with syntax highlighting

### Code Example
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Blockquotes work too!

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

---

Visit [DevTools Pro](/) for more tools.
`

export default function MarkdownPreview() {
  const [md, setMd] = useState('')
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setMd(sampleMd)} className="btn-ghost">
          Load Sample
        </button>
        <button onClick={() => setMd('')} className="btn-ghost">
          Clear
        </button>
        {md && (
          <button onClick={copy} className="btn-ghost">
            {copied ? 'Copied!' : 'Copy Markdown'}
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Markdown</label>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            placeholder="Type your Markdown here..."
            className="tool-textarea h-[500px]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Preview</label>
          <div className="h-[500px] overflow-auto rounded-lg border bg-white p-4 prose prose-sm max-w-none">
            <ReactMarkdown>{md}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
