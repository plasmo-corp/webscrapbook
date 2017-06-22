/********************************************************************
 *
 * The background script for viewer functionality
 *
 *******************************************************************/

chrome.webRequest.onBeforeRequest.addListener(function (details) {
  if (details.frameId !== 0) { return; }

  var url = new URL(details.url);
  // use a random hash to avoid recursive redirect
  if (!/\.htz/i.test(url.pathname) || url.searchParams.has("ipimkkaicmlacnnmkmejigldfflpcmhl")) { return; }

  var newUrl = chrome.runtime.getURL("viewer/viewer.html" + "?src=" + encodeURIComponent(url.href) + url.hash);
  // return {redirectUrl: newUrl}; // this doesn't work
  chrome.tabs.update(details.tabId, {url: newUrl}, () => {});
  return {cancel: true};
}, { urls: ["<all_urls>"] }, ["blocking"]);
