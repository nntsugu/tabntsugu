import { useState, useEffect, useRef } from 'react'
import './App.css'

interface TabInfo {
  id: number
  windowId: number
  title: string
  url: string
}

interface WindowInfo {
  id: number
  tabs: TabInfo[]
}

function App() {
  const [windows, setWindows] = useState<WindowInfo[]>([])
  const [markdown, setMarkdown] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadTabs()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const loadTabs = async () => {
    const allWindows = await chrome.windows.getAll({ populate: true })
    
    const windowsData: WindowInfo[] = allWindows
      .filter(window => window.id !== undefined)
      .map(window => ({
        id: window.id!,
        tabs: window.tabs?.filter(tab => tab.id !== undefined).map(tab => ({
          id: tab.id!,
          windowId: window.id!,
          title: tab.title || 'Untitled',
          url: tab.url || ''
        })) || []
      }))

    setWindows(windowsData)
    generateMarkdown(windowsData)
  }

  const generateMarkdown = (windowsData: WindowInfo[]) => {
    const date = new Date().toLocaleString()
    let md = `# Tab List - ${date}\n\n`
    
    windowsData.forEach((window, index) => {
      const tabCount = window.tabs.length
      md += `## Window ${index + 1} (${tabCount} tab${tabCount !== 1 ? 's' : ''})\n\n`
      window.tabs.forEach(tab => {
        md += `- [${tab.title}](${tab.url})\n`
      })
      md += '\n'
    })

    setMarkdown(md)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const date = new Date()
    const fileName = `tabs_${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}.md`
    
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setMarkdown(content)
    }
    reader.readAsText(file)
  }

  const loadFile = () => {
    fileInputRef.current?.click()
  }

  const openAllLinks = async () => {
    // Parse markdown to identify windows
    const lines = markdown.split('\n')
    const windowGroups: string[][] = []
    let currentWindow: string[] = []
    
    lines.forEach(line => {
      if (line.startsWith('## Window')) {
        if (currentWindow.length > 0) {
          windowGroups.push(currentWindow)
        }
        currentWindow = []
      } else {
        const urlMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/)
        if (urlMatch && urlMatch[2].startsWith('http')) {
          currentWindow.push(urlMatch[2])
        }
      }
    })
    
    // Add the last window group
    if (currentWindow.length > 0) {
      windowGroups.push(currentWindow)
    }
    
    // Open each window group
    for (const urls of windowGroups) {
      if (urls.length > 0) {
        // Create a new window with the first URL
        const window = await chrome.windows.create({
          url: urls[0],
          focused: false
        })
        
        // Add remaining URLs as tabs in the same window
        for (let i = 1; i < urls.length; i++) {
          await chrome.tabs.create({
            windowId: window.id,
            url: urls[i]
          })
        }
      }
    }
  }

  const getTotalTabCount = () => {
    return windows.reduce((total, window) => total + window.tabs.length, 0)
  }

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value)
  }

  return (
    <div className="App">
      <header>
        <h1>TabnTsugu</h1>
        <p className="tab-count">
          {windows.length} windows, {getTotalTabCount()} tabs
        </p>
      </header>

      <div className="actions">
        <button onClick={loadTabs} className="refresh-btn">
          Refresh
        </button>
        <button onClick={copyToClipboard} className="copy-btn">
          {copied ? 'Copied!' : 'Copy Markdown'}
        </button>
        <button onClick={downloadMarkdown} className="download-btn">
          Download
        </button>
        <button onClick={loadFile} className="load-btn">
          Load
        </button>
        <button onClick={openAllLinks} className="open-links-btn">
          Open links
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown"
          onChange={handleFileOpen}
          style={{ display: 'none' }}
        />
      </div>

      <div className="preview">
        <div className="markdown-preview">
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Markdown content will appear here..."
          />
        </div>
      </div>
    </div>
  )
}

export default App