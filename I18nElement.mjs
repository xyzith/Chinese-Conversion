class I18nElement extends HTMLElement {
	constructor(props) {
		super();
		this.init();
	}

	connectedCallback() {
		this.startTranslate();
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}

	init() {
		const shadowRoot = this.attachShadow({ mode: 'open'});
		this.initTemplate();
	}

	initTemplate() {
		const translatedText = document.createElement('span');
		translatedText.className = 'translated-node';
		this.shadowRoot.appendChild(translatedText);
	}

	get translatedElement() {
		return this.shadowRoot.querySelector('.translated-node');
	}

	startTranslate() {
		const updateI18n = () => {
			const { i18nKey = '' } = this.dataset;
			const translatedText = chrome.i18n.getMessage(i18nKey) || i18nKey;
			this.translatedElement.textContent = translatedText;
		}
		this.observer = new MutationObserver(updateI18n);
		const config = { attributes: true };
		this.observer.observe(this, config);
		updateI18n();
	}
}


window.customElements.define('i18n-element', I18nElement);
