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

        window.addEventListener('datachange', () => {
            console.log('datachange event received');
            this.render();
        });
        this.render();
    }

    render() {
        const cardContainer = this.root.querySelector('#card-container');
        const expenseBdContainer = this.root.querySelector(
            '#expense-breakdown-container'
        );
        const recentTxnsContainer = this.root.querySelector(
            '#recent-transactions-container'
        );

        if (!app.store.data || app.store.data.length === 0) {
            cardContainer.innerHTML = '<p>LOADING...</p>';
            return;
        } else {
            cardContainer.innerHTML = '';

            for (let status of app.store.data[0].summary) {
                const card = document.createElement('simple-card');
                card.setAttribute('title', status.title);
                card.setAttribute('value', `$${status.total_amount}`);
                card.setAttribute('change', '+2.5% from last month');
                cardContainer.appendChild(card);
            }

            const expenseBreakdown =
                document.createElement('expense-breakdown');
            expenseBdContainer.appendChild(expenseBreakdown);

            const recentTransactions = document.createElement(
                'recent-transactions'
            );
            const txns = app.store.data[0].transactions;
            recentTransactions.dataset.transactions = JSON.stringify(txns);
            recentTxnsContainer.appendChild(recentTransactions);

            const txnDialog = document.querySelector('.transaction-dialog');
            const txnDialogCloseBtn =
                document.querySelector('#close-dialog-btn');
            const addTxnBtn = this.root.querySelector('#add-transaction-btn');

            addTxnBtn.addEventListener('click', () => {
                txnDialog.showModal();
            });

            txnDialogCloseBtn.addEventListener('click', () => {
                txnDialog.close();
            });
        }
    }
}

customElements.define('dashboard-page', DashboardPage);
