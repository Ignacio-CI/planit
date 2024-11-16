async function loadCSS(path, styleElement) {
  try {
    const cssPath = Array.isArray(path) ? path : [path]

    for (const path of cssPath) {
      const req = await fetch(path)
      const css = await req.text()
      styleElement.textContent += css
    }
  } catch (error) {
    console.error(`Error loading CSS at ${path}:`, error)
  }
}

export { loadCSS }
