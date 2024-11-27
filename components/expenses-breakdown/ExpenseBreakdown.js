import { loadCSS } from '../../helpers/index.js';

export class ExpenseBreakdown extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        loadCSS('components/expenses-breakdown/expense-breakdown.css', styles);
    }

    connectedCallback() {
        const template = document.getElementById(
            'expense-breakdown-template'
        ).content;
        this.root.appendChild(template.cloneNode(true));

        const chartContainer = this.root.querySelector('.chart-container');
        const p = document.createElement('p');
        p.textContent = 'Chart will be here...';
        chartContainer.appendChild(p);
    }
}

customElements.define('expense-breakdown', ExpenseBreakdown);
