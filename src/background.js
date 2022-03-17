let rowQueue = [];
const RETRY_AFTER_MINUTE = 5;
const MAX_RETRIES = 5;

let prevRow = null;
let abortFlag = false;
let currentTabId = null;
let currentUrl = null;
let prevTabId = null;
let newTab = false;

const PATTERN = "https://saytoyirga.activehosted.com/*";
const URL = "https://saytoyirga.activehosted.com/admin/main.php?action=campaign_new";

function checkTabExist() {
  if (chrome.runtime.lastError) {
    return false;
  } else {
    return true
  }
}

function getUrlByTabId(tabId){
  chrome.tabs.getSelected(tabId, function(tab) { 
    currentUrl = tabl.url;
})
}

async function RetryIfFail(){
  await new Promise((resolve, reject) => {
    newTab = false;
     intervalId = setInterval(() => {
       let url = currentUrl
      if (checkTabExist(prevTabId) && newTab != true && (url.indexOf('campaign/') != -1 || url.indexOf('campaign_new_result'))) {
        abortFlag = true;
        clearInterval(intervalId);
        resolve();
        return;
      }
    }, 300000);
  });

  if (abortFlag) {
    console.log('retrying stuck on tab', prevRow);
    rowQueue.unshift(prevRow);
    chrome.tabs.remove(prevTabId);
    abortFlag = false;
    processQueue();
    return;
  }
}

function processQueue() {
  const row = rowQueue.length && rowQueue.shift(); // FIFO

  let intervalId = null;

  if (row) {

    prevRow = row
    newTab = false;

    chrome.tabs.create({ url: URL, active: false }, function (tab) {
      if(intervalId != null){
        clearInterval(intervalId)
      }
       RetryIfFail();
      prevTabId = tab.id;

      newTab = true;
      
      console.log('redirect to active campaign')
      chrome.tabs.executeScript(tab.id, { code: "let rows = " + JSON.stringify(row) + "; let INDEX = 0; let CONTINUE = 0;" });
      chrome.tabs.executeScript(tab.id, { file: 'src/content.js' });
      console.log('after content')
      chrome.storage.sync.set({ "key": row })

    });


    chrome.tabs.onUpdated.addListener(function _(tabId, info, tab) {
      chrome.storage.sync.get(['userClick'], function (res) {
        if (res.userClick == true) {
          currentUrl = tab.url
          newTab = false;
          console.log('redirect to active campaign')
          chrome.storage.sync.get(['key'], function (result) {
            chrome.tabs.executeScript(tab.id, { code: "rows = " + JSON.stringify(result.key) + "; let INDEX = 0; let CONTINUE = 0;" });
            chrome.tabs.executeScript(tab.id, { file: 'src/content.js' });
            console.log('Value currently is ' + result.key);
          })
        }
      }); 
    })

    chrome.tabs.onRemoved.addListener(function(tabId){
      if(intervalId != null){
        clearInterval(intervalId)
        console.log('On removed tab')
      }
      console.log('On removed tab')
  });
  }


  else {
    console.log('queue empty');
    chrome.storage.sync.set({ "userClick": false })
    if(intervalId != null){
      clearInterval(intervalId)
    }
    //chrome.tabs.create({ url:  "https://saytoyirga.activehosted.com/admin/main.php?action=campaign_new" }, function(tab) {
    //});
  }
}

// Messages from browser action
chrome.runtime.onConnect.addListener(function (port) {
  console.log(port.name, "connected");

  if (port.name === 'BrowserAction') {
    chrome.storage.sync.set({ "userClick": true })
    port.onMessage.addListener(function (rows) {
      console.log("rows");
      console.log(rows);

      rowQueue = rows;
      processQueue();
    });
  }
});

// Messages from content script
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(msg, sender.tab.id);

  if (msg === 'success' || msg === 'error') {
    chrome.storage.sync.set({ "autoclose": true })
    chrome.tabs.remove(sender.tab.id);
    if(intervalId != null){
      clearInterval(intervalId)
    }
    processQueue();
  }
});

// BrowserAction handler
chrome.browserAction.onClicked.addListener(function (tab) {

});
