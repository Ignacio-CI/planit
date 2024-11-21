import { loadCSS } from '../../helpers/index.js';

export class DashboardPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        loadCSS('components/dashboard/dashboard.css', styles);
    }

    connectedCallback() {
        const template = document.getElementById(
            'dashboard-page-template'
        ).content;
        this.root.appendChild(template.cloneNode(true));

        this.render();
    }

    render() {
        const cardContainer = this.root.getElementById('card-container');
        const card = document.createElement('simple-card');
        card.setAttribute('title', 'Income');
        card.setAttribute('value', '$1200');
        card.setAttribute('change', '+2.5% from last month');

        cardContainer.appendChild(card);
    }
}

customElements.define('dashboard-page', DashboardPage);
