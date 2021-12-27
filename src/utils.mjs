export function getItemList() {
	return new Promise((resolve) =>
		chrome.storage.local.get('domainList', ({ domainList = {} }) =>
			resolve(domainList)
		)
	);
}

export default {};
