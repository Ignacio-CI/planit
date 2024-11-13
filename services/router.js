const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach(link => {
      link.addEventListener('click', evt => {
        evt.preventDefault()
        const path = evt.currentTarget.getAttribute('href')
        Router.go(path)
      })
    })

    window.addEventListener('popstate', evt => {
      Router.go(evt.state.route, false)
    })

    Router.go(location.pathname)
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to: ${route}`)

    if (addToHistory) {
      history.pushState({ route }, '', route)
    }

    let pageElement = null
    switch (route) {
      case '/':
        pageElement = document.createElement('dashboard-page')
        break
      case '/income':
        pageElement = document.createElement('income-page')
        break
      case '/expenses':
        pageElement = document.createElement('expenses-page')
        break
      case '/investment':
        pageElement = document.createElement('investment-page')
        break
      default:
        console.error(`Sorry, ${route} does not exist.`)
    }

    if (pageElement) {
      const cache = document.querySelector('main')
      cache.innerHTML = ''
      cache.appendChild(pageElement)
      window.scrollX = 0
      window.scrollY = 0
    } else {
      document.querySelector('main').innerHTML = 'Oups, 404!'
    }
  },
}

export default Router
