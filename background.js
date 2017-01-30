// Unsafe, but there's no real safe option when it comes to extensions
var API_KEY = 'AIzaSyD3dCBi7EHdc9bTVDWR_12gqSyTlsblaww';
var lastTabId = -1;

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
    // check video ID against Youtube API
    console.log('Looking up', videoId);
    var apiRequest = new XMLHttpRequest();
    apiRequest.addEventListener('load', function() {
      var apiResponse = JSON.parse(apiRequest.responseText);
      // checks for valid ID which returns only 1 result
      if (apiResponse.pageInfo.totalResults === 1) {
        var category = apiResponse.items[0].snippet.categoryId;

        // block videos not tagged "education"
        if (category !== '27') {
          // add to block filter, refresh page
          console.log('not an educational video, blocking...');
          updateFilters([msg.url]);
          chrome.tabs.reload();
        }
      } else {
        console.log('invalid video ID...');
      }
    })
    apiRequest.open('GET', 'https://www.googleapis.com/youtube/v3/videos?key=' + API_KEY + '&id=' + videoId + '&part=snippet');
    apiRequest.send();
  }
})

function blockRequest(details) {
  return {cancel: true};
}

function updateFilters(urls) {
  if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }
  chrome.webRequest.onBeforeRequest.addListener(
    blockRequest,
    {urls: urls},
    ['blocking']
  );
}
