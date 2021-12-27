async function getCurrentChromeTab() {
	const queryInfo = {
		active: true,
		currentWindow: true
	};
	return new Promise((resolve, reject) => {
		chrome.tabs.query(queryInfo, tabs => {
			resolve(tabs[0]);
		});
	});
}
function updateDomainList({ domain, targetLang }) {
	return new Promise((resolve) => {
		chrome.storage.local.get('domainList', ({ domainList = {} }) => {
			domainList[domain] = targetLang;
			console.log(domainList);
			chrome.storage.local.set({ domainList }, resolve);
		});
	});
	
}

class AddDomainForm extends HTMLElement {
	constructor() {
		super();
		this.init();
	}

	init() {
		const tmpl = document.getElementById('add-domain-form');
		const shadowRoot = this.attachShadow({ mode: 'open'});
		shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this.setDefaultUrl();
		this.bindSubmitAction();
	}

	setDefaultUrl() {
		const { shadowRoot } = this;
		getCurrentChromeTab().then((tab) => {
			const { url } = tab;
			const { origin } = new URL(url);
			const urlInput = shadowRoot.getElementById('form-url');
			urlInput.value = origin;
		});
	}

	bindSubmitAction() {
		const { shadowRoot } = this;
		const form = shadowRoot.querySelector('form'); 
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const formData = new FormData(e.target);
			const data = Object.fromEntries(formData);
			await updateDomainList(data);
			window.close();
		});
	}

}

window.customElements.define('add-domain-form', AddDomainForm);
