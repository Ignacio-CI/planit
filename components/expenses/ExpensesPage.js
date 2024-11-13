import { loadCSS } from '../../helpers/index.js'

export class ExpensesPage extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })

    const styles = document.createElement('style')
    this.root.appendChild(styles)

    loadCSS('/components/expenses/expenses.css', styles)
  }

  connectedCallback() {
    const template = document.getElementById('expenses-page-template')
    const content = template.content.cloneNode(true)
    this.root.appendChild(content)

    this.render()
  }

  render() {
    const section = this.root.querySelector('section')
    const title = document.createElement('h1')
    title.textContent = 'Expenses Page'
    section.appendChild(title)
  }
}

customElements.define('expenses-page', ExpensesPage)
