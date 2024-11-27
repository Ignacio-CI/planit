import Router from './services/router.js';
import Store from './services/store.js';

import { loadFinancials } from './services/financials.js';

import { DashboardPage } from './components/dashboard/DashboardPage.js';
import { IncomePage } from './components/income/IncomePage.js';
import { ExpensesPage } from './components/expenses/ExpensesPage.js';
import { InvestmentPage } from './components/investment/InvestmentPage.js';
import { SimpleCard } from './components/simple-card/SimpleCard.js';
import { ExpenseBreakdown } from './components/expenses-breakdown/ExpenseBreakdown.js';
import { Transactions } from './components/transactions/Transactions.js';

window.app = {};
app.router = Router;
app.store = Store;

window.addEventListener('DOMContentLoaded', evt => {
    console.log(
        `%cDOMContentLoaded at ${evt.timeStamp} ms`,
        'color: #4ea8de; font-weight: bold;'
    );
    loadFinancials();
    app.router.init();
    lucide.createIcons();
});
