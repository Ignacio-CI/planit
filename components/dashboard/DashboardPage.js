import { loadCSS } from '../../helpers/index.js'

export class DashboardPage extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })

        const styles = document.createElement('style')
        this.root.appendChild(styles)

        const cssPaths = [
            'components/dashboard/dashboard.css',
            'components/dashboard/dashboard-card.css',
            'components/dashboard/expense-breakdown.css',
            'components/dashboard/transactions.css',
        ]

        loadCSS(cssPaths, styles)
    }

    connectedCallback() {
        const template = document.getElementById('dashboard-page-template')
        const content = template.content.cloneNode(true)
        this.root.appendChild(content)

        this.render()
    }

    createCard(title, value, change) {
        const cardTemplate = document.getElementById('dashboard-card-template')
        const cardClone = document.importNode(cardTemplate.content, true)

        cardClone.querySelector('.title').textContent = title
        cardClone.querySelector('.value').textContent = value
        cardClone.querySelector('.change').textContent = change

        return cardClone
    }

    createExpenseBreakdown() {
        const breakdownTemplate = document.getElementById(
            'expense-breakdown-template'
        )
        const breakdownClone = document.importNode(
            breakdownTemplate.content,
            true
        )

        const chartContainer = breakdownClone.querySelector('.chart-container')
        this.renderExpenseChart(chartContainer)

        return breakdownClone
    }

    renderExpenseChart(container) {
        container.innerHTML = `<p>Expense Chart will go here </p>`
    }

    createRecentTransactions(transactions) {
        const transactionsTemplate = document.getElementById(
            'recent-transactions-template'
        )
        const transactionsClone = document.importNode(
            transactionsTemplate.content,
            true
        )

        const transactionsList =
            transactionsClone.querySelector('.transaction-list')

        for (let txn of transactions) {
            const listItem = document.createElement('li')
            listItem.innerHTML = `
        <span class="description">${txn.description}</span>
         <span class="amount" style="color: ${
             txn.amount < 0 ? 'red' : 'green'
         };">
          ${txn.amount < 0 ? '-' : '+'}$${Math.abs(txn.amount).toFixed(2)}
        </span>
      `
            transactionsList.appendChild(listItem)
        }

        return transactionsClone
    }

    handleTransactionModal() {
        const txnDialog = document.querySelector('.transaction-dialog')
        const addTxnButton = this.root.getElementById('add-transaction-btn')
        const closeTxnDialog = document.getElementById('close-dialog-btn')

        addTxnButton.addEventListener('click', () => {
            console.log('add txn btn clicked')
            txnDialog.showModal()
        })

        closeTxnDialog.addEventListener('click', () => {
            console.log('close txn btn clicked')
            txnDialog.close()
        })
    }

    handleTransactionSubmit() {}

    render() {
        const cardContainer = this.root.getElementById('card-container')

        //* MOCK DATA
        const incomeCard = this.createCard(
            'Total Income',
            '$3500.00',
            '+2.5% from last month'
        )
        const expensesCard = this.createCard(
            'Total Expenses',
            '$2050.00',
            '+1.2% from last month'
        )
        const savingsCard = this.createCard(
            'Savings',
            '$1450.00',
            '+4.1% from last month'
        )

        cardContainer.appendChild(incomeCard)
        cardContainer.appendChild(expensesCard)
        cardContainer.appendChild(savingsCard)

        const detailsContainer = this.root.getElementById('details-container')
        const expenseBreakdown = this.createExpenseBreakdown()
        detailsContainer
            .querySelector('#expense-breakdown-container')
            .appendChild(expenseBreakdown)

        const transactions = [
            { description: 'Grocery shopping', amount: -75.5 },
            { description: 'Salary deposit', amount: 3000.0 },
            { description: 'Electric bill', amount: -120.0 },
            { description: 'Online course', amount: -49.99 },
            { description: 'Freelance payment', amount: 500.0 },
        ]
        const recentTransactions = this.createRecentTransactions(transactions)
        detailsContainer
            .querySelector('#recent-transactions-container')
            .appendChild(recentTransactions)

        this.handleTransactionModal()
    }
}

customElements.define('dashboard-page', DashboardPage)
