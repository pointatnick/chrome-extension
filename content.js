// send URL to background.js
document.onclick = function() {
  chrome.runtime.sendMessage({sendUrl: true, url: document.URL});
}
