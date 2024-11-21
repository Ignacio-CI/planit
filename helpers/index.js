async function loadCSS(path, styleElement) {
    try {
        const req = await fetch(path);
        const css = await req.text();
        styleElement.textContent = css;
    } catch (error) {
        console.error(`Error loading CSS at ${path}:`, error);
    }
}

export { loadCSS };
