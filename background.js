// Unsafe, but there's no real safe option when it comes to extensions
var API_KEY = 'AIzaSyD3dCBi7EHdc9bTVDWR_12gqSyTlsblaww';
var lastTabId = -1;

// send message to content.js
function sendMessage(msg) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg);
  });
}

// when browser action is clicked
chrome.browserAction.onClicked.addListener(function() {
  sendMessage('clicked_browser_action');
});

// receive message from content.js
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  // if we get a URL
  if (msg.sendUrl) {
    // parse video ID
    var videoId = msg.url.slice(32);
    if (videoId.indexOf('&') !== -1) {
      videoId = videoId.slice(0, videoId.indexOf('&'));
    }
    console.log("The video ID is", videoId);
    // see if valid video ID
    if (videoId === '') {
      console.log('Invalid video ID');
    } else {
      // check video ID against Youtube API
      console.log('Looking up', videoId);
      var apiRequest = new XMLHttpRequest();
      apiRequest.addEventListener('load', function() {
        var apiResponse = JSON.parse(apiRequest.responseText);
        var category = apiResponse.items[0].snippet.categoryId;
        if (category !== '27') {
          console.log('not an educational video')
          // block

        }
      })
      apiRequest.open('GET', 'https://www.googleapis.com/youtube/v3/videos?key=' + API_KEY + '&id=' + videoId + '&part=snippet');
      apiRequest.send();
    }
  }
})

/*
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  return {cancel: true}
},
{urls: [msg.url]},
['blocking'])
*/
