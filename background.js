var lastTabId = -1;

// send message to content.js
function sendMessage(msg) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

// when browser action is clicked
chrome.browserAction.onClicked.addListener(function() {
  sendMessage('clicked_browser_action')
});

// receive message from content.js
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  // if we get a URL
  if (msg.sendUrl) {
    // parse video ID
    var videoId = msg.url.slice(32)
    if (videoId.indexOf('&') !== -1) {
      videoId = videoId.slice(0, videoId.indexOf('&'))
    }
    console.log("The video ID is", videoId)
    // see if valid video ID
    if (videoId === '') {
      console.log('Invalid video ID')
    } else {
      // check video ID against Youtube API
      // part: snippet, id: videoId
      console.log('Looking up', videoId)
      // parse category and check for "education" (27)
    }
  }
})

/*
// block all requests to Youtube
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  return {cancel: true}
},
{urls: ['*://*.youtube.com/*']},
['blocking'])
*/
