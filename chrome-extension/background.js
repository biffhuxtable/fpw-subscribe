try{
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status == 'complete' && (tab.url.includes("https://firepro-w.com/") || tab.url.includes("https://steamcommunity.com/") ) ) {
      chrome.scripting.executeScript({
        files: ['contentScript.js'],
        target: {tabId: tab.id}
      });
    }
  });
} catch(e) {
  console.log(e);
}