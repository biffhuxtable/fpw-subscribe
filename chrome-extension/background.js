chrome.runtime.onInstalled.addListener(function(details) {
  var rule = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlContains: 'firepro-w.com/item/detail' },
      })
    ],
    actions: [ new chrome.declarativeContent.ShowAction() ]
  };

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
});

chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.ib, {
		file: 'fpw.js'
	});
});