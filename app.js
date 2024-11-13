import Router from './services/router.js'

import { DashboardPage } from './components/dashboard/DashboardPage.js'
import { IncomePage } from './components/income/IncomePage.js'
import { ExpensesPage } from './components/expenses/ExpensesPage.js'
import { InvestmentPage } from './components/investment/InvestmentPage.js'

window.app = {}
app.router = Router

window.addEventListener('DOMContentLoaded', evt => {
  console.log(
    `%cDOMContentLoaded at ${evt.timeStamp} ms`,
    'color: #4ea8de; font-weight: bold;'
  )
  app.router.init()
  lucide.createIcons()
})

window.addEventListener('load', evt => {
  console.log(
    `%cLoad at ${evt.timeStamp} ms`,
    'color: #48bfe3; font-weight: bold;'
  )
})
