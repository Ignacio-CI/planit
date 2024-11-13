import { loadCSS } from '../../helpers/index.js'

export class DashboardPage extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })

    const styles = document.createElement('style')
    this.root.appendChild(styles)

    loadCSS('components/dashboard/dashboard.css', styles)
  }

  connectedCallback() {
    const template = document.getElementById('dashboard-page-template')
    const content = template.content.cloneNode(true)
    this.root.appendChild(content)

    this.render()
  }

  render() {
    const section = this.root.querySelector('section')
    console.log(section)
    const title = document.createElement('h1')
    title.textContent = 'Dashboard Page'
    section.appendChild(title)
  }
}

customElements.define('dashboard-page', DashboardPage)
