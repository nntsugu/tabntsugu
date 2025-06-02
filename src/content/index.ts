console.log('Content script loaded')

chrome.runtime.sendMessage({ type: 'CONTENT_SCRIPT_LOADED' })

export {}