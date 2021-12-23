import { getItemList } from '../utils.mjs';

class DomainItem extends HTMLElement {
	constructor() {
		super();
		this.init();
	}

	init() {
		const tmpl = document.getElementById('domain-item');
		const shadowRoot = this.attachShadow({ mode: 'open'});
		shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this.regDeleteBtnAction();
	}

	get domain() {
		const domainSlot = this.shadowRoot.querySelector('slot[name="domain"]');
		const nodes = domainSlot.assignedNodes();
		const [latestNode] = nodes;
		return latestNode?.textContent;
	}

	regDeleteBtnAction() {
		const delBtn = this.shadowRoot.querySelector('.del-btn');
		delBtn.addEventListener('click', this.deleteItem.bind(this));
	}

	async deleteItem() {
		const { domain } = this;
		const list = await getItemList();
		delete list[domain];
		chrome.storage.local.set({ domainList: list }, window.location.reload());
		
	}
}

window.customElements.define('domain-item', DomainItem);
