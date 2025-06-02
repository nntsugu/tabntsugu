chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
})

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('src/tab/index.html') })
})

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('Message received:', request)
  
  if (request.type === 'GET_TAB_INFO') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tab: tabs[0] })
    })
    return true
  }
})

export {}