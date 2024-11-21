import { loadCSS } from '../../helpers/index.js';

export class SimpleCard extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'value', 'change'];
    }

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        loadCSS('components/simple-card/simple-card.css', styles);
    }

    connectedCallback() {
        const template = document.getElementById(
            'simple-card-template'
        ).content;
        this.root.appendChild(template.cloneNode(true));

        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(
            `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
        );
    }

    render() {
        const title = this.root.querySelector('.title');
        const value = this.root.querySelector('.value');
        const change = this.root.querySelector('.change');

        title.textContent = this.getAttribute('title');
        value.textContent = this.getAttribute('value');
        change.textContent = this.getAttribute('change');
    }
}

customElements.define('simple-card', SimpleCard);
