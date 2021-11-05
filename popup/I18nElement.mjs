class I18nElement extends HTMLElement {
	constructor() {
		super();
		this.init();
	}

	init() {
		const tmpl = document.createElement('span');
		const shadowRoot = this.attachShadow({ mode: 'open'});
		const key = this.textContent;
		const translatedText = chrome.i18n.getMessage(key) || key;
		tmpl.textContent = translatedText;
		shadowRoot.appendChild(tmpl);
	}
}


window.customElements.define('i18n-element', I18nElement);
