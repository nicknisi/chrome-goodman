// open long-running connection with background script
var port = chrome.runtime.connect({ name: 'goodman-script' });

// listen for messages from background script
port.onMessage.addListener(function (data) {
	if (data.type === 'quote') {
		console.log('%cJohn Goodman says: ' + data.quote, 'font-weight: bold; font-family: garamond; font-size: 18px; color: #F18F2E');
	}
});

// post a message to the background page
port.postMessage({ type: 'getQuote' });
