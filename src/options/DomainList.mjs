import { getItemList } from '../utils.mjs';

class DomainList extends HTMLElement {
	constructor() {
		super();
		this.init();
	}

	init() {
		const tmpl = document.getElementById('domain-list');
		const shadowRoot = this.attachShadow({ mode: 'open'});
		shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this.renderItems();
	}

	createItem(domain, target) {
		const el = document.createElement('domain-item');
		const i18nEl = document.createElement('i18n-element');
		i18nEl.slot = 'target-lang';
		i18nEl.dataset.i18nKey = target

		const domainEl = document.createElement('span');
		domainEl.textContent = domain;
		domainEl.slot = 'domain';

		el.appendChild(domainEl);
		el.appendChild(i18nEl);

		return el;
	}

	async renderItems() {
		const items = await getItemList();
		const container = this.shadowRoot.querySelector('.domain-list');
		const itemElments = Object.entries(items).map(([domain, target]) => this.createItem(domain, target));
		itemElments.forEach((el) => container.appendChild(el));
	}
}

window.customElements.define('domain-list', DomainList);
