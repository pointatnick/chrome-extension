var lastTabId = -1;

// send message to content.js
function sendMessage(msg) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('sending message to content.js...');
    chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

// when browser action is clicked
chrome.browserAction.onClicked.addListener(function() {
  sendMessage('clicked_browser_action')
});

// receive message from content.js
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  console.log("Message from content script: " + msg)
})
