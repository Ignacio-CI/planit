import { loadCSS, generateId } from '../../helpers/index.js';

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

        const txnDialog = document.querySelector('.transaction-dialog');
        const txnForm = document.querySelector('#transaction-form');
        const addTxnBtn = this.root.querySelector('#add-transaction-btn');
        const txnDialogCloseBtn = document.querySelector('#close-dialog-btn');

        addTxnBtn.addEventListener('click', () => txnDialog.showModal());
        txnDialogCloseBtn.addEventListener('click', () => txnDialog.close());

        txnForm.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(txnForm);
            const newTransaction = {
                id: generateId(),
                description: formData.get('description'),
                category: formData.get('category'),
                amount: formData.get('amount'),
                date: formData.get('date'),
            };

            const currentData = app.store.data;
            currentData[0].transactions.push(newTransaction);
            app.store.data = currentData;
            localStorage.setItem('financialData', JSON.stringify(currentData));

            txnForm.reset();
            txnDialog.close();
        });

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
            expenseBdContainer.innerHTML = '';
            recentTxnsContainer.innerHTML = '';

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
        }
    }
}

customElements.define('dashboard-page', DashboardPage);
