import { loadCSS } from '../../helpers/index.js';

export class Transactions extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        loadCSS('components/transactions/transactions.css', styles);
    }

    connectedCallback() {
        const template = document.getElementById(
            'recent-transactions-template'
        ).content;
        this.root.appendChild(template.cloneNode(true));

        this.render();
    }

    render() {
        const txnList = this.root.querySelector('.transaction-list');
        const txns = JSON.parse(this.dataset.transactions);
        this.root.querySelector(
            '.transaction-summary'
        ).textContent = `You made ${txns.length} transactions this month`;

        txns.forEach(txn => {
            const li = document.createElement('li');

            const description = document.createElement('span');
            description.textContent = txn.description;
            description.className = 'txn-description';

            const amount = document.createElement('span');
            amount.textContent = `$${txn.amount}`;
            amount.className = 'txn-amount';

            const category = document.createElement('span');
            category.textContent = txn.category;
            category.className = 'txn-category';

            const date = document.createElement('span');
            date.textContent = txn.date;
            date.className = 'txn-date';

            li.append(description, amount, category, date);
            txnList.appendChild(li);
        });
    }
}

customElements.define('recent-transactions', Transactions);
