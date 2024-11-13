async function loadCSS(path, styleElement) {
  const req = await fetch(path)
  const css = await req.text()
  styleElement.textContent = css
}

export { loadCSS }
