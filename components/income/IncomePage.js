import { loadCSS } from '../../helpers/index.js'

export class IncomePage extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })

    const styles = document.createElement('style')
    this.root.appendChild(styles)

    loadCSS('/components/income/income.css', styles)
  }

  connectedCallback() {
    const template = document.getElementById('income-page-template')
    const content = template.content.cloneNode(true)
    this.root.appendChild(content)

    this.render()
  }

  render() {
    const section = this.root.querySelector('section')
    const title = document.createElement('h1')
    title.textContent = 'Income Page'
    section.appendChild(title)
  }
}

customElements.define('income-page', IncomePage)
