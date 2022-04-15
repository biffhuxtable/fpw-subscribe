(function() {

	var getSiblings = function (elem) {

		var siblings = 0;
		var sibling = elem.parentNode.firstChild;

		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== elem) {
				siblings++;
			}
			sibling = sibling.nextSibling
		}

		return siblings;
	};

	var sendRequest = function (id) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/item/subscribe/' + id, true);
		xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
		xhr.send();
	};

	var collection = document.getElementsByClassName("btn-xs btn-default");
	var mainItemId = window.location.pathname.split("/")[3];
	var mainButton = document.getElementById('item--subscribe');

	if (mainButton.textContent != 'Subscribed') {
		sendRequest(mainItemId);		
	}

	for (i = 0; i < collection.length; i++) {
		if ( getSiblings(collection[i]) == 0 ) {
			var itemId = collection[i].getAttribute('href').split("detail/")[1];

			sendRequest(itemId);
		}
	}
	
	location.reload();

})();
