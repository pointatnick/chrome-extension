// send URL to background.js
chrome.runtime.sendMessage({sendUrl: true, url: document.URL})

// receive message from background.js
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  if (msg === 'clicked_browser_action') {
    console.log('clicked')
  }
})
