import { loadCSS } from '../../helpers/index.js'

export class InvestmentPage extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })

    const styles = document.createElement('style')
    this.root.appendChild(styles)

    loadCSS('components/investment/investment.css', styles)
  }

  connectedCallback() {
    const template = document.getElementById('investment-page-template')
    const content = template.content.cloneNode(true)
    this.root.appendChild(content)

    this.render()
  }

  render() {
    const section = this.root.querySelector('section')
    console.log(section)
    const title = document.createElement('h1')
    title.textContent = 'Investment Page'
    section.appendChild(title)
  }
}

customElements.define('investment-page', InvestmentPage)
