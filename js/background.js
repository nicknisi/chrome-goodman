var quotes;

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getQuote() {
	/*globals Promise*/
	var url = chrome.extension.getURL('goodmanQuotes.json');
	return new Promise(function (resolve, reject) {
		if (quotes) {
			resolve(quotes[getRandomNumber(0, quotes.length)]);
		} else {
			var xhr = new XMLHttpRequest();
			xhr.timeout = 1000;
			xhr.open('GET', url);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					quotes = JSON.parse(xhr.responseText);
					resolve(quotes[getRandomNumber(0, quotes.length)]);
				}
			};

			xhr.ontimeout = function () {
				reject();
			};

			xhr.send();
		}
	});
}

function getQuotes() {
	return new Promise(function (resolve) {
		getQuote().then(function () {
			resolve(quotes);
		});
	});
}

chrome.extension.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (message) {
		if (message.type === 'getQuote') {
			getQuote().then(function (quote) {
				port.postMessage({
					type: 'quote',
					quote: quote
				});
			});
		} else if (message.type === 'getQuotes') {
			getQuotes().then(function (quotes) {
				port.postMessage({
					type: 'quotes',
					quotes: quotes
				});
			});
		}
	});
});


chrome.runtime.onMessage.addListener(function (request, sender, response) {
	getQuotes().then(function (quotes) {
		response({quotes: quotes});
	});
});
