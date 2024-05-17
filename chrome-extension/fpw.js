async function toggleSub(subscribe) {

	var sendRequest = (id, platform) => {

		if (platform === 'steam') {
			if (subscribe) {
				var url = 'https://steamcommunity.com/sharedfiles/subscribe/';
			}
			else {
				var url = 'https://steamcommunity.com/sharedfiles/unsubscribe/';
			}
			
			let formData = new FormData();
			formData.append('id', id);
			formData.append('appid', appId);
			formData.append('sessionid', sessionId);

			return fetch(url, {
				method: 'POST',
				body: formData,
				headers: {
					'x-requested-with':'XMLHttpRequest',
					'Accept':'text/javascript, text/html, application/xml, text/xml, */*',
				}
			})
		}
		else {
			var url = '/item/subscribe/' + id;

			return fetch(url, {
				method: 'POST',
				headers: {
					'x-requested-with':'XMLHttpRequest',
				}
			})
		}
	};

	if (window.location.hostname == 'firepro-w.com') {

		var getSiblings = (elem) => {

			var siblings = 0;
			var sibling = elem.parentNode.firstChild;

			while (sibling) {
				if (sibling.nodeType === 1 && sibling !== elem) {
					siblings++;
				}
				sibling = sibling.nextSibling;
			}

			return siblings;
		};

		var collection = document.getElementsByClassName("btn-xs btn-default");
		var mainItemId = window.location.pathname.split("/")[3];
		var mainButton = document.getElementById('item--subscribe');
		var requiredItemIds = [];

		if (subscribe) {
 
			for (const member of collection) {
				if ( getSiblings(member) == 0 ) {
					var itemId = member.getAttribute('href').split("detail/")[1];
					requiredItemIds.push(itemId);
				}
			}

			if (mainButton.textContent.trim() != 'Subscribed') {
				requiredItemIds.push(mainItemId);
			}

			let promises = [];
			for (const item of requiredItemIds) {
				promises.push(sendRequest(item, "console"));
			}

			await Promise.all(promises).then(responses =>
				Promise.all(responses.map(response => response.json()))
			)
			.then(data => console.log(data))
			.catch(err =>
				console.log(err)
			);

			window.location.reload();
		}
		else {

			if ( window.confirm('Are you sure you want to unsubscribe from all parts? This could include parts for other wrestlers!') ) {

				if (mainButton.textContent.trim() == 'Subscribed') {
					requiredItemIds.push(mainItemId);
				}

				for (const member of collection) {
					if ( getSiblings(member) != 0 ) {
						var itemId = member.getAttribute('href').split("detail/")[1];
						requiredItemIds.push(itemId);
					}
				}
				
				let promises = [];
				for (const item of requiredItemIds) {
					promises.push(sendRequest(item, "console"));
				}
	
				await Promise.all(promises).then(responses =>
					Promise.all(responses.map(response => response.json()))
				)
				.then(data => console.log(data))
				.catch(err =>
					console.log(err)
				);
	
				window.location.reload();
			}
		}

	} else {
		
		var itemId = document.getElementsByName('id')[0].value;
		var appId = document.getElementsByName('appid')[0].value;
		var sessionId = document.getElementsByName('sessionid')[0].value;

		var requiredItemsContainer = document.getElementById('RequiredItems')
		var requiredItems = requiredItemsContainer.children;
		var requiredItemIds = [];

		for (const item of requiredItems) {
			reqItemId = item.href.match(/(?:\?id=)(.*$)/)[1];
			requiredItemIds.push(reqItemId);
		}

		if(subscribe || window.confirm('Are you sure you want to unsubscribe from all parts? This could include parts for other wrestlers!')){			
			
			requiredItemIds.push(itemId);

			let promises = [];
			for (const item of requiredItemIds) {
				promises.push(sendRequest(item, "steam"));
			}

			await Promise.all(promises).then(responses =>
				Promise.all(responses.map(response => response.json()))
			)
			.then(data => console.log(data))
			.catch(err =>
				console.log(err)
			);

			window.location.reload();
		}
	}

}
